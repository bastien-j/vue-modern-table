<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { injectionKey, type TableColumn, type TableRow } from './types'
import '@material-design-icons/font/filled.css'

const availablePageLengths = [5, 10, 15]

const props = defineProps({
  columns: {
    type: Array<TableColumn>,
    required: true
  },
  rows: {
    type: Array<TableRow>,
    default: () => []
  },
  options: {
    type: Object,
    default: () => ({})
  },
  checkedRowKeys: {
    type: Array<TableRow['key']>,
    default: () => []
  }
})
const emits = defineEmits(['update:checkedRowKeys'])

const globalOptions = inject(injectionKey)
const options = computed(() => ({
  ...globalOptions,
  ...props.options
}))

// Filtering
const filterValue = ref('')
const filteredRows = computed(() =>
  props.rows
    .slice()
    .filter((r) =>
      options.value.enableFiltering
        ? Object.entries(r).some(
            ([, value]) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(filterValue.value.toLowerCase())
          )
        : true
    )
)
watch(filteredRows, (newValue) => {
  const checkedKeys = [...checkedRowKeys.value]
  for (const k in checkedKeys) {
    const index = parseInt(k)
    const checkedKey = checkedKeys[index]
    if (!newValue.find((r) => r.key === checkedKey)) {
      const keyIndex = checkedRowKeys.value.findIndex((k) => k === checkedKey)
      if (keyIndex >= 0) checkedRowKeys.value.splice(keyIndex, 1)
    }
  }
  if (options.value.enablePagination && currentPage.value > lastPage.value) navLastPage()
})

// Sorting
const sortedFields = ref<{ field: string; sort: 'ASC' | 'DESC' }[]>([])
const sortedRows = computed(() => {
  const sorted = filteredRows.value.slice()
  if (options.value.enableSorting) {
    sortedFields.value.map(({ field, sort }) => {
      sorted.sort((a, b) => {
        if (sort === 'ASC') return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
        return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0
      })
    })
  }
  return sorted
})
const sortField = (field: string) => {
  const fieldIndex = findSortedFieldIndex(field)
  if (fieldIndex < 0) {
    sortedFields.value.unshift({
      field,
      sort: 'ASC'
    })
    return
  }
  const existing = sortedFields.value[fieldIndex]
  if (existing.sort === 'ASC') existing.sort = 'DESC'
  else sortedFields.value.splice(fieldIndex, 1)
}
const findSortedFieldIndex = (field: string) =>
  sortedFields.value.findIndex((f) => f.field === field)
const findSortedField = (field: string) => sortedFields.value.find((f) => f.field === field)
const isFieldSorted = (field: string) => findSortedFieldIndex(field) >= 0

// Pagination
const currentPage = ref(0)
const selectedPageLength = ref(availablePageLengths[0])
const pageStart = computed(() => currentPage.value * selectedPageLength.value)
const pageEnd = computed(() => pageStart.value + selectedPageLength.value)
const lastPage = computed(() => Math.floor(filteredRows.value.length / selectedPageLength.value))
const paginatedRows = computed(() =>
  options.value.enablePagination
    ? sortedRows.value.slice(pageStart.value, pageEnd.value)
    : sortedRows.value
)
watch(selectedPageLength, () => {
  if (options.value.enablePagination && currentPage.value > lastPage.value) navLastPage()
})
const navFirstPage = () => {
  if (!currentPage.value) return
  currentPage.value = 0
}
const navPreviousPage = () => {
  if (!currentPage.value) return
  currentPage.value -= 1
}
const navNextPage = () => {
  if (currentPage.value >= lastPage.value) return
  currentPage.value += 1
}
const navLastPage = () => {
  if (currentPage.value === lastPage.value) return
  currentPage.value = lastPage.value
}

// Checkbox
const checkedRowKeys = ref(props.checkedRowKeys)
const allRowsChecked = computed(() =>
  !checkedRowKeys.value.length || checkedRowKeys.value.length !== filteredRows.value.length
    ? false
    : filteredRows.value.every((r) => checkedRowKeys.value.includes(r.key))
)
watch(checkedRowKeys, (newValue) => {
  emits('update:checkedRowKeys', newValue)
})
const toggleSelectAll = (select: boolean) => {
  if (select) checkedRowKeys.value = sortedRows.value.map((r) => r.key)
  else checkedRowKeys.value = []
}

// Actions
const exportAsCSV = () => {
  const columns = props.columns.filter((c) => !c.noExport)
  const headers = columns.map((c) => c.field).join(';')
  const rows = sortedRows.value
    .map((r) => {
      return columns.map((c) => r[c.field]).join(';')
    })
    .join('\n')
  const csvContent = headers.concat('\n', rows)

  const linkEl = document.createElement('a')
  linkEl.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
  linkEl.download = 'export.csv'
  linkEl.click()
}
</script>

<template>
  <div class="modern-table">
    <div class="modern-table-before">
      <div v-if="options.enableFiltering" class="modern-table-filter">
        <input type="text" v-model="filterValue" />
      </div>
      <div class="modern-table-actions">
        <button @click="exportAsCSV()"><span class="material-icons"> file_download </span></button>
      </div>
    </div>
    <div class="modern-table-table">
      <div class="modern-table-row modern-table-header">
        <div v-if="options.enableCheckbox" class="modern-table-cell shrink">
          <input
            type="checkbox"
            :checked="allRowsChecked"
            @input="toggleSelectAll(($event.target as HTMLInputElement).checked)"
          />
        </div>
        <div
          v-for="column in columns"
          :key="column.field"
          class="modern-table-cell"
          :class="{ shrink: column.shrink }"
        >
          <div class="modern-table-cell-content">
            {{ column.label }}
            <button
              v-if="options.enableSorting && column.sortable"
              class="modern-table-sort-button"
              @click="sortField(column.field)"
            >
              <span v-if="!isFieldSorted(column.field)" class="material-icons">unfold_more</span>
              <template v-else>
                <span v-if="findSortedField(column.field)?.sort === 'ASC'" class="material-icons"
                  >expand_more</span
                >
                <span v-else class="material-icons">expand_less</span>
              </template>
            </button>
          </div>
        </div>
      </div>
      <div class="modern-table-body">
        <div v-for="row in paginatedRows" :key="row.key" class="modern-table-row">
          <div v-if="options.enableCheckbox" class="modern-table-cell shrink">
            <input type="checkbox" :value="row.key" v-model="checkedRowKeys" />
          </div>
          <div
            v-for="column in columns"
            :key="column.field"
            class="modern-table-cell"
            :class="{ shrink: column.shrink }"
          >
            <div class="modern-table-cell-content">
              <slot
                :name="column.field"
                :field="column.field"
                :value="row[column.field]"
                :row="row"
              >
                {{ row[column.field] }}
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="options.enablePagination" class="modern-table-pagination">
      <div class="modern-table-pagination-length">
        Items per page :
        <select v-model="selectedPageLength">
          <option v-for="length of availablePageLengths" :key="length" :value="length">
            {{ length }}
          </option>
        </select>
      </div>
      <div class="modern-table-pagination-current">
        {{ Math.min(pageStart + 1, filteredRows.length) }} -
        {{ Math.min(pageEnd, filteredRows.length) }} / {{ filteredRows.length }}
      </div>
      <div class="modern-table-pagination-actions">
        <button @click="navFirstPage()" :disabled="!currentPage">
          <span class="material-icons">first_page</span>
        </button>
        <button @click="navPreviousPage()" :disabled="!currentPage">
          <span class="material-icons">navigate_before</span>
        </button>
        <button @click="navNextPage()" :disabled="currentPage >= lastPage">
          <span class="material-icons">navigate_next</span>
        </button>
        <button @click="navLastPage()" :disabled="currentPage === lastPage">
          <span class="material-icons">last_page</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modern-table {
  .modern-table-before {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;

    .modern-table-filter {
      input {
        padding: 0.5rem;
        border: 1px solid darkgray;
      }
    }
    .modern-table-actions {
      margin-left: auto;
      button {
        background: none;
        border: 1px solid darkgray;
        display: grid;
        padding: 0.5rem;
        color: #4e4e4e;
        transition: 0.15s;

        &:hover {
          background-color: #e9e9e9;
          cursor: pointer;
        }
        &:active {
          background-color: #d1d1d1;
        }
      }
    }
  }
  .modern-table-table {
    width: 100%;
    display: table;
    border-collapse: collapse;
    .modern-table-cell {
      display: table-cell;
      padding: 1rem;
      border: 1px solid darkgray;

      &.shrink {
        width: 0px;
      }
    }
    .modern-table-row {
      display: table-row;
    }
    .modern-table-header {
      .modern-table-cell {
        font-weight: bold;

        .modern-table-cell-content {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .modern-table-sort-button {
          margin-left: auto;
          display: inline-grid;
          place-content: center;
          border: none;
          border-radius: 0.3rem;
          background: none;
          transition: 0.15s background;

          &:hover {
            background-color: lightgray;
            cursor: pointer;
          }
          &:active {
            background-color: darkgray;
          }
        }
      }
    }
    .modern-table-body {
      display: table-row-group;
    }
  }
  .modern-table-pagination {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;

    .modern-table-pagination-actions {
      display: flex;

      button {
        background: none;
        border: none;
        display: grid;
        padding: 0.5rem;
        color: #4e4e4e;
        transition: 0.15s;

        &:disabled {
          color: #b4b4b4;
        }
        &:not(:disabled):hover {
          background-color: #e9e9e9;
          cursor: pointer;
        }
        &:not(:disabled):active {
          background-color: #d1d1d1;
        }
      }
    }
  }
}
</style>

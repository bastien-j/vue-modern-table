<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { TableColumn, TableRow } from './types'

const availablePaginationLengths = [5, 10, 15]

const props = defineProps({
  columns: {
    type: Array<TableColumn>,
    required: true
  },
  rows: {
    type: Array<TableRow>,
    default: () => []
  },
  enableCheckbox: {
    type: Boolean,
    default: false
  },
  enableFilter: {
    type: Boolean,
    default: false
  },
  enablePagination: {
    type: Boolean,
    default: false
  },
  disableSorting: {
    type: Boolean,
    default: false
  },
  checkedRowKeys: {
    type: Array<TableRow['key']>,
    default: () => []
  }
})
const emits = defineEmits(['update:checkedRowKeys'])

const sortedFields = ref<{ field: string; sort: 'ASC' | 'DESC' }[]>([])
const filterValue = ref('')
const checkedRowKeys = ref(props.checkedRowKeys)
const currentPage = ref(0)
const selectedPaginationLength = ref(availablePaginationLengths[0])

const paginationStart = computed(() => currentPage.value * selectedPaginationLength.value)
const paginationEnd = computed(() => paginationStart.value + selectedPaginationLength.value)
const lastPage = computed(() =>
  Math.floor(internalRows.value.length / selectedPaginationLength.value)
)

const internalRows = computed(() => {
  return props.rows.slice().filter((r) => {
    if (!props.enableFilter) return true
    const filter = filterValue.value.toLowerCase()
    for (const k of Object.keys(r)) {
      const value = r[k]
      if (typeof value === 'string' && value.toLowerCase().includes(filter)) return true
    }
    return false
  })
})
const sortedInternalRows = computed(() => {
  const sortedRows = internalRows.value.slice()
  if (props.disableSorting) return sortedRows
  for (const field of sortedFields.value) {
    sortedRows.sort((a, b) => {
      const aField = a[field.field]
      const bField = b[field.field]
      if (field.sort === 'ASC') return aField > bField ? 1 : aField < bField ? -1 : 0
      return aField > bField ? -1 : aField < bField ? 1 : 0
    })
  }
  return sortedRows
})
const paginatedInternalRows = computed(() =>
  props.enablePagination
    ? sortedInternalRows.value.slice(paginationStart.value, paginationEnd.value)
    : sortedInternalRows.value
)
const allRowsChecked = computed(() => {
  if (!checkedRowKeys.value.length || checkedRowKeys.value.length !== internalRows.value.length)
    return false
  for (const r of internalRows.value) {
    if (!checkedRowKeys.value.includes(r.key)) return false
  }
  return true
})

watch(selectedPaginationLength, () => {
  if (props.enablePagination && currentPage.value > lastPage.value) navLastPage()
})
watch(checkedRowKeys, (newValue) => {
  emits('update:checkedRowKeys', newValue)
})
watch(internalRows, (newValue) => {
  const checkedKeys = [...checkedRowKeys.value]
  for (const k in checkedKeys) {
    const index = parseInt(k)
    const checkedKey = checkedKeys[index]
    if (!newValue.find((r) => r.key === checkedKey)) {
      const keyIndex = checkedRowKeys.value.findIndex((k) => k === checkedKey)
      if (keyIndex >= 0) checkedRowKeys.value.splice(keyIndex, 1)
    }
  }
  if (props.enablePagination && currentPage.value > lastPage.value) navLastPage()
})

const toggleSelectAll = (select: boolean) => {
  if (select) checkedRowKeys.value = sortedInternalRows.value.map((r) => r.key)
  else checkedRowKeys.value = []
}

const sortField = (field: string) => {
  if (!isFieldSorted(field)) {
    sortedFields.value.unshift({
      field,
      sort: 'ASC'
    })
    return
  }
  const existingIndex = sortedFields.value.findIndex((f) => f.field === field)
  if (existingIndex < 0) return
  const existing = sortedFields.value[existingIndex]
  if (existing.sort === 'ASC') existing.sort = 'DESC'
  else sortedFields.value.splice(existingIndex, 1)
}

const isFieldSorted = (field: string) =>
  sortedFields.value.find((f) => f.field === field) !== undefined

const findSortedField = (field: string) => {
  return sortedFields.value.find((f) => f.field === field)
}

const exportAsCSV = () => {
  const columns = props.columns.filter((c) => !c.noExport)
  const headers = columns.map((c) => c.field).join(';')
  const rows = sortedInternalRows.value
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
</script>

<template>
  <div class="modern-table">
    <div class="modern-table-before">
      <div v-if="enableFilter" class="modern-table-filter">
        <input type="text" v-model="filterValue" />
      </div>
      <div class="modern-table-actions">
        <button @click="exportAsCSV()"><span class="material-icons"> file_download </span></button>
      </div>
    </div>
    <div class="modern-table-table">
      <div class="modern-table-row modern-table-header">
        <div v-if="enableCheckbox" class="modern-table-cell shrink">
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
              v-if="!disableSorting && column.sortable"
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
        <div v-for="row in paginatedInternalRows" :key="row.key" class="modern-table-row">
          <div v-if="enableCheckbox" class="modern-table-cell shrink">
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
    <div v-if="enablePagination" class="modern-table-pagination">
      <div class="modern-table-pagination-length">
        Items per page :
        <select v-model="selectedPaginationLength">
          <option v-for="length of availablePaginationLengths" :key="length" :value="length">
            {{ length }}
          </option>
        </select>
      </div>
      <div class="modern-table-pagination-current">
        {{ Math.min(paginationStart + 1, internalRows.length) }} -
        {{ Math.min(paginationEnd, internalRows.length) }} / {{ internalRows.length }}
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

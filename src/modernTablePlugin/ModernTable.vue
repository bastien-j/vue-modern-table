<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { injectionKey, type TableColumn, type TableRow } from './types'
import '@material-design-icons/font/filled.css'
import en from './locale/en.json'
import fr from './locale/fr.json'

const locales = {
  en,
  fr
}

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
const trans = (key: keyof typeof fr) => locales[options.value.locale ?? 'fr'][key]

// Filtering
const filterValue = ref('')
const filteredRows = computed(() =>
  props.rows
    .slice()
    .filter((r) =>
      options.value.enableFiltering
        ? Object.values(r).some(
            (value) =>
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
const isColumnSortable = (column: TableColumn) => options.value.enableSorting && column.sortable
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
const pageLength = computed(() => options.value.pageLength ?? 5)
const pageStart = computed(() => currentPage.value * pageLength.value)
const pageEnd = computed(() => pageStart.value + pageLength.value)
const lastPage = computed(() => Math.floor(filteredRows.value.length / pageLength.value))
const paginatedRows = computed(() =>
  options.value.enablePagination
    ? sortedRows.value.slice(pageStart.value, pageEnd.value)
    : sortedRows.value
)
watch(pageLength, () => {
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
const toggleSelectAll = () => {
  if (!checkedRowKeys.value.length) checkedRowKeys.value = sortedRows.value.map((r) => r.key)
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
        <button class="modern-table-button" @click="exportAsCSV()" :title="trans('download-csv')">
          <span class="material-icons"> file_download </span>
        </button>
      </div>
    </div>
    <div class="modern-table-wrapper">
      <div class="modern-table-table">
        <div class="modern-table-row modern-table-header">
          <div
            v-if="options.enableCheckbox"
            class="modern-table-cell shrink sortable"
            @click="toggleSelectAll()"
          >
            <input type="checkbox" :checked="allRowsChecked" />
          </div>
          <div
            v-for="column in columns"
            :key="column.field"
            class="modern-table-cell"
            :class="{
              shrink: column.shrink,
              sortable: isColumnSortable(column),
              sorted: isFieldSorted(column.field)
            }"
            @click="isColumnSortable(column) ? sortField(column.field) : null"
          >
            <div class="modern-table-cell-content">
              {{ column.label }}
              <template v-if="isColumnSortable(column)">
                <span
                  class="material-icons"
                  :class="{ up: findSortedField(column.field)?.sort === 'DESC' }"
                >
                  arrow_downward
                </span>
              </template>
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
        <div class="modern-table-pagination-actions modern-table-pagination-previous">
          <button
            class="modern-table-button"
            @click="navFirstPage()"
            :disabled="!currentPage"
            :title="trans('first-page')"
          >
            <span class="material-icons">first_page</span>
          </button>
          <button
            class="modern-table-button"
            @click="navPreviousPage()"
            :disabled="!currentPage"
            :title="trans('previous-page')"
          >
            <span class="material-icons">navigate_before</span>
          </button>
        </div>
        <div class="modern-table-pagination-current">
          {{ Math.min(pageStart + 1, filteredRows.length) }} -
          {{ Math.min(pageEnd, filteredRows.length) }} / {{ filteredRows.length }}
        </div>
        <div class="modern-table-pagination-actions modern-table-pagination-next">
          <button
            class="modern-table-button"
            @click="navNextPage()"
            :disabled="currentPage >= lastPage"
            :title="trans('next-page')"
          >
            <span class="material-icons">navigate_next</span>
          </button>
          <button
            class="modern-table-button"
            @click="navLastPage()"
            :disabled="currentPage === lastPage"
            :title="trans('last-page')"
          >
            <span class="material-icons">last_page</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modern-table {
  --transition-duration: 0.25s;
  --border-radius: 0.5rem;

  .modern-table-button {
    background: none;
    border: 1px solid lightgray;
    border-radius: var(--border-radius);
    display: grid;
    padding: 0.5rem;
    color: #4e4e4e;
    transition: var(--transition-duration);
    user-select: none;

    &:not(:disabled):hover {
      background-color: #e9e9e9;
      cursor: pointer;
    }
    &:not(:disabled):active {
      background-color: #d1d1d1;
    }
  }
  .modern-table-before {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;

    .modern-table-filter {
      input {
        font-size: 1rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid lightgray;
        border-radius: var(--border-radius);
      }
    }
    .modern-table-actions {
      margin-left: auto;
    }
  }
  .modern-table-wrapper {
    border-radius: 0.7rem;
    overflow: hidden;
    border: 1px solid rgb(234, 234, 238);
    box-shadow: 1px 1px 5px rgb(234, 234, 238);

    .modern-table-table {
      width: 100%;
      display: table;
      border-collapse: collapse;

      .modern-table-cell {
        display: table-cell;
        vertical-align: middle;
        padding: 1rem;

        &.shrink {
          width: 0px;
        }
        .modern-table-cell-content {
          display: flex;
          align-items: center;
        }
      }
      .modern-table-row {
        display: table-row;

        &:not(:last-child) {
          border-bottom: 1px solid rgb(234, 234, 238);
        }
      }
      .modern-table-header {
        background-color: rgb(249, 251, 252);
        user-select: none;

        .modern-table-cell {
          color: rgb(88, 88, 88);
          transition: var(--transition-duration) background-color;

          &.sortable {
            cursor: pointer;

            &:hover {
              background-color: rgb(234, 238, 240);
            }
            &:not(:hover):not(.sorted) span {
              opacity: 0;
            }
          }
          &:not(.sorted) span {
            color: rgb(161, 161, 161);
          }

          span {
            margin-left: 1rem;
            display: inline-grid;
            place-content: center;
            border: none;
            border-radius: 0.3rem;
            background: none;
            transition: var(--transition-duration), 0.5s transform;
            cursor: inherit;
            font-size: 1.25rem;

            &.up {
              transform: rotate3d(1, 0, 0, 180deg);
            }
          }
          input[type='checkbox'] {
            pointer-events: none;
          }
        }
      }
      .modern-table-body {
        display: table-row-group;
      }
    }
    .modern-table-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 1rem;
      border-top: 1px solid rgb(234, 234, 238);

      .modern-table-pagination-actions {
        display: flex;
        gap: 1rem;

        button:disabled {
          color: #b4b4b4;
        }
      }
      .modern-table-pagination-current {
        color: gray;
      }
    }
  }
}
</style>

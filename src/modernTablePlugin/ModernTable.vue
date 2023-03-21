<script setup lang="ts">
import { computed, inject, ref, watch, type PropType } from 'vue'
import '@material-design-icons/font/filled.css'
import { injectionKey, type PluginOptions, type TableColumn, type TableRow } from './types'
import { useFilters } from './composables/filter'
import { useTranslate } from './composables/translate'
import vTooltip from './directives/tooltip'

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

const globalOptions = inject(injectionKey) as PluginOptions
const mergedOptions = computed(() => ({
  ...globalOptions,
  ...props.options
}))
const { filterString } = useFilters()
const { trans } = useTranslate(mergedOptions.value.locale)

// Filtering
const filterValue = ref('')
const filteredRows = computed(() => {
  if (!mergedOptions.value.enableFiltering) return props.rows.slice()
  return props.rows
    .slice()
    .filter((r) =>
      props.columns.filter(c => !c.noSort).some(c => {
        r.test = 'fd'
        const value = r[c.field]
        if (typeof value === 'string') return filterString(value, filterValue)
      })
    )
})

// Sorting
const sortedFields = ref<{ field: string; sort: 'ASC' | 'DESC' }[]>([])
const sortedRows = computed(() => {
  const sorted = filteredRows.value.slice()
  if (mergedOptions.value.enableSorting) {
    sortedFields.value.map(({ field, sort }) => {
      sorted.sort((a, b) => {
        if (sort === 'ASC') return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
        return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0
      })
    })
  }
  return sorted
})
const isColumnSortable = (column: TableColumn) => mergedOptions.value.enableSorting && !column.noSort
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
const pageLength = computed(() => mergedOptions.value.pageLength ?? 5)
const pageStart = computed(() => currentPage.value * pageLength.value)
const pageEnd = computed(() => pageStart.value + pageLength.value)
const lastPage = computed(() => Math.floor(filteredRows.value.length / pageLength.value))
const paginatedRows = computed(() => {
  if (!mergedOptions.value.enablePagination) return sortedRows.value
  return sortedRows.value.slice(pageStart.value, pageEnd.value)
})
watch(pageLength, () => {
  if (mergedOptions.value.enablePagination && currentPage.value > lastPage.value) navLastPage()
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
  if (mergedOptions.value.enablePagination && currentPage.value > lastPage.value) navLastPage()
})
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
  <div class="modern-table" :class="[mergedOptions.theme]">
    <div class="modern-table-before">
      <div v-if="mergedOptions.enableFiltering" class="modern-table-filter">
        <input type="text" v-model="filterValue" />
      </div>
      <div class="modern-table-actions">
        <button
          class="modern-table-button"
          @click="exportAsCSV()"
          v-tooltip="trans('download-csv')"
        >
          <span class="material-icons"> file_download </span>
        </button>
      </div>
    </div>
    <div class="modern-table-wrapper">
      <div class="modern-table-table" :class="{ paginated: mergedOptions.enablePagination }">
        <div class="modern-table-row modern-table-header">
          <div
            v-if="mergedOptions.enableCheckbox"
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
        <div v-for="row in paginatedRows" :key="row.key" class="modern-table-row">
          <div v-if="mergedOptions.enableCheckbox" class="modern-table-cell shrink">
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
      <div v-if="mergedOptions.enablePagination" class="modern-table-pagination">
        <div class="modern-table-pagination-actions modern-table-pagination-previous">
          <button
            class="modern-table-button"
            @click="navFirstPage()"
            :disabled="!currentPage"
            v-tooltip="trans('first-page')"
          >
            <span class="material-icons">first_page</span>
          </button>
          <button
            class="modern-table-button"
            @click="navPreviousPage()"
            :disabled="!currentPage"
            v-tooltip="trans('previous-page')"
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
            v-tooltip="trans('next-page')"
          >
            <span class="material-icons">navigate_next</span>
          </button>
          <button
            class="modern-table-button"
            @click="navLastPage()"
            :disabled="currentPage === lastPage"
            v-tooltip="trans('last-page')"
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
  --t-brd-rd: 0.5rem;
  --t-bg-clr: hsl(0, 0%, 100%);
  --t-brd-clr: hsl(240, 11%, 93%);
  --t-bs-clr: var(--t-brd-clr);
  --t-cell-clr: hsla(0, 0%, 0%, .87);
  --t-h-hv-bg-clr: hsl(200, 17%, 93%);
  --t-btn-bg-clr: var(--t-bg-clr);
  --t-btn-hv-bg-clr: hsl(0, 0%, 91%);
  --t-btn-act-bg-clr: hsl(0, 0%, 82%);
  --t-btn-clr: hsl(0, 0%, 31%);
  --t-btn-dsbld-clr: hsl(0, 0%, 71%);
  --t-btn-brd-clr: hsl(0, 0%, 83%);
  --t-pgn-clr: hsl(0, 0%, 50%);
  --t-tt-bg-clr: hsl(0, 0%, 26%);
  --t-tt-clr: hsla(0, 0%, 100%, .87);

  .modern-table-button {
    background-color: var(--t-bg-clr);
    border: 1px solid var(--t-btn-brd-clr);
    border-radius: var(--t-brd-rd);
    display: grid;
    padding: 0.5rem;
    color: var(--t-btn-clr);
    transition: var(--transition-duration);
    user-select: none;

    &:disabled {
      color: var(--t-btn-dsbld-clr);
    }

    &:not(:disabled):hover {
      background-color: var(--t-btn-hv-bg-clr);
      cursor: pointer;
    }
    &:not(:disabled):active {
      background-color: var(--t-btn-act-bg-clr);
    }
  }
  .modern-table-before {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;

    .modern-table-filter {
      input {
        transition: var(--transition-duration);
        font-size: 1rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--t-btn-brd-clr);
        border-radius: var(--t-brd-rd);
      }
    }
    .modern-table-actions {
      margin-left: auto;
    }
  }
  .modern-table-wrapper {
    background-color: var(--t-bg-clr);
    border-radius: 0.7rem;
    overflow: hidden;
    border: 1px solid var(--t-brd-clr);
    box-shadow: 1px 1px 5px var(--t-bs-clr);
    transition: var(--transition-duration);

    .modern-table-table {
      width: 100%;
      display: table;
      border-collapse: collapse;

      .modern-table-cell {
        transition: var(--transition-duration);
        display: table-cell;
        vertical-align: middle;
        padding: 1rem;
        color: var(--t-cell-clr);

        &.shrink {
          width: 0px;
        }
        .modern-table-cell-content {
          display: flex;
          align-items: center;
        }
      }
      .modern-table-row {
        transition: var(--transition-duration);
        display: table-row;
        border-bottom: 1px solid var(--t-brd-clr);
      }
      &:not(.paginated) .modern-table-row:last-child {
        border-bottom: none;
      }
      .modern-table-header {
        transition: var(--transition-duration);
        background-color: var(--t-bg-clr);
        user-select: none;

        .modern-table-cell {
          color: var(--t-cell-clr);
          font-weight: bold;

          &.sortable {
            cursor: pointer;

            &:hover {
              background-color: var(--t-h-hv-bg-clr);
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
      transition: var(--transition-duration);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 1rem;

      .modern-table-pagination-actions {
        display: flex;
        gap: 1rem;
      }
      .modern-table-pagination-current {
        transition: var(--transition-duration);
        color: var(--t-pgn-clr);
      }
    }
  }

  * {
    .modern-table-tooltip {
      position: fixed;
      white-space: nowrap;
      padding: .5rem;
      background-color: var(--t-tt-bg-clr);
      color: var(--t-tt-clr);
      border-radius: .4rem;
      opacity: 0;
      pointer-events: none;
      user-select: none;
      transition: var(--transition-duration);
    }
    &:not(:disabled):hover+.modern-table-tooltip {
      opacity: 1;
    }
  }

  &.dark {
    --t-bg-clr: hsl(0, 0%, 26%);
    --t-brd-clr: hsl(0, 0%, 40%);
    --t-bs-clr: transparent;
    --t-cell-clr: hsla(0, 0%, 100%, .87);
    --t-h-hv-bg-clr: hsl(0, 0%, 20%);
    --t-btn-hv-bg-clr: hsl(0, 0%, 22%);
    --t-btn-act-bg-clr: hsl(0, 0%, 20%);
    --t-btn-clr: hsl(0, 0%, 69%);
    --t-btn-dsbld-clr: hsl(0, 0%, 49%);
    --t-btn-brd-clr: hsl(0, 0%, 43%);
    --t-pgn-clr: hsl(0, 0%, 66%);
    --t-tt-bg-clr: hsl(0, 0%, 100%);
    --t-tt-clr: hsla(0, 0%, 0%, .87);
  }
}
</style>

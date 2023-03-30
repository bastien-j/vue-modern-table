<script setup lang="ts">
import { computed, inject, ref, watch, type PropType } from 'vue'
import '@material-design-icons/font/filled.css'
import {
  injectionKey,
  type PageInfoEvent,
  type PluginOptions,
  type TableColumn,
  type TableOptions,
  type TableRow
} from './types'
import { useFiltering } from './composables/filtering'
import TableButton from './components/TableButton.vue'
import TablePaginator from './components/TablePaginator.vue'
import { useSorting } from './composables/sorting'
import { useExports } from './composables/exports'

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
    type: Object as PropType<TableOptions>,
    default: () => ({})
  },
  checkedRowKeys: {
    type: Array<TableRow['key']>,
    default: () => []
  }
})
const emits = defineEmits<{
  (e: 'update:checkedRowKeys', keys: TableRow['key'][]): void
  (e: 'nav:page', page: number): void
}>()

const globalOptions = inject(injectionKey) as PluginOptions
const mergedOptions = computed(() => ({ ...globalOptions, ...props.options }))

// Filtering
const { filterValue, filteredRows } = useFiltering(
  props.rows,
  props.columns.filter((c) => !c.noSort).map((c) => c.field),
  mergedOptions
)

// Sorting
const { sortedRows, isColumnSortable, sortField, findSortedField, isFieldSorted } = useSorting(
  filteredRows,
  mergedOptions
)

// Actions
const { exportCSV } = useExports(
  sortedRows,
  props.columns.filter((c) => !c.noExport).map((c) => c.field)
)

// Pagination
const currentPage = ref(mergedOptions.value.initialPage ?? 0)
const pageLength = computed(() => mergedOptions.value.pageLength ?? 5)
const pageStart = computed(() => currentPage.value * pageLength.value)
const pageEnd = computed(() => pageStart.value + pageLength.value)
const paginatedRows = computed(() => {
  if (!mergedOptions.value.enablePagination) return sortedRows.value
  return sortedRows.value.slice(pageStart.value, pageEnd.value)
})
const navToPage = (page: PageInfoEvent | number) => {
  if (typeof page === 'number') currentPage.value = page
  else currentPage.value = page.pageIndex
  emits('nav:page', currentPage.value)
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
})
watch(checkedRowKeys, (newValue) => {
  emits('update:checkedRowKeys', newValue)
})
const toggleSelectAll = () => {
  if (!checkedRowKeys.value.length) checkedRowKeys.value = sortedRows.value.map((r) => r.key)
  else checkedRowKeys.value = []
}
</script>

<template>
  <div class="modern-table" :class="['theme-' + mergedOptions.theme]">
    <div class="modern-table-before">
      <div v-if="mergedOptions.enableFiltering" class="modern-table-filter">
        <input type="text" v-model="filterValue" />
      </div>
      <div class="modern-table-actions">
        <TableButton @click="exportCSV()">
          <span class="material-icons">file_download</span>
        </TableButton>
      </div>
    </div>
    <div class="modern-table-wrapper">
      <table class="modern-table-table" :class="{ paginated: mergedOptions.enablePagination }">
        <thead class="modern-table-header">
          <tr class="modern-table-row">
            <th
              v-if="mergedOptions.enableCheckbox"
              class="modern-table-cell shrink sortable"
              @click="toggleSelectAll()"
            >
              <input type="checkbox" :checked="allRowsChecked" />
            </th>
            <th
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
                    :class="{ up: findSortedField(column.field)?.sort === 'ASC' }"
                  >
                    arrow_downward
                  </span>
                </template>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="modern-table-body">
          <tr v-for="row in paginatedRows" :key="row.key" class="modern-table-row">
            <td v-if="mergedOptions.enableCheckbox" class="modern-table-cell shrink">
              <input type="checkbox" :value="row.key" v-model="checkedRowKeys" />
            </td>
            <td
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
            </td>
          </tr>
        </tbody>
      </table>
      <KeepAlive>
        <TablePaginator
          v-if="mergedOptions.enablePagination"
          :length="filteredRows.length"
          :page-size="mergedOptions.pageLength"
          @page="navToPage($event)"
        />
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin lightTheme() {
  --t-bg-clr: hsl(0, 0%, 100%);
  --t-brd-clr: hsl(240, 11%, 93%);
  --t-bs-clr: var(--t-brd-clr);
  --t-cell-clr: hsla(0, 0%, 0%, 0.87);
  --t-h-hv-bg-clr: hsl(200, 17%, 93%);
  --t-btn-bg-clr: var(--t-bg-clr);
  --t-btn-hv-bg-clr: hsl(0, 0%, 91%);
  --t-btn-act-bg-clr: hsl(0, 0%, 82%);
  --t-btn-clr: hsl(0, 0%, 31%);
  --t-btn-dsbld-clr: hsl(0, 0%, 71%);
  --t-btn-brd-clr: hsl(0, 0%, 83%);
  --t-pgn-clr: hsl(0, 0%, 50%);
  --t-tt-bg-clr: hsl(0, 0%, 26%);
  --t-tt-brd-clr: var(--t-bg-clr);
  --t-tt-clr: hsla(0, 0%, 100%, 0.87);
}
@mixin darkTheme() {
  --t-bg-clr: hsl(0, 0%, 26%);
  --t-brd-clr: hsl(0, 0%, 40%);
  --t-bs-clr: transparent;
  --t-cell-clr: hsla(0, 0%, 100%, 0.87);
  --t-h-hv-bg-clr: hsl(0, 0%, 20%);
  --t-btn-hv-bg-clr: hsl(0, 0%, 22%);
  --t-btn-act-bg-clr: hsl(0, 0%, 20%);
  --t-btn-clr: hsl(0, 0%, 69%);
  --t-btn-dsbld-clr: hsl(0, 0%, 49%);
  --t-btn-brd-clr: hsl(0, 0%, 43%);
  --t-pgn-clr: hsl(0, 0%, 66%);
  --t-tt-bg-clr: hsl(0, 0%, 100%);
  --t-tt-clr: hsla(0, 0%, 0%, 0.87);
}
.modern-table {
  --transition-duration: 0.25s;
  --t-brd-rd: 0.5rem;
  @include lightTheme();

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
      border-collapse: collapse;

      .modern-table-cell {
        transition: var(--transition-duration);
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
        border-bottom: 1px solid var(--t-brd-clr);
      }
      &:not(.paginated) .modern-table-body .modern-table-row:last-child {
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
    }
  }

  * {
    :deep(.modern-table-tooltip) {
      position: fixed;
      white-space: nowrap;
      padding: 0.5rem;
      background-color: var(--t-tt-bg-clr);
      color: var(--t-tt-clr);
      border: 1px solid var(--t-tt-brd-clr);
      border-radius: 0.4rem;
      opacity: 0;
      pointer-events: none;
      user-select: none;
      transition: var(--transition-duration) opacity;
    }
    :not(:disabled):hover + :deep(.modern-table-tooltip) {
      opacity: 1;
    }
  }

  &.theme-dark {
    @include darkTheme();
  }

  @media (prefers-color-scheme: dark) {
    &.theme-auto {
      @include darkTheme();
    }
  }
}
</style>

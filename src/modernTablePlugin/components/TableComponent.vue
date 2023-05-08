<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'

import { useCheckbox } from '../composables/checkbox'
import { usePagination } from '../composables/pagination'
import type { Column, PageInfoEvent, PluginOptions, Row, SortedField } from '../types'
import TableCell from './TableCell.vue'
import TableHeaderCell from './TableHeaderCell.vue'
import TablePaginator from './TablePaginator.vue'
import TableRow from './TableRow.vue'

const props = defineProps<{
  checkedRows?: Row[]
  cols: Column[]
  options: PluginOptions
  rowKey?: string
  rows: Row[]
  sortedFields: SortedField[]
}>()
const emits = defineEmits<{
  (e: 'page', event: PageInfoEvent): void
  (e: 'sort-field', field: string): void
  (e: 'update:checked-rows', rows: Row[]): void
}>()

const { rows, options } = toRefs(props)

const { allRowsChecked, checkedRows } = useCheckbox(rows)
const { paginatedRows, currentPage } = usePagination(rows, options)

const sortHandler = (col: Column) => {
  if (!options.value.enableSorting || col.noSort) return
  emits('sort-field', col.field)
}

const toggleSelectAllHandler = () => {
  if (!allRowsChecked.value) checkedRows.value = rows.value
  else checkedRows.value = []
}

const navToPage = (page: PageInfoEvent | number) => {
  if (typeof page === 'number') currentPage.value = page
  else currentPage.value = page.pageIndex
}

const colSort = (col: Column) => props.sortedFields.find((f) => f.field === col.field)?.sort

watchEffect(() => {
  checkedRows.value = props.checkedRows ?? []
})
watchEffect(() => {
  emits('update:checked-rows', checkedRows.value)
})
</script>

<template>
  <table class="modern-table-table">
    <thead>
      <TableRow no-border>
        <TableHeaderCell v-if="options.enableCheckbox" shrink @click="toggleSelectAllHandler()">
          <input type="checkbox" :checked="allRowsChecked" class="modern-table-header-checkbox" />
        </TableHeaderCell>
        <TableHeaderCell
          v-for="col in cols"
          :key="col.field"
          :sortable="options.enableSorting && !col.noSort"
          :sort="colSort(col)"
          :shrink="col.shrink"
          @click="sortHandler(col)"
        >
          {{ col.label }}
        </TableHeaderCell>
      </TableRow>
    </thead>
    <tbody>
      <TableRow v-for="row in paginatedRows" :key="rowKey ? row[rowKey] : undefined">
        <TableCell v-if="options.enableCheckbox" class="">
          <input type="checkbox" :value="row" v-model="checkedRows" />
        </TableCell>
        <TableCell v-for="col in cols" :key="col.field">
          <slot :name="col.field" :field="col.field" :value="row[col.field]" :col="col" :row="row">
            {{ row[col.field] }}
          </slot>
        </TableCell>
      </TableRow>
    </tbody>
    <tfoot v-show="options.enablePagination">
      <TableRow>
        <TableCell :colspan="options.enableCheckbox ? cols.length + 1 : cols.length">
          <KeepAlive>
            <TablePaginator
              v-if="options.enablePagination"
              :length="rows.length"
              :page-index="options.initialPage"
              :page-size="options.pageLength"
              @page="navToPage"
            />
          </KeepAlive>
        </TableCell>
      </TableRow>
    </tfoot>
  </table>
</template>

<style scoped lang="scss">
.modern-table-table {
  border-collapse: collapse;
  width: 100%;
  box-shadow: var(--t-bs-clr) 0 0 5px;
  border-radius: 8px;
  background-color: var(--t-bg-clr);
  transition: var(--transition-duration);

  .modern-table-header-checkbox {
    pointer-events: none;
  }
}
</style>

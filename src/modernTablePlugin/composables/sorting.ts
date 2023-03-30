import { ref, unref, watchEffect } from 'vue'
import type { MaybeRef, PluginOptions, TableColumn, TableRow } from '../types'

export function useSorting(rowsRef: MaybeRef<TableRow[]>, optionsRef: MaybeRef<PluginOptions>) {
  const sortedFields = ref<{ field: string; sort: 'ASC' | 'DESC' }[]>([])
  const sortedRows = ref<TableRow[]>([])

  function sortASC(a: any, b: any) {
    return a > b ? 1 : a < b ? -1 : 0
  }
  function sortDESC(a: any, b: any) {
    return a > b ? -1 : a < b ? 1 : 0
  }

  function doSort() {
    const rows = unref(rowsRef).slice()
    const options = unref(optionsRef)
    if (options.enableSorting) {
      sortedFields.value.map(({ field, sort }) => {
        if (sort === 'ASC') rows.sort((a, b) => sortASC(a[field], b[field]))
        else rows.sort((a, b) => sortDESC(a[field], b[field]))
      })
    }
    sortedRows.value = rows
  }

  function isColumnSortable(column: TableColumn) {
    const options = unref(optionsRef)

    return options.enableSorting && !column.noSort
  }

  function findSortedFieldIndex(field: string) {
    return sortedFields.value.findIndex((f) => f.field === field)
  }

  function findSortedField(field: string) {
    return sortedFields.value.find((f) => f.field === field)
  }

  function isFieldSorted(field: string) {
    return findSortedFieldIndex(field) >= 0
  }

  function sortField(field: string) {
    const fieldIndex = findSortedFieldIndex(field)
    if (fieldIndex < 0) {
      sortedFields.value.unshift({
        field,
        sort: 'DESC'
      })
    } else {
      const existing = sortedFields.value[fieldIndex]
      if (existing.sort === 'DESC') existing.sort = 'ASC'
      else sortedFields.value.splice(fieldIndex, 1)
    }
  }

  watchEffect(doSort)

  return {
    sortedRows,
    isColumnSortable,
    sortField,
    findSortedField,
    isFieldSorted
  }
}

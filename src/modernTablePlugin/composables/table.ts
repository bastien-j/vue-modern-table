import { computed, ref, unref } from 'vue'

import type { Column, MaybeRef, PluginOptions, Row, SortedField } from '../types'

const filterString = (value: string, filter: string) =>
  value.toLowerCase().includes(filter.toLowerCase())
const sortASC = (a: any, b: any) => (a > b ? 1 : a < b ? -1 : 0)
const sortDESC = (a: any, b: any) => (a > b ? -1 : a < b ? 1 : 0)

export function useTable(
  colsRef: MaybeRef<Column[]>,
  rowsRef: MaybeRef<Row[]>,
  optionsRef: MaybeRef<PluginOptions>
) {
  const rows = ref(unref(rowsRef).slice())
  const options = computed(() => unref(optionsRef))

  const filter = ref('')
  const filteredRows = computed(() => {
    if (!options.value.enableFiltering) return rows.value
    const fields = unref(colsRef)
      .filter((c) => !c.noFilter)
      .map((c) => c.field)
    return rows.value.filter((r) =>
      fields.some((f) => {
        if (typeof r[f] === 'string') return filterString(r[f], filter.value)
      })
    )
  })

  const sortedFields = ref<SortedField[]>([])
  const sortField = (field: Column['field']) => {
    const fieldIndex = sortedFields.value.findIndex((f) => f.field === field)
    if (fieldIndex < 0) {
      sortedFields.value.unshift({ field, sort: 'desc' })
    } else {
      const existing = sortedFields.value[fieldIndex]
      if (existing.sort === 'desc') existing.sort = 'asc'
      else sortedFields.value.splice(fieldIndex, 1)
    }
  }
  const isColumnSortable = (column: Column) => options.value.enableSorting && !column.noSort
  const findSortedField = (field: string) => sortedFields.value.find((f) => f.field === field)
  const isFieldSorted = (field: string) =>
    sortedFields.value.findIndex((f) => f.field === field) >= 0
  const sortedRows = computed(() => {
    if (!options.value.enableSorting) return filteredRows.value
    const rows = unref(filteredRows).slice()
    sortedFields.value.map(({ field, sort }) => {
      if (sort === 'asc') rows.sort((a, b) => sortASC(a[field], b[field]))
      else rows.sort((a, b) => sortDESC(a[field], b[field]))
    })
    return rows
  })

  return {
    filteredRows,
    sortedRows,
    filter,
    sortedFields,
    isColumnSortable,
    findSortedField,
    isFieldSorted,
    sortField
  }
}

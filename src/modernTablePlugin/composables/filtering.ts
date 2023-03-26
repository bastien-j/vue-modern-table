import { ref, unref, watchEffect } from 'vue'
import type { MaybeRef, PluginOptions, TableRow } from '../types'

export function useFiltering(
  rowsRef: MaybeRef<TableRow[]>,
  fieldsToFilterRef: MaybeRef<string[]>,
  optionsRef: MaybeRef<PluginOptions>
) {
  const filterValue = ref('')
  const filteredRows = ref<TableRow[]>([])

  function filterString(value: MaybeRef<string>, filter: MaybeRef<string>) {
    value = unref(value)
    filter = unref(filter)

    return value.toLowerCase().includes(filter.toLowerCase())
  }

  function doFilter() {
    const rows = unref(rowsRef)
    const fieldsToFilter = unref(fieldsToFilterRef)
    const options = unref(optionsRef)
    filteredRows.value = rows.filter((r) => {
      return !options.enableFiltering || fieldsToFilter.some((f) => {
        if (typeof r[f] === 'string') return filterString(r[f], filterValue)
      })
    })
  }

  watchEffect(doFilter)

  return {
    filterValue,
    filteredRows
  }
}

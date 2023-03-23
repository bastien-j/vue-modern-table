import { isRef, ref, unref, watchEffect } from 'vue'
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
    filteredRows.value = options.enableFiltering
      ? rows.filter((r) => {
          return fieldsToFilter.some((f) => {
            if (typeof r[f] === 'string') return filterString(r[f], filterValue)
          })
        })
      : rows
  }

  if (isRef(rowsRef) || isRef(fieldsToFilterRef) || isRef(optionsRef)) watchEffect(doFilter)
  else doFilter()

  return {
    filterValue,
    filteredRows
  }
}

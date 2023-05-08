import { computed, ref, unref } from 'vue'

import type { MaybeRef, PluginOptions, Row } from '../types'

export function usePagination(rowsRef: MaybeRef<Row[]>, optionsRef: MaybeRef<PluginOptions>) {
  const options = computed(() => unref(optionsRef))

  const currentPage = ref(options.value.initialPage)
  const paginatedRows = computed(() => {
    if (!options.value.enablePagination) return unref(rowsRef)
    const pageStart = currentPage.value * options.value.pageLength
    const pageEnd = pageStart + options.value.pageLength
    return unref(rowsRef).slice(pageStart, pageEnd)
  })

  return {
    paginatedRows,
    currentPage
  }
}

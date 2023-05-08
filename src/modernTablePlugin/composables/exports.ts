import { computed, unref } from 'vue'

import type { Column, MaybeRef, Row } from '../types'

export function useExports(colsRef: MaybeRef<Column[]>, rowsRef: MaybeRef<Row[]>) {
  const fields = computed(() =>
    unref(colsRef)
      .filter((c) => !c.noExport)
      .map((c) => c.field)
  )

  const asString = computed(() =>
    fields.value.join(';').concat(
      '\n',
      unref(rowsRef)
        .map((r) => fields.value.map((f) => r[f]).join(';'))
        .join('\n')
    )
  )

  function exportCSV() {
    const linkEl = document.createElement('a')
    linkEl.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(asString.value)
    linkEl.download = 'export.csv'
    linkEl.click()
    linkEl.remove()
  }

  return { asString, exportCSV }
}

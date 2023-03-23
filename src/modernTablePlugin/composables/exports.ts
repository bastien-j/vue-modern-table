import { unref } from 'vue'
import type { MaybeRef, TableRow } from '../types'

export function useExports(rowsRef: MaybeRef<TableRow[]>, fieldsToExportRef: MaybeRef<string[]>) {
  function exportCSV() {
    const rows = unref(rowsRef)
    const fieldsToExport = unref(fieldsToExportRef)
    const headers = fieldsToExport.join(';')
    const lines = rows.map((r) => fieldsToExport.map((f) => r[f]).join(';')).join('\n')
    const csvContent = headers.concat('\n', lines)
    const linkEl = document.createElement('a')
    linkEl.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
    linkEl.download = 'export.csv'
    linkEl.click()
    linkEl.remove()
  }

  return { exportCSV }
}

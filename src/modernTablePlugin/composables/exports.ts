import { unref } from 'vue'
import type { MaybeRef, TableRow } from '../types'

export function useExports(rowsRef: MaybeRef<TableRow[]>, fieldsToExportRef: MaybeRef<string[]>) {
  function tableToString() {
    const rows = unref(rowsRef)
    const fieldsToExport = unref(fieldsToExportRef)
    const headers = fieldsToExport.join(';')
    const lines = rows.map((r) => fieldsToExport.map((f) => r[f]).join(';')).join('\n')

    return headers.concat('\n', lines)
  }

  function exportCSV() {
    const csvContent = tableToString()
    const linkEl = document.createElement('a')
    linkEl.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
    linkEl.download = 'export.csv'
    linkEl.click()
    linkEl.remove()
  }

  return { tableToString, exportCSV }
}

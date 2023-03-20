import type ModernTable from './ModernTable.vue'

export type PluginOptions = {
  enableCheckbox: boolean
  enableFiltering: boolean
  enablePagination: boolean
  enableSorting: boolean
  locale: 'en' | 'fr'
  pageLength: number
}
export type TableOptions = Partial<{
  enableCheckbox: boolean
  enableFiltering: boolean
  enablePagination: boolean
  enableSorting: boolean
  locale: 'en' | 'fr'
  pageLength: number
}>
export type TableColumn = {
  label: string
  field: string
  sortable?: boolean
  shrink?: boolean
  noExport?: boolean
}
export type TableRow = {
  key: string | number
  [key: string]: any
}

export * from './index'

declare module 'vue' {
  interface ComponentCustomProperties {}
  interface GlobalComponents {
    ModernTable: typeof ModernTable
  }
}

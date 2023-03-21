import type { Ref } from 'vue'
import type ModernTable from './ModernTable.vue'

export type PluginOptions = {
  enableCheckbox: boolean
  enableFiltering: boolean
  enablePagination: boolean
  enableSorting: boolean
  locale: 'en' | 'fr'
  pageLength: number
  theme: 'light' | 'dark'
}
export type TableOptions = Partial<PluginOptions>
export type TableColumn = {
  label: string
  field: string
  noFilter?: boolean
  noExport?: boolean
  noSort?: boolean
  shrink?: boolean
}
export type TableRow = {
  key: string | number
  [key: string]: any
}
export type MaybeRef<T> = Ref<T> | T

export * from './index'

declare module 'vue' {
  interface ComponentCustomProperties {}
  interface GlobalComponents {
    ModernTable: typeof ModernTable
  }
}

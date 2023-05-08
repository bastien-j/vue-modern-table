import type { Ref } from 'vue'

import type ModernTable from './ModernTable.vue'

export type PluginOptions = {
  enableCheckbox: boolean
  enableExport: boolean
  enableFiltering: boolean
  enablePagination: boolean
  enableSorting: boolean
  initialPage: number
  pageLength: number
  rowKey: string
  theme: 'auto' | 'dark' | 'light'
}
export type TableOptions = Partial<PluginOptions>
export type Column = {
  label: string
  field: string
  noFilter?: boolean
  noExport?: boolean
  noSort?: boolean
  shrink?: boolean
}
export type Row = {
  [key: string]: any
}
export type SortOption = 'asc' | 'desc'
export type SortedField = { field: Column['field']; sort: SortOption }
export interface PageInfoEvent {
  length: number
  pageIndex: number
  pageSize: number
  previousPageIndex: number
}
export type MaybeRef<T> = Ref<T> | T

export * from './index'

declare module 'vue' {
  interface ComponentCustomProperties {}
  interface GlobalComponents {
    ModernTable: typeof ModernTable
  }
}

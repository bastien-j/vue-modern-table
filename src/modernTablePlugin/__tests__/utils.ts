import type { PluginOptions } from '../types'

export const DefaultPluginConfig: PluginOptions = {
  enableCheckbox: false,
  enableFiltering: false,
  enablePagination: true,
  enableSorting: true,
  initialPage: 0,
  pageLength: 5,
  theme: 'auto',
  enableExport: false,
  rowKey: ''
}

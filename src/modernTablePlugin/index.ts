import '@material-design-icons/font/filled.css'

import defu from 'defu'
import { type App, defineAsyncComponent, type InjectionKey } from 'vue'

import type { PluginOptions, TableOptions } from './types'

const defaultOptions: PluginOptions = {
  enableCheckbox: false,
  enableExport: false,
  enableFiltering: false,
  enablePagination: true,
  enableSorting: true,
  initialPage: 0,
  messages: {
    actions: {
      filter: 'Filter'
    }
  },
  pageLength: 5,
  rowKey: 'id',
  theme: 'auto'
}

export const injectionKey = Symbol() as InjectionKey<PluginOptions>

export function createModernTablePlugin(options: TableOptions = {}) {
  options = defu(options, defaultOptions)
  return (app: App) => {
    app.provide(injectionKey, options)
    app.component(
      'ModernTable',
      defineAsyncComponent(() => import('./ModernTable.vue'))
    )
  }
}

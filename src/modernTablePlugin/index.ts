import { defineAsyncComponent, type App, type InjectionKey } from 'vue'
import type { PluginOptions, TableOptions } from './types'
import defu from 'defu'

const defaultOptions: PluginOptions = {
  enableCheckbox: false,
  enableFiltering: false,
  enablePagination: true,
  enableSorting: true,
  locale: 'fr',
  pageLength: 5
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

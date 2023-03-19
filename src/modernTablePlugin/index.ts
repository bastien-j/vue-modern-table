import { defineAsyncComponent, type App, type InjectionKey } from 'vue'
import type { PluginOptions } from './types'
import defu from 'defu'

export const injectionKey = Symbol() as InjectionKey<PluginOptions>

export function createModernTablePlugin(options: PluginOptions = {}) {
  options = defu(options, {
    enableCheckbox: false,
    enableFiltering: false,
    enablePagination: true,
    enableSorting: true
  })
  return (app: App) => {
    app.provide(injectionKey, options)
    app.component(
      'ModernTable',
      defineAsyncComponent(() => import('./ModernTable.vue'))
    )
  }
}

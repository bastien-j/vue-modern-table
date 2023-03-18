import { defineAsyncComponent, type App } from "vue";
import type { PluginOptions } from './types'

export const modernTableOptionsInfect = Symbol()

export function createModernTablePlugin(options: PluginOptions = {}) {
  return (app: App) => {
    app.provide(modernTableOptionsInfect, options)
    app.component('ModernTable', defineAsyncComponent(() => import('./ModernTable.vue')))
  }
}
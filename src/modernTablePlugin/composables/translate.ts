import { inject } from 'vue'
import { injectionKey } from '..'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import type { PluginOptions } from '../types'

const messages = {
  en,
  fr
}

export function useTranslate(locale?: PluginOptions['locale']) {
  const globalOptions = (inject(injectionKey) as PluginOptions) ?? { locale: 'fr' }
  const l = (locale as typeof globalOptions.locale) ?? globalOptions.locale

  function trans(key: keyof typeof en) {
    return messages[l] ? messages[l][key] : key
  }

  return {
    trans
  }
}

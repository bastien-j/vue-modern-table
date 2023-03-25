import { inject, isRef, ref, unref, watchEffect } from 'vue'
import { injectionKey } from '..'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import type { MaybeRef, PluginOptions } from '../types'

const messages = {
  en,
  fr
}

export function useTranslate(optionsRef?: MaybeRef<PluginOptions>) {
  const globalOptions = (inject(injectionKey) as PluginOptions) ?? { locale: 'fr' }
  const translatedFields = ref<Partial<{ [key in keyof typeof en]: any }>>({})

  function doTranslate() {
    const options = unref(optionsRef)
    const l = options?.locale ?? globalOptions.locale
    translatedFields.value = messages[l]
  }

  if (isRef(optionsRef)) watchEffect(doTranslate)
  else doTranslate()

  return {
    translatedFields
  }
}

import { isRef, ref, unref, watchEffect } from 'vue'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import type { MaybeRef, PluginOptions } from '../types'

const messages = {
  en,
  fr
}

export function useTranslate(optionsRef: MaybeRef<PluginOptions>) {
  const translatedFields = ref<Partial<{ [key in keyof typeof en]: any }>>({})

  function doTranslate() {
    const options = unref(optionsRef)
    translatedFields.value = messages[options.locale]
  }

  if (isRef(optionsRef)) watchEffect(doTranslate)
  else doTranslate()

  return {
    translatedFields
  }
}

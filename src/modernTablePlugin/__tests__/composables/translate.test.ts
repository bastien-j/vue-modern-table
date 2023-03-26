import { useTranslate } from '@/modernTablePlugin/composables/translate'
import { expect, test } from 'vitest'
import { nextTick, ref } from 'vue'
import { DefaultPluginConfig } from '../utils'

test('translate', async () => {
  const options = ref({ ...DefaultPluginConfig })
  const { translatedFields } = useTranslate(options)

  expect(translatedFields.value['last-page']).toBe('Last page')

  options.value.locale = 'fr'
  await nextTick()
  expect(translatedFields.value['last-page']).toBe('Dernière page')
})

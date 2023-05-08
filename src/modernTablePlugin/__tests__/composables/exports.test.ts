import { expect, test } from 'vitest'

import { useExports } from '../../composables/exports'
import { columns, rows } from '../assets/data.json'

test('exports', async () => {
  const { asString } = useExports(columns, rows)

  expect(asString.value).toHaveLength(312)
})

import { expect, test } from 'vitest'
import { columns, rows } from '../assets/data.json'
import type { TableColumn } from '../../../modernTablePlugin/types'
import { useExports } from '../../composables/exports'

test('exports', async () => {
  const { tableToString } = useExports(
    rows,
    columns.filter((c: TableColumn) => !c.noExport).map((c) => c.field)
  )

  expect(tableToString()).toHaveLength(312)
})

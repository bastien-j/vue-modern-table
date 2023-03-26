import { useFiltering } from '../../../modernTablePlugin/composables/filtering'
import { expect, test } from 'vitest'
import { DefaultPluginConfig } from '../utils'
import { columns, rows } from '../assets/data.json'
import type { TableColumn } from '../../../modernTablePlugin/types'
import { nextTick } from 'vue'

test('filtering', async () => {
  const { filterValue, filteredRows } = useFiltering(
    rows,
    columns.filter((c: TableColumn) => !c.noSort).map((c) => c.field),
    { ...DefaultPluginConfig, enableFiltering: true }
  )

  expect(filterValue.value).toBe('')
  expect(filteredRows.value).toHaveLength(rows.length)

  filterValue.value = 'apri'
  expect(filterValue.value).toBe('apri')
  await nextTick()
  expect(filteredRows.value).toHaveLength(3)
})

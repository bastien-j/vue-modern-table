import { expect, test } from 'vitest'
import { nextTick } from 'vue'

import { useTable } from '../../../modernTablePlugin/composables/table'
import { columns, rows } from '../assets/data.json'
import { DefaultPluginConfig } from '../utils'

test('filtering', async () => {
  const { filter, filteredRows } = useTable(columns, rows, {
    ...DefaultPluginConfig,
    enableFiltering: true
  })

  expect(filter.value).toBe('')
  expect(filteredRows.value).toHaveLength(rows.length)

  filter.value = 'apri'
  expect(filter.value).toBe('apri')
  await nextTick()
  expect(filteredRows.value).toHaveLength(3)
})

test('sorting', async () => {
  const { sortedRows, sortField, isColumnSortable, findSortedField, isFieldSorted } = useTable(
    columns,
    rows,
    { ...DefaultPluginConfig }
  )

  expect(isColumnSortable(columns[0])).toBe(true)
  expect(isFieldSorted('id')).toBe(false)
  expect(sortedRows.value).toHaveLength(rows.length)

  sortField('id')
  await nextTick()
  expect(isFieldSorted('id')).toBe(true)
  expect(findSortedField('id')?.sort).toBe('desc')
  expect(sortedRows.value).toHaveLength(rows.length)
  expect(sortedRows.value[0].key).toBe('8')

  sortField('id')
  await nextTick()
  expect(isFieldSorted('id')).toBe(true)
  expect(findSortedField('id')?.sort).toBe('asc')
  expect(sortedRows.value[0].key).toBe('0')

  sortField('id')
  await nextTick()
  expect(isFieldSorted('id')).toBe(false)
  expect(findSortedField('id')).toBeUndefined()
  expect(sortedRows.value[0].key).toBe('0')
})

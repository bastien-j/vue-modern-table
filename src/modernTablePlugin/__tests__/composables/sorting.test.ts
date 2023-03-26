import { expect, test } from 'vitest'
import { DefaultPluginConfig } from '../utils'
import { columns, rows } from '../assets/data.json'
import { nextTick } from 'vue'
import { useSorting } from '../../../modernTablePlugin/composables/sorting'

test('sortingsorti', async () => {
  const { sortedRows, isColumnSortable, sortField, findSortedField, isFieldSorted } = useSorting(
    rows,
    { ...DefaultPluginConfig }
  )

  expect(isColumnSortable(columns[0])).toBe(true)
  expect(isFieldSorted('id')).toBe(false)
  expect(sortedRows.value).toHaveLength(rows.length)

  sortField('id')
  await nextTick()
  expect(isFieldSorted('id')).toBe(true)
  expect(findSortedField('id')?.sort).toBe('DESC')
  expect(sortedRows.value).toHaveLength(rows.length)
  expect(sortedRows.value[0].key).toBe('8')

  sortField('id')
  await nextTick()
  expect(isFieldSorted('id')).toBe(true)
  expect(findSortedField('id')?.sort).toBe('ASC')
  expect(sortedRows.value[0].key).toBe('0')

  sortField('id')
  await nextTick()
  expect(isFieldSorted('id')).toBe(false)
  expect(findSortedField('id')).toBeUndefined()
  expect(sortedRows.value[0].key).toBe('0')
})

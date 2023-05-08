import { computed, ref, unref, watch } from 'vue'

import type { MaybeRef, Row } from '../types'

export function useCheckbox(rowsRef: MaybeRef<Row[]>) {
  const rows = computed(() => unref(rowsRef))
  const checkedRows = ref<Row[]>([])

  const allRowsChecked = computed(() =>
    !checkedRows.value.length || checkedRows.value.length !== rows.value.length
      ? false
      : rows.value.every((r) => checkedRows.value.includes(r))
  )

  watch(rows, (newValue) => {
    const rows = [...checkedRows.value]
    for (const row of rows) {
      if (!newValue.find((r) => r === row)) {
        const rowIndex = checkedRows.value.findIndex((r) => r === row)
        if (rowIndex >= 0) checkedRows.value.splice(rowIndex, 1)
      }
    }
  })

  return {
    checkedRows,
    allRowsChecked
  }
}

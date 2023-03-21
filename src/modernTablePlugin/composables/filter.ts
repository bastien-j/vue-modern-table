import { unref } from "vue"
import type { MaybeRef } from "../types"

export function useFilters() {
  function filterString(value: MaybeRef<string>, filter: MaybeRef<string>) {
    value = unref(value)
    filter = unref(filter)

    return value.toLowerCase().includes(filter.toLowerCase())
  }

  return {
    filterString
  }
}
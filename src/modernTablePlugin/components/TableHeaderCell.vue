<script setup lang="ts">
import { computed } from 'vue'

import TableCell from './TableCell.vue'

const props = defineProps<{
  sortable?: boolean
  sort?: 'asc' | 'desc'
  shrink?: boolean
}>()

const classes = computed(() => {
  const c = []
  if (props.sortable) c.push('sortable')
  if (props.sort) c.push(`sort-${props.sort}`)
  if (props.shrink) c.push('shrink')
  return c
})
</script>

<template>
  <TableCell tag="th" class="modern-table-cell-head" :class="classes">
    <slot></slot>
  </TableCell>
</template>

<style scoped lang="scss">
.modern-table-cell-head {
  --arrow-size: 5px;
  --arrow-padding: 16px;

  position: relative;

  :deep(.modern-table-cell-content) {
    white-space: nowrap;
  }

  &.sortable {
    cursor: pointer;
    padding-right: calc(2 * var(--arrow-size) + 2 * var(--arrow-padding));

    &::before,
    &::after {
      content: '';
      position: absolute;
      right: var(--arrow-padding);
      height: 0;
      width: 0;
      border-left: var(--arrow-size) solid transparent;
      border-right: var(--arrow-size) solid transparent;
      opacity: 0.25;
      transition: var(--transition-duration);
    }

    &::before {
      border-bottom: var(--arrow-size) solid var(--t-cell-clr);
      top: calc(50% - 7px);
    }

    &::after {
      border-top: var(--arrow-size) solid var(--t-cell-clr);
      top: calc(50% + 2px);
    }

    &.sort-asc::before {
      opacity: 1;
    }
    &.sort-desc::after {
      opacity: 1;
    }

    :deep(.modern-table-cell-content) {
      padding-right: 0;
    }
  }

  &.shrink {
    width: 0px;
  }
}
</style>

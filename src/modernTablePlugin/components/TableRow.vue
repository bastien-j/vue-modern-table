<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  noBorder?: boolean
}>()

const classes = computed(() => {
  const c = []
  if (props.noBorder) c.push('no-border')
  return c
})
</script>

<template>
  <tr class="modern-table-row" :class="classes">
    <slot></slot>
  </tr>
</template>

<style scoped lang="scss">
.modern-table-row {
  border-top: 1px solid var(--t-brd-clr);
  transition: var(--transition-duration);

  &.no-border {
    border-top: none;
  }
}
</style>

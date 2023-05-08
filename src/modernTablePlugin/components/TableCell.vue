<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
  }>(),
  {
    tag: 'td'
  }
)
</script>

<template>
  <component :is="tag" class="modern-table-cell">
    <div class="modern-table-cell-content">
      <slot></slot>
    </div>
  </component>
</template>

<style scoped lang="scss">
.modern-table-cell {
  color: var(--t-cell-clr);
  text-align: start;
  transition: var(--transition-duration);

  .modern-table-cell-content {
    padding: 12px;
  }
}
</style>

<script setup lang="ts">
import type { PluginOptions } from '../types'
import TableButton from './TableButton.vue'

defineProps<{
  filter?: string
  options: PluginOptions
}>()
defineEmits<{
  (e: 'update:filter', filter: string): void
  (e: 'export:csv'): void
}>()
</script>

<template>
  <div class="modern-table-actions" v-if="options.enableFiltering || options.enableExport">
    <input
      v-if="options.enableFiltering"
      type="text"
      :placeholder="options.messages.actions.filter"
      :value="filter"
      @input="$emit('update:filter', ($event.target as HTMLInputElement).value)"
    />
    <TableButton v-if="options.enableExport" @click="$emit('export:csv')">
      <span class="material-icons">file_download</span>
    </TableButton>
  </div>
</template>

<style scoped lang="scss">
.modern-table-actions {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  box-shadow: var(--t-bs-clr) 0 0 5px;
  border-radius: 8px;
  background-color: var(--t-bg-clr);
  transition: var(--transition-duration);

  input {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--t-btn-brd-clr);
    border-radius: 8px;
  }

  button {
    margin-left: auto;
  }
}
</style>

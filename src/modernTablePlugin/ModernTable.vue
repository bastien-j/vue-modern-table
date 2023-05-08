<script setup lang="ts">
import { computed, inject, toRefs } from 'vue'

import TableActions from './components/TableActions.vue'
import TableComponent from './components/TableComponent.vue'
import { useExports } from './composables/exports'
import { useTable } from './composables/table'
import { type Column, injectionKey, type PluginOptions, type Row, type TableOptions } from './types'

const props = withDefaults(
  defineProps<{
    checkedRows?: Row[]
    columns: Column[]
    options?: TableOptions
    rows?: Row[]
  }>(),
  { rows: () => [] }
)
defineEmits<{
  (e: 'update:checked-rows', rows: Row[]): void
}>()

const globalOptions = inject(injectionKey) as PluginOptions
const mergedOptions = computed(() => ({ ...globalOptions, ...props.options }))

const { columns, rows } = toRefs(props)

const { sortedRows, filter, sortedFields, sortField } = useTable(columns, rows, mergedOptions)
const { exportCSV } = useExports(columns, sortedRows)
</script>

<template>
  <div class="modern-table" :class="['theme-' + mergedOptions.theme]">
    <TableActions :options="mergedOptions" v-model:filter="filter" @export:csv="exportCSV()" />
    <TableComponent
      :cols="columns"
      :rows="sortedRows"
      row-key="key"
      :sorted-fields="sortedFields"
      :options="mergedOptions"
      @sort-field="sortField"
      :checked-rows="checkedRows"
      @update:checked-rows="$emit('update:checked-rows', $event)"
    >
      <template v-for="col in columns" :key="col.field" #[col.field]="{ field, value, row }">
        <slot :name="col.field" :field="field" :value="value" :row="row" />
      </template>
    </TableComponent>
  </div>
</template>

<style scoped lang="scss">
@mixin lightTheme() {
  --t-bg-clr: hsl(0, 0%, 100%);
  --t-brd-clr: hsl(240, 11%, 93%);
  --t-bs-clr: hsl(240, 11%, 87%);
  --t-cell-clr: hsla(0, 0%, 0%, 0.87);
  --t-h-hv-bg-clr: hsl(200, 17%, 93%);
  --t-btn-bg-clr: var(--t-bg-clr);
  --t-btn-hv-bg-clr: hsl(0, 0%, 91%);
  --t-btn-act-bg-clr: hsl(0, 0%, 82%);
  --t-btn-clr: hsl(0, 0%, 31%);
  --t-btn-dsbld-clr: hsl(0, 0%, 71%);
  --t-btn-brd-clr: hsl(0, 0%, 83%);
  --t-pgn-clr: hsl(0, 0%, 50%);
  --t-tt-bg-clr: hsl(0, 0%, 26%);
  --t-tt-brd-clr: var(--t-bg-clr);
  --t-tt-clr: hsla(0, 0%, 100%, 0.87);
}
@mixin darkTheme() {
  --t-bg-clr: hsl(0, 0%, 26%);
  --t-brd-clr: hsl(0, 0%, 40%);
  --t-bs-clr: transparent;
  --t-cell-clr: hsla(0, 0%, 100%, 0.87);
  --t-h-hv-bg-clr: hsl(0, 0%, 20%);
  --t-btn-hv-bg-clr: hsl(0, 0%, 22%);
  --t-btn-act-bg-clr: hsl(0, 0%, 20%);
  --t-btn-clr: hsl(0, 0%, 69%);
  --t-btn-dsbld-clr: hsl(0, 0%, 49%);
  --t-btn-brd-clr: hsl(0, 0%, 43%);
  --t-pgn-clr: hsl(0, 0%, 66%);
  --t-tt-bg-clr: hsl(0, 0%, 100%);
  --t-tt-clr: hsla(0, 0%, 0%, 0.87);
}
.modern-table {
  @include lightTheme();
  --transition-duration: 0.25s;

  display: flex;
  flex-direction: column;
  gap: 16px;

  &.theme-dark {
    @include darkTheme();
  }

  @media (prefers-color-scheme: dark) {
    &.theme-auto {
      @include darkTheme();
    }
  }
}
</style>

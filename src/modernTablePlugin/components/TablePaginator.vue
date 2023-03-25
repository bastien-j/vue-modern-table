<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import TableButton from './TableButton.vue'
import vTooltip from '../directives/tooltip'
import type { PageInfoEvent } from '../types'

const props = withDefaults(defineProps<{
  hideFirstLast?: boolean
  hideLength?: boolean
  length?: number
  messages: {[key: string]: string}
  pageIndex?: number
  pageSize?: number
  unlimited?: boolean
}>(), {
  length: 0,
  messages: () => ({}),
  pageIndex: 0,
  pageSize: 10
})
const emits = defineEmits<{
  (name: 'page', event: PageInfoEvent): void
}>()

const pageIndex = ref(props.pageIndex)
const lastPageIndex = computed(() => Math.floor((props.length - 1) / props.pageSize))
const pageStart = computed(() => (props.length ? pageIndex.value * props.pageSize + 1 : 0))
const pageEnd = computed(() => {
  if (!props.unlimited) return Math.min(pageStart.value + props.pageSize - 1, props.length)
  else return pageStart.value + props.pageSize - 1
})
const currentPageData = computed(() => {
  if (!props.hideLength && !props.unlimited)
    return `${pageStart.value} - ${pageEnd.value} / ${props.length}`
  return `${pageStart.value} - ${pageEnd.value}`
})
const navPreviousEnable = computed(() => pageIndex.value > 0)
const navNextEnable = computed(() => props.unlimited || pageEnd.value < props.length)

watch(lastPageIndex, (index) => {
  if (pageIndex.value > index) navFirstPage()
})

const navPage = (page: number) => {
  emits('page', {
    length: props.length,
    pageIndex: page,
    pageSize: props.pageSize,
    previousPageIndex: pageIndex.value
  })
  pageIndex.value = page
}
const navFirstPage = () => {
  navPage(0)
}
const navPreviousPage = () => {
  navPage(pageIndex.value - 1)
}
const navNextPage = () => {
  navPage(pageIndex.value + 1)
}
const navLastPage = () => {
  navPage(lastPageIndex.value)
}
</script>

<template>
  <div class="table-paginator">
    <div class="table-paginator-buttons">
      <TableButton
        v-if="!hideFirstLast"
        :disabled="!navPreviousEnable"
        @click="navFirstPage()"
        v-tooltip="messages['first-page']"
      >
        <span class="material-icons">first_page</span>
      </TableButton>
      <TableButton
        :disabled="!navPreviousEnable"
        @click="navPreviousPage()"
        v-tooltip="messages['previous-page']"
      >
        <span class="material-icons">navigate_before</span>
      </TableButton>
    </div>
    <span class="table-paginator-current">{{ currentPageData }}</span>
    <div class="table-paginator-buttons">
      <TableButton :disabled="!navNextEnable" @click="navNextPage()" v-tooltip="messages['next-page']">
        <span class="material-icons">navigate_next</span>
      </TableButton>
      <TableButton
        v-if="!hideFirstLast"
        :disabled="!navNextEnable"
        @click="navLastPage()"
        v-tooltip="messages['last-page']"
      >
        <span class="material-icons">last_page</span>
      </TableButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-paginator {
  transition: var(--transition-duration);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;

  .table-paginator-buttons {
    display: flex;
    gap: 1rem;
  }
  .table-paginator-current {
    transition: var(--transition-duration);
    color: var(--t-pgn-clr);
  }
}
</style>

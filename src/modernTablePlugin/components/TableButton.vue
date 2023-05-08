<script setup lang="ts"></script>

<template>
  <button class="table-button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.table-button {
  background-color: var(--t-bg-clr);
  border: 1px solid var(--t-btn-brd-clr);
  border-radius: 8px;
  display: grid;
  padding: 0.5rem;
  color: var(--t-btn-clr);
  transition: var(--transition-duration);
  user-select: none;

  &:disabled {
    color: var(--t-btn-dsbld-clr);
  }

  &:not(:disabled):hover {
    background-color: var(--t-btn-hv-bg-clr);
    cursor: pointer;
  }
  &:not(:disabled):active {
    background-color: var(--t-btn-act-bg-clr);
  }
}
</style>

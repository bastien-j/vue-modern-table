<script setup lang="ts">
import { ref } from 'vue'
import type { TableOptions } from './modernTablePlugin/types'
import { columns, rows } from './assets/data.json'

const PAGE_LENGTH = 5

const tableOptions = ref<TableOptions>({
  enableCheckbox: false,
  enableExport: false,
  enableFiltering: false,
  enablePagination: true,
  enableSorting: true,
  fixWidth: true,
  pageLength: PAGE_LENGTH,
  theme: 'auto'
})
const checkedRowKeys = ref([])

const deleteRow = (id: string | number) => {
  alert(`deleting row with id ${id}`)
}
const editRow = (id: string | number) => {
  alert(`editing row with id ${id}`)
}
const showRow = (id: string | number) => {
  alert(`showing row with id ${id}`)
}
</script>

<template>
  <main :class="[tableOptions.theme]">
    <div class="settings">
      <h1>Settings</h1>
      <div class="setting">
        <label for="checkbox">Enable checkbox</label>
        <input type="checkbox" id="checkbox" v-model="tableOptions.enableCheckbox" />
      </div>
      <div class="setting">
        <label for="export">Enable export</label>
        <input type="checkbox" id="export" v-model="tableOptions.enableExport" />
      </div>
      <div class="setting">
        <label for="filtering">Enable filtering</label>
        <input type="checkbox" id="filtering" v-model="tableOptions.enableFiltering" />
      </div>
      <div class="setting">
        <label for="pagination">Enable pagination</label>
        <input type="checkbox" id="pagination" v-model="tableOptions.enablePagination" />
      </div>
      <div class="setting">
        <label for="sorting">Enable sorting</label>
        <input type="checkbox" id="sorting" v-model="tableOptions.enableSorting" />
      </div>
      <div class="setting">
        <label for="fixWidth">Fix width</label>
        <input type="checkbox" id="fixWidth" v-model="tableOptions.fixWidth" />
      </div>
      <div class="theme">
        <h2>Theme</h2>
        <div class="setting">
          <input type="radio" id="auto" v-model="tableOptions.theme" value="auto" />
          <label for="auto">auto</label>
        </div>
        <div class="setting">
          <input type="radio" id="light" v-model="tableOptions.theme" value="light" />
          <label for="light">light</label>
        </div>
        <div class="setting">
          <input type="radio" id="dark" v-model="tableOptions.theme" value="dark" />
          <label for="dark">dark</label>
        </div>
      </div>
    </div>
    <ModernTable
      :columns="columns"
      :rows="rows"
      :options="tableOptions"
      v-model:checked-row-keys="checkedRowKeys"
    >
      <template #actions="{ row }">
        <div class="buttons">
          <button @click="deleteRow(row.id)"><span class="material-icons">delete</span></button>
          <button @click="editRow(row.id)"><span class="material-icons">edit</span></button>
          <button @click="showRow(row.id)"><span class="material-icons">visibility</span></button>
        </div>
      </template>
    </ModernTable>
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
main {
  height: 100vh;
  padding: 1rem;
  transition: 0.25s background;
  overflow: auto;
  display: flex;
  gap: 1rem;

  &.auto,
  &.dark {
    background-color: #333;
    color: hsla(0, 0%, 100%, 0.87);
  }
}
.setting {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
}
.test {
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: lightgreen;
  display: grid;
  place-content: center;
  margin: auto;
}
.buttons {
  display: flex;
  gap: 0.5rem;

  button {
    display: grid;
    place-content: center;
    padding: 0.25rem;
  }
}
</style>

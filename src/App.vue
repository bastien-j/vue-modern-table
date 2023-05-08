<script setup lang="ts">
import { ref } from 'vue'

import { columns, rows } from './assets/data.json'
import { columns as columns2, rows as rows2 } from './assets/data2.json'
import type { TableOptions } from './modernTablePlugin/types'

const PAGE_LENGTH = 5

const tableOptions = ref<TableOptions>({
  enableCheckbox: false,
  enableExport: false,
  enableFiltering: false,
  enablePagination: true,
  enableSorting: true,
  pageLength: PAGE_LENGTH,
  theme: 'auto'
})
const checkedRows = ref([rows[1]])

const deleteRow = (id: string | number) => {
  console.log(`deleting row with id ${id}`)
}
const editRow = (id: string | number) => {
  console.log(`editing row with id ${id}`)
}
const showRow = (id: string | number) => {
  console.log(`showing row with id ${id}`)
}
</script>

<template>
  <main>
    <div class="settings">
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
      <div class="theme">
        <span>Theme</span>
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
    <div class="table-wrapper">
      <ModernTable
        :columns="columns"
        :rows="rows"
        :options="tableOptions"
        v-model:checked-rows="checkedRows"
      >
        <template #actions="{ row }">
          <div class="buttons">
            <button @click="deleteRow(row.id)"><span class="material-icons">delete</span></button>
            <button @click="editRow(row.id)"><span class="material-icons">edit</span></button>
            <button @click="showRow(row.id)"><span class="material-icons">visibility</span></button>
          </div>
        </template>
      </ModernTable>
    </div>
    {{ checkedRows }}
    <div class="table-wrapper">
      <ModernTable :columns="columns2" :rows="rows2" :options="tableOptions">
        <template #actions="{ row }">
          <div class="buttons">
            <button @click="deleteRow(row.id)"><span class="material-icons">delete</span></button>
            <button @click="editRow(row.id)"><span class="material-icons">edit</span></button>
            <button @click="showRow(row.id)"><span class="material-icons">visibility</span></button>
          </div>
        </template>
      </ModernTable>
    </div>
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
  min-height: 100vh;
  padding: 16px;
  display: grid;
  gap: 16px;
  align-content: flex-start;
  background-color: #333;
}
.settings {
  box-shadow: hsl(0, 0%, 85%) 0 0 5px;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 64px;
  background-color: hsl(0, 0%, 100%);
}
.setting {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}
.theme {
  display: inline-flex;
  gap: 16px;
}
.buttons {
  display: flex;
  gap: 0.5rem;

  button {
    display: grid;
    place-content: center;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
}
</style>

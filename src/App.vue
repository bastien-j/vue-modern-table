<script setup lang="ts">
import { ref } from 'vue'
import type { PluginOptions } from './modernTablePlugin/types'
import data from './assets/data.json'

const tableOptions = ref<PluginOptions>({
  enableCheckbox: false,
  enableFiltering: false,
  enablePagination: true,
  enableSorting: true,
  locale: 'en'
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
  <main>
    <div class="setting">
      <label for="checkbox">Enable checkbox</label>
      <input type="checkbox" id="checkbox" v-model="tableOptions.enableCheckbox" />
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
    <ModernTable
      :columns="data.columns"
      :rows="data.rows"
      :options="tableOptions"
      v-model:checked-row-keys="checkedRowKeys"
    >
      <template #id="{ value }">
        <div class="test">
          {{ value }}
        </div>
      </template>
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
  padding: 1rem;
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

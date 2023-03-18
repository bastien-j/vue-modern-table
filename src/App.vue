<script setup lang="ts">
import { ref } from 'vue'
import data from './assets/data.json'

const enableCheckbox = ref(false)
const enableFilter = ref(false)
const enablePagination = ref(false)
const disableSorting = ref(false)
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
    <button @click="enableFilter = !enableFilter">Toggle filter</button>
    <button @click="enablePagination = !enablePagination">Toggle pagination</button>
    <button @click="disableSorting = !disableSorting">Toggle sorting</button>
    <button @click="enableCheckbox = !enableCheckbox">Toggle checkbox</button>
    <template v-if="enableCheckbox">{{ checkedRowKeys }}</template>
    <ModernTable
      :columns="data.columns"
      :rows="data.rows"
      :enable-checkbox="enableCheckbox"
      :enable-filter="enableFilter"
      :enable-pagination="enablePagination"
      :disable-sorting="disableSorting"
      v-model:checked-row-keys="checkedRowKeys"
    >
      <template #id="{value}">
        <div class="test">
          {{ value }}
        </div>
      </template>
      <template #actions="{row}">
        <button @click="deleteRow(row.id)">delete</button>
        <button @click="editRow(row.id)">edit</button>
        <button @click="showRow(row.id)">show</button>
      </template>
    </ModernTable>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
main {
  padding: 1rem;
}
.test {
  padding: .5rem;
  border-radius: 1rem;
  background-color: lightgreen;
  display: grid;
  place-content: center;
  margin: auto;
}
</style>

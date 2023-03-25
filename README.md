# Vue Modern Table

Modern table implementation for Vue 3 with sorting, filtering, pagination and CSV export.

## Demo

You can find a demo on [CodeSandbox](https://codesandbox.io/p/sandbox/sleepy-maxwell-kduo36).

## Installation

```sh
npm install vue-modern-table
```

## Usage

### Install the plugin

Don't forget to import plugin styles if you want to use the integrated themes.

```js
import { createApp } from 'vue'
import { createModernTablePlugin } from 'vue-modern-table'
import 'vue-modern-table/style.css' // integrated themes
import App from './App.vue'

const modernTablePlugin = createModernTablePlugin()
const app = createApp(App)

app.use(modernTablePlugin)
app.mount('#app')
```

### Use the `ModernTable` component

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'ID', field: 'id' },
      { label: 'Name', field: 'name' }
    ]"
    :rows="[
            { key: <random-unique-key>, id: 0, name: 'John' },
            { key: <random-unique-key>, id: 1, name: 'Barbara' }
        ]"
  />
</template>
```

By default, sorting and pagination will be enabled.

For advanced usage, check out the demo on [CodeSandbox](https://codesandbox.io/p/sandbox/sleepy-maxwell-kduo36).

### Configuration

You can configure the table either globally and/or locally, by passing an option object to the `createModernTablePlugin` method or as prop to the `ModernTable` component.

```js
...
const modernTablePlugin = createModernTablePlugin({...options})
...
```

and/or

```vue
<template>
  <ModernTable :columns="cols" :rows="[rows]" :options="{ ...options }" />
</template>
```

Available options :

| Key              | Default | Description                                        |
| ---------------- | ------- | -------------------------------------------------- |
| enableSorting    | true    | Enable fields sorting                              |
| enableFiltering  | false   | Enable fields filtering                            |
| enablePagination | true    | Enable rows pagination                             |
| enableCheckbox   | false   | Enable rows selection                              |
| initialPage      | 0       | Initial page to load when using pagination         |
| locale           | en      | Locale to use (available : `en`, `fr`)             |
| pageLength       | 5       | Number of rows per page when using pagination      |
| theme            | auto    | Theme to use (available : `auto`, `light`, `dark`) |

### Slots

You can customize the render of row cells using slots. Slots are named after each column `field` value.

For each slot, you have access to the `field` name, the `value` of the cell and the complete `row` data.

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'ID', field: 'id' },
      { label: 'Name', field: 'name' }
    ]"
    :rows="[
            { key: <random-unique-key>, id: 0, name: 'John' },
            { key: <random-unique-key>, id: 1, name: 'Barbara' }
        ]"
  >
    <template #id="{ field, value, row }"> #{{ value }} </template>
    <template #name="{ field, value, row }">
      <div class="custom-name">
        {{ value }}
      </div>
    </template>
  </ModernTable>
</template>

<style>
.custom-name {
  background-color: #0c8581;
  padding: 5px 7px;
  border-radius: 5px;
  color: white;
}
</style>
```

### Checkboxs

You can enable row selection using the `enableCheckbox` option (disabled by default), and access selected rows using the `v-model` directive. The array will contain `key`s of each selected rows.

Before doing so, please make sure that each row has a `key` field with a unique value. You can use [uuid](https://github.com/uuidjs/uuid) for that, or any other library that can generate random unique values.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const cols = [...]
const rows = [...]

const checkedRowKeys = ref([])
</script>

<template>
  <ModernTable
    :columns="cols"
    :rows="rows"
    :options="{ enableCheckbox: true }"
    v-model:checked-row-keys="checkedRowKeys"
  />
  {{ checkedRowKeys }}
</template>
```

### Columns configuration

For each column, you can enable/disable sorting, filtering, export and choose to shrink the column width.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const cols = [
    { label: 'ID', field: 'id', noFilter: true, noExport: true, shrink: true },
    { label: 'Name', field: 'name', noSort: true }
]
const rows = [...]
</script>

<template>
  <ModernTable :columns="cols" :rows="rows" />
</template>
```

Available column options :

| Key      | Default | Description                    |
| -------- | ------- | ------------------------------ |
| noSort   | false   | Disable column sorting         |
| noFilter | false   | Disable column filtering       |
| noExport | false   | Exclude column from CSV export |
| shrink   | false   | Shrink column width            |

## License

[MIT](http://opensource.org/licenses/MIT)

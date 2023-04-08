# Checkboxs

Checkboxs allow you to select rows in the table.

:::tip
By default, export option is **disabled**.
:::
:::warning
To make use of checkboxs, each row must have a `key` field with a unique value. You can use [uuid](https://github.com/uuidjs/uuid) for that, or any other library that can generate random unique values.
:::

## Enabling / disabling checkboxs

To enable / disable checkboxs, simply set the `enableCheckbox` option to either `true` or `false` (default):

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'Country', field: 'country' },
      { label: 'Capital', field: 'capital' }
    ]"
    :rows="[
      { key: <random-unique-key>, country: 'Ukraine', capital: 'Kiev' },
      { key: <random-unique-key>, country: 'France', capital: 'Paris' },
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin' }
    ]"
    :options="{ enableCheckbox: true }" // [!code focus]
  />
</template>
```

:::raw
<ModernTable
  :columns="[
    { label: 'Country', field: 'country' },
    { label: 'Capital', field: 'capital' }
  ]"
  :rows="[
    { key: 0, country: 'Ukraine', capital: 'Kiev' },
    { key: 1, country: 'France', capital: 'Paris' },
    { key: 2, country: 'Germany', capital: 'Berlin' }
  ]"
  :options="{ enableCheckbox: true }"
/>
:::

## Accessing selected rows

You can access selected rows using the `checked-row-keys` model value:

```vue
<script setup>
import { ref } from 'vue'

const checkedRowKeys = ref([]) // [!code focus]
</script>

<template>
  <ModernTable
    :columns="[
      { label: 'Country', field: 'country' },
      { label: 'Capital', field: 'capital' }
    ]"
    :rows="[
      { key: <random-unique-key>, country: 'Ukraine', capital: 'Kiev' },
      { key: <random-unique-key>, country: 'France', capital: 'Paris' },
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin' }
    ]"
    :options="{ enableCheckbox: true }"
    v-model:checked-row-keys="checkedRowKeys" // [!code focus]
  />
</template>
```

<script setup lang="ts">
import { ref } from 'vue'

const checkedRowKeys = ref([])
</script>
:::raw
<ModernTable
  :columns="[
    { label: 'Country', field: 'country' },
    { label: 'Capital', field: 'capital' }
  ]"
  :rows="[
    { key: 0, country: 'Ukraine', capital: 'Kiev' },
    { key: 1, country: 'France', capital: 'Paris' },
    { key: 2, country: 'Germany', capital: 'Berlin' }
  ]"
  :options="{ enableCheckbox: true }"
  v-model:checked-row-keys="checkedRowKeys"
/>
:::

<div class="language-text"><pre><code>Selected row keys:
{{ checkedRowKeys }}
</code></pre></div>

:::tip
The array will contain `key`s of each selected rows, so it's up to you to match them with the original row.
:::
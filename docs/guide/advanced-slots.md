# Slots

The plugin makes use of slots to allow full control over each row cell render.

## Custom cell render

:::tip
Slots are named after each column `field` value
:::

For each slot, you can access the `field` name, the `value` of the cell and the complete `row` data.

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
  >
    <template #capital="{ field, value, row }"> // [!code focus]
      <div class="custom-capital"> // [!code focus]
        {{ value }} // [!code focus]
      </div> // [!code focus]
    </template> // [!code focus]
  </ModernTable>
</template>

<style>
.custom-capital {
  background-color: #0c8581;
  padding: 5px 7px;
  border-radius: 5px;
  color: white;
}
</style>
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
>
  <template #capital="{ field, value, row }">
    <div class="custom-capital">
      {{ value }}
    </div>
  </template>
</ModernTable>
:::

<style>
.custom-capital {
  background-color: #0c8581;
  padding: 5px 7px;
  border-radius: 5px;
  color: white;
}
</style>
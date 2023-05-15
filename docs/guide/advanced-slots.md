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
      { country: 'Ukraine', capital: 'Kiev' },
      { country: 'France', capital: 'Paris' },
      { country: 'Germany', capital: 'Berlin' }
    ]"
  >
    <template #capital="{ field, value, row }"> // [!code focus]
      <span class="custom-capital"> // [!code focus]
        {{ value }} // [!code focus]
      </span> // [!code focus]
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
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' }
  ]"
>
  <template #capital="{ field, value, row }">
    <span class="custom-capital">
      {{ value }}
    </span>
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

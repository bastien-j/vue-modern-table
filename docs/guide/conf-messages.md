# Messages

Messages allows you to customize any displayed text (like placeholders).

## Set messages

To specify your custom messages, simply fill the `messages` option.

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
      { country: 'Germany', capital: 'Berlin' },
      { country: 'USA', capital: 'Washington' }
    ]"
    :options="{
      enableFiltering: true,
      messages: { // [!code focus]
        actions: { // [!code focus]
          filter: 'Search' // [!code focus]
        } // [!code focus]
      } // [!code focus]
    }"
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
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'USA', capital: 'Washington' }
  ]"
  :options="{
    enableFiltering: true,
    messages: {
      actions: {
        filter: 'Search'
      }
    }
  }"
/>
:::

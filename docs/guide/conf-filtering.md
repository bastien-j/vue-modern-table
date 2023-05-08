# Filtering

The filtering allows you to filter rows from a single text input.

:::tip
By default, filtering option is **disabled**.
:::
:::warning
Filter is only applied on `string` values for now.
:::

## Enabling / disabling filtering

To enable / disable rows filtering, simply set the `enableFiltering` option to either `true` or `false` (default):

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
    :options="{ enableFiltering: true }" // [!code focus]
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
  :options="{ enableFiltering: true }"
/>
:::

## Disabling filtering on specific columns

By default, every columns are sortable. You can limit that with the `noFilter` column option: 

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'Country', field: 'country' },
      { label: 'Capital (no filter)', field: 'capital', noFilter: true }
    ]"
    :rows="[
      { country: 'Ukraine', capital: 'Kiev' },
      { country: 'France', capital: 'Paris' },
      { country: 'Germany', capital: 'Berlin' },
      { country: 'USA', capital: 'Washington' }
    ]"
    :options="{ enableFiltering: true }" // [!code focus]
  />
</template>
```

:::raw
<ModernTable
  :columns="[
    { label: 'Country', field: 'country' },
    { label: 'Capital (no filter)', field: 'capital', noFilter: true }
  ]"
  :rows="[
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'USA', capital: 'Washington' }
  ]"
  :options="{ enableFiltering: true }"
/>
:::

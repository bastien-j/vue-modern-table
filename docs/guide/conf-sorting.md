# Sorting

The sorting allows you to sort by one or more columns.

:::tip
By default, sorting option is **enabled**.
:::

## Enabling / disabling sorting

To enable / disable rows sorting, simply set the `enableSorting` option to either `true` (default) or `false`:

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'Country', field: 'country' },
      { label: 'Capital', field: 'capital' },
      { label: 'Population', field: 'population' }
    ]"
    :rows="[
      { country: 'Ukraine', capital: 'Kiev', population: '3M' },
      { country: 'France', capital: 'Paris', population: '2M' },
      { country: 'Germany', capital: 'Berlin', population: '4M' },
      { country: 'USA', capital: 'Washington', population: '700K' },
      { country: 'Brazil', capital: 'Brasília', population: '3M' },
      { country: 'England', capital: 'London', population: '9M' },
      { country: 'Russia', capital: 'Moscow', population: '12M' }
    ]"
    :options="{ enableSorting: true }" // [!code focus]
  />
</template>
```

:::raw
<ModernTable
  :columns="[
    { label: 'Country', field: 'country' },
    { label: 'Capital', field: 'capital' },
    { label: 'Population', field: 'population' }
  ]"
  :rows="[
    { country: 'Ukraine', capital: 'Kiev', population: '3M' },
    { country: 'France', capital: 'Paris', population: '2M' },
    { country: 'Germany', capital: 'Berlin', population: '4M' },
    { country: 'USA', capital: 'Washington', population: '700K' },
    { country: 'Brazil', capital: 'Brasília', population: '3M' },
    { country: 'England', capital: 'London', population: '9M' },
    { country: 'Russia', capital: 'Moscow', population: '12M' }
  ]"
  :options="{ enableSorting: true }"
/>
:::

:::tip
By default, every columns are sortable.
:::

## Disabling sorting on specific columns

Use the `noSort` option to disable sorting on specific columns: 

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'Country (no sort)', field: 'country', noSort: true }, // [!code focus]
      { label: 'Capital', field: 'capital' }
    ]"
    :rows="[
      { country: 'Ukraine', capital: 'Kiev' },
      { country: 'France', capital: 'Paris' },
      { country: 'Germany', capital: 'Berlin' },
      { country: 'USA', capital: 'Washington' }
    ]"
  />
</template>
```

:::raw
<ModernTable
  :columns="[
    { label: 'Country (no sort)', field: 'country', noSort: true },
    { label: 'Capital', field: 'capital' }
  ]"
  :rows="[
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'USA', capital: 'Washington' }
  ]"
/>
:::

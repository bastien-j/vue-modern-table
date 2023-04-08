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
      { key: <random-unique-key>, country: 'Ukraine', capital: 'Kiev', population: '3M' },
      { key: <random-unique-key>, country: 'France', capital: 'Paris', population: '2M' },
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin', population: '4M' },
      { key: <random-unique-key>, country: 'USA', capital: 'Washington', population: '700K' },
      { key: <random-unique-key>, country: 'Brazil', capital: 'Brasília', population: '3M' },
      { key: <random-unique-key>, country: 'England', capital: 'London', population: '9M' },
      { key: <random-unique-key>, country: 'Russia', capital: 'Moscow', population: '12M' }
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
    { key: 0, country: 'Ukraine', capital: 'Kiev', population: '3M' },
    { key: 1, country: 'France', capital: 'Paris', population: '2M' },
    { key: 2, country: 'Germany', capital: 'Berlin', population: '4M' },
    { key: 3, country: 'USA', capital: 'Washington', population: '700K' },
    { key: 4, country: 'Brazil', capital: 'Brasília', population: '3M' },
    { key: 5, country: 'England', capital: 'London', population: '9M' },
    { key: 6, country: 'Russia', capital: 'Moscow', population: '12M' }
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
      { key: <random-unique-key>, country: 'Ukraine', capital: 'Kiev' },
      { key: <random-unique-key>, country: 'France', capital: 'Paris' },
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin' },
      { key: <random-unique-key>, country: 'USA', capital: 'Washington' }
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
    { key: 0, country: 'Ukraine', capital: 'Kiev' },
    { key: 1, country: 'France', capital: 'Paris' },
    { key: 2, country: 'Germany', capital: 'Berlin' },
    { key: 3, country: 'USA', capital: 'Washington' }
  ]"
/>
:::

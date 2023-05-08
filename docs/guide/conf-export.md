# Export

Export allows you to export table data into CSV format.

:::tip
By default, export option is **disabled**.
:::

## Enabling / disabling export

To enable / disable data export, simply set the `enableExport` option to either `true` or `false` (default):

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
      { country: 'Germany', capital: 'Berlin', population: '4M' }
    ]"
    :options="{ enableExport: true }" // [!code focus]
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
    { country: 'Germany', capital: 'Berlin', population: '4M' }
  ]"
  :options="{ enableExport: true }"
/>
:::

:::tip
If sorting and/or filtering are used, they will also be applied in the export.
:::
:::tip
By default, every columns are included.
:::

## Disabling export on specific columns

Use the `noExport` option to disable export on specific columns: 

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'Country (no export)', field: 'country', noExport: true }, // [!code focus]
      { label: 'Capital', field: 'capital' },
      { label: 'Population', field: 'population' }
    ]"
    :rows="[
      { country: 'Ukraine', capital: 'Kiev', population: '3M' },
      { country: 'France', capital: 'Paris', population: '2M' },
      { country: 'Germany', capital: 'Berlin', population: '4M' }
    ]"
    :options="{ enableExport: true }"
  />
</template>
```

:::raw
<ModernTable
  :columns="[
    { label: 'Country (no export)', field: 'country', noExport: true },
    { label: 'Capital', field: 'capital' },
    { label: 'Population', field: 'population' }
  ]"
  :rows="[
    { country: 'Ukraine', capital: 'Kiev', population: '3M' },
    { country: 'France', capital: 'Paris', population: '2M' },
    { country: 'Germany', capital: 'Berlin', population: '4M' }
  ]"
  :options="{ enableExport: true }"
/>
:::

# Table Column

Table columns can be configured to enable / disable filtering, sorting, export and also sizing.

## Options

### noExport

- Type: `boolean`
- Default: `false`

Used to exclude column from the export.

Refer to [Export](../guide/conf-export) to learn more.

### noFilter

- Type: `boolean`
- Default: `false`

Used to disable filtering on the column.

Refer to [Filtering](../guide/conf-filtering) to learn more.

### noSort

- Type: `boolean`
- Default: `false`

Used to disable sorting on the column.

Refer to [Sorting](../guide/conf-sorting) to learn more.

### shrink

- Type: `boolean`
- Default: `false`

Used to shrink the column width:

```vue
<template>
  <ModernTable
    :columns="[
      { label: 'Country (shrinked)', field: 'country', shrink: true }, // [!code focus]
      { label: 'Capital', field: 'capital' }
    ]"
    :rows="[
      { key: <random-unique-key>, country: 'Ukraine', capital: 'Kiev' },
      { key: <random-unique-key>, country: 'France', capital: 'Paris' },
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin' }
    ]"
  />
</template>
```

:::raw
<ModernTable
  :columns="[
    { label: 'Country (shrinked)', field: 'country', shrink: true },
    { label: 'Capital', field: 'capital' }
  ]"
  :rows="[
    { key: 0, country: 'Ukraine', capital: 'Kiev' },
    { key: 1, country: 'France', capital: 'Paris' },
    { key: 2, country: 'Germany', capital: 'Berlin' }
  ]"
/>
:::
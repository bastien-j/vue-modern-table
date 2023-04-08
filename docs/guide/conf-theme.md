# Theme

The plugin comes with two available themes : `dark` and `light`

:::tip
By default, the theme used will be based on your browser preferred theme (value `auto`)
:::

## Set theme to use

To set the theme to use, simply set the `theme` option to either `dark`, `light` or `auto`.

### Dark theme
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
    :options="{ theme: 'dark' }" // [!code focus]
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
  :options="{ theme: 'dark' }"
/>
:::

### Light theme
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
    :options="{ theme: 'light' }" // [!code focus]
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
  :options="{ theme: 'light' }"
/>
:::
# Pagination

The pagination allows you to paginate rows using the default (5) or a custom page length.

:::tip
By default, pagination option is **enabled**.
:::

## Enabling / disabling pagination

To enable / disable rows pagination, simply set the `enablePagination` option to either `true` (default) or `false`:

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
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin' },
      { key: <random-unique-key>, country: 'USA', capital: 'Washington' },
      { key: <random-unique-key>, country: 'Brazil', capital: 'Brasília' },
      { key: <random-unique-key>, country: 'England', capital: 'London' },
      { key: <random-unique-key>, country: 'Russia', capital: 'Moscow' }
    ]"
    :options="{ enablePagination: true }" // [!code focus]
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
    { key: 2, country: 'Germany', capital: 'Berlin' },
    { key: 3, country: 'USA', capital: 'Washington' },
    { key: 4, country: 'Brazil', capital: 'Brasília' },
    { key: 5, country: 'England', capital: 'London' },
    { key: 6, country: 'Russia', capital: 'Moscow' }
  ]"
  :options="{ enablePagination: true }"
/>
:::
Without pagination:
:::raw
<ModernTable
  :columns="[
    { label: 'Country', field: 'country' },
    { label: 'Capital', field: 'capital' }
  ]"
  :rows="[
    { key: 0, country: 'Ukraine', capital: 'Kiev' },
    { key: 1, country: 'France', capital: 'Paris' },
    { key: 2, country: 'Germany', capital: 'Berlin' },
    { key: 3, country: 'USA', capital: 'Washington' },
    { key: 4, country: 'Brazil', capital: 'Brasília' },
    { key: 5, country: 'England', capital: 'London' },
    { key: 6, country: 'Russia', capital: 'Moscow' }
  ]"
  :options="{ enablePagination: false }"
/>
:::

## Custom page length

You can override the default page length (5) using the `pageLength` option:

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
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin' },
      { key: <random-unique-key>, country: 'USA', capital: 'Washington' },
      { key: <random-unique-key>, country: 'Brazil', capital: 'Brasília' },
      { key: <random-unique-key>, country: 'England', capital: 'London' },
      { key: <random-unique-key>, country: 'Russia', capital: 'Moscow' }
    ]"
    :options="{
      enablePagination: true,
      pageLength: 3 // [!code focus]
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
    { key: 0, country: 'Ukraine', capital: 'Kiev' },
    { key: 1, country: 'France', capital: 'Paris' },
    { key: 2, country: 'Germany', capital: 'Berlin' },
    { key: 3, country: 'USA', capital: 'Washington' },
    { key: 4, country: 'Brazil', capital: 'Brasília' },
    { key: 5, country: 'England', capital: 'London' },
    { key: 6, country: 'Russia', capital: 'Moscow' }
  ]"
  :options="{
    enablePagination: true,
    pageLength: 3
  }"
/>
:::

## Custom initial page

You can set the initial page to load using the `initialPage` option:

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
      { key: <random-unique-key>, country: 'Germany', capital: 'Berlin' },
      { key: <random-unique-key>, country: 'USA', capital: 'Washington' },
      { key: <random-unique-key>, country: 'Brazil', capital: 'Brasília' },
      { key: <random-unique-key>, country: 'England', capital: 'London' },
      { key: <random-unique-key>, country: 'Russia', capital: 'Moscow' }
    ]"
    :options="{
      enablePagination: true,
      initialPage: 1 // [!code focus]
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
    { key: 0, country: 'Ukraine', capital: 'Kiev' },
    { key: 1, country: 'France', capital: 'Paris' },
    { key: 2, country: 'Germany', capital: 'Berlin' },
    { key: 3, country: 'USA', capital: 'Washington' },
    { key: 4, country: 'Brazil', capital: 'Brasília' },
    { key: 5, country: 'England', capital: 'London' },
    { key: 6, country: 'Russia', capital: 'Moscow' }
  ]"
  :options="{
    enablePagination: true,
    initialPage: 1
  }"
/>
:::
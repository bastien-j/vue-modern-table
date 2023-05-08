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
      { country: 'Ukraine', capital: 'Kiev' },
      { country: 'France', capital: 'Paris' },
      { country: 'Germany', capital: 'Berlin' },
      { country: 'USA', capital: 'Washington' },
      { country: 'Brazil', capital: 'Brasília' },
      { country: 'England', capital: 'London' },
      { country: 'Russia', capital: 'Moscow' }
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
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'USA', capital: 'Washington' },
    { country: 'Brazil', capital: 'Brasília' },
    { country: 'England', capital: 'London' },
    { country: 'Russia', capital: 'Moscow' }
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
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'USA', capital: 'Washington' },
    { country: 'Brazil', capital: 'Brasília' },
    { country: 'England', capital: 'London' },
    { country: 'Russia', capital: 'Moscow' }
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
      { country: 'Ukraine', capital: 'Kiev' },
      { country: 'France', capital: 'Paris' },
      { country: 'Germany', capital: 'Berlin' },
      { country: 'USA', capital: 'Washington' },
      { country: 'Brazil', capital: 'Brasília' },
      { country: 'England', capital: 'London' },
      { country: 'Russia', capital: 'Moscow' }
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
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'USA', capital: 'Washington' },
    { country: 'Brazil', capital: 'Brasília' },
    { country: 'England', capital: 'London' },
    { country: 'Russia', capital: 'Moscow' }
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
      { country: 'Ukraine', capital: 'Kiev' },
      { country: 'France', capital: 'Paris' },
      { country: 'Germany', capital: 'Berlin' },
      { country: 'USA', capital: 'Washington' },
      { country: 'Brazil', capital: 'Brasília' },
      { country: 'England', capital: 'London' },
      { country: 'Russia', capital: 'Moscow' }
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
    { country: 'Ukraine', capital: 'Kiev' },
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'USA', capital: 'Washington' },
    { country: 'Brazil', capital: 'Brasília' },
    { country: 'England', capital: 'London' },
    { country: 'Russia', capital: 'Moscow' }
  ]"
  :options="{
    enablePagination: true,
    initialPage: 1
  }"
/>
:::
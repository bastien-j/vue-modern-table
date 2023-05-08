# Getting Started

:::warning
This plugin only support Vue 3 since [Vue 2 will reach End of Life (EOL) on December 31st, 2023](https://v2.vuejs.org/lts/).
:::

## Try It Online

You can try **VueModernTable** on [CodeSandbox](https://codesandbox.io/p/sandbox/sleepy-maxwell-kduo36).

## Installation

Install `@bastien-j/vue-modern-table` with your favorite package manager:

::: code-group
```sh [npm]
$ npm install @bastien-j/vue-modern-table
```
```sh [yarn]
$ yarn add @bastien-j/vue-modern-table
```
:::

Initialize the plugin and pass it to your app instance:

```js{2,3,6,9}
import { createApp } from 'vue'
import { createModernTablePlugin } from '@bastien-j/vue-modern-table'
import '@bastien-j/vue-modern-table/style.css' // integrated themes
import App from './App.vue'

const modernTablePlugin = createModernTablePlugin()
const app = createApp(App)

app.use(modernTablePlugin)
app.mount('#app')
```

:::tip
Don't forget to import plugin styles if you want to use the integrated themes.
:::
:::tip
Once the plugin is loaded, the `ModernTable` component will be globally registered.
:::

## Usage

Use the `ModernTable` component:

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
      { country: 'China', capital: 'Beijing' }
    ]"
    :options="{ pageLength: 3 }"
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
    { country: 'China', capital: 'Beijing' }
  ]"
  :options="{ pageLength: 3 }"
/>
:::

:::tip
By default, **sorting** and **pagination** will be enabled.
:::
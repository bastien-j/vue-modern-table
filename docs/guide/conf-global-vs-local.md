# Global vs. Local Configuration

You can configure your `ModernTable` components globally and/or locally.

:::tip
If you use both **global** and **local** configurations, the **local** configuration will extends the **global** one.
:::

## Global Configuration

To make all `ModernTable` components behave the same, pass an option object to the `createModernTablePlugin` method:

```js
import { createApp } from 'vue'
import { createModernTablePlugin } from '@bastien-j/vue-modern-table'
import App from './App.vue'

const modernTablePlugin = createModernTablePlugin({...options}) // [!code focus]
const app = createApp(App)

app.use(modernTablePlugin)
app.mount('#app')
```

Consult the [Option Reference](../reference/plugin-options) for full details on all config options.

## Local Configuration

You can also set options of your `ModernTable` components individually by using the `options` props:

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
    :options="{...options}" // [!code focus]
  />
</template>
```
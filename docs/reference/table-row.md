# Table Row

Table rows have one requirements. They must include a `key` field with a **unique** value.

```vue
<template>
  <ModernTable
    :columns="[...]"
    :rows="[
      { key: <random-unique-key>, ...row },
      { key: <random-unique-key>, ...row }
    ]"
  />
</template>
```
import { createApp } from 'vue'
import App from './App.vue'
import { createModernTablePlugin } from './modernTablePlugin'

createApp(App).use(createModernTablePlugin()).mount('#app')

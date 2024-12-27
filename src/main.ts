import { createApp, type App } from 'vue'
import ElementPlus from 'element-plus'
import RootApp from '@/App.vue'

const app : App = createApp(RootApp)

app.use(ElementPlus)

app.mount('#app')
import { createApp, type App } from 'vue'
import { createPinia, type Pinia } from "pinia";
import piniapluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";
import RootApp from "@/App.vue";
import AppRouter from "@/routers";
import { GlocalComponentsPlugin } from "./plugins";

const app: App = createApp(RootApp);
const pinia: Pinia = createPinia();

pinia.use(piniapluginPersistedstate);

app.use(pinia);
app.use(AppRouter);
app.use(ElementPlus);
app.use(GlocalComponentsPlugin);

app.mount('#app')
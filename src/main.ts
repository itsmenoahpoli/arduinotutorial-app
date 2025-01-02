import { createApp, type App } from 'vue'
import { createPinia, type Pinia } from "pinia";
import { createHead } from "@unhead/vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import piniapluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";
import RootApp from "@/App.vue";
import AppRouter from "@/routers";
import { GlocalComponentsPlugin } from "@/plugins";

import "nprogress/nprogress.css";
import "element-plus/dist/index.css";
import "@/styles/app.css";

const app: App = createApp(RootApp);
const pinia: Pinia = createPinia();
const head = createHead();

pinia.use(piniapluginPersistedstate);

app.use(pinia);
app.use(head);
app.use(AppRouter);
app.use(ElementPlus);
app.use(VueQueryPlugin);
app.use(GlocalComponentsPlugin);

app.mount('#app')
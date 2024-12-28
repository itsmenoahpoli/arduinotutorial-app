
import { type App } from 'vue'
import AuthLayout from '@/layouts/auth-layout.vue'
import DashboardLayout from '@/layouts/dashboard-layout.vue'


export const GlocalComponentsPlugin = {
  install(app: App) {
    /**
     * Layout components
     */
    app.component("AuthLayout", AuthLayout);
    app.component("DashboardLayout", DashboardLayout);
  },
};
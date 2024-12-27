
import { type App } from 'vue'
import AuthLayout from '@/layouts/auth-layout.vue'
import DashboardLayout from '@/layouts/dashboard-layout.vue'


const componentsPlugin = {
  install: (app: App, options: unknown) {
    /**
     * Layout components
     */
    app.component('AuthLayout', AuthLayout)
    app.component('DashboardLayout', DashboardLayout)
  }
}
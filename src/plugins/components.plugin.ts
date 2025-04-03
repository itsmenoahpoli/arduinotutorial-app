import { type App } from "vue";
import AuthLayout from "@/layouts/auth-layout.vue";
import DashboardLayout from "@/layouts/dashboard-layout.vue";
import ClientDashboardLayout from "@/layouts/client-dashboard-layout.vue";

export const GlocalComponentsPlugin = {
  install(app: App) {
    app.component("AuthLayout", AuthLayout);
    app.component("DashboardLayout", DashboardLayout);
    app.component("ClientDashboardLayout", ClientDashboardLayout);
  },
};

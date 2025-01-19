import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from "vue-router";
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/auth/admin-login",
    },
    {
      path: "/auth/admin-login",
      name: "auth-admin-login",
      component: () => import("@/views/auth/admin-login.vue"),
    },
    {
      path: "/admin/dashboard",
      name: "auth-admin-dashboard",
      component: () => import("@/views/admin/dashboard.vue"),
    },
    {
      path: "/admin/videos/upload",
      name: "auth-admin-videos-upload",
      component: () => import("@/views/admin/videos/upload.vue"),
    },
  ],
});

router.beforeEach(
  (
    // @ts-ignore
    to: RouteLocationNormalized,
    // @ts-ignore
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    NProgress.start();
    next();
  }
);

router.afterEach(() => {
  NProgress.done();
});

export default router

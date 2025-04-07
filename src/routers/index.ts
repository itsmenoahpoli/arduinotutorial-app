import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from "vue-router";
import NProgress from "nprogress";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/auth/signin",
    },
    {
      path: "/auth/signin",
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
    {
      path: "/admin/users",
      name: "admin-users-list",
      component: () => import("@/views/admin/users/list.vue"),
    },
    {
      path: "/admin/users/create",
      name: "admin-users-create",
      component: () => import("@/views/admin/users/create.vue"),
    },
    {
      path: "/client/dashboard",
      name: "client-dashboard",
      component: () => import("@/views/client/dashboard.vue"),
    },
  ],
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
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

export default router;

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
      path: "/auth/signup",
      name: "auth-admin-register",
      component: () => import("@/views/auth/user-register.vue"),
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
    // Catch all route for 404 pages
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/errors/404.vue"),
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

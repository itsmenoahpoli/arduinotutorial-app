import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from "vue-router";
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/auth/login",
    },
    {
      path: "/auth/login",
      name: "auth-login",
      component: () => import("@/views/auth/login.vue"),
    },
  ],
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.log({ to, from, next });
    NProgress.start();
    next();
  }
);

router.afterEach(() => {
  NProgress.done();
});

export default router

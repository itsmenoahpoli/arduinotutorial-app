import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from "vue-router";
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth/login",
      name: "auth-login",
      component: () => import("@/views/auth/login.vue"),
    },
  ],
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.log(from)
    NProgress.start();

    if (String(to.name).includes("admin")) {
      // const adminAuthStore = undefined;

      // if (to.name !== "admin-login" && !adminAuthStore.IS_AUTHENTICATED) {
      //   return next({
      //     name: "auth-login",
      //     query: { message: "Unauthenticated access" },
      //     replace: true,
      //   });
      // }

      return next();
    }

    return next()
  }
);

router.afterEach(() => {
  NProgress.done();
});

export default router

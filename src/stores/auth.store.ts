import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: undefined,
    user: undefined,
  }),
  actions: {
    //
  },
  getters: {
    //
  },
  persist: true,
});

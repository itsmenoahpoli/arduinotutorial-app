import { defineStore } from "pinia";

interface User {
  fullName: string;
  email: string;
  [key: string]: any;
}

type State = {
  token?: string;
  user?: User;
};

export const useAuthStore = defineStore("authStore", {
  state: (): State => ({
    token: undefined,
    user: undefined,
  }),
  actions: {
    SET_TOKEN(token: string) {
      this.token = token;
    },
    SET_USER(user: User) {
      this.user = user;
    },
    CLEAR_DATA() {
      this.$reset();
    },
  },
  getters: {
    GET_TOKEN: (state) => state.token,
    GET_USER: (state) => state.user,
  },
  persist: true,
});

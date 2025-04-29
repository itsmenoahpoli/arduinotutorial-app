export const ROUTES = {
  API: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    VIDEOS: {
      LIST: "/media/videos",
      BY_ID: (id: number) => `/media/videos/${id.toString()}`,
    },
    USERS: {
      LIST: "/users",
      BY_ID: (id: number) => `/users/${id.toString()}`,
    },
  },
  PAGES: {
    ADMIN: {
      DASHBOARD: "/admin/dashboard",
      USERS: "/admin/users",
    },
    CLIENT: {
      DASHBOARD: "/client/dashboard",
    },
  },
} as const;

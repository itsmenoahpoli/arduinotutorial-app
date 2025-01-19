export const ROUTES = {
  API: {
    SIGNIN: "/auth/signin",
    VIDEOS: {
      LIST: "/media/videos",
    },
  },
  PAGES: {
    ADMIN: {
      DASHBOARD: "/admin/dashboard",
    },
    CLIENT: {
      DASHBOARD: "/client/dashboard",
    },
  },
} as const;

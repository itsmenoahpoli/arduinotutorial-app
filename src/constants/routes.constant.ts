export const ROUTES = {
  API: {
    SIGNIN: "/auth/signin",
    VIDEOS: {
      LIST: "/media/videos",
      BY_ID: (id: number) => `/media/videos/${id.toString()}`,
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

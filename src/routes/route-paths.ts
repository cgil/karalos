export const routePaths = {
  basename: process.env.PUBLIC_URL,
  home: "/",
  admin: "/admin/*",
  adminUpload: "upload",
  adminManage: "manage",
  signIn: "/sign-in",
} as const;

export const defaultRoutePath = routePaths.home;

export const getFullPath = (path: string) => routePaths.basename + path;

export const routePaths = {
  basename: "",
  home: "/",
  admin: "/admin/*",
  adminUpload: "upload",
  adminManage: "manage",
  signIn: "/sign-in",
} as const;

export const defaultRoutePath = routePaths.home;

export const getFullPath = (path: string) => routePaths.basename + path;

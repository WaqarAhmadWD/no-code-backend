import { lazy } from "react";
const routes = [
  {
    path: "/login",
    Element: lazy(() => import("./views/auth/login")),
    isAuth: true,
    isPublic: true,
    name:"user",
  },
  {
    path: "/register",
    Element: lazy(() => import("./views/auth/register")),
    isAuth: true,
    name:"user",
  },
  {
    path: "/forget",
    Element: lazy(() => import("./views/auth/forget")),
    isAuth: true,
    isPublic: true,
    name:"user",
  },
  {
    path: "/reset",
    Element: lazy(() => import("./views/auth/reset")),
    isAuth: true,
    isPublic: true,
    name:"user",
  },
  { path: "/", Element: lazy(() => import("./views")), name:"dashboard" },
  {
    path: "/manage",
    Element: lazy(() => import("./views/dashboard/userManagment")),
    name:"user"
  },
  {
    path: "/setting",
    Element: lazy(() => import("./views/dashboard/setting")),
    name:"setting"
  },

  { path: "/*", Element: lazy(() => import("./views/NotFound")) },
];
export default routes;

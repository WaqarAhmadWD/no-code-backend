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
    path: "/user-permissions",
    Element: lazy(() => import("./views/dashboard/userPermission")),
    name:"assign_roles_user"
  },
  {
    path: "/company",
    Element: lazy(() => import("./views/dashboard/companies")),
    name:"company"
  },
  {
    path: "/company-add",
    Element: lazy(() => import("./views/dashboard/companies/Form")),
    name:"company"
  },
  {
    path: "/company/:id/:name",
    Element: lazy(() => import("./views/dashboard/companies/EditForm")),
    name:"company"
  },
  { path: "/role", Element: lazy(() => import("./views/dashboard/userroles")), name:"role" },
  { path: "/group", Element: lazy(() => import("./views/dashboard/group")), name:"group" },
  {
    path: "/permissions",
    Element: lazy(() => import("./views/dashboard/permissions")),
    name:"assign_roles_module"
  },
  {
    path: "/role-form-permissions/:id/:name",
    Element: lazy(() => import("./views/dashboard/permissions/FormEdit")),
    name:"assign_roles_module"
  },
  { path: "/type", Element: lazy(() => import("./views/dashboard/Type")), name:"type" },
  {
    path: "/type-form-add",
    Element: lazy(() => import("./views/dashboard/Type/Form")),
    name:"type"
  },
  {
    path: "/type-form/:id/:name",
    Element: lazy(() => import("./views/dashboard/Type/FormEdit")),
    name:"type"
  },
  {
    path: "/investment",
    Element: lazy(() => import("./views/dashboard/investor")),
    name:"investement"
  },
  {
    path: "/balance-sheet",
    Element: lazy(() => import("./views/dashboard/BalanceSheet")),
    name:"balance_sheet"
  },
  {
    path: "/balance-sheet-list/:id",
    Element: lazy(() => import("./views/dashboard/BalanceSheet/List")),
    name:"balance_sheet"
  },
  {
    path: "/investor",
    Element: lazy(() => import("./views/dashboard/investors")),
    name:"investor"
  },
  {
    path: "/investor-add",
    Element: lazy(() => import("./views/dashboard/investors/Form")),
    name:"investor"
  },
  {
    path: "/investor/:id/:name",
    Element: lazy(() => import("./views/dashboard/investors/EditForm")),
    name:"investor"
  },
  {
    path: "/user-assign-group",
    Element: lazy(() => import("./views/dashboard/assign_user_group")),
    name:"assign_user_group"
  },
  {
    path: "/assign-company-group",
    Element: lazy(() => import("./views/dashboard/assign_company_group")),
    name:"assign_company_group"
  },
  {
    path: "/setting",
    Element: lazy(() => import("./views/dashboard/setting")),
    name:"setting"
  },
  {
    path: "/assign-company-group/:id/:name",
    Element: lazy(() => import("./views/dashboard/assign_company_group/EditForm")),
    name:"assign_company_group"
  },
  { path: "/*", Element: lazy(() => import("./views/NotFound")) },
];
export default routes;

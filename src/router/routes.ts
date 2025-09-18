// src/router/routes.js // Asumiendo una carpeta `pages` para páginas genéricas

import NotFoundPage from "../config/NotFoundPage";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";

export const publicRoutes = [
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
  /* {
    path: '/register',
    //component: RegisterPage,
    exact: true,
  }, */
];

export const privateRoutes = [
  {
    path: '/dashboard',
    component: DashboardPage,
    exact: true,
  },
  /* {
    path: '/settings',
    //component: SettingsPage,
    exact: true,
  }, */
];

export const fallbackRoutes = [
  {
    path: '*',
    component: NotFoundPage
  },
];
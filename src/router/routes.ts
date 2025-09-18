import { lazy } from 'react';

// Lazy load de las páginas
const NotFoundPage = lazy(() => import('../config/NotFoundPage'));

const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'));
const LandingPage = lazy(() => import('../features/main/pages/LandingPage'));
const OnBoardingPage = lazy(() => import('../features/onboarding/pages/OnBoardingPage'));
const InviteUserPage = lazy(() => import('../features/onboarding/pages/InviteUserPage'));
const OrganizationPage = lazy(() => import('../features/dashboard/pages/OrganizationsPage'));
// const ExamplePage = lazy(() => import('../features/auth/pages/ExamplePage'));

export const publicRoutes = [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
  
  {
    path: '/register',
    component: RegisterPage,
    exact: true,
  },
  {
    path: '/invite',
    component: InviteUserPage,
    exact: true,
  },
  
];

export const privateRoutes = [
  {
    path: '/dashboard',
    component: DashboardPage,
    exact: true,
  },
  {
    path: '/dashboard/organizations',
    component: OrganizationPage,
    exact: true,
  },
  {
    path: '/onboarding',
    component: OnBoardingPage,
    exact: true,
  }
];

export const fallbackRoutes = [
  {
    path: '*',
    component: NotFoundPage,
  },
];

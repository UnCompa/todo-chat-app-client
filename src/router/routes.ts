import EmailConfirmationPage from '@/features/auth/pages/EmailConfirmationPage';
import ProjectPage from '@/features/dashboard/pages/ProjectPage';
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
const TaskEditorPage = lazy(() => import('../features/dashboard/pages/TaskEditorPage'));
const EditTaskEditorPage = lazy(() => import('../features/dashboard/pages/EditTaskEditorPage'));
const ProfilePage = lazy(() => import('../features/dashboard/pages/ProfilePage'));
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
    path: '/email-confirmation',
    component: EmailConfirmationPage,
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
    path: '/dashboard/tasks',
    component: TaskEditorPage,
    exact: true,
  },
  {
    path: '/dashboard/tasks/:id',
    component: EditTaskEditorPage,
    //exact: true,
  },
  {
    path: '/dashboard/profile',
    component: ProfilePage,
    exact: true,
  },
  {
    path: '/dashboard/projects',
    component: ProjectPage,
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

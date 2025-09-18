// src/router/AppRouter.js
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingPage from '../features/main/pages/LoadingPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { fallbackRoutes, privateRoutes, publicRoutes } from './routes';

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>

      <Routes>
        {
          publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={< PublicRoute > {< route.component />} </PublicRoute>
              }
            />
          ))}
        {
          privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <route.component />
                </ProtectedRoute>
              }
            />
          ))}
        {
          fallbackRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={< route.component />}
            />
          ))}
      </Routes>
    </Suspense>

  );
};

export default AppRouter;
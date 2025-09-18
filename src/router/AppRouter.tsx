// src/router/AppRouter.js
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { fallbackRoutes, privateRoutes, publicRoutes } from './routes';

const AppRouter = () => {
  return (

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
            element={< ProtectedRoute > {< route.component />} </ProtectedRoute>}
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

  );
};

export default AppRouter;
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = () => {
  const location = useLocation();
  const auth = useAuth();
  return auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

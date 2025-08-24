import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const AuthWelcome = React.lazy(() => import('@/pages/auth/Welcome'));

// Layout components
const AppLayout = React.lazy(() => import('@/components/layout/AppLayout'));
const AuthLayout = React.lazy(() => import('@/components/layout/AuthLayout'));

// Loading component for suspense
const PageLoader: React.FC = () => (
  <Center h="100vh">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.500"
      size="xl"
    />
  </Center>
);

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: Implement auth check
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to={'/auth/welcome'} replace />;
  }

  return <>{children}</>;
};

// Public route wrapper (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Implement auth check
  const isAuthenticated = false; // Placeholder

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <Suspense fallback={<PageLoader />}>
                <AuthLayout>
                  <Routes>
                    <Route path="welcome" element={<AuthWelcome />} />
                    <Route
                      path="*"
                      element={<Navigate to="welcome" replace />}
                    />
                  </Routes>
                </AuthLayout>
              </Suspense>
            </PublicRoute>
          }
        />

        {/* Protected routes - Main app */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <AppLayout>
                  <Routes>
                    <Route index element={<Dashboard />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AppLayout>
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

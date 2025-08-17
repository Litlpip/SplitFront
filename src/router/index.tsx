import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';
import { ROUTES } from '@/constants';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const AuthWelcome = React.lazy(() => import('@/pages/auth/Welcome'));
const AuthRegister = React.lazy(() => import('@/pages/auth/Register'));
const AuthVerify = React.lazy(() => import('@/pages/auth/Verify'));
const AuthProfileSetup = React.lazy(() => import('@/pages/auth/ProfileSetup'));
const GroupsList = React.lazy(() => import('@/pages/groups/GroupsList'));
const GroupDetails = React.lazy(() => import('@/pages/groups/GroupDetails'));
const CreateGroup = React.lazy(() => import('@/pages/groups/CreateGroup'));
const AddExpense = React.lazy(() => import('@/pages/expenses/AddExpense'));
const ExpenseDetails = React.lazy(() => import('@/pages/expenses/ExpenseDetails'));
const DebtsList = React.lazy(() => import('@/pages/debts/DebtsList'));
const SettleDebt = React.lazy(() => import('@/pages/debts/SettleDebt'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const OfflinePage = React.lazy(() => import('@/pages/OfflinePage'));

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
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Implement auth check
  const isAuthenticated = false; // Placeholder
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.WELCOME} replace />;
  }
  
  return <>{children}</>;
};

// Public route wrapper (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Implement auth check
  const isAuthenticated = false; // Placeholder
  
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes - Auth */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <Suspense fallback={<PageLoader />}>
                <AuthLayout>
                  <Routes>
                    <Route path="welcome" element={<AuthWelcome />} />
                    <Route path="register" element={<AuthRegister />} />
                    <Route path="verify" element={<AuthVerify />} />
                    <Route path="profile-setup" element={<AuthProfileSetup />} />
                    <Route path="*" element={<Navigate to="welcome" replace />} />
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
                    {/* Dashboard */}
                    <Route index element={<Dashboard />} />
                    
                    {/* Groups */}
                    <Route path="groups" element={<GroupsList />} />
                    <Route path="groups/:id" element={<GroupDetails />} />
                    <Route path="groups/create" element={<CreateGroup />} />
                    
                    {/* Expenses */}
                    <Route path="expenses/add" element={<AddExpense />} />
                    <Route path="expenses/:id" element={<ExpenseDetails />} />
                    
                    {/* Debts */}
                    <Route path="debts" element={<DebtsList />} />
                    <Route path="debts/:id/settle" element={<SettleDebt />} />
                    
                    {/* Profile */}
                    <Route path="profile" element={<Profile />} />
                    
                    {/* Offline page */}
                    <Route path="offline" element={<OfflinePage />} />
                    
                    {/* Catch all - redirect to dashboard */}
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
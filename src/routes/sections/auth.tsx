import { lazy, Suspense } from 'react';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const LoginPage = lazy(() => import('src/pages/SignIn'));
const ResetPasswordPage = lazy(() => import('src/pages/ResetPassword/resetPassword'));
const ForgotPasswordPage = lazy(() => import('src/pages/ResetPassword/forgotPassword'));

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'sign-in',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'Hi, Welcome MineTXC' }}>
            <LoginPage />
          </AuthSplitLayout>
        </GuestGuard>
      </Suspense>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'Hi, Welcome MineTXC' }}>
            <ForgotPasswordPage />
          </AuthSplitLayout>
        </GuestGuard>
      </Suspense>
    ),
  },
  {
    path: 'reset-password',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'Hi, Welcome MineTXC' }}>
            <ResetPasswordPage />
          </AuthSplitLayout>
        </GuestGuard>
      </Suspense>
    ),
  },
];

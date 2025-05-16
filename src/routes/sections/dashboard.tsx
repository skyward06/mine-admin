import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { paths } from '../paths';

// ----------------------------------------------------------------------
const UserListPage = lazy(() => import('src/pages/User/List'));
const UserCreatePage = lazy(() => import('src/pages/User/Create'));
const UserEditPage = lazy(() => import('src/pages/User/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const MemberListPage = lazy(() => import('src/pages/Member/List'));
const MemberCreatePage = lazy(() => import('src/pages/Member/Create'));
const MemberEditPage = lazy(() => import('src/pages/Member/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const SaleListPage = lazy(() => import('src/pages/Sale/List'));
const SaleCreatePage = lazy(() => import('src/pages/Sale/Create'));
const SaleEditPage = lazy(() => import('src/pages/Sale/Edit'));
const SaleLogPage = lazy(() => import('src/pages/Sale/Log'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const DashboardPage = lazy(() => import('src/pages/Dashboard'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const RewardPage = lazy(() => import('src/pages/Reward/List'));
const RewardCreatePage = lazy(() => import('src/pages/Reward/Create'));
const RewardEditPage = lazy(() => import('src/pages/Reward/Edit'));
const StatisticsDetailPage = lazy(() => import('src/pages/Reward/Statistics/Detail'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const ProductListPage = lazy(() => import('src/pages/Product/List'));
const ProductCreatePage = lazy(() => import('src/pages/Product/Create'));
const ProductEditPage = lazy(() => import('src/pages/Product/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const SetAddressListPage = lazy(() => import('src/pages/SetAddress/List'));
const SetAddressCreatePage = lazy(() => import('src/pages/SetAddress/Create'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const InvoiceListPage = lazy(() => import('src/pages/Invoice/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const PlacementListPage = lazy(() => import('src/pages/Placement/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const CommissionPage = lazy(() => import('src/pages/Commission'));
const CommissionDetailPage = lazy(() => import('src/pages/CommissionDetail'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const ResourcePage = lazy(() => import('src/pages/Resource/List'));
const ResourceDetailPage = lazy(() => import('src/pages/Resource/Detail'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const ProofListPage = lazy(() => import('src/pages/Proof/List'));
const ProofCreatePage = lazy(() => import('src/pages/Proof/Create'));
const ProofEditPage = lazy(() => import('src/pages/Proof/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const PromosListPage = lazy(() => import('src/pages/Promos/List'));
const PromoCreatePage = lazy(() => import('src/pages/Promos/Create'));
const PromoEditPage = lazy(() => import('src/pages/Promos/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const GroupSettingsListPage = lazy(() => import('src/pages/GroupSettings/List'));
const GroupSettingsCreatePage = lazy(() => import('src/pages/GroupSettings/Create'));
const GroupSettingsEditPage = lazy(() => import('src/pages/GroupSettings/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const PaymentListPage = lazy(() => import('src/pages/PaymentMethod/List'));
const PaymentCreatePage = lazy(() => import('src/pages/PaymentMethod/Create'));
const PaymentEditPage = lazy(() => import('src/pages/PaymentMethod/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const PaymentPage = lazy(() => import('src/pages/Payment'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const BugPage = lazy(() => import('src/pages/Bug/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const LogPage = lazy(() => import('src/pages/Logs/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const CommunicationListPage = lazy(() => import('src/pages/Communication/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const RoleListPage = lazy(() => import('src/pages/Role/List'));
const RoleCreatePage = lazy(() => import('src/pages/Role/Create'));
const RoleEditPage = lazy(() => import('src/pages/Role/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const SponsorListPage = lazy(() => import('src/pages/Sponsor/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const ReportListPage = lazy(() => import('src/pages/Report/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const NotificationListPage = lazy(() => import('src/pages/Notification/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const CalculatorPage = lazy(() => import('src/pages/Calculator'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const CampaignPage = lazy(() => import('src/pages/Campaign'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const TemplateCreatePage = lazy(() => import('src/pages/Template/Create'));
const TemplateEditPage = lazy(() => import('src/pages/Template/Edit'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const AutoCampaignCreatePage = lazy(() => import('src/pages/AutoCampaign/Create'));
const AutoCampaignEditPage = lazy(() => import('src/pages/AutoCampaign/Edit'));
// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to={paths.dashboard.history.root} replace />, index: true },
      {
        path: 'dashboard',
        children: [{ index: true, element: <DashboardPage /> }],
      },
      {
        path: 'miners',
        children: [
          { index: true, element: <MemberListPage /> },
          { path: 'new', element: <MemberCreatePage /> },
          { path: ':id', element: <MemberEditPage /> },
        ],
      },
      {
        path: 'products',
        children: [
          { index: true, element: <ProductListPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'set-address',
        children: [
          { index: true, element: <SetAddressListPage /> },
          { path: 'new', element: <SetAddressCreatePage /> },
        ],
      },
      {
        path: 'sales',
        children: [
          { index: true, element: <SaleListPage /> },
          { path: 'new', element: <SaleCreatePage /> },
          { path: ':id', element: <SaleEditPage /> },
          { path: 'log/:id', element: <SaleLogPage /> },
        ],
      },
      {
        path: 'roles',
        children: [
          { index: true, element: <RoleListPage /> },
          { path: 'new', element: <RoleCreatePage /> },
          { path: ':id', element: <RoleEditPage /> },
        ],
      },
      {
        path: 'sponsor',
        children: [{ index: true, element: <SponsorListPage /> }],
      },
      {
        path: 'placement',
        children: [{ index: true, element: <PlacementListPage /> }],
      },
      {
        path: 'commission',
        children: [
          { index: true, element: <CommissionPage /> },
          { path: ':id', element: <CommissionDetailPage /> },
        ],
      },
      {
        path: 'resource',
        children: [
          { index: true, element: <ResourcePage /> },
          { path: ':slug', children: [{ index: true, element: <ResourceDetailPage /> }] },
        ],
      },
      {
        path: 'proof',
        children: [
          { index: true, element: <ProofListPage /> },
          { path: 'new', element: <ProofCreatePage /> },
          { path: ':id', element: <ProofEditPage /> },
        ],
      },
      {
        path: 'promos',
        children: [
          { index: true, element: <PromosListPage /> },
          { path: 'new', element: <PromoCreatePage /> },
          { path: ':id', element: <PromoEditPage /> },
        ],
      },
      {
        path: 'group-settings',
        children: [
          { index: true, element: <GroupSettingsListPage /> },
          { path: 'new', element: <GroupSettingsCreatePage /> },
          { path: ':id', element: <GroupSettingsEditPage /> },
        ],
      },
      {
        path: 'payment',
        children: [{ index: true, element: <PaymentPage /> }],
      },
      {
        path: 'bug-report',
        children: [{ index: true, element: <BugPage /> }],
      },
      {
        path: 'logs',
        children: [{ index: true, element: <LogPage /> }],
      },
      {
        path: 'method',
        children: [
          { index: true, element: <PaymentListPage /> },
          { path: 'new', element: <PaymentCreatePage /> },
          { path: ':id', element: <PaymentEditPage /> },
        ],
      },
      {
        path: 'reward',
        children: [
          { index: true, element: <RewardPage /> },
          {
            path: 'new',
            children: [
              { index: true, element: <RewardCreatePage /> },
              { path: ':id', element: <RewardEditPage /> },
            ],
          },
          {
            path: 'statistics',
            children: [{ path: ':id', element: <StatisticsDetailPage /> }],
          },
        ],
      },
      {
        path: 'communication',
        children: [{ index: true, element: <CommunicationListPage /> }],
      },
      {
        path: 'reports',
        children: [{ index: true, element: <ReportListPage /> }],
      },
      {
        path: 'invoices',
        children: [{ index: true, element: <InvoiceListPage /> }],
      },
      {
        path: 'template',
        children: [
          { path: 'new', element: <TemplateCreatePage /> },
          { path: ':id', element: <TemplateEditPage /> },
        ],
      },
      {
        path: 'campaign',
        children: [{ path: ':id', element: <CampaignPage /> }],
      },
      {
        path: 'auto-campaign',
        children: [
          { path: 'new', element: <AutoCampaignCreatePage /> },
          { path: ':id', element: <AutoCampaignEditPage /> },
        ],
      },
      {
        path: 'users',
        children: [
          { index: true, element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          {
            path: ':id',
            children: [
              { index: true, element: <Navigate to="general" replace /> },
              {
                path: ':tab',
                element: <UserEditPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'notifications',
        element: (
          <AuthGuard>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </AuthGuard>
        ),
        children: [{ index: true, element: <NotificationListPage /> }],
      },
      {
        path: 'calculator',
        element: (
          <AuthGuard>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </AuthGuard>
        ),
        children: [{ index: true, element: <CalculatorPage /> }],
      },
    ],
  },
];

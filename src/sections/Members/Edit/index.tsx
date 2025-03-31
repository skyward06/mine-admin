import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { PERMISSIONS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import { useAuthContext } from 'src/auth/hooks';

import Log from './Log';
import Sale from './Sale';
import Note from './Note';
import History from './History';
import Sponsor from './Sponsor';
import Placement from './Placement';
import BalanceList from './Balance';
import Commission from './Commission';
import MemberGeneral from './General';
import { useFetchMember } from '../useApollo';

// ----------------------------------------------------------------------
export default function MemberEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthContext();

  const TABS = [
    {
      value: 'history',
      label: 'History',
      icon: <Iconify icon="carbon:analytics" width={24} />,
    },
    { value: 'edit', label: 'Edit', icon: <Iconify icon="solar:pen-2-bold" width={24} /> },
    { value: 'sponsor', label: 'Sponsor', icon: <Iconify icon="bi:diagram-3" /> },
    { value: 'placement', label: 'Placement', icon: <Iconify icon="clarity:flow-chart-line" /> },
    { value: 'balance', label: 'Balance', icon: <Iconify icon="bx:transfer" /> },
    { value: 'log', label: 'Log', icon: <Iconify icon="ri:history-line" /> },
    { value: 'note', label: 'Note', icon: <Iconify icon="mdi:event-note-outline" /> },
    { value: 'coomunication', label: 'Communication', icon: <Iconify icon="lucide:send" /> },
  ];

  if (
    user?.role?.sale !== (PERMISSIONS.VIEWER_PERMISSION.value && PERMISSIONS.NONE_PERMISSION.value)
  ) {
    TABS.push({ value: 'sale', label: 'Sale', icon: <Iconify icon="bi:currency-exchange" /> });
  }

  if (
    user?.role?.commission !==
    (PERMISSIONS.VIEWER_PERMISSION.value && PERMISSIONS.NONE_PERMISSION.value)
  ) {
    TABS.push({
      value: 'commission',
      label: 'Commission',
      icon: <Iconify icon="fluent:reward-32-regular" />,
    });
  }

  const tabs = useTabs('history');
  const params = useParams();
  const navigate = useNavigate();

  // const [fetchMemberQuery, { loading, data, called }] = useLazyQuery(FETCH_MEMBERS_QUERY);
  const { loading, member, called, fetchMember } = useFetchMember();

  const { id: memberId } = params;

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);
    navigate(`${paths.dashboard.members.root}/${memberId}`, { replace: true });
  };

  useEffect(() => {
    fetchMember({ variables: { data: { id: memberId! }, logsize: 100 } });
  }, [fetchMember, memberId]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!member) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: ${member.username}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading={member.username}
          links={[{ name: 'Miner', href: paths.dashboard.members.root }, { name: member.username }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'edit' && <MemberGeneral currentMember={member} />}

        {tabs.value === 'history' && <History currentMember={member} />}

        {tabs.value === 'sale' && <Sale />}

        {tabs.value === 'sponsor' && <Sponsor currentMember={member} />}

        {tabs.value === 'placement' && <Placement currentMember={member} />}

        {tabs.value === 'commission' && <Commission currentMember={member} />}

        {tabs.value === 'balance' && <BalanceList />}

        {tabs.value === 'log' && <Log loading={loading} currentMember={member} />}

        {tabs.value === 'note' && <Note currentMember={member} />}
      </DashboardContent>
    </>
  );
}

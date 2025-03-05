import { useMemo, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import { GroupCard } from './GroupCard';
import { useFetchGroupSettings } from '../useApollo';

export default function ProofListView() {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, groupSettings, fetchGroupSettings } = useFetchGroupSettings();

  useEffect(() => {
    fetchGroupSettings({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Group Settings"
        links={[
          { name: 'Group Settings', href: paths.dashboard.groupSettings.root },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.groupSettings.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Group
          </Button>
        }
      />

      {loading ? (
        <LoadingScreen />
      ) : (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
        >
          {groupSettings.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </Box>
      )}
    </DashboardContent>
  );
}

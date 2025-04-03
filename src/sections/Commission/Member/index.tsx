import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { useQuery } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';

import { customizeDate } from 'src/utils/format-time';

import { COMMISSION_TYPE } from 'src/consts';

import { ConfirmDialog } from 'src/components/Dialog';
import { Label, type LabelColor } from 'src/components/Label';

import CommissionTable from './CommissionTable';
import { useFetchCommissionStats } from '../useApollo';
import SearchPeriod from '../../Placement/List/searchPeriod';

import type { CommissionRole } from './types';

interface Props {
  openWeek: UseBooleanReturn;
  setStatus: Function;
}

const TABS: { value: CommissionRole; label: string; color: LabelColor }[] = [
  { value: 'pending', label: 'Pending', color: 'info' },
  { value: 'approved', label: 'Approved', color: 'info' },
  { value: 'declined', label: 'Declined', color: 'error' },
];

export default function CommissionMemberListView({ openWeek, setStatus }: Props) {
  const tabs = useTabs('pending');
  const [customFilter, setCustomFilter] = useState<any>();

  const { data, fetchCommissionStats } = useFetchCommissionStats();

  const [query, { setQueryParams: setQuery }] = useQuery<any>();

  const {
    filter = { status: 'pending' },
    weekStartDate = customizeDate(`${dayjs().utc().endOf('week')}`),
  } = query;

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);

    setStatus(tabs.value.toUpperCase());
  };

  const onPeriodChange = (value: any) => {
    setCustomFilter({
      weekStartDate: {
        lt: customizeDate(`${dayjs(value).utc().endOf('week')}`),
      },
    });

    setQuery({
      ...query,
      weekStartDate: customizeDate(`${dayjs(value).utc().endOf('week')}`),
    });

    openWeek.onFalse();
  };

  useEffect(() => {
    fetchCommissionStats({
      variables: {
        declinedFilter: {
          status: COMMISSION_TYPE.DECLINED.label,
          weekStartDate: { lt: weekStartDate },
        },
        pendingFilter: {
          status: COMMISSION_TYPE.PENDING.label,
          weekStartDate: { lt: weekStartDate },
        },
        approvedFilter: {
          status: COMMISSION_TYPE.APPROVED.label,
          weekStartDate: { lt: weekStartDate },
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStartDate]);

  return (
    <>
      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tabs.value}
          onChange={handleTabChange}
          orientation="vertical"
          sx={{
            minWidth: 150,
            borderRight: 1,
            borderColor: 'divider',
            [`& .MuiTabs-flexContainer`]: { gap: 0 },
            [`& .MuiTabs-flexContainerVertical`]: {
              padding: '16px 4px 16px 16px',
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              label={
                <Stack direction="row" flexGrow={1}>
                  {tab.label}
                </Stack>
              }
              value={tab.value}
              icon={
                <Label
                  variant={(tab.value === filter.status && 'filled') || 'soft'}
                  color={tab.color}
                >
                  {data ? data[tab.value].total! : 0}
                </Label>
              }
            />
          ))}
        </Tabs>

        <CommissionTable tabs={tabs.value} customFilter={customFilter} />
      </Card>

      <ConfirmDialog
        open={openWeek.value}
        onClose={openWeek.onFalse}
        title="Select Week"
        content={<SearchPeriod current={weekStartDate} onChange={onPeriodChange} />}
        action={null}
      />
    </>
  );
}

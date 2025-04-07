import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useQuery } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { customizeDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';

import SearchPeriod from 'src/sections/Placement/List/searchPeriod';
import { useFetchGroupSettings } from 'src/sections/GroupSettings/useApollo';

import MemberList from './MemberList';
import CreateMemberList from './Create';
import RemoveMemberList from './Remove';
import { useFetchMemberList } from '../useApollo';

export function MemberListView() {
  const open = useBoolean();
  const remove = useBoolean();
  const openWeek = useBoolean();
  const tabs = useTabs('general.all');
  const [filter, setFilter] = useState<any>();
  const [listId, setListId] = useState<string>('');
  const [weekly, setWeekly] = useState<boolean>(false);

  const [query, { setQueryParams: setQuery }] = useQuery();

  const { memberList, fetchMemberList } = useFetchMemberList();
  const { groupSettings, fetchGroupSettings } = useFetchGroupSettings();

  const weekStartDate = customizeDate(`${dayjs().startOf('week')}`);

  const TABS = useMemo(
    () => [
      { value: 'general.all', label: 'All' },
      {
        value: 'general.weeklySponsors',
        label: (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">Weekly Sponsors</Typography>
            <IconButton onClick={openWeek.onTrue}>
              <Iconify icon="la:calendar-week" />
            </IconButton>
          </Stack>
        ),
      },
      { value: 'general.pending', label: 'Pending Manual Commission' },
      ...(groupSettings && groupSettings.length > 0
        ? groupSettings.map((group) => ({
            value: `group.${group.name.toLocaleLowerCase()}`,
            label: group.name,
          }))
        : []),

      ...(memberList && memberList.length > 0
        ? memberList.map((list) => ({
            value: `list.${list.id.toLocaleLowerCase()}`,
            label: list.name,
          }))
        : []),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groupSettings, memberList]
  );

  const handleTabChange = (event: any, newValue: any) => {
    tabs.onChange(event, newValue);

    const [prefix, suffix] = newValue.split('.');

    if (prefix === 'general') {
      setListId('');
      setWeekly(false);

      if (suffix === 'all') {
        setFilter({});
      }

      if (suffix === 'weeklySponsors') {
        setFilter({
          introduceMembers: {
            some: {
              createdAt: {
                gte: customizeDate(`${dayjs(weekStartDate).utc().startOf('week')}`),
                lt: dayjs(
                  customizeDate(`${dayjs(weekStartDate).utc().endOf('week').add(1, 'day')}`)
                ),
              },
              status: true,
            },
          },
        });
      }

      if (suffix === 'pending') {
        setWeekly(true);
        setFilter({
          status: 'PENDING',
          commissionDefault: 'MANUAL',
        });
      }
    }

    if (prefix === 'group') {
      setListId('');
      setWeekly(false);
      setFilter({ groupSetting: { name: { contains: suffix, mode: 'insensitive' } } });
    }

    if (prefix === 'list') {
      setListId(suffix);
      setWeekly(false);
    }
  };

  const onPeriodChange = (value: any) => {
    setQuery({
      ...query,
      weekStartDate: customizeDate(`${dayjs(value).utc().startOf('week')}`),
    });

    setFilter({
      introduceMembers: {
        some: {
          createdAt: {
            gte: customizeDate(`${dayjs(query?.weekStartDate).utc().startOf('week')}`),
            lt: dayjs(
              customizeDate(`${dayjs(query?.weekStartDate).utc().endOf('week').add(1, 'day')}`)
            ),
          },
          status: true,
        },
      },
    });

    openWeek.onFalse();
  };

  useEffect(() => {
    fetchMemberList();
    fetchGroupSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <Box textAlign="center">
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
                padding: '16px',
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                label={
                  <Stack direction="row" flexGrow={1}>
                    {tab.label}
                  </Stack>
                }
                value={tab.value}
              />
            ))}
          </Tabs>
          <Stack direction="row" justifyContent="center" spacing={1}>
            <IconButton color="success" onClick={open.onTrue}>
              <Iconify icon="gridicons:add-outline" />
            </IconButton>
            <IconButton color="error" onClick={remove.onTrue}>
              <Iconify icon="mingcute:minus-circle-line" />
            </IconButton>
          </Stack>
        </Box>

        <MemberList filter={filter} listId={listId} weekly={weekly} />
      </Card>

      <CreateMemberList open={open} />
      <RemoveMemberList open={remove} />

      <ConfirmDialog
        open={openWeek.value}
        onClose={openWeek.onFalse}
        title="Select Week"
        content={
          <SearchPeriod
            current={`${dayjs(query?.weekStartDate).utc().add(1, 'day')}`}
            onChange={onPeriodChange}
          />
        }
        action={null}
      />
    </>
  );
}

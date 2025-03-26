import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { customizeDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import { useFetchGroupSettings } from 'src/sections/GroupSettings/useApollo';

import MemberList from './MemberList';
import CreateMemberList from './Create';
import { useFetchMemberList } from '../useApollo';

export function MemberListView() {
  const open = useBoolean();
  const tabs = useTabs('general.all');
  const [filter, setFilter] = useState<any>();
  const [listId, setListId] = useState<string>('');
  const [weekly, setWeekly] = useState<boolean>(false);

  const { memberList, fetchMemberList } = useFetchMemberList();
  const { groupSettings, fetchGroupSettings } = useFetchGroupSettings();

  const weekStartDate = customizeDate(`${dayjs().startOf('week')}`);

  const TABS = useMemo(
    () => [
      { value: 'general.all', label: 'All' },
      { value: 'general.weeklySponsors', label: 'Weekly Sponsors' },
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
                gte: customizeDate(`${dayjs(weekStartDate).startOf('week')}`),
                lt: dayjs(customizeDate(`${dayjs(weekStartDate).endOf('week')}`)),
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
          member: {
            commissionDefault: 'MANUAL',
          },
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
          <IconButton color="success" onClick={open.onTrue}>
            <Iconify icon="gridicons:add-outline" />
          </IconButton>
        </Box>

        <MemberList filter={filter} listId={listId} weekly={weekly} />
      </Card>

      <CreateMemberList open={open} />
    </>
  );
}

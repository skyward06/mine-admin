import dayjs from 'dayjs';
import React, { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useTabs } from 'src/hooks/use-tabs';

import { customizeDate } from 'src/utils/format-time';

import { useFetchGroupSettings } from 'src/sections/GroupSettings/useApollo';

import MemberList from './MemberList';
import { useFetchMemberList } from '../../../useApollo';

interface Props {
  setEmails: Function;
}

export function MemberListView({ setEmails }: Props) {
  const tabs = useTabs('general.all');
  const [filter, setFilter] = useState<any>();
  const [listId, setListId] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('general.all');

  const { memberList, fetchMemberList } = useFetchMemberList();
  const { groupSettings, fetchGroupSettings } = useFetchGroupSettings();

  const weekStartDate = customizeDate(`${dayjs().startOf('week')}`);

  const TABS = useMemo(
    () => [
      { value: 'general.all', label: 'All' },
      { value: 'general.weeklySponsors', label: 'Weekly Sponsors' },

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
    }

    if (prefix === 'group') {
      setListId('');
      setFilter({ groupSetting: { name: { contains: suffix, mode: 'insensitive' } } });
    }

    if (prefix === 'list') {
      setListId(suffix);
    }
  };

  const handleCheckboxChange = (tabValue: string) => {
    setSelectedTab(tabValue); // Update the selected tab value
  };

  useEffect(() => {
    fetchMemberList();
    fetchGroupSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
            minWidth: 200,
            borderRight: 1,
            borderColor: 'divider',
            [`& .MuiTabs-flexContainer`]: { gap: 0 },
            [`& .MuiTabs-flexContainerVertical`]: {
              padding: '16px 0px 16px 10px',
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <Stack direction="row" flexGrow={1} alignItems="center" sx={{ pl: 1.5 }}>
                  <FormControlLabel
                    control={<Checkbox checked={selectedTab === tab.value} />}
                    label={tab.label}
                    onChange={() => handleCheckboxChange(tab.value)}
                    sx={{ mr: 1 }}
                  />
                </Stack>
              }
              value={tab.value}
            />
          ))}
        </Tabs>
      </Box>

      <MemberList filter={filter} listId={listId} setEmails={setEmails} />
    </Card>
  );
}

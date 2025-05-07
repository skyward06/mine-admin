import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { type MemberList, CampaignListType, type GroupSetting } from 'src/__generated__/graphql';

import { useFetchGroupSettings } from 'src/sections/GroupSettings/useApollo';

import { useFetchMemberList } from '../../useApollo';

interface Props {
  sender: string;
  status: boolean;
  subject: string;
  listType: string;
  listExtra: string;
  setSender: Function;
  setStatus: Function;
  setSubject: Function;
  setListType: Function;
  setListExtra: Function;
}

export default function MainFields({
  sender,
  status,
  subject,
  listType,
  listExtra,
  setSender,
  setStatus,
  setSubject,
  setListType,
  setListExtra,
}: Props) {
  const { memberList, fetchMemberList } = useFetchMemberList();
  const { groupSettings, fetchGroupSettings } = useFetchGroupSettings();

  const handleListTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListType(event.target.value);
    if (
      event.target.value === CampaignListType.All ||
      event.target.value === CampaignListType.WeeklySponsor ||
      event.target.value === CampaignListType.PendingManualCommission
    ) {
      setListExtra('');
    }
  };

  useEffect(() => {
    fetchMemberList();
    fetchGroupSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      rowGap={2}
      columnGap={2}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
    >
      <TextField
        label="Subject"
        size="small"
        fullWidth
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
      />
      <TextField
        label="Sender"
        size="small"
        fullWidth
        value={sender}
        onChange={(event) => setSender(event.target.value)}
      />
      <TextField
        label="List Type"
        select
        size="small"
        fullWidth
        value={listType}
        onChange={handleListTypeChange}
      >
        {Object.keys(CampaignListType).map((key) => (
          <MenuItem key={key} value={CampaignListType[key as keyof typeof CampaignListType]}>
            {key}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="List Extra"
        select
        size="small"
        value={listExtra}
        fullWidth
        onChange={(event) => setListExtra(event.target.value)}
      >
        {listType === CampaignListType.Group &&
          groupSettings.map((group: GroupSetting) => (
            <MenuItem key={group.id} value={group.name}>
              {group.name}
            </MenuItem>
          ))}
        {listType === CampaignListType.Custom &&
          memberList.map((list: MemberList) => (
            <MenuItem key={list.id} value={list.name}>
              {list.name}
            </MenuItem>
          ))}
        {(listType === CampaignListType.PendingManualCommission ||
          listType === CampaignListType.WeeklySponsor ||
          listType === CampaignListType.All) && (
          <MenuItem key="none" value="">
            None
          </MenuItem>
        )}
      </TextField>

      <Stack direction="row" alignItems="center" mb={2}>
        <Checkbox value={status} checked={status} onChange={(_, checked) => setStatus(checked)} />
        <Typography variant="body2">{status ? 'Enabled' : 'Disabled'}</Typography>
      </Stack>
    </Box>
  );
}

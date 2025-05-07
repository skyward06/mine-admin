import type { IDatePickerControl } from 'src/types/common';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import { CampaignListType } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';

import MainFields from './MainFields';
import ProContent from './ProContent';
import WeekPicker from './WeekPicker';
import { useCreateSchedule } from '../../useApollo';
import { Templates } from '../../Campaign/Send/Templates';

import type { WeekType } from './type';

interface Props {
  open: UseBooleanReturn;
}

export default function CampaignCreate({ open }: Props) {
  const [pro, setPro] = useState<boolean>(false);
  const [when, setWhen] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);
  const [listExtra, setListExtra] = useState<string>('');
  const [templateId, setTemplateId] = useState<string>('');
  const [time, setTime] = useState<IDatePickerControl>(dayjs(new Date()));
  const [listType, setListType] = useState<CampaignListType>(CampaignListType.All);
  const [week, setWeek] = useState<WeekType>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const { loading, createSchedule } = useCreateSchedule();

  const weekToString = useMemo(
    () =>
      Object.entries(week)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(','),
    [week]
  );

  const handleTimeChange = (newValue: IDatePickerControl) => {
    setTime(newValue);
  };

  const handleCreateSchedule = async () => {
    try {
      const result = await createSchedule({
        variables: {
          data: {
            status,
            sender,
            subject,
            listType,
            listExtra,
            templateId,
            when: pro
              ? when
              : `${time?.minute()} ${time?.hour()} * * ${weekToString.length ? weekToString : '*'}`,
          },
        },
      });

      if (result.data) {
        toast.success('Schedule created successfully');
        open.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open.value}>
      <DialogTitle>New Schedule</DialogTitle>
      <DialogContent>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1">Pro Editable</Typography>
          <Switch value={pro} onChange={(_, checked) => setPro(checked)} />
        </Stack>
        <Stack sx={{ py: 2 }} direction="row" spacing={2}>
          {!pro && (
            <StaticTimePicker
              orientation="portrait"
              value={time}
              onChange={handleTimeChange}
              slots={{ actionBar: () => null }}
            />
          )}

          <Box width="100%">
            {pro ? <ProContent setWhen={setWhen} /> : <WeekPicker setWeek={setWeek} />}

            <MainFields
              sender={sender}
              status={status}
              subject={subject}
              listType={listType}
              listExtra={listExtra}
              setStatus={setStatus}
              setSender={setSender}
              setSubject={setSubject}
              setListType={setListType}
              setListExtra={setListExtra}
            />

            <Templates setTemplateId={setTemplateId} pagination={false} sx={{ borderRadius: 1 }} />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleCreateSchedule}
        >
          Create
        </LoadingButton>
        <Button variant="soft" onClick={open.onFalse}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

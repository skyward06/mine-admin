import type { IDatePickerControl } from 'src/types/common';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import { useMemo, useState, useEffect } from 'react';

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
import { Templates } from '../../Campaign/Send/Templates';
import { useUpdateSchdule, useCreateSchedule } from '../../useApollo';

import type { Schedule } from '../List/type';
import type { WeekType, WhenType } from './type';

dayjs.extend(utcPlugin);

interface Props {
  current?: Schedule;
  open: UseBooleanReturn;
}

export default function CampaignCreate({ open, current }: Props) {
  const [pro, setPro] = useState<boolean>(false);
  const [sender, setSender] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);
  const [listExtra, setListExtra] = useState<string>('');
  const [templateId, setTemplateId] = useState<string>('');
  const [time, setTime] = useState<IDatePickerControl>(dayjs(new Date()));
  const [listType, setListType] = useState<CampaignListType>(CampaignListType.All);
  const [when, setWhen] = useState<WhenType>({
    minute: '',
    hour: '',
    dayOfMonth: '',
    month: '',
    dayOfWeek: '',
  });
  const [week, setWeek] = useState<WeekType>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const { loading: createLoading, createSchedule } = useCreateSchedule();
  const { loading: updateLoading, updateSchedule } = useUpdateSchdule();

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
      const data = {
        status,
        sender,
        subject,
        listType,
        listExtra,
        templateId,
        when: pro
          ? Object.values(when).join(' ')
          : `${time?.minute()} ${time?.hour()} * * ${weekToString.length ? weekToString : '*'}`,
      };

      const result = current
        ? await updateSchedule({
            variables: { data: { id: current.id, ...data } },
          })
        : await createSchedule({
            variables: {
              data,
            },
          });

      if (result.data) {
        toast.success(`Schedule ${current ? 'updated' : 'created'} successfully`);
        open.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (current) {
      setTime(
        dayjs()
          .hour(Number(current.when.split(' ')[1]))
          .minute(Number(current.when.split(' ')[0]))
          .second(0)
      );

      setWhen({
        minute: current.when.split(' ')[0],
        hour: current.when.split(' ')[1],
        dayOfMonth: current.when.split(' ')[2],
        month: current.when.split(' ')[3],
        dayOfWeek: current.when.split(' ')[4],
      });

      setSender(current.sender);
      setSubject(current.subject);
      setListType(current.listType);
      setListExtra(current?.listExtra ?? '');
      setStatus(current.status);
      setTemplateId(current?.templateId ?? '');

      const whenData = current.when.split(' ')[4]?.split(',');
      setWeek({
        0: whenData?.includes('0') || false,
        1: whenData?.includes('1') || false,
        2: whenData?.includes('2') || false,
        3: whenData?.includes('3') || false,
        4: whenData?.includes('4') || false,
        5: whenData?.includes('5') || false,
        6: whenData?.includes('6') || false,
      });
    }
  }, [current]);

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
            {pro ? (
              <ProContent when={when} setWhen={setWhen} />
            ) : (
              <WeekPicker week={week} setWeek={setWeek} />
            )}

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
          loading={current ? updateLoading : createLoading}
          onClick={handleCreateSchedule}
        >
          {current ? 'Edit' : 'Create'}
        </LoadingButton>
        <Button variant="soft" onClick={open.onFalse}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

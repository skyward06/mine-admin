import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import type { WhenType } from './type';

interface Props {
  when: WhenType;
  setWhen: Function;
}

export default function ProContent({ when, setWhen }: Props) {
  return (
    <Stack direction="row" spacing={2} mb={2}>
      <TextField
        name="minute"
        sx={{ width: 80 }}
        size="small"
        value={when.minute}
        onChange={(event) => setWhen((prev: WhenType) => ({ ...prev, minute: event.target.value }))}
      />
      <TextField
        name="hour"
        sx={{ width: 80 }}
        size="small"
        value={when.hour}
        onChange={(event) => setWhen((prev: WhenType) => ({ ...prev, hour: event.target.value }))}
      />
      <TextField
        name="dayOfMonth"
        sx={{ width: 80 }}
        size="small"
        value={when.dayOfMonth}
        onChange={(event) =>
          setWhen((prev: WhenType) => ({ ...prev, dayOfMonth: event.target.value }))
        }
      />
      <TextField
        name="month"
        sx={{ width: 80 }}
        size="small"
        value={when.month}
        onChange={(event) => setWhen((prev: WhenType) => ({ ...prev, month: event.target.value }))}
      />
      <TextField
        name="dayOfWeek"
        sx={{ width: 80 }}
        size="small"
        value={when.dayOfWeek}
        onChange={(event) =>
          setWhen((prev: WhenType) => ({ ...prev, dayOfWeek: event.target.value }))
        }
      />
    </Stack>
  );
}

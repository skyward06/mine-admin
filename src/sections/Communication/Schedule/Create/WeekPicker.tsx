import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

interface Props {
  setWeek: (week: any) => void;
}

export default function WeekPicker({ setWeek }: Props) {
  const handleWeekSelected = (week: number, isChecked: boolean) => {
    setWeek((prev: any) => ({ ...prev, [week]: isChecked }));
  };

  return (
    <Stack direction="row" mb={2} spacing={2}>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={(_, checked) => handleWeekSelected(0, checked)} />
        <Typography variant="body2">Sunday</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={(_, checked) => handleWeekSelected(1, checked)} />
        <Typography variant="body2">Monday</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={(_, checked) => handleWeekSelected(2, checked)} />
        <Typography variant="body2">Tuesday</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={(_, checked) => handleWeekSelected(3, checked)} />
        <Typography variant="body2">Wednesday</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={(_, checked) => handleWeekSelected(4, checked)} />
        <Typography variant="body2">Thursday</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={(_, checked) => handleWeekSelected(5, checked)} />
        <Typography variant="body2">Friday</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Checkbox onChange={(_, checked) => handleWeekSelected(6, checked)} />
        <Typography variant="body2">Saturday</Typography>
      </Stack>
    </Stack>
  );
}

import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import type { PaymentMethod } from './type';

interface Props {
  open: UseBooleanReturn;
  row: PaymentMethod;
}

export default function Detail({ open, row }: Props) {
  const { name, visible, createdAt } = row;

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 400 } }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6"> {name} </Typography>
          <Typography variant="body2"> {createdAt} </Typography>
        </Stack>
        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Name:
            </Typography>
            <Typography variant="body2">{name}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Visibility:
            </Typography>
            <Iconify
              icon={visible ? 'eva:eye-outline' : 'tabler:eye-off'}
              sx={{
                color: (theme) =>
                  visible ? theme.palette.primary.dark : theme.palette.primary.light,
              }}
            />
          </Stack>
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

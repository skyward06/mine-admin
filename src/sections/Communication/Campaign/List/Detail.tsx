import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { ScrollBar } from 'src/components/ScrollBar';

interface Props {
  emails: string;
  open: UseBooleanReturn;
}

export default function Detail({ emails, open }: Props) {
  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 500 } }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5">Emails</Typography>
          <Stack sx={{ background: 'background.neutral' }}>
            <pre>{emails.replace(/,/g, '\n')}</pre>
          </Stack>
        </Paper>
      </ScrollBar>
    </Drawer>
  );
}

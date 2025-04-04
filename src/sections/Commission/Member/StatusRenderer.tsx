import type { CustomCellRendererProps } from '@ag-grid-community/react';

import Stack from '@mui/material/Stack';

import { Label } from 'src/components/Label';

import type { WeeklyCommission } from '../type';

export default function StatusRenderer({ data }: CustomCellRendererProps<WeeklyCommission>) {
  return (
    <Stack direction="row" spacing={1}>
      {data?.qualified && (
        <Label variant="soft" color="success">
          Qualified
        </Label>
      )}
      {data?.invoice && (
        <Label variant="soft" color="success">
          Peer
        </Label>
      )}
    </Stack>
  );
}

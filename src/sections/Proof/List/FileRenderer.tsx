import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { FileThumbnail } from 'src/components/FileThumbnail';

import type { Proof } from './type';

export const FileRenderer = memo(
  ({ data }: CustomCellRendererProps<Proof>) => (
    <Stack direction="row">
      {!!data?.files?.length && <FileThumbnail file="png" sx={{ width: 24 }} />}
      <Typography sx={{ p: 1 }}>
        {!!data?.files?.length && `${data?.files.length} file${data?.files.length > 1 ? 's' : ''}`}
      </Typography>
    </Stack>
  ),
  (prev, next) => prev.data?.id === next.data?.id
);

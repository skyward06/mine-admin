import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/Iconify';

import type { EmailTemplate } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<EmailTemplate>) => {
    const router = useRouter();

    return (
      <IconButton
        color="default"
        onClick={() => router.push(`${paths.dashboard.template.edit(data?.id ?? '')}`)}
      >
        <Iconify icon="solar:pen-2-bold" />
      </IconButton>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);

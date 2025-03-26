import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/Iconify';

import type { Campaign } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Campaign>) => {
    const router = useRouter();

    return (
      <Tooltip title="View" arrow placement="left">
        <IconButton
          color="default"
          onClick={() => router.push(paths.dashboard.campaign.edit(data?.id!))}
        >
          <Iconify icon="flowbite:eye-outline" />
        </IconButton>
      </Tooltip>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);

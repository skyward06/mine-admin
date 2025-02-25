import type { Sale } from 'src/sections/Sales/List/type';
import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { Iconify } from 'src/components/Iconify';

import Detail from 'src/sections/Sales/List/Detail';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Sale>) => {
    const open = useBoolean();

    return (
      <>
        <Tooltip title="View" placement="top" arrow>
          <IconButton color="default" onClick={open.onTrue}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>

        <Detail open={open} id={data?.id!} />
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);

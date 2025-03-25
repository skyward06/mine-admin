import type { CustomCellRendererProps } from '@ag-grid-community/react';

import { memo } from 'react';

import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { Iconify } from 'src/components/Iconify';

import Detail from './Detail';

import type { Campaign } from './type';

export const ActionRender = memo(
  ({ data }: CustomCellRendererProps<Campaign>) => {
    const open = useBoolean();

    return (
      <>
        <IconButton color="default" onClick={open.onTrue}>
          <Iconify icon="flowbite:eye-outline" />
        </IconButton>

        <Detail emails={data?.listExtra!} open={open} />
      </>
    );
  },
  (prev, next) => prev.data?.id === next.data?.id
);

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridToolbarContainer } from '@mui/x-data-grid';

import ExportButton from 'src/components/ExportButton';

interface AccountTableToolBarProps {
  target: string;
  token: string;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export function TableToolBar({ target, token, setFilterButtonEl }: AccountTableToolBarProps) {
  return (
    <GridToolbarContainer>
      <Typography variant="subtitle1">Reward</Typography>
      <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        {token && <ExportButton target={target} token={token} />}
      </Stack>
    </GridToolbarContainer>
  );
}

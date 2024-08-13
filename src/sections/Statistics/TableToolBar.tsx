import axios from 'axios';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GridToolbarContainer } from '@mui/x-data-grid';

import { fDate, fTime } from 'src/utils/format-time';

import { CONFIG } from 'src/config';

import { Iconify } from 'src/components/Iconify';

interface AccountTableToolBarProps {
  target: string;
  token: string;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export function TableToolBar({ target, token, setFilterButtonEl }: AccountTableToolBarProps) {
  const handleExport = async () => {
    const { data } = await axios.get(`${CONFIG.SITE_URL}/api/export-${target}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    });

    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `rewards_${fDate(new Date(), 'YYYYMMDD')}${fTime(new Date(), 'hhmmss')}.xlsx`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <GridToolbarContainer>
      <Typography variant="subtitle1">Reward</Typography>
      <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        {token && (
          <Button variant="text" startIcon={<Iconify icon="uil:export" />} onClick={handleExport}>
            Export
          </Button>
        )}
      </Stack>
    </GridToolbarContainer>
  );
}

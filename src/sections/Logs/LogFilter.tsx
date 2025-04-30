import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { LOG_LABEL } from 'src/consts';

interface Props {
  query: any;
  setQuery: Function;
}

export default function LogFilter({ query, setQuery }: Props) {
  const { filter, page, size } = query;

  const handleSearchChange = (category: string, value: string) => {
    setQuery({ filter: { ...filter, [category]: value }, page, size });
  };

  return (
    <Stack direction="row" spacing={2} mb={2}>
      <Stack width={1}>
        <TextField
          label="Who"
          size="small"
          onChange={(event) => handleSearchChange('who', event.target.value)}
        />
      </Stack>
      <Stack width={1}>
        <TextField
          label="From"
          size="small"
          type="datetime-local"
          onChange={(event) => handleSearchChange('from', event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
      <Stack width={1}>
        <TextField
          label="To"
          size="small"
          type="datetime-local"
          onChange={(event) => handleSearchChange('to', event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
      <Stack width={1}>
        <TextField
          label="Action"
          select
          size="small"
          fullWidth
          onChange={(event) => handleSearchChange('action', event.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {Object.keys(LOG_LABEL.action).map((action) => (
            <MenuItem key={action} value={action}>
              {LOG_LABEL.action[action as keyof typeof LOG_LABEL.action]}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack width={1}>
        <TextField
          label="Status"
          select
          size="small"
          fullWidth
          onChange={(event) => handleSearchChange('status', event.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {Object.keys(LOG_LABEL.status).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack width={1}>
        <TextField
          label="Role"
          select
          size="small"
          fullWidth
          onChange={(event) => handleSearchChange('role', event.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem key="admin" value="admin">
            Admin
          </MenuItem>
          <MenuItem key="miner" value="miner">
            Miner
          </MenuItem>
        </TextField>
      </Stack>
    </Stack>
  );
}

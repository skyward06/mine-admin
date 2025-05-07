import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useQuery } from 'src/routes/hooks';

import { toast } from 'src/components/SnackBar';

import MemberTable from './MemberTable';
import { useCreateMemberList } from '../useApollo';

interface Props {
  open: UseBooleanReturn;
}

export default function CreateMemberList({ open }: Props) {
  const [mode, setMode] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [emails, setEmails] = useState<string[]>([]);
  const [query, { setQueryParams: setQuery }] = useQuery();

  const { loading, createMemberList } = useCreateMemberList();

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleCreateMemberList = async () => {
    try {
      if (!name) {
        toast.warning('Name is requried!');
        return;
      }

      if (!emails?.length) {
        toast.error('You must select miners!');
      }
      const { data } = await createMemberList({ variables: { data: { name, emails } } });

      if (data) {
        toast.success('Successfully created!');
        setQuery({ ...query, filter: {} });
        open.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open.value}
      onClose={() => {
        open.onFalse();
        setQuery({ ...query, filter: {} });
      }}
    >
      <DialogTitle>Create Memberlist Group</DialogTitle>
      <DialogContent>
        <Paper>
          <TextField
            label="Name"
            size="small"
            variant="standard"
            value={name}
            onChange={handleNameChange}
            required
            sx={{ mb: 2 }}
          />

          {mode ? (
            <Box>
              <TextField
                multiline
                rows={10}
                label="Emails"
                fullWidth
                required
                onChange={(event) => setEmails(event.target.value.split(/[, \n]+/).filter(Boolean))}
              />
            </Box>
          ) : (
            <MemberTable setEmails={setEmails} />
          )}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" alignItems="center" mr={2}>
          <Switch checked={mode} onChange={(_, checked) => setMode(checked)} />
          <Typography variant="body1">Input Mode</Typography>
        </Stack>
        <LoadingButton variant="contained" loading={loading} onClick={handleCreateMemberList}>
          Create
        </LoadingButton>
        <Button
          variant="outlined"
          onClick={() => {
            open.onFalse();
            setQuery({ ...query, filter: {} });
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import type { UseBooleanReturn } from 'src/hooks/useBoolean';
import type { WeeklyCommission } from 'src/__generated__/graphql';

import { isEmpty } from 'lodash';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDateTime } from 'src/utils/format-time';

import { COMMISSION_TYPE } from 'src/consts';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { EmptyContent } from 'src/components/EmptyContent';

import { FileManagerNewFolderDialog } from 'src/sections/Sales/Upload';
import { FileRecentItem } from 'src/sections/Sales/List/FileRecentItem';
import { FileRecentItem as EditFileItem } from 'src/sections/Sales/Edit/FileRecentItem';

import { useUpdateCommissionStatus } from '../useApollo';

interface Props {
  row: WeeklyCommission;
  open: UseBooleanReturn;
}

export default function Detail({ open, row }: Props) {
  const { id, note: currentNote, paymentConfirm: currentFile, status, member } = row;

  const [firstName, lastName] = member?.fullName.split(' ') ?? ['', ''];

  const noteEdit = useBoolean();
  const fileEdit = useBoolean();

  const [note, setNote] = useState<any>();
  const [files, setFiles] = useState<any>();

  const { updateCommissionStatus } = useUpdateCommissionStatus();

  const saveNote = async () => {
    noteEdit.onToggle();

    if (noteEdit.value) {
      await updateCommissionStatus({ variables: { data: { id, note } } });
    }
  };

  const saveFile = async () => {
    fileEdit.onToggle();

    if (fileEdit.value) {
      await updateCommissionStatus({
        variables: { data: { id, fileIds: files?.map((file: any) => file.id) } },
      });
    }
  };

  const onDelete = (fileId: string) => {
    setFiles(files?.filter((file: any) => fileId !== file.id));
  };

  const handleUpload = (data: any) => {
    setFiles((prev: any) => [...(prev ?? []), ...data.files]);
  };

  useEffect(() => {
    setNote(currentNote);
    setFiles(currentFile);
  }, [currentNote, currentFile]);

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 400 } }}
    >
      <ScrollBar sx={{ borderRadius: 1 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6">Info</Typography>
          <Typography variant="subtitle1">{COMMISSION_TYPE[status].value}</Typography>
        </Stack>

        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">User</Typography>

          <Stack direction="row" justifyContent="space-between">
            <ListItemText
              primary={`${firstName} ${lastName.length && lastName[0].toUpperCase()}.`}
              secondary={member?.username}
              primaryTypographyProps={{ typography: 'subtitle1' }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
              }}
            />

            <Typography variant="body2">{formatDateTime(member?.updatedAt)}</Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Note</Typography>
            <IconButton onClick={saveNote}>
              <Iconify icon={noteEdit.value ? 'mage:check-circle-fill' : 'solar:pen-2-bold'} />
            </IconButton>
          </Stack>

          {noteEdit.value ? (
            <TextField
              label="Note"
              size="small"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          ) : (
            <Typography variant="body2">{note}</Typography>
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Files</Typography>
            <IconButton onClick={saveFile}>
              <Iconify icon={fileEdit.value ? 'mage:check-circle-fill' : 'solar:pen-2-bold'} />
            </IconButton>
          </Stack>

          {fileEdit.value ? (
            <>
              <FileManagerNewFolderDialog handleUpdate={handleUpload} />
              <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', mt: 1 }}>
                {files?.map((file: any) => (
                  <EditFileItem key={file.id} file={file} onDelete={onDelete} />
                ))}
              </Box>
            </>
          ) : isEmpty(files) ? (
            <EmptyContent />
          ) : (
            files?.map((file: any) => <FileRecentItem key={file.id} file={file} />)
          )}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

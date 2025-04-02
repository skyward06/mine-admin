import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/useBoolean';

import { customizeFullName } from 'src/utils/helper';
import { formatDateTime, formatWeekNumber } from 'src/utils/format-time';

import { COMMISSION_TYPE } from 'src/consts';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import { useUpdateCommissionNote } from '../useApollo';

import type { WeeklyCommission } from '../type';

interface Props {
  row: WeeklyCommission;
  open: UseBooleanReturn;
}

export default function Detail({ open, row }: Props) {
  const {
    id,
    begL,
    begR,
    endL,
    endR,
    newL,
    newR,
    maxL,
    maxR,
    pkgL,
    pkgR,
    status,
    username,
    fullName,
    shortNote,
    updatedAt,
    commission,
    weekStartDate,
  } = row;

  const noteEdit = useBoolean();

  const [note, setNote] = useState<any>();

  const { updateCommissionNote } = useUpdateCommissionNote();

  const saveNote = async () => {
    noteEdit.onToggle();

    if (noteEdit.value) {
      await updateCommissionNote({ variables: { data: { id, shortNote: note } } });
    }
  };

  useEffect(() => {
    setNote(shortNote);
  }, [shortNote]);

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 375 } }}
    >
      <ScrollBar sx={{ borderRadius: 1 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="flex-start">
            <Typography variant="subtitle1">Week #{formatWeekNumber(weekStartDate)}</Typography>
            <Typography variant="subtitle2">{`(${dayjs(weekStartDate).add(1, 'day').format('MM/DD')} - ${dayjs(weekStartDate).add(7, 'day').format('MM/DD')})`}</Typography>
          </Stack>
          <Typography variant="subtitle1">{COMMISSION_TYPE[status].value}</Typography>
        </Stack>

        <Stack spacing={1} sx={{ bgcolor: 'background.neutral', p: 2 }}>
          <Typography variant="subtitle1">User</Typography>

          <Stack direction="row" justifyContent="space-between">
            <ListItemText
              primary={customizeFullName(fullName ?? '')}
              secondary={username}
              primaryTypographyProps={{ typography: 'subtitle1' }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
              }}
            />

            <Typography variant="body2">{formatDateTime(updatedAt)}</Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Info</Typography>

          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                BegLR:
              </Typography>
              <Typography variant="body2">{`L${begL}, R${begR}`}</Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                EndLR:
              </Typography>
              <Typography variant="body2">{`L${endL}, R${endR}`}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                NewLR:
              </Typography>
              <Typography variant="body2">{`L${newL}, R${newR}`}</Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                MaxLR:
              </Typography>
              <Typography variant="body2">{`L${maxL}, R${maxR}`}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Package:
              </Typography>
              <Typography variant="body2">{`L${pkgL}, R${pkgR}`}</Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Commissions:
              </Typography>
              <Typography variant="body2">{commission}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Note</Typography>
            <IconButton onClick={saveNote}>
              <Iconify icon={noteEdit.value ? 'mage:check-circle-fill' : 'solar:pen-2-bold'} />
            </IconButton>
          </Stack>

          <Stack spacing={1}>
            {noteEdit.value ? (
              <TextField
                multiline
                minRows={3}
                label="Note"
                size="small"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            ) : (
              <>
                {note ? (
                  <Typography variant="body1">{note}</Typography>
                ) : (
                  <Typography variant="body1" color="gray">
                    There is no note
                  </Typography>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

import type { Member, AdminNotes } from 'src/__generated__/graphql';

import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import EditForm from '../Edit/Note/EditForm';

interface Props {
  open: UseBooleanReturn;
  row: Member;
}

export default function Detail({ open, row }: Props) {
  const edit = useBoolean();
  const [current, setCurrent] = useState<AdminNotes>();

  return (
    <>
      <Drawer
        open={open.value}
        onClose={() => open.onFalse()}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 375 } }}
      >
        <ScrollBar sx={{ borderRadius: 1 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h6">{formatID(row?.ID ?? '', 'M')}</Typography>
              {row?.emailVerified && (
                <Iconify icon="pajamas:partner-verified" color="green" sx={{ mt: 0.2 }} />
              )}
            </Stack>
            <Typography variant="subtitle1">{row?.allowState}</Typography>
          </Stack>

          <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Info
            </Typography>

            <Stack direction="row" spacing={2}>
              <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                Username:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {row?.username}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                Full Name:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {row?.fullName}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                Email:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {row?.email}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                Asset ID:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {row?.assetId}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                Joined At:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {row?.createdAt}
              </Stack>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />

            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle1">Group:</Typography>
              <Typography>{row?.groupSetting?.name}</Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Stack width={0.7} sx={{ fontSize: 14, fontWeight: 700 }}>
                Team Strategy:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {row?.teamStrategy}
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Stack width={0.7} sx={{ fontSize: 14, fontWeight: 700 }}>
                Starting Points:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {`L${row?.commission?.begL ?? 0}, R${row?.commission?.begR ?? 0}`}
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Stack width={0.7} sx={{ fontSize: 14, fontWeight: 700 }}>
                New Points:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {`L${row?.commission?.newL ?? 0}, R${row?.commission?.newR ?? 0}`}
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Stack width={0.7} sx={{ fontSize: 14, fontWeight: 700 }}>
                Placement Parent:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                {row?.placementParent?.fullName}
              </Stack>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />

            <Stack sx={{ mt: 0.5 }}>
              {row?.memberWallets?.map((item) => (
                <Stack sx={{ pb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {item?.payout?.method}
                  </Typography>
                  <Typography variant="body2">{item?.address}</Typography>
                </Stack>
              ))}
            </Stack>

            {row?.memberWallets?.length && (
              <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />
            )}

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight={700}>
                Admin Note
              </Typography>
              <IconButton>
                <Iconify icon="mdi:plus-circle" onClick={edit.onTrue} />
              </IconButton>
            </Stack>

            {row?.adminNotes?.map((item) => (
              <>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">{item?.admin?.username}</Typography>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="body2">{formatDate(item?.createdAt)}</Typography>
                    <IconButton
                      onClick={() => {
                        edit.onTrue();
                        setCurrent(item);
                      }}
                    >
                      <Iconify icon="solar:pen-2-bold" />
                    </IconButton>
                  </Stack>
                </Stack>
                <Typography>{item?.description}</Typography>
                <Divider sx={{ borderStyle: 'solid' }} />
              </>
            ))}
          </Stack>
        </ScrollBar>
      </Drawer>

      <Dialog fullWidth maxWidth="xs" open={edit.value} onClose={edit.onFalse}>
        <EditForm open={edit} memberId={row?.id!} current={current} close />
      </Dialog>
    </>
  );
}

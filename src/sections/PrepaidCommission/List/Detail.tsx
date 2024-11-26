import type { UseBooleanReturn } from 'src/hooks/useBoolean';
import type { PrepaidCommission } from 'src/__generated__/graphql';

import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { customizeFullName } from 'src/utils/helper';
import { formatDateTime } from 'src/utils/format-time';

import { ScrollBar } from 'src/components/ScrollBar';
import { EmptyContent } from 'src/components/EmptyContent';

import { FileRecentItem } from 'src/sections/Sales/List/FileRecentItem';

interface Props {
  row: PrepaidCommission;
  open: UseBooleanReturn;
}

export default function Detail({ row, open }: Props) {
  const { proof, txType, txId, commission } = row;

  const txTypes = txType?.split(',') ?? [];
  const txIds = txId?.split(',') ?? [];

  const payments = txTypes.map((item: string, index: number) => ({
    txType: item,
    txId: txIds[index],
  }));

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 400 } }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6"> Info </Typography>
          <Typography variant="body2">{formatDateTime(row.orderedAt)}</Typography>
        </Stack>
        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">Miner</Typography>

          <ListItemText
            primary={customizeFullName(commission?.member?.fullName ?? '')}
            secondary={commission?.member?.username}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Main</Typography>

          {payments.map((item) => (
            <Stack sx={{ mb: 1 }}>
              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Tx Type:
                </Typography>
                <Typography variant="body2">{item.txType}</Typography>
              </Stack>

              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Transaction ID:
                </Typography>
                <Typography variant="body2">{item.txId}</Typography>
              </Stack>
            </Stack>
          ))}

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Week:
            </Typography>
            <Typography variant="body2">{`${dayjs(commission?.weekStartDate).add(1, 'day').format('MM/DD')} - ${dayjs(commission?.weekStartDate).add(7, 'day').format('MM/DD')}`}</Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Note</Typography>
          <Typography variant="body2">{row.proof?.note}</Typography>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Reference Link</Typography>

          {proof?.reflinks?.map((link) => (
            <Stack direction="row" columnGap={1}>
              <Typography>{link?.linkType}:</Typography>
              <Typography
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                <Link to={link?.link ?? ''} target="_blank">
                  {link?.link}
                </Link>
              </Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Files</Typography>

          {isEmpty(proof?.files) ? (
            <EmptyContent />
          ) : (
            proof?.files?.map((file: any) => <FileRecentItem key={file.id} file={file} />)
          )}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

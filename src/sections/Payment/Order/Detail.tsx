import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDateTime } from 'src/utils/format-time';
import { truncateMiddle } from 'src/utils/formatNumber';
import { formatID, makeDecimal, customizeFullName } from 'src/utils/helper';

import { CHAIN_UNIT } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import { useFetchOrder } from '../useApollo';

interface Props {
  id: number;
  open: UseBooleanReturn;
}

export default function Detail({ id, open }: Props) {
  const copy = useBoolean();

  const { order, fetchOrder } = useFetchOrder();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(order?.waitAddress?.address ?? '');

      copy.onTrue();

      setTimeout(() => {
        copy.onFalse();
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy text: ', error.message);
    }
  };

  useEffect(() => {
    if (open.value && id) {
      fetchOrder({ variables: { data: { ID: id } } });
    }
  }, [id, open, fetchOrder]);

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
          <Typography variant="subtitle2">{formatDateTime(order?.createdAt ?? '')}</Typography>
          <Typography variant="subtitle2">
            {order?.status
              ? order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()
              : ''}
          </Typography>
        </Stack>

        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Address
          </Typography>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Type:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.waitAddress?.type}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }} direction="row" spacing={1}>
              Address:{' '}
              <Iconify
                icon={copy.value ? 'ci:check' : 'bxs:copy'}
                color="#00cca4"
                sx={{ cursor: 'pointer' }}
                onClick={copyAddress}
              />
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {truncateMiddle(order?.waitAddress?.address ?? '', 25)}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Balance:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {makeDecimal(
                (order?.waitAddress?.totalBalance ?? 0) /
                  10 ** CHAIN_UNIT[order?.waitAddress?.type!],
                CHAIN_UNIT[order?.waitAddress?.type!]
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Received At:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.waitAddress?.receivedAt
                ? formatDateTime(order.waitAddress.receivedAt!)
                : 'Not yet'}
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />

          <Typography variant="subtitle1" fontWeight={700}>
            Miner
          </Typography>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              ID:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {formatID(order?.member?.ID ?? '', 'M')}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Asset ID:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.member?.assetId}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Username:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.member?.username}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Full Name:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {customizeFullName(order?.member?.fullName ?? '')}
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />

          <Typography variant="subtitle1" fontWeight={700}>
            Package
          </Typography>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Produce Name:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.package?.productName}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Amount:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.package?.amount}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Point:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.package?.point}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Token:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.package?.token}
            </Stack>
          </Stack>
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

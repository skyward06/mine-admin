import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDateTime } from 'src/utils/format-time';
import { makeDecimal, customizeFullName } from 'src/utils/helper';
import { fCurrency, truncateMiddle } from 'src/utils/formatNumber';

import { CHAIN_UNIT } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import { useFetchOrder } from '../useApollo';

interface Props {
  id: string;
  open: UseBooleanReturn;
}

export default function Detail({ id, open }: Props) {
  const copy = useBoolean();
  const hashCopy = useBoolean();

  const { order, fetchOrder } = useFetchOrder();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(order?.paymentAddress ?? '');

      copy.onTrue();

      setTimeout(() => {
        copy.onFalse();
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy text: ', error.message);
    }
  };

  const copyTransaction = async (field: string, transaction: string) => {
    try {
      await navigator.clipboard.writeText(transaction);

      if (field === 'hash') {
        hashCopy.onTrue();
      }

      setTimeout(() => {
        if (field === 'hash') {
          hashCopy.onFalse();
        }
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy text: ', error.message);
    }
  };

  useEffect(() => {
    if (open.value && id) {
      fetchOrder({ variables: { data: { id } } });
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
              {order?.paymentToken ? `${order?.paymentToken} (${order?.paymentChain})` : 'Not yet'}
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
              {truncateMiddle(order?.paymentAddress ?? '', 25)}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Balance:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {fCurrency(order?.usdBalance)}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Required Balance:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {makeDecimal(
                (order?.requiredBalance ?? 0) /
                  10 ** CHAIN_UNIT[order?.paymentToken ?? ('' as keyof typeof CHAIN_UNIT)],
                CHAIN_UNIT[order?.paymentToken ?? ('' as keyof typeof CHAIN_UNIT)]
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Paid Balance:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {makeDecimal(
                (order?.paidBalance ?? 0) /
                  10 ** CHAIN_UNIT[order?.paymentToken ?? ('' as keyof typeof CHAIN_UNIT)],
                CHAIN_UNIT[order?.paymentToken ?? ('' as keyof typeof CHAIN_UNIT)]
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Paid At:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {order?.paidAt ? formatDateTime(order.paidAt!) : 'Not yet'}
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />

          <Typography variant="subtitle1" fontWeight={700}>
            Miner
          </Typography>

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
            Transactions
          </Typography>

          {order?.transactions?.map((item: any) => (
            <Box mb={2}>
              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Hash:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }} direction="row">
                  {truncateMiddle(item.hash, 20, false)}
                  <Iconify
                    sx={{ cursor: 'pointer' }}
                    icon={hashCopy.value ? 'system-uicons:check' : 'stash:copy-light'}
                    onClick={() => copyTransaction('hash', item.hash)}
                  />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

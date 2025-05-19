import type { PaymentChain } from 'src/__generated__/graphql';

import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDateTime } from 'src/utils/format-time';
import { formatID, makeDecimal } from 'src/utils/helper';
import { fCurrency, truncateMiddle } from 'src/utils/formatNumber';

import { CHAIN_UNIT, ORDER_STATUS } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import { useFetchTransactionByHash } from '../useApollo';

interface Props {
  hash: string;
  chain: PaymentChain;
  open: UseBooleanReturn;
}

export default function Detail({ hash, chain, open }: Props) {
  const toCopy = useBoolean();
  const fromCopy = useBoolean();
  const hashCopy = useBoolean();

  const { transaction, fetchTransactionByHash } = useFetchTransactionByHash();

  const copyAddress = async (field: string) => {
    try {
      await navigator.clipboard.writeText(transaction?.order?.paymentAddress ?? '');

      if (field === 'hash') {
        hashCopy.onTrue();
      }

      if (field === 'from') {
        fromCopy.onTrue();
      }

      if (field === 'to') {
        toCopy.onTrue();
      }

      setTimeout(() => {
        if (field === 'hash') {
          hashCopy.onFalse();
        }

        if (field === 'from') {
          fromCopy.onFalse();
        }

        if (field === 'to') {
          toCopy.onFalse();
        }
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy text: ', error.message);
    }
  };

  useEffect(() => {
    if (open.value && hash) {
      fetchTransactionByHash({ variables: { data: { hash, chain } } });
    }
  }, [hash, chain, open, fetchTransactionByHash]);

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
          <Typography variant="subtitle2">
            {formatDateTime(transaction?.createdAt ?? '')}
          </Typography>
        </Stack>

        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Info
          </Typography>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Hash:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }} direction="row">
              {truncateMiddle(transaction?.hash ?? '', 20, false)}
              <Iconify
                sx={{ cursor: 'pointer' }}
                icon={hashCopy.value ? 'system-uicons:check' : 'stash:copy-light'}
                onClick={() => copyAddress('hash')}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              From:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }} direction="row">
              {truncateMiddle(transaction?.from ?? '', 20)}
              <Iconify
                sx={{ cursor: 'pointer' }}
                icon={fromCopy.value ? 'system-uicons:check' : 'stash:copy-light'}
                onClick={() => copyAddress('from')}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              To:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }} direction="row">
              {truncateMiddle(transaction?.to ?? '', 20)}
              <Iconify
                sx={{ cursor: 'pointer' }}
                icon={toCopy.value ? 'system-uicons:check' : 'stash:copy-light'}
                onClick={() => copyAddress('to')}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Balance:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {fCurrency(
                makeDecimal(
                  (transaction?.balance ?? 0) /
                    10 ** CHAIN_UNIT[transaction?.tokenType ?? ('' as keyof typeof CHAIN_UNIT)],
                  CHAIN_UNIT[transaction?.tokenType ?? ('' as keyof typeof CHAIN_UNIT)]
                )
              )}
            </Stack>
          </Stack>
          {transaction?.order && (
            <>
              <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />

              <Typography variant="subtitle1" fontWeight={700}>
                Order
              </Typography>

              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  ID:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }}>
                  {formatID(transaction?.order?.ID ?? '', 'O')}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Type:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }}>
                  {`${transaction?.order?.paymentToken} (${transaction?.order?.paymentChain})`}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Requested Balance:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }}>
                  {transaction?.order?.usdBalance ?? 0}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Received Balance:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }}>
                  {makeDecimal(
                    (transaction?.order.paidBalance ?? 0) /
                      10 ** CHAIN_UNIT[transaction?.tokenType ?? ('' as keyof typeof CHAIN_UNIT)],
                    CHAIN_UNIT[transaction?.tokenType ?? ('' as keyof typeof CHAIN_UNIT)]
                  )}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Status:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }}>
                  {ORDER_STATUS[transaction?.order?.status]}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Created At:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }}>
                  {transaction?.order?.paidAt
                    ? formatDateTime(transaction?.order?.createdAt!)
                    : 'Not yet'}
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

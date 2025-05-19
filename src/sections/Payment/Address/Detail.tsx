import type { PaymentChain } from 'src/__generated__/graphql';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { makeDecimal } from 'src/utils/helper';
import { fCurrency, truncateMiddle } from 'src/utils/formatNumber';

import { CHAIN_UNIT } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import { useFetchAddressByAddress } from '../useApollo';

interface Props {
  address: string;
  chain: PaymentChain;
  open: UseBooleanReturn;
}

export default function Detail({ address, chain, open }: Props) {
  const copy = useBoolean();

  const { address: current, fetchAddressByAddress } = useFetchAddressByAddress();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(current?.address ?? '');

      copy.onTrue();

      setTimeout(() => {
        copy.onFalse();
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy text: ', error.message);
    }
  };

  useEffect(() => {
    if (open.value && address) {
      fetchAddressByAddress({ variables: { data: { address, chain } } });
    }
  }, [address, chain, open, fetchAddressByAddress]);

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
          <Typography variant="subtitle2">Info</Typography>
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
              {current?.chain}
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
              {truncateMiddle(current?.address ?? '', 25)}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
              Balance:
            </Stack>
            <Stack width={1} sx={{ fontSize: 14 }}>
              {fCurrency(
                makeDecimal(
                  (current?.balance ?? 0) / 10 ** CHAIN_UNIT[current?.chain!],
                  CHAIN_UNIT[current?.chain!]
                )
              )}
            </Stack>
          </Stack>

          {current?.isUsed && (
            <Stack direction="row" spacing={2}>
              <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                Status:
              </Stack>
              <Stack width={1} sx={{ fontSize: 14 }}>
                Used
              </Stack>
            </Stack>
          )}

          <Divider sx={{ borderStyle: 'dashed', borderColor: 'gray' }} />

          <Typography variant="subtitle1" fontWeight={700}>
            Balances
          </Typography>

          {current?.balances?.map((item: any) => (
            <Box mb={2}>
              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Address:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }} direction="row">
                  {item.address}
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Chain:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }} direction="row">
                  {item.paymentChain}
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Token:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }} direction="row">
                  {item.paymentToken}
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack width={0.5} sx={{ fontSize: 14, fontWeight: 700 }}>
                  Balance:
                </Stack>
                <Stack width={1} sx={{ fontSize: 14 }} direction="row">
                  {fCurrency(
                    makeDecimal(
                      (item.balance ?? 0) /
                        10 ** CHAIN_UNIT[item.paymentToken as keyof typeof CHAIN_UNIT],
                      CHAIN_UNIT[item.paymentToken as keyof typeof CHAIN_UNIT]
                    )
                  )}
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

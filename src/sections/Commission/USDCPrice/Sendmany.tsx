import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import { CommissionPaymentType } from 'src/__generated__/graphql';

import { Iconify } from 'src/components/Iconify';
import { ConfirmView } from 'src/components/Reward';
import { EmptyContent } from 'src/components/EmptyContent';
import ComponentBlock from 'src/components/Component-Block';

import { useGenerateUSDCSendmany } from '../useApollo';

interface Props {
  disabled: UseBooleanReturn;
  setTxData: Function;
}

export default function Sendmany({ disabled, setTxData }: Props) {
  const [tId, setTId] = useState<any>();
  const [copy, setCopy] = useState<boolean>();

  const { loading, sendmany, generateUSDCSendmany } = useGenerateUSDCSendmany();

  const handleCopy = async (result: any) => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    generateUSDCSendmany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sendmany) {
      setCopy(false);
      setTxData([{ ids: sendmany.ids, txID: tId, type: CommissionPaymentType.Usdc }]);

      if (!sendmany.ids.length) {
        disabled.onTrue();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tId, sendmany]);

  return (
    <>
      {loading ? (
        <Stack direction="row" justifyContent="center">
          <Iconify icon="eos-icons:bubble-loading" />
        </Stack>
      ) : (
        <ComponentBlock
          sx={{
            display: 'block',
            alignItems: 'unset',
            overflow: 'auto',
            maxHeight: 800,
            backgroundColor: '#f2f2f2',
            p: 2,
          }}
        >
          <Stack direction="row" justifyContent="flex-end" columnGap={2} mb={2}>
            <ConfirmView setTransactionId={(value: any) => setTId(value)} />
            <Iconify
              icon={copy && copy ? 'mingcute:check-fill' : 'bxs:copy'}
              color="#00a76f"
              sx={{ mt: 1 }}
              onClick={() => {
                handleCopy(sendmany?.command);
                setCopy(true);

                setTimeout(() => {
                  setCopy(false);
                }, 3000);
              }}
            />
          </Stack>

          {sendmany && sendmany.command ? sendmany.command : <EmptyContent />}
        </ComponentBlock>
      )}
    </>
  );
}

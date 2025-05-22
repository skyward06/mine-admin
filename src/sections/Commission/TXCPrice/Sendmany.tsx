import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import { CommissionPaymentType } from 'src/__generated__/graphql';

import { Iconify } from 'src/components/Iconify';
import { ConfirmView } from 'src/components/Reward';
import { EmptyContent } from 'src/components/EmptyContent';
import ComponentBlock from 'src/components/Component-Block';

import { useGenerateTXCSendmany } from '../useApollo';

interface Props {
  txcPrice: number;
  disabled: UseBooleanReturn;
  setTxData: Function;
}

export default function Sendmany({ disabled, txcPrice, setTxData }: Props) {
  const [tId, setTId] = useState<any>([]);
  const [copy, setCopy] = useState<any>();

  const { loading, sendmany, generateTXCSendmany } = useGenerateTXCSendmany();

  const handleCopy = async (result: any) => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    generateTXCSendmany({ variables: { data: { txcPrice } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txcPrice]);

  useEffect(() => {
    if (sendmany) {
      sendmany?.map((_, index) => setCopy({ ...copy, [index]: false }));
      setTxData(
        sendmany?.map((item, index) => ({
          ids: item.ids,
          txID: tId[index] || '',
          type: CommissionPaymentType.Txc,
        }))
      );

      if (!sendmany.length) {
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
        <>
          {sendmany && sendmany.length ? (
            sendmany.map((item, index) => (
              <ComponentBlock
                sx={{
                  display: 'block',
                  alignItems: 'unset',
                  overflow: 'auto',
                  backgroundColor: '#f2f2f2',
                  p: 2,
                }}
              >
                <Stack direction="row" justifyContent="flex-end" columnGap={2} mb={2}>
                  <ConfirmView
                    setTransactionId={(value: any) => setTId({ ...tId, [index]: value })}
                  />
                  <Iconify
                    icon={copy && copy[index] ? 'mingcute:check-fill' : 'bxs:copy'}
                    color="#00a76f"
                    sx={{ mt: 1 }}
                    onClick={() => {
                      handleCopy(item.command.split(',').join(',\n'));
                      setCopy({ ...copy, [index]: true });

                      setTimeout(() => {
                        setCopy({ ...copy, [index]: false });
                      }, 3000);
                    }}
                  />
                </Stack>

                {item.command.split(',').join(',\n')}
              </ComponentBlock>
            ))
          ) : (
            <EmptyContent />
          )}
        </>
      )}
    </>
  );
}

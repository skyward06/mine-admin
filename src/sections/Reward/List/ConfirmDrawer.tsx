import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { splitArray } from 'src/utils/helper';

import { CONFIG } from 'src/config';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmView } from 'src/components/Reward';
import { ScrollBar } from 'src/components/ScrollBar';
import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

interface Props {
  reward: any[];
  isOpen: boolean;
  loading: boolean;
  confirmLoading: boolean;
  confirm: UseBooleanReturn;
  statisticsId: string;
  confirmStatistics: Function;
  setIsOpen: Function;
}

export default function ConfirmDrawer({
  reward,
  isOpen,
  loading,
  confirmLoading,
  confirm,
  setIsOpen,
  statisticsId,
  confirmStatistics,
}: Props) {
  const [copy, setCopy] = useState<any>();
  const [tId, setTId] = useState<any>();

  const initial = ['sendmany "" "{'];
  const sendmany = splitArray(reward, CONFIG.TRANSACTION_COUNT);

  const handleCopy = async (result: any[]) => {
    try {
      await navigator.clipboard.writeText(result.join('\n'));
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    setCopy(
      new Array(sendmany.length)
        .fill('sendmany')
        .reduce((prev, _, index) => ({ ...prev, [index]: false }), {})
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reward]);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: { xs: 1, sm: 700 } } }}
      >
        <Paper sx={{ p: 3 }}>
          {new Array(sendmany.length).fill('sendmany').map((_, no) => {
            const result = [
              ...initial,
              ...sendmany[no]!.map(
                (item: any, index: any) =>
                  `\\"${item?.address}\\": ${(item?.txcShared ?? 0) / 10 ** 8}${index === reward.length - 1 ? '}"' : ','}`
              ),
            ];

            return (
              <Paper sx={{ pb: 2 }}>
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
                  <Stack direction="row" justifyContent="flex-end" columnGap={2}>
                    <ConfirmView
                      setTransactionId={(value: any) => setTId({ ...tId, [no]: value })}
                    />
                    <Iconify
                      icon={copy[no] ? 'mingcute:check-fill' : 'bxs:copy'}
                      color="#00a76f"
                      sx={{ mt: 1 }}
                      onClick={() => {
                        handleCopy(result);
                        setCopy({ ...copy, [no]: true });

                        setTimeout(() => {
                          setCopy({ ...copy, [no]: false });
                        }, 3000);
                      }}
                    />
                  </Stack>

                  <ScrollBar
                    sx={{
                      maxHeight: 550,
                      borderRadius: 1,
                      py: 2,
                    }}
                  >
                    {loading ? (
                      <LoadingScreen />
                    ) : (
                      result.map((item) => (
                        <>
                          {item}
                          <br />
                        </>
                      ))
                    )}
                  </ScrollBar>
                </ComponentBlock>
              </Paper>
            );
          })}

          <Paper sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={confirm.onTrue}>
              Confirm
            </Button>
          </Paper>
        </Paper>
      </Drawer>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content="Are you sure?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={confirmLoading}
            onClick={async () => {
              try {
                if (tId) {
                  const tIds = Object.values(tId);

                  if (tIds.length < sendmany.length) {
                    toast.error('Transaction ID is required!');
                    return;
                  }

                  const transactionId = Object.values(tId).join(',');

                  await confirmStatistics({
                    variables: {
                      data: {
                        id: statisticsId,
                        transactionId,
                      },
                    },
                  });
                  toast.success('Successfully confirmed!');

                  confirm.onFalse();
                  setIsOpen(false);
                } else {
                  toast.error('Transaction ID is required!');
                }
              } catch (error) {
                const [err] = error.graphQLErrors;

                if (err.path?.includes('transactionId')) {
                  toast.error(err.message);
                }
              }
            }}
          >
            Confirm
          </LoadingButton>
        }
      />
    </>
  );
}

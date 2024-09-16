import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmView } from 'src/components/Reward';
import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

interface Props {
  reward: any[];
  isOpen: boolean;
  loading: boolean;
  confirm: UseBooleanReturn;
  statisticsId: string;
  confirmStatistics: Function;
  setIsOpen: Function;
}

export default function ConfirmDrawer({
  reward,
  isOpen,
  loading,
  confirm,
  setIsOpen,
  statisticsId,
  confirmStatistics,
}: Props) {
  const copy = useBoolean();

  const [tId, setTId] = useState<string>('');

  const initial = ['sendmany "" "{'];
  const sendmany = [
    ...initial,
    ...reward!.map(
      (item: any, index) =>
        `\\"${item?.address}\\": ${(item?.txcShared ?? 0) / 10 ** 8}${index === reward.length - 1 ? '}"' : ','}`
    ),
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sendmany.join('\n'));
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    if (copy.value) {
      setTimeout(() => {
        copy.onFalse();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copy]);

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
          <ComponentBlock
            sx={{
              display: 'block',
              alignItems: 'unset',
              overflow: 'auto',
              maxHeight: 800,
              backgroundColor: '#f2f2f2',
            }}
          >
            {sendmany.length === 1 ? (
              <LoadingScreen />
            ) : (
              sendmany.map((item) => (
                <>
                  {item}
                  <br />
                </>
              ))
            )}
          </ComponentBlock>
          <Paper sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2, mr: 2 }}
              onClick={() => {
                handleCopy();
                copy.onTrue();
              }}
              startIcon={
                copy.value ? <Iconify icon="mingcute:check-fill" /> : <Iconify icon="bxs:copy" />
              }
            >
              {copy.value ? 'Copied' : 'Copy'}
            </Button>
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
        content={<ConfirmView setTransactionId={setTId} />}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={loading}
            onClick={async () => {
              try {
                if (tId) {
                  const { data } = await confirmStatistics({
                    variables: { data: { id: statisticsId, transactionId: tId } },
                  });

                  if (data.confirmStatistics.id) {
                    toast.success('Successfully confirmed!');

                    confirm.onFalse();
                    setIsOpen(false);
                  }
                } else {
                  toast.error('TransactionId is required');
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

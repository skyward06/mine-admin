import { useMemo, useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { customizeDate } from 'src/utils/format-time';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmView } from 'src/components/Reward';
import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

import { CONFIRM_STATISTICS, FETCH_MEMBERSTATISTICS_QUERY } from '../../query';

interface Props {
  date: Date;
  handleBack: Function;
}

export default function SendMany({ date, handleBack }: Props) {
  const router = useRouter();
  const copy = useBoolean();
  const confirm = useBoolean();
  const [transactionId, setTransactionId] = useState<string>('');

  const [fetchMemberStatistics, { data }] = useLazyQuery(FETCH_MEMBERSTATISTICS_QUERY, {
    variables: { filter: { issuedAt: customizeDate(date) } },
  });

  const [confirmStatistics, { loading }] = useMutation(CONFIRM_STATISTICS);

  const memberStatistics = data?.memberStatistics.memberStatistics ?? [];

  const reward = useMemo(() => {
    const rewardData = memberStatistics.reduce(
      (prev: any, row) =>
        row?.member?.memberWallets?.reduce(
          (save: any, item) =>
            save && save[item?.address ?? '']
              ? {
                  ...save,
                  [item?.address ?? '']: {
                    ...save[item?.address ?? ''],
                    txcShared:
                      save[item?.address ?? ''].txcShared +
                      ((item?.percent ?? 0) * row.txcShared) / 10000,
                  },
                }
              : {
                  ...save,
                  [item?.address ?? '']: {
                    address: item?.address,
                    txcShared: ((item?.percent ?? 0) * row.txcShared) / 10000,
                  },
                },
          prev
        ),
      {}
    );

    return Object.values(rewardData).filter((item: any) => item.txcShared !== 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.memberStatistics]);

  const initial = ['sendmany "" "{'];
  const sendmany = [
    ...initial,
    ...reward!.map(
      (item: any, index: any) =>
        `\\"${item?.address}\\": ${(item?.txcShared ?? 0) / 10 ** 8}${index === reward.length - 1 ? '}"' : ','}`
    ),
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMemberStatistics();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (copy.value) {
      setTimeout(() => {
        copy.onFalse();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copy]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sendmany.join('\n'));
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <Paper>
        <ComponentBlock
          sx={{
            display: 'block',
            alignItems: 'unset',
            overflow: 'auto',
            maxHeight: 550,
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
      </Paper>

      <Stack direction="row" sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          sx={{ mr: 2 }}
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
        <Button color="inherit" onClick={() => handleBack()} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" onClick={() => confirm.onTrue()}>
          Confirm
        </Button>
      </Stack>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content={<ConfirmView setTransactionId={setTransactionId} />}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={loading}
            onClick={async () => {
              try {
                if (memberStatistics.length) {
                  const { data: result } = await confirmStatistics({
                    variables: { data: { id: memberStatistics[0]!.statisticsId, transactionId } },
                  });

                  if (result?.confirmStatistics.id) {
                    toast.success('Successfully confirmed!');

                    confirm.onFalse();

                    setTimeout(() => {
                      router.push(paths.dashboard.reward.root);
                    }, 1000);
                  }
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

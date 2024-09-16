import { useMemo, useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { splitArray } from 'src/utils/helper';
import { customizeDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmView } from 'src/components/Reward';
import { ScrollBar } from 'src/components/ScrollBar';
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
  const confirm = useBoolean();

  const [copy, setCopy] = useState<any>();
  const [transactionId, setTransactionId] = useState<any>();

  const [fetchMemberStatistics, { loading, data }] = useLazyQuery(FETCH_MEMBERSTATISTICS_QUERY, {
    variables: { filter: { issuedAt: customizeDate(date) } },
  });

  const [confirmStatistics, { loading: confirmLoading }] = useMutation(CONFIRM_STATISTICS);

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
                    txcShared: Math.ceil(
                      save[item?.address ?? ''].txcShared +
                        ((item?.percent ?? 0) * row.txcShared) / 10000
                    ),
                  },
                }
              : {
                  ...save,
                  [item?.address ?? '']: {
                    address: item?.address,
                    txcShared: Math.ceil(((item?.percent ?? 0) * row.txcShared) / 10000),
                  },
                },
          prev
        ),
      {}
    );

    return Object.values(rewardData).filter((item: any) => item.txcShared !== 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.memberStatistics]);

  const initial = ['texitcoin-cli sendmany "" "{'];
  const sendmany = splitArray(reward, CONFIG.TRANSACTION_COUNT);

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
    setCopy(
      new Array(sendmany.length)
        .fill('sendmany')
        .reduce((prev, _, index) => ({ ...prev, [index]: false }), {})
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reward]);

  const handleCopy = async (result: any[]) => {
    try {
      await navigator.clipboard.writeText(result.join('\n'));
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <Grid container>
        {new Array(sendmany.length).fill('sendmany').map((_, no) => {
          const result = [
            ...initial,
            ...sendmany[no]!.map(
              (item: any, index: any) =>
                `\\"${item?.address}\\": ${(item?.txcShared ?? 0) / 10 ** 8}${index === sendmany[no].length - 1 ? '}"' : ','}`
            ),
          ];

          return (
            <Grid lg={6} md={12} sx={{ padding: 1 }}>
              <ComponentBlock
                sx={{
                  display: 'block',
                  alignItems: 'unset',
                  overflow: 'auto',
                  backgroundColor: '#f2f2f2',
                  px: 3,
                  py: 2,
                }}
              >
                <Stack direction="row" justifyContent="flex-end" columnGap={2}>
                  <ConfirmView
                    setTransactionId={(value: any) =>
                      setTransactionId({ ...transactionId, [no]: value })
                    }
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
            </Grid>
          );
        })}
      </Grid>

      <Stack direction="row" sx={{ mt: 2 }}>
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
        content="Are you sure?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={confirmLoading}
            onClick={async () => {
              try {
                if (transactionId) {
                  const transactionIds = Object.values(transactionId);

                  if (transactionIds.length < sendmany.length) {
                    toast.error('Transaction ID is required!');
                    return;
                  }

                  await confirmStatistics({
                    variables: {
                      data: {
                        id: memberStatistics[0]!.statisticsId,
                        transactionId: Object.values(transactionId).join(','),
                      },
                    },
                  });

                  toast.success('Successfully confirmed!');

                  confirm.onFalse();

                  setTimeout(() => {
                    router.push(paths.dashboard.reward.root);
                  }, 1000);
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

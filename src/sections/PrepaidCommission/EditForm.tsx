import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, formatDate, customizeDate } from 'src/utils/format-time';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import { LoadingScreen } from 'src/components/loading-screen';

import LinkForm from './LinkForm';
import PaymentForm from './PaymentForm';
import { Schema, type SchemaType } from './schema';
import { useFetchMembers } from '../Members/useApollo';
import { FileManagerNewFolderDialog } from '../Sales/Upload';
import { FileRecentItem } from '../Sales/Edit/FileRecentItem';
import { useCreatePrepaid, useUpdatePrepaid, useFetchCommissionByMemberAndWeek } from './useApollo';

// ----------------------------------------------------------------------

interface Member {
  id: string;
  username: string;
  fullName?: string;
}

interface Props {
  current?: any;
}

export default function EditForm({ current }: Props) {
  const [member, setMember] = useState<Member>();
  const [week, setWeek] = useState<any>('');
  const [files, setFiles] = useState<string[]>();

  const router = useRouter();

  const location = useLocation();
  const memberId = location.state?.memberId;
  const uName = location.state?.username;
  const fName = location.state?.fullName;
  const weekStartDate = location.state?.weekStartDate;

  const defaultValues = useMemo(
    () => {
      if (current) {
        const txTypes = current ? current.txType.split(',') : '';
        const txIds = current ? current.txId.split(',') : '';

        const payments = txTypes.map((item: string, index: number) => ({
          txType: item,
          txId: txIds[index],
        }));

        return (
          Schema.safeParse({
            ...current,
            payments,
            note: current.proof.note,
            reflinks: current.proof.reflinks,
          })?.data ?? ({} as SchemaType)
        );
      }

      return {
        orderedAt: `${today('YYYY-MM-DD')}`,
        weekStartDate: `${dayjs(today()).utc().startOf('day')}`,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { loading, createPrepaid } = useCreatePrepaid();
  const { loading: updateLoading, updatePrepaid } = useUpdatePrepaid();
  const { loading: memberLoading, members, fetchMembers } = useFetchMembers();
  const {
    loading: commissionLodaing,
    commission,
    fetchCommissions,
  } = useFetchCommissionByMemberAndWeek();

  const handleUpdate = (data: any) => {
    setFiles((prev) => [...(prev ?? []), ...data.files]);
  };

  const onDelete = (id: string) => {
    setFiles(files?.filter((file: any) => id !== file.id));
  };

  const onSubmit = handleSubmit(async (newData) => {
    const { orderedAt, payments, ...rest } = newData;
    console.log(orderedAt, customizeDate(orderedAt));

    const txId = payments?.map((item) => item.txId).join(',');
    const txType = payments?.map((item) => item.txType).join(',');

    try {
      if (current) {
        await updatePrepaid({
          variables: {
            data: {
              ...rest,
              txId,
              txType,
              id: current.id,
              commissionId: commission?.id,
              orderedAt: customizeDate(orderedAt),
              fileIds: files?.map((file: any) => file.id),
            },
          },
        });
      } else {
        await createPrepaid({
          variables: {
            data: {
              ...rest,
              txId,
              txType,
              commissionId: commission?.id ?? '',
              orderedAt: customizeDate(orderedAt),
              fileIds: files?.map((file: any) => file.id),
            },
          },
        });
      }

      reset();
      router.push(paths.dashboard.prepaidCommission.root);
    } catch (err) {
      toast.error(err.message);
    }
  });

  useEffect(() => {
    fetchMembers({
      variables: {
        page: '1,5',
        filter: {
          OR: [
            { username: { contains: member?.username ?? '', mode: 'insensitive' } },
            { fullName: { contains: member?.username ?? '', mode: 'insensitive' } },
          ],
          status: true,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  useEffect(() => {
    if (current && current.proof.files) {
      setFiles(current?.proof.files?.map((file: any) => file));
      setWeek(formatDate(current.commission.weekStartDate));
    }
  }, [current]);

  useEffect(() => {
    fetchCommissions({
      variables: {
        data: {
          memberId: memberId ?? (current ? current.commission.member.id : member?.id ?? ''),
          weekStartDate: customizeDate(
            `${dayjs(weekStartDate ?? (current ? formatDate(current.commission.weekStartDate) : week)).startOf('week')}`
          ),
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, week, current, memberId, weekStartDate]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={9}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Prepayment</Typography>
            </Stack>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Autocomplete
                fullWidth
                name="memberId"
                label="Miner"
                autoHighlight
                disabled={!!current}
                options={members}
                loading={memberLoading}
                value={
                  memberId
                    ? { id: memberId, username: uName, fullName: fName }
                    : current?.commission?.member ?? member
                }
                loadingText={<LoadingButton loading={memberLoading} />}
                getOptionLabel={(option: Member | string) =>
                  `${(option as Member).username} (${(option as Member).fullName})`
                }
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => (
                  <li {...props} key={option!.username}>
                    {option.username}
                  </li>
                )}
                onInputChange={(_, username: string) => {
                  setMember({ id: current ? current.commission.member.id : '', username });
                }}
                onChange={(_, value) => {
                  setMember({ id: value?.id ?? '', username: value?.username ?? '' });
                }}
              />

              <Field.DatePicker
                name="weekStartDate"
                label="Week"
                format="YYYY-MM-DD"
                disabled={!!current}
                value={weekStartDate ? dayjs(weekStartDate) : dayjs(week)}
                onChange={(value) => setWeek(value)}
              />

              <Field.Text name="note" label="Note" />

              <Field.DatePicker name="orderedAt" label="Ordered At" format="YYYY-MM-DD" />
            </Box>

            {commissionLodaing ? (
              <Stack sx={{ py: 3 }}>
                <LoadingScreen />
              </Stack>
            ) : (
              commission && (
                <>
                  <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

                  <Stack direction="row">
                    <Stack width={1}>Commission: {commission.commission}</Stack>
                    <Stack width={1}>pkgL: {commission.pkgL}</Stack>
                    <Stack width={1}>pkgR: {commission.pkgR}</Stack>
                  </Stack>
                </>
              )
            )}

            <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

            <LinkForm />

            <PaymentForm />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={current ? updateLoading : loading}
              >
                {current ? 'Edit' : 'Create'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <FileManagerNewFolderDialog handleUpdate={handleUpdate} />

          <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', mt: 1 }}>
            {files?.map((file: any) => (
              <FileRecentItem key={file.id} file={file} onDelete={onDelete} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
}

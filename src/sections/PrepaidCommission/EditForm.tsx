import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, customizeDate } from 'src/utils/format-time';

import { PREPAYMRENT_TYPE } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import LinkForm from './LinkForm';
import { Schema, type SchemaType } from './schema';
import { useFetchMembers } from '../Members/useApollo';
import { FileManagerNewFolderDialog } from '../Sales/Upload';
import { FileRecentItem } from '../Sales/Edit/FileRecentItem';
import { useCreatePrepaid, useUpdatePrepaid } from './useApollo';

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
  const [files, setFiles] = useState<string[]>();

  const router = useRouter();

  const defaultValues = useMemo(
    () =>
      current
        ? Schema.safeParse(current)?.data ?? ({} as SchemaType)
        : {
            commission: 0,
            pkgL: 0,
            pkgR: 0,
            orderedAt: `${today('YYYY-MM-DD')}`,
            weekStartDate: `${dayjs(today()).utc().add(7, 'day').startOf('day')}`,
          },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { loading: memberLoading, members, fetchMembers } = useFetchMembers();
  const { loading, createPrepaid } = useCreatePrepaid();
  const { loading: updateLoading, updatePrepaid } = useUpdatePrepaid();

  const handleUpdate = (data: any) => {
    setFiles((prev) => [...(prev ?? []), ...data.files]);
  };

  const onDelete = (id: string) => {
    setFiles(files?.filter((file: any) => id !== file.id));
  };

  const onSubmit = handleSubmit(async (newData) => {
    const { orderedAt, weekStartDate, ...rest } = newData;
    try {
      if (current) {
        await updatePrepaid({
          variables: {
            data: {
              ...rest,
              id: current.id,
              memberId: member?.id,
              orderedAt: customizeDate(orderedAt),
              weekStartDate: customizeDate(weekStartDate),
              fileIds: files?.map((file: any) => file.id),
            },
          },
        });
      } else {
        await createPrepaid({
          variables: {
            data: {
              ...rest,
              memberId: member?.id ?? '',
              orderedAt: customizeDate(orderedAt),
              weekStartDate: customizeDate(weekStartDate),
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
    if (current && current.paymentConfirm) {
      setFiles(current?.paymentConfirm?.map((file: any) => file));
    }
  }, [current]);

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
              <Field.Text type="number" name="commission" label="Commission" />

              <Stack direction="row" columnGap={2}>
                <Field.Text type="number" name="pkgL" label="pkgL" />
                <Field.Text type="number" name="pkgR" label="pkgR" />
              </Stack>

              <Field.Autocomplete
                fullWidth
                name="memberId"
                label="Miner"
                autoHighlight
                options={members}
                loading={memberLoading}
                value={current?.member ?? member}
                loadingText={<LoadingButton loading={memberLoading} />}
                getOptionLabel={(option: Member | string) =>
                  `${(option as Member).username} (${(option as Member).fullName})`
                }
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                  <li {...props} key={option!.username}>
                    {option.username}
                  </li>
                )}
                onInputChange={(_, username: string) => {
                  console.log('onInputChange');
                  setMember({ id: '', username });
                }}
                onChange={(_, value) => {
                  console.log('onChange');
                  setMember({ id: value?.id ?? '', username: value?.username ?? '' });
                }}
              />

              <Field.Text name="note" label="Note" />

              <Field.DatePicker name="orderedAt" label="Ordered At" format="YYYY-MM-DD" />

              <Field.DatePicker name="weekStartDate" label="Week" format="YYYY-MM-DD" />

              <Field.Select name="txType" label="Payment Type">
                {PREPAYMRENT_TYPE.map((item) => (
                  <MenuItem value={item.label}>{item.label}</MenuItem>
                ))}
              </Field.Select>

              <Field.Text name="txId" label="Transaction / Purchase ID" />
            </Box>

            <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

            <LinkForm />

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

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, formatDate } from 'src/utils/format-time';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { useCreatePromo, useUpdatePromo } from './useApollo';

// ----------------------------------------------------------------------

interface Props {
  current?: any;
}

export default function EditForm({ current }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(current?.status ?? true);

  const Schema = zod.object({
    code: zod.string({ required_error: 'Code is required' }),
    description: zod.string({ required_error: 'Description is required' }),
    startDate: zod.string({ required_error: 'Start Date is required' }),
    endDate: zod.string({ required_error: 'End Date is required' }),
    status: current ? zod.boolean().default(true) : zod.number().default(1),
  });

  type SchemaType = zod.infer<typeof Schema>;

  const defaultValues = useMemo<SchemaType>(
    () =>
      current
        ? Schema.safeParse({
            ...current,
            startDate: formatDate(current.startDate),
            endDate: formatDate(current.endDate),
          })?.data ?? ({} as SchemaType)
        : {
            code: '',
            description: '',
            startDate: `${today('YYYY-MM-DD')}`,
            endDate: `${today('YYYY-MM-DD')}`,
            status: 1,
          },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { loading, createPromo } = useCreatePromo();
  const { loading: updateLoading, updatePromo } = useUpdatePromo();

  const onSubmit = handleSubmit(async ({ startDate, endDate, ...newData }) => {
    try {
      const diff = dayjs(endDate).diff(startDate, 'day');

      if (diff < 0) {
        toast.error('The end date must be later than the start date!');
        return;
      }

      if (current) {
        await updatePromo({
          variables: {
            data: {
              ...newData,
              startDate: formatDate(startDate, 'YYYY-MM-DD'),
              endDate: formatDate(endDate, 'YYYY-MM-DD'),
              status,
              id: current.id,
            },
          },
        });
      } else {
        await createPromo({
          variables: {
            data: {
              ...newData,
              startDate: formatDate(startDate, 'YYYY-MM-DD'),
              endDate: formatDate(endDate, 'YYYY-MM-DD'),
              status,
            },
          },
        });
      }

      reset();
      router.push(paths.dashboard.promos.root);
    } catch (err) {
      toast.error(err.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Promo</Typography>
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
          <Field.Text name="code" label="Code" />
          <Field.Text name="description" label="Description" />
          <Field.DatePicker name="startDate" label="Start Date" format="YYYY-MM-DD" />
          <Field.DatePicker name="endDate" label="End Date" format="YYYY-MM-DD" />
          <Field.Select
            name="status"
            label="Status"
            value={status ? 1 : 0}
            onChange={(e) => (Number(e.target.value) === 1 ? setStatus(true) : setStatus(false))}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </Field.Select>
        </Box>

        <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

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
    </Form>
  );
}

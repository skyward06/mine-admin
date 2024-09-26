import type { Package } from 'src/__generated__/graphql';

import { z as zod } from 'zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, formatDate, customizeDate } from 'src/utils/format-time';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { useCreatePackage, useUpdatePackage } from './useApollo';

// ----------------------------------------------------------------------

interface Props {
  current?: Package;
}

export default function EditForm({ current }: Props) {
  const [status, setStatus] = useState(current?.status ?? true);
  const [isFreeShare, setIsFreeShare] = useState(current?.isFreeShare ?? false);

  const NewProductSchema = zod.object({
    amount: zod.number({ required_error: 'Amount is required' }),
    token: zod.number({ required_error: 'Hash Power is required' }),
    productName: zod.string({ required_error: 'Payment Method is required' }),
    status: current
      ? zod.boolean({ required_error: 'Status is required' }).default(true)
      : zod.number({ required_error: 'Status is required' }).default(1),
    isFreeShare: current
      ? zod.boolean({ required_error: 'Free Share is required' }).default(true)
      : zod.number({ required_error: 'Free Share is required' }).default(1),
    freePeriodFrom: zod.string({ required_error: 'From is required' }),
    freePeriodTo: zod.string({ required_error: 'To is required' }),
    point: zod.number({ required_error: 'Point is required' }),
  });

  type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

  const router = useRouter();

  const defaultValues = useMemo(
    () =>
      current
        ? {
            ...NewProductSchema.safeParse(current)?.data,
            freePeriodFrom: formatDate(current.freePeriodFrom),
            freePeriodTo: formatDate(current.freePeriodTo),
          } ?? ({} as NewProductSchemaType)
        : {
            productName: '',
            amount: 0,
            token: 0,
            status: 1,
            isFreeShare: 0,
            freePeriodFrom: `${new Date(today())}`,
            freePeriodTo: `${new Date(today())}`,
            point: 0,
          },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const { createPackage, loading } = useCreatePackage();
  const { updatePackage, loading: updateLoading } = useUpdatePackage();

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newData) => {
    try {
      if (current) {
        await updatePackage({
          variables: {
            data: {
              ...newData,
              id: current.id,
              status,
              isFreeShare,
              freePeriodFrom: customizeDate(newData.freePeriodFrom),
              freePeriodTo: customizeDate(newData.freePeriodTo),
            },
          },
        });
      } else {
        await createPackage({
          variables: {
            data: {
              ...newData,
              status,
              isFreeShare,
              freePeriodFrom: customizeDate(newData.freePeriodFrom),
              freePeriodTo: customizeDate(newData.freePeriodTo),
            },
          },
        });

        reset();
      }

      toast.success(`${current ? 'Update' : 'Create'} success!`);

      router.push(paths.dashboard.products.root);
    } catch (err) {
      toast.error(err.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xl={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Product</Typography>
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
              <Field.Text name="productName" label="Product Name" />
              <Field.Text
                name="amount"
                type="number"
                label="Amount"
                disabled={!!(current?.sales ?? []).length}
              />
              <Field.Text
                name="token"
                type="number"
                label="Hash Power"
                disabled={!!(current?.sales ?? []).length}
              />
              <Field.Text
                name="point"
                type="number"
                label="Point"
                disabled={!!(current?.sales ?? []).length}
              />
              <Field.Select
                name="isFreeShare"
                label="Free Share"
                value={isFreeShare ? 1 : 0}
                onChange={(e) =>
                  Number(e.target.value) === 1 ? setIsFreeShare(true) : setIsFreeShare(false)
                }
                disabled={!!(current?.sales ?? []).length}
              >
                <MenuItem value={1}>Free</MenuItem>
                <MenuItem value={0}>Premium</MenuItem>
              </Field.Select>
              <Field.Select
                name="status"
                label="Status"
                value={status ? 1 : 0}
                onChange={(e) =>
                  Number(e.target.value) === 1 ? setStatus(true) : setStatus(false)
                }
                disabled={!!(current?.sales ?? []).length}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Field.Select>
              <Field.DatePicker name="freePeriodFrom" label="From" format="YYYY-MM-DD" />
              <Field.DatePicker name="freePeriodTo" label="To" format="YYYY-MM-DD" />
            </Box>

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
      </Grid>
    </Form>
  );
}

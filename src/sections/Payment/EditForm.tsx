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

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import LinkForm from './LinkForm';
import { Schema, type SchemaType } from './schema';
import { useCreatePayment, useUpdatePayment } from './useApollo';

import type { PaymentMethod } from './List/type';

interface Props {
  current?: PaymentMethod;
}

export default function EditForm({ current }: Props) {
  const [visible, setVisible] = useState(current?.visible ?? false);

  const router = useRouter();

  const defaultValues = useMemo(
    () =>
      current
        ? Schema.safeParse(current)?.data ?? ({} as SchemaType)
        : {
            name: '',
          },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { loading, createPayment } = useCreatePayment();
  const { loading: updateLoading, updatePayment } = useUpdatePayment();

  const onSubmit = handleSubmit(async ({ ...newData }) => {
    try {
      if (current) {
        await updatePayment({
          variables: {
            data: {
              ...newData,
              id: current.id,
              visible,
            },
          },
        });
      } else {
        await createPayment({
          variables: {
            data: { ...newData, visible },
          },
        });
      }

      reset();
      router.push(paths.dashboard.paymentMethod.root);
    } catch (err) {
      toast.error(err.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Payment</Typography>
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
          <Field.Text name="name" label="Name" />

          <Field.Text name="defaultLink" label="Default Link" />
          <Field.Select
            name="visible"
            label="Visible"
            value={visible ? 1 : 0}
            onChange={(e) => (Number(e.target.value) === 1 ? setVisible(true) : setVisible(false))}
          >
            <MenuItem value={1}>Show</MenuItem>
            <MenuItem value={0}>Hide</MenuItem>
          </Field.Select>
        </Box>

        <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

        <LinkForm />

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={current ? updateLoading : loading}
          >
            {current ? 'Edit' : 'Create'}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}

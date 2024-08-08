import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { CREATE_PACKAGE } from '../query';

// ----------------------------------------------------------------------
export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

const NewProductSchema = zod.object({
  amount: zod.number({ required_error: 'Amount is required' }),
  token: zod.number({ required_error: 'Hash Power is required' }),
  productName: zod.string({ required_error: 'Payment Method is required' }),
  status: zod.number({ required_error: 'Status is required' }).default(1),
});

export default function ProductCreateForm() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      productName: '',
      amount: 0,
      token: 0,
      status: 1,
    }),
    []
  );

  const [submit, { loading }] = useMutation(CREATE_PACKAGE);

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ status, ...data }) => {
    try {
      await submit({
        variables: {
          data: {
            ...data,
            status: !!status,
          },
        },
      });

      reset();

      toast.success('Create success!');

      router.push(paths.dashboard.products.root);
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;
        if (error.path?.includes('email')) {
          setError('productName', { type: 'manual', message: error?.message || '' });
        }
      } else {
        toast.error(err.message);
      }
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
              <Field.Text name="amount" type="number" label="Amount" />
              <Field.Text name="hashPower" type="number" label="Hash Power" />
              <Field.Select name="status" label="Status">
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Field.Select>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Create Product
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, formatDate, customizeDate } from 'src/utils/format-time';

import { PAYMENT_TYPE } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { useFetchMembers } from 'src/sections/Members/useApollo';
import { FETCH_PACKAGES_QUERY } from 'src/sections/Products/query';

import { useCreateSale } from '../useApollo';
import { FileManagerNewFolderDialog } from '../Upload';

// ----------------------------------------------------------------------
export type NewSaleSchemaType = zod.infer<typeof NewSaleSchema>;

interface Member {
  id: string;
  username: string;
  fullName?: string;
}

const NewSaleSchema = zod.object({
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  paymentMethod: zod.string({ required_error: 'Payment Method is required' }),
  status: zod.number({ required_error: 'Status is required' }).default(1),
  note: zod.string().optional().nullable(),
});

export default function SaleCreateForm() {
  const router = useRouter();

  const [member, setMember] = useState<Member>();
  const [fileIds, setFileIds] = useState<string[]>();
  const [packageId, setPackageId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const defaultValues = useMemo(
    () => ({
      packageId: '',
      orderedAt: `${new Date(today())}`,
      paymentMethod: '',
      note: '',
      memberId: '',
      status: 1,
    }),
    []
  );

  const { loading, createSale } = useCreateSale();

  const methods = useForm<NewSaleSchemaType>({
    resolver: zodResolver(NewSaleSchema),
    defaultValues,
  });

  const { fetchMembers, members } = useFetchMembers();

  const [fetchPackages, { data: packageData }] = useLazyQuery(FETCH_PACKAGES_QUERY, {
    variables: { filter: { status: true } },
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ status, orderedAt, ...data }) => {
    try {
      await createSale({
        variables: {
          data: {
            ...data,
            fileIds,
            status: !!status,
            orderedAt: customizeDate(orderedAt),
            memberId: member?.id ?? '',
            packageId,
            paymentMethod,
          },
        },
      });

      reset();

      toast.success('Create success!');

      router.push(paths.dashboard.sales.root);
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;
        if (error.path?.includes('email')) {
          setError('paymentMethod', { type: 'manual', message: error?.message || '' });
        }
        toast.error(err.message);
      } else {
        toast.error(err.message);
      }
    }
  });

  const handleUpdate = (data: any) => {
    setFileIds([...data.files.map((item: any) => item.id)]);
  };

  const packages = packageData?.packages.packages ?? [];

  useEffect(() => {
    fetchMembers({
      variables: {
        filter: {
          emailVerified: true,
          OR: [{ username: { contains: member?.username ?? '', mode: 'insensitive' } }],
        },
        page: '1,10',
      },
    });
    fetchPackages();
  }, [member, fetchMembers, fetchPackages]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={9}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }} direction="row" justifyContent="space-between">
              <Typography variant="h5">Sale</Typography>
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
              <Autocomplete
                fullWidth
                options={members}
                getOptionLabel={(option) =>
                  `${option!.username} (${formatDate(option?.createdAt)})`
                }
                renderInput={(params) => (
                  <TextField {...params} required label="Miner" margin="none" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option!.username}>
                    {option!.username}
                  </li>
                )}
                onChange={(_, value) =>
                  setMember({ id: value?.id ?? '', username: value?.username ?? '' })
                }
                onInputChange={(_, username: string) => {
                  setMember({ id: '', username });
                }}
              />

              <Autocomplete
                fullWidth
                options={packages}
                getOptionLabel={(option) => option!.productName}
                renderInput={(params) => (
                  <TextField {...params} required label="Package" margin="none" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option!.productName}>
                    {option!.productName}
                  </li>
                )}
                onChange={(_, newValue) => setPackageId(newValue?.id!)}
              />

              <Field.DatePicker name="orderedAt" label="Ordered At" format="YYYY-MM-DD" />

              <Autocomplete
                freeSolo
                fullWidth
                options={PAYMENT_TYPE}
                getOptionLabel={(option: any) => option.value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    name="paymentMethod"
                    label="Payment Method"
                    margin="none"
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option!.label}>
                    {option.value}
                  </li>
                )}
                onChange={(_, value: any) => setPaymentMethod(value.value)}
                onInputChange={(_, value: any) => setPaymentMethod(value)}
              />

              <Field.Select name="status" label="Status" required>
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Field.Select>

              <Field.Text name="note" label="Note" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Create Sale
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <FileManagerNewFolderDialog preview handleUpdate={handleUpdate} />
        </Grid>
      </Grid>
    </Form>
  );
}

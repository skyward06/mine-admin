import { useForm } from 'react-hook-form';
import { ApolloError } from '@apollo/client';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { today, customizeDate } from 'src/utils/format-time';

import { PEER } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import SearchMiner from 'src/components/SearchMiner';

import LinkForm from 'src/sections/PrepaidCommission/LinkForm';
import { useFetchPackages } from 'src/sections/Products/useApollo';
import { useFetchPayments } from 'src/sections/PaymentMethod/useApollo';

import { Schema, type SchemaType } from './Schema';
import { FileManagerNewFolderDialog } from '../Upload';
import { useCreateSale, useCheckRefduplication } from '../useApollo';

export default function SaleCreateForm() {
  const router = useRouter();
  const isShow = useBoolean();

  const [fileIds, setFileIds] = useState<string[]>();
  const [memberId, setMemberId] = useState<string>('');
  const [packageId, setPackageId] = useState<string>('');
  const [toMemberId, setToMemberId] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const defaultValues = useMemo(
    () => ({
      packageId: '',
      orderedAt: `${today('YYYY-MM-DD')}`,
      paymentMethod: '',
      note: '',
      memberId: '',
      status: 1,
      isMetal: false,
    }),
    []
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });
  const { reset, setError, handleSubmit } = methods;

  const { payments } = useFetchPayments();
  const { loading, createSale } = useCreateSale();
  const { packages, fetchPackages } = useFetchPackages();
  const { checkSaleRefDuplication } = useCheckRefduplication();

  const onSubmit = handleSubmit(async ({ status, orderedAt, ...newData }) => {
    try {
      const { data } = await checkSaleRefDuplication({
        variables: { data: { links: newData?.reflinks! } },
      });

      if (data?.checkSaleRefDuplication.result !== 'success') {
        toast.error(data?.checkSaleRefDuplication.message);
      }

      await createSale({
        variables: {
          data: {
            ...newData,
            fileIds,
            status: !!status,
            orderedAt: customizeDate(orderedAt),
            memberId,
            packageId,
            toMemberId,
            paymentMethod,
          },
        },
      });

      reset();
      toast.success('Sale created successfully!');
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

  useEffect(() => {
    fetchPackages({ variables: { filter: { status: true } } });
  }, [fetchPackages]);

  useEffect(() => {
    if (paymentMethod === PEER) {
      isShow.onTrue();
    } else {
      isShow.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

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
              <SearchMiner setMemberId={setMemberId} />

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

              <Field.Select name="status" label="Status" required>
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Field.Select>

              <Autocomplete
                freeSolo
                fullWidth
                options={payments}
                getOptionLabel={(option: any) => option.name}
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
                  <li {...props} key={option!.name}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value: any) => setPaymentMethod(value.name)}
                onInputChange={(_, value: any) => setPaymentMethod(value)}
              />

              <Field.Text name="note" label="Note" />

              {isShow.value && (
                <>
                  <SearchMiner
                    setMemberId={setToMemberId}
                    filter={{ peerAcceptable: true }}
                    label="Peer to Peer Miner"
                  />
                  <Field.Switch name="isMetal" label="Metal Peer Payment" sx={{ mt: { md: 1 } }} />
                </>
              )}
            </Box>

            <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

            <LinkForm />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                // disabled={isSaturday()}
              >
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

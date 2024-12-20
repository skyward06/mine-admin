import { z as zod } from 'zod';
import isEqual from 'lodash/isEqual';
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

import { formatID } from 'src/utils/helper';
import { formatDate, customizeDate } from 'src/utils/format-time';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import SearchMiner from 'src/components/SearchMiner';

import LinkForm from 'src/sections/PrepaidCommission/LinkForm';
import { useFetchPayments } from 'src/sections/Payment/useApollo';
import { useFetchPackages } from 'src/sections/Products/useApollo';

import { useUpdateSale } from '../useApollo';
import { FileRecentItem } from './FileRecentItem';
import { FileManagerNewFolderDialog } from '../Upload';

// ----------------------------------------------------------------------

type Props = {
  // Todo: Restore Sale Type
  currentSale: any;
};

// ----------------------------------------------------------------------
export type SaleGeneralSchemaType = zod.infer<typeof SaleGeneralSchema>;

const SaleGeneralSchema = zod.object({
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  paymentMethod: zod.string({ required_error: 'Payment Method is required' }),
  status: zod.boolean({ required_error: 'Status is required' }).default(true),
  freeShareSponsor: zod.number({ required_error: 'FreeShare Sponsor is required' }).default(0),
  packageId: zod.string({ required_error: 'Package is required' }),
  note: zod.string().optional().nullable(),
  reflinks: zod
    .array(
      zod.object({
        linkType: zod.string(),
        link: zod.string(),
      })
    )
    .optional()
    .nullable(),
});

export default function SaleGeneral({ currentSale }: Props) {
  const router = useRouter();

  const [memberId, setMemberId] = useState<string>('');

  const { status: currentStatus, ID } = currentSale;

  const [files, setFiles] = useState<string[]>();
  const [status, setStatus] = useState(currentStatus);
  const [paymentMethod, setPaymentMethod] = useState<string>();

  const { payments } = useFetchPayments();
  const { packages, fetchPackages } = useFetchPackages();

  const { loading, updateSale } = useUpdateSale();

  const defaultValues = useMemo(() => {
    const { data } = SaleGeneralSchema.safeParse(currentSale);

    return currentSale
      ? {
          ...data,
          orderedAt: formatDate(currentSale.orderedAt),
          reflinks: currentSale.proof?.reflinks,
          note: currentSale.proof?.note,
        }
      : ({} as SaleGeneralSchemaType);
  }, [currentSale]);

  useEffect(() => {
    fetchPackages({ variables: { filter: { status: true } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentSale && currentSale.proof?.files) {
      setFiles(currentSale?.proof.files?.map((file: any) => file));
    }
  }, [currentSale]);

  const methods = useForm<SaleGeneralSchemaType>({
    resolver: zodResolver(SaleGeneralSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newData) => {
    try {
      const { status: newStatus, orderedAt, ...newSale } = newData;

      console.log('new status => ', newStatus);

      if (isEqual(newSale, defaultValues)) {
        toast.warning('No changes to save');
        return;
      }

      await updateSale({
        variables: {
          data: {
            ...newSale,
            id: currentSale.id,
            orderedAt: customizeDate(orderedAt),
            memberId: memberId ?? currentSale.member.id,
            fileIds: files?.map((file: any) => file.id),
            status,
            paymentMethod,
          },
        },
      });

      toast.success('Update success!');

      router.push(paths.dashboard.sales.root);
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;

        console.log('error => ', error);
      }
      toast.error(err.message);
    }
  });

  const handleUpdate = (data: any) => {
    setFiles((prev) => [...(prev ?? []), ...data.files]);
  };

  const onDelete = (id: string) => {
    setFiles(files?.filter((file: any) => id !== file.id));
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={9}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }} direction="row" justifyContent="space-between">
              <Typography variant="h5">{formatID(ID, 'S')}</Typography>
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
              <SearchMiner setMemberId={setMemberId} currentMember={currentSale.member} />

              <Field.Select name="packageId" label="Package">
                {packages.map((option) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.productName}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.DatePicker name="orderedAt" label="Ordered At" format="YYYY-MM-DD" />

              <Autocomplete
                freeSolo
                fullWidth
                options={payments}
                getOptionLabel={(option: any) => option!.name}
                value={{ name: paymentMethod ?? currentSale.paymentMethod }}
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
                onInputChange={(_, value: any) => setPaymentMethod(value)}
                onChange={(_, value: any) => setPaymentMethod(value.name)}
              />

              <Stack direction="row" spacing={2}>
                <Field.Select
                  name="status"
                  label="Status"
                  value={status ? 1 : 0}
                  onChange={(e) =>
                    Number(e.target.value) === 1 ? setStatus(true) : setStatus(false)
                  }
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </Field.Select>

                <Field.Text type="number" name="freeShareSponsor" label="FreeShare Sponsor" />
              </Stack>

              <Field.Text name="note" label="Note" />
            </Box>

            <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

            <LinkForm />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Save Changes
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

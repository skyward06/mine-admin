import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, customizeDate } from 'src/utils/format-time';

import { Form, Field } from 'src/components/Form';
import SearchMiner from 'src/components/SearchMiner';

import { Schema, type SchemaType } from './schema';
import { useCreateBalance } from '../List/useApollo';

export default function EditForm() {
  const [toMemberId, setToMemberId] = useState<string>();

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      date: `${today('YYYY-MM-DD')}`,
    }),
    []
  );

  const methods = useForm<SchemaType>({ resolver: zodResolver(Schema), defaultValues });

  const { reset, handleSubmit } = methods;

  const { loading, createBalance } = useCreateBalance();

  const onSubmit = handleSubmit(async (newData) => {
    try {
      await createBalance({
        variables: {
          data: {
            ...newData,
            amountInCents: -newData.amountInCents * 100,
            date: customizeDate(newData.date),
            memberId: toMemberId ?? '',
            type: 'CASH',
          },
        },
      });

      reset();
      router.push(paths.dashboard.balance.root);
    } catch (error) {
      console.log('error => ', error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        <Field.Text type="number" name="amountInCents" label="Amount" />
        {/* <Autocomplete
          freeSolo
          fullWidth
          options={BALANCE_TYPE}
          getOptionLabel={(option: any) => option}
          renderInput={(params) => (
            <TextField {...params} required name="type" label="Type" margin="none" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          onChange={(_, value: any) => setType(value)}
          onInputChange={(_, value: any) => setType(value)}
        /> */}
        <SearchMiner setMemberId={setToMemberId} label="Miner" />
        <Field.DatePicker name="date" label="Date" format="YYYY-MM-DD" />
        <Field.Text name="note" label="Note" />
        <Field.Text name="extra2" label="Extra Information" />
      </Box>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Pay
        </LoadingButton>
      </Stack>
    </Form>
  );
}

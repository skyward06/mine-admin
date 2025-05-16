import dayjs from 'dayjs';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { today, formatDate } from 'src/utils/format-time';

import { PaymentChain } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import { ConfirmDialog } from 'src/components/Dialog';

import SearchPeriod from 'src/sections/Placement/List/searchPeriod';

import { useSetCollectAddress } from './useApollo';
import { Schema, type SchemaType } from './schema';

export default function EditForm() {
  const router = useRouter();
  const open = useBoolean();

  const weekStartDate = useRef<string>(today('YYYY-MM-DD'));

  const defaultValues: SchemaType = {
    address: '',
    chain: PaymentChain.Eth,
  };

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { loading, setCollectAddress } = useSetCollectAddress();

  const onPeriodChange = (value: any) => {
    weekStartDate.current = `${formatDate(`${dayjs(value).utc().startOf('week')}`, 'YYYY-MM-DD')}`;
    open.onFalse();
  };

  const onSubmit = handleSubmit(async (newData) => {
    try {
      const { data } = await setCollectAddress({
        variables: { data: { ...newData, weekStartDate: weekStartDate.current } },
      });

      if (data) {
        reset();
        router.push(paths.dashboard.setAddress.root);
      }
    } catch (err) {
      toast.error(err.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Set a new address</Typography>
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
          <Field.Text name="address" label="Address" />
          <Field.Select name="chain" label="Chain">
            {Object.values(PaymentChain).map((chain) => (
              <MenuItem key={chain} value={chain}>
                {chain}
              </MenuItem>
            ))}
          </Field.Select>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={2}>
              <Typography>{dayjs(weekStartDate.current).format('MM/DD/YYYY')}</Typography>
              <Typography>-</Typography>
              <Typography>
                {dayjs(weekStartDate.current).endOf('week').format('MM/DD/YYYY')}
              </Typography>
            </Stack>
            <Button variant="contained" color="primary" onClick={open.onTrue}>
              Select Week
            </Button>
          </Stack>
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={loading}>
            Set
          </LoadingButton>
        </Stack>
      </Card>

      <ConfirmDialog
        open={open.value}
        onClose={open.onFalse}
        title="Select Week"
        content={<SearchPeriod onChange={onPeriodChange} />}
        action={null}
      />
    </Form>
  );
}

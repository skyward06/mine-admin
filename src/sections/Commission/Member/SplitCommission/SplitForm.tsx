import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { ConfirmationStatus, type WeeklyCommission } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import MultiForm from './MultiForm';
import { Schema, type SchemaType } from './schema';
import { useUpdateCommission } from '../../useApollo';

interface Props {
  open: UseBooleanReturn;
  row: WeeklyCommission;
}

export default function SplitForm({ open, row }: Props) {
  const defaultValues = useMemo(
    () => ({
      splitWays: [
        {
          way: 'Bogo',
          money: 0,
          note: '',
        },
      ],
      autoCreate: false,
    }),
    []
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { loading, updateCommission } = useUpdateCommission();

  const onSubmit = handleSubmit(async ({ autoCreate, splitWays }) => {
    try {
      const total = splitWays?.reduce((prev: number, current: any) => prev + current.money, 0);

      if (total !== row.commission) {
        toast.error('Total commission does not match!');
        return;
      }

      const { data } = await updateCommission({
        variables: { data: { id: row.id, status: ConfirmationStatus.Paid, autoCreate, splitWays } },
      });

      if (data) {
        toast.success('Successfully Paid!');
        reset();
      }
    } catch (err) {
      toast.error(err);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <DialogTitle>Commission ({row.commission})</DialogTitle>
      <DialogContent sx={{ p: 5 }}>
        <MultiForm />
        <Field.Switch name="autoCreate" label="Auto Create (Sale)" sx={{ p: 0 }} />
      </DialogContent>
      <DialogActions>
        <LoadingButton type="submit" variant="contained" loading={loading}>
          OK
        </LoadingButton>
        <Button variant="outlined" onClick={open.onFalse}>
          Cnacel
        </Button>
      </DialogActions>
    </Form>
  );
}

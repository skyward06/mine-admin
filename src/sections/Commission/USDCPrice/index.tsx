import type { ApproveCommissionWithTxId } from 'src/__generated__/graphql';

import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';

import Sendmany from './Sendmany';
import { useApproveCommissionTransaction } from '../useApollo';

interface Props {
  open: UseBooleanReturn;
}

export default function USDCPrice({ open }: Props) {
  const [txData, setTxData] = useState<ApproveCommissionWithTxId[]>([]);

  const disabled = useBoolean();

  const { loading, approveCommissionTransaction } = useApproveCommissionTransaction();

  const handleApprove = async () => {
    try {
      if (txData.find((item) => !item.txID)) {
        toast.error('Transaction ID is required');
      }

      const { data } = await approveCommissionTransaction({ variables: { data: { txData } } });

      if (data) {
        toast.success('Successfully approved!');
        open.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open.value}>
      <DialogTitle>Sendmany</DialogTitle>
      <DialogContent>
        <Paper sx={{ py: 1 }}>
          <Sendmany disabled={disabled} setTxData={setTxData} />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button variant="soft" onClick={open.onFalse}>
          Close
        </Button>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={handleApprove}
          disabled={disabled.value}
        >
          Approve
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

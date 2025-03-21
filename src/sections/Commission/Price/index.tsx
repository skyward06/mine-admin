import axios from 'axios';
import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { CONFIG } from 'src/config';

import { toast } from 'src/components/SnackBar';

import Current from './Current';
import Sendmany from './Sendmany';
import { useApproveCommissionTransaction } from '../useApollo';

interface Props {
  open: UseBooleanReturn;
}

type TxData = {
  txID: string;
  ids: string[];
};

export default function Price({ open }: Props) {
  const [step, setStep] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [txData, setTxData] = useState<TxData[]>([]);

  const disabled = useBoolean();

  const { loading, approveCommissionTransaction } = useApproveCommissionTransaction();

  const handleApprove = async () => {
    try {
      const { data } = await approveCommissionTransaction({ variables: { data: { txData } } });

      if (data) {
        toast.success('Successfully approved!');
        open.onFalse();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    async function getPrice() {
      try {
        const { data } = await axios.get(`${CONFIG.SITE_URL}/api/explorer/getcurrentprice`, {
          responseType: 'json',
        });

        setPrice(data);
      } catch (error) {
        console.log('error => ', error);
      }
    }

    getPrice();
  }, []);

  return (
    <Dialog fullWidth maxWidth="md" open={open.value}>
      <DialogTitle>
        {step === 0 && 'Confirm TXC Price'}
        {step === 1 && 'Sendmany'}
      </DialogTitle>
      <DialogContent>
        <Paper sx={{ py: 1 }}>
          {step === 0 && <Current price={price} setPrice={setPrice} />}
          {step === 1 && <Sendmany disabled={disabled} txcPrice={price} setTxData={setTxData} />}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button
          variant="soft"
          onClick={() => {
            open.onFalse();
            setStep(0);
          }}
        >
          Close
        </Button>
        <Button
          variant="outlined"
          onClick={() => setStep((prev) => prev - 1)}
          disabled={step === 0 || disabled.value}
        >
          Previous
        </Button>
        {step === 1 ? (
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleApprove}
            disabled={disabled.value}
          >
            Approve
          </LoadingButton>
        ) : (
          <Button variant="contained" onClick={() => setStep((prev) => prev + 1)}>
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

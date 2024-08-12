import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

interface Props {
  setTransactionId: Function;
}

export const ConfirmView = ({ setTransactionId }: Props) => (
  <Paper sx={{ py: 2 }}>
    <TextField
      variant="outlined"
      fullWidth
      label="Transaction ID"
      onChange={(e) => setTransactionId(e.target.value)}
    />
  </Paper>
);

import TextField from '@mui/material/TextField';

interface Props {
  setTransactionId: Function;
}

export const ConfirmView = ({ setTransactionId }: Props) => (
  <TextField
    variant="outlined"
    label="Transaction ID"
    size="small"
    fullWidth
    required
    onChange={(e) => setTransactionId(e.target.value)}
  />
);

import TextField from '@mui/material/TextField';

interface Props {
  price: number;
  setPrice: Function;
}

export default function Current({ price, setPrice }: Props) {
  const handlePriceChange = (event: any) => {
    setPrice(+event.target.value);
  };

  return (
    <TextField
      fullWidth
      type="number"
      label="Current Price"
      value={price}
      onChange={handlePriceChange}
      InputLabelProps={{ shrink: true }}
    />
  );
}

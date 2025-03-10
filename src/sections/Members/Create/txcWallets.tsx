import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { TXC_WALLET } from 'src/consts';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

export default function TXCWallets() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'txcWallets' });

  const addWallet = () => {
    append({
      note: '',
      percent: 0,
      address: '',
      payoutId: '',
      isDefault: false,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <Typography sx={{ pb: 2 }} variant="subtitle1">
        TXC Wallets
      </Typography>
      {fields.map((item, index) => (
        <Stack sx={{ mb: 1 }}>
          <Box
            key={item.id}
            rowGap={3}
            columnGap={1}
            display="grid"
            sx={{ mb: 1, gridTemplateColumns: '30% 50% auto' }}
          >
            <Field.Select name={`txcWallets[${index}].payoutId`} label="Payment Type" size="small">
              {TXC_WALLET.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.method}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text name={`txcWallets[${index}].address`} label="Address" size="small" />

            <Field.Text
              name={`txcWallets[${index}].percent`}
              label="Percent"
              type="number"
              size="small"
            />
          </Box>
          <Box display="grid" sx={{ gridTemplateColumns: '70% 15% auto' }} columnGap={2}>
            <Field.Text name={`txcWallets[${index}].note`} label="Note" size="small" />

            <Field.Switch name={`txcWallets[${index}].isDefault`} label="Default" />

            <Button
              size="small"
              color="error"
              sx={{ mt: 0.5, width: 80 }}
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            />
          </Box>
          <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />
        </Stack>
      ))}
      <IconButton
        size="small"
        color="default"
        sx={{
          borderRadius: 0,
          '&:hover': { background: 'transparent', color: '#00A76F' },
        }}
        onClick={addWallet}
      >
        <Iconify icon="bxs:plus-circle" sx={{ mr: 1 }} />
        <Typography>Add Item</Typography>
      </IconButton>
    </Card>
  );
}

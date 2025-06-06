import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { OTHER_WALLET } from 'src/consts';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

export default function OtherWallets() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'otherWallets' });

  const addWallet = () => {
    append({
      payoutId: '',
      address: '',
      note: '',
      percent: 0,
      isDefault: !fields.length,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <Typography sx={{ pb: 2 }} variant="subtitle1">
        Other Wallets
      </Typography>
      {fields.map((item, index) => (
        <Stack sx={{ mb: 1 }}>
          <Box
            key={item.id}
            rowGap={3}
            columnGap={1}
            display="grid"
            sx={{ mb: 1, gridTemplateColumns: '30% auto' }}
          >
            <Field.Select
              name={`otherWallets[${index}].payoutId`}
              label="Payment Type"
              size="small"
            >
              {OTHER_WALLET.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.method}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text name={`otherWallets[${index}].address`} label="Address" size="small" />
          </Box>
          <Box display="grid" sx={{ gridTemplateColumns: '70% 15% auto' }} columnGap={2}>
            <Field.Text name={`otherWallets[${index}].note`} label="Note" size="small" />

            <Field.Switch name={`otherWallets[${index}].isDefault`} label="Default" />

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

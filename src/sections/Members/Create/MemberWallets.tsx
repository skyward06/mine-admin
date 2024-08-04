import { useFieldArray, useFormContext } from 'react-hook-form';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

interface Props {
  // Todo: Change type as Payout
  payouts: any[];
}

export default function MemberWallets({ payouts }: Props) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'wallets' });

  const handleAdd = () => {
    append({
      payoutId: '',
      address: '',
      percent: 0,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Card sx={{ p: 3 }}>
      {fields.map((item, index) => (
        <Stack key={item.id} alignItems="flex-end" spacing={0.5} sx={{ mb: 1 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Field.Select
              name={`wallets[${index}].payoutId`}
              label="Payout"
              InputLabelProps={{ shrink: true }}
              sx={{ width: 300 }}
            >
              {payouts.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.method}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text
              name={`wallets[${index}].address`}
              label="Address"
              InputLabelProps={{ shrink: true }}
            />

            <Field.Text
              name={`wallets[${index}].percent`}
              label="Percent"
              type="number"
              InputLabelProps={{ shrink: true }}
              sx={{ width: 200 }}
            />
          </Stack>

          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={() => handleRemove(index)}
          >
            Remove
          </Button>
        </Stack>
      ))}
      <Divider flexItem sx={{ borderStyle: 'dashed', mb: 1 }} />
      <IconButton
        size="small"
        color="default"
        sx={{
          borderRadius: 0,
          '&:hover': { background: 'transparent', color: '#00A76F' },
        }}
        onClick={handleAdd}
      >
        <Iconify icon="bxs:plus-circle" sx={{ mr: 1 }} />
        <Typography>Add Item</Typography>
      </IconButton>
    </Card>
  );
}

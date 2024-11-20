import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { PREPAYMRENT_TYPE } from 'src/consts';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

export default function LinkForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'payments' });

  const addField = () => {
    append({
      txType: '',
      txId: '',
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Paper sx={{ mb: 2 }}>
      <Typography sx={{ pb: 2 }} variant="subtitle1">
        Payment
      </Typography>

      {fields.map((item, index) => (
        <Stack sx={{ mb: 1 }}>
          <Box
            key={item.id}
            rowGap={3}
            columnGap={1}
            display="grid"
            sx={{ mb: 1, gridTemplateColumns: '30% 55% auto' }}
          >
            <Field.Select name={`payments[${index}].txType`} label="Payment Type">
              {PREPAYMRENT_TYPE.map((prepayment) => (
                <MenuItem value={prepayment.label}>{prepayment.label}</MenuItem>
              ))}
            </Field.Select>

            <Field.Text name={`payments[${index}].txId`} label="Transaction / Purchase ID" />
            <Button
              size="small"
              color="error"
              sx={{ mt: 1.5, width: 80 }}
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            />
          </Box>
        </Stack>
      ))}

      <IconButton
        size="small"
        color="default"
        sx={{
          borderRadius: 0,
          '&:hover': { background: 'transparent', color: '#00A76F' },
        }}
        onClick={addField}
      >
        <Iconify icon="bxs:plus-circle" sx={{ mr: 1 }} />
        <Typography>Add Item</Typography>
      </IconButton>
    </Paper>
  );
}

import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { COMMISSION_WAY } from 'src/consts';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

export default function MultiForm() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'splitWays' });

  const autoCreate = watch('autoCreate');

  const addField = () => {
    append({
      way: 'Bogo',
      money: 0,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Paper sx={{ mb: 2 }}>
      <Typography sx={{ pb: 2 }} variant="subtitle1">
        Links
      </Typography>

      {fields.map((item, index) => (
        <Stack sx={{ mb: 1 }}>
          <Box
            key={item.id}
            rowGap={3}
            columnGap={1}
            display="grid"
            sx={{ mb: 1, gridTemplateColumns: '30% 30% 30% auto' }}
            alignItems="center"
          >
            <Field.Select name={`splitWays[${index}].way`} label="Way" size="small">
              {COMMISSION_WAY.map((option) => (
                <MenuItem key={option?.label} value={option?.value}>
                  {option?.value}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text
              name={`splitWays[${index}].money`}
              type="number"
              label="Money"
              size="small"
            />
            <Field.Text
              name={`splitWays[${index}].note`}
              label="Sale ID"
              size="small"
              disabled={autoCreate}
            />
            <Button
              size="small"
              color="error"
              sx={{ width: 80 }}
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

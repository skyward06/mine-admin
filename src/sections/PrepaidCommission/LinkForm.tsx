import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { PREPAID_TYPE } from 'src/consts';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

export default function LinkForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'reflinks' });

  const addField = () => {
    append({
      link: '',
      linkType: '',
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Paper sx={{ mb: 2 }}>
      <Typography sx={{ pb: 2 }} variant="subtitle1">
        Reference Links
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
            <Field.Autocomplete
              name={`reflinks[${index}].linkType`}
              fullWidth
              options={PREPAID_TYPE}
              getOptionLabel={(option: any) => option ?? ''}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
            <Field.Text name={`reflinks[${index}].link`} label="Link" />
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

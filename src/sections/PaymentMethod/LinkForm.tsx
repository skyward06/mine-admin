import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

import { useFetchPackages } from '../Products/useApollo';

export default function LinkForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'paymentMethodLinks' });

  const { packages, fetchPackages } = useFetchPackages();

  useEffect(
    () => {
      fetchPackages({
        variables: { filter: { status: true, enrollVisibility: true }, sort: '-amount' },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const addField = () => {
    append({
      link: '',
      packageId: '',
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
            sx={{ mb: 1, gridTemplateColumns: '30% 55% auto' }}
          >
            <Field.Select name={`paymentMethodLinks[${index}].packageId`} label="Package">
              {packages.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.productName}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text name={`paymentMethodLinks[${index}].link`} label="Link" />
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

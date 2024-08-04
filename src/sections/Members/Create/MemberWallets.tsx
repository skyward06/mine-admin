import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

interface Props {
  // Todo: Change type as Payout
  payouts: any[];
  setData: Function;
}

export default function MemberWallets({ payouts, setData }: Props) {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const values = watch();

  useEffect(() => {
    setData(values);
  }, [values, setData]);

  const handleAdd = () => {
    append({
      payoutId: '',
      address: '',
      percent: values.items ? 0 : 100,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container>
        <Grid xl={10}>
          {fields.map((item, index) => (
            <Stack key={item.id} alignItems="flex-end" spacing={0.5} sx={{ mb: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Field.Select
                  size="small"
                  name={`items[${index}].payoutId`}
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
                  size="small"
                  name={`items[${index}].address`}
                  label="Address"
                  InputLabelProps={{ shrink: true }}
                />

                <Field.Text
                  size="small"
                  name={`items[${index}].percent`}
                  label="Percent"
                  InputLabelProps={{ shrink: true }}
                  type="number"
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
        </Grid>
        <Grid xl={2} textAlign="right">
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
        </Grid>
      </Grid>
    </Card>
  );
}

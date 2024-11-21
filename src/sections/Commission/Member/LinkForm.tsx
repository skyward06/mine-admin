import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';
import { LoadingScreen } from 'src/components/loading-screen';

interface Props {
  loading: boolean;
}

export default function LinkForm({ loading }: Props) {
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
    <>
      {loading && <LoadingScreen sx={{ mb: 2 }} />}

      {fields.map((item, index) => (
        <Box key={item.id} rowGap={1} columnGap={1} display="grid" sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" columnGap={1}>
            <Stack width={1}>
              <Field.Text name={`reflinks[${index}].linkType`} label="Link Type" size="small" />
            </Stack>
            <Stack width={0.1}>
              <IconButton
                size="small"
                color="error"
                sx={{ mt: 0.5 }}
                onClick={() => handleRemove(index)}
              >
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Stack>
          </Stack>
          <Field.Text name={`reflinks[${index}].link`} label="Link" size="small" />
        </Box>
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
    </>
  );
}

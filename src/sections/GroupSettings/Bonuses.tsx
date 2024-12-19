import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

interface Props {
  groupSettingCommissionBonuses: any[];
}

interface Bonus {
  id: string;
  commission?: string;
  lPoint?: string;
  rPoint?: number;
}

export default function Bonuses({ groupSettingCommissionBonuses }: Props) {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groupSettingCommissionBonuses',
  });

  const forms: Bonus[] = fields?.length
    ? fields
    : groupSettingCommissionBonuses.map(({ id, commission, lPoint, rPoint }) => ({
        id,
        commission,
        lPoint,
        rPoint,
      }));

  useEffect(() => {
    groupSettingCommissionBonuses.forEach(({ commission, lPoint, rPoint }, index) => {
      setValue(`groupSettingCommissionBonuses[${index}].commission`, commission);
      setValue(`groupSettingCommissionBonuses[${index}].lPoint`, lPoint);
      setValue(`groupSettingCommissionBonuses[${index}].rPoint`, rPoint);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupSettingCommissionBonuses]);

  const addBonus = () => {
    append({
      commission: 0,
      lPoint: 0,
      rPoint: 0,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Stack sx={{ pt: 3 }}>
      <Typography sx={{ pb: 2 }} variant="subtitle1">
        Group Setting Commission Bonuses
      </Typography>
      {forms?.map((item, index) => (
        <Stack sx={{ mb: 2 }}>
          <Stack key={item.id} sx={{ mb: 2 }}>
            <Box
              key={item.id}
              rowGap={2}
              columnGap={1}
              display="grid"
              sx={{
                mb: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '32% 32% 32% auto' },
              }}
            >
              <Field.Text
                name={`groupSettingCommissionBonuses[${index}].commission`}
                label="Commission"
                type="number"
                defaultValue={item.commission}
              />

              <Field.Text
                name={`groupSettingCommissionBonuses[${index}].lPoint`}
                label="Left Point"
                type="number"
                defaultValue={item.lPoint}
              />

              <Field.Text
                name={`groupSettingCommissionBonuses[${index}].rPoint`}
                label="Right Point"
                type="number"
                defaultValue={item.rPoint}
              />

              <Button
                color="error"
                sx={{ mt: 0.5 }}
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              />
            </Box>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Stack>
      ))}
      <IconButton
        color="default"
        sx={{
          borderRadius: 0,
          '&:hover': { background: 'transparent', color: '#00A76F' },
        }}
        onClick={addBonus}
      >
        <Iconify icon="bxs:plus-circle" sx={{ mr: 1 }} />
        <Typography>Add Item</Typography>
      </IconButton>
    </Stack>
  );
}

import type { Package } from 'src/__generated__/graphql';

import { useState, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Field } from 'src/components/Form';
import { Iconify } from 'src/components/Iconify';

interface Props {
  packages: Package[];
  groupSettingCommissionBonuses: any[];
}

interface Bonus {
  id: string;
  lPoint?: string;
  rPoint?: number;
  commission?: string;
}

export default function Bonuses({ packages, groupSettingCommissionBonuses }: Props) {
  const [editable, setEditable] = useState<any>();

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
    groupSettingCommissionBonuses.forEach(
      ({ commission, lPoint, rPoint, qPackageId, uPackageId }, index) => {
        setEditable({ ...editable, [index]: !!uPackageId });

        setValue(`groupSettingCommissionBonuses[${index}].commission`, commission);
        setValue(`groupSettingCommissionBonuses[${index}].lPoint`, lPoint);
        setValue(`groupSettingCommissionBonuses[${index}].rPoint`, rPoint);
        setValue(`groupSettingCommissionBonuses[${index}].qPackageId`, qPackageId);
        setValue(`groupSettingCommissionBonuses[${index}].uPackageId`, uPackageId);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupSettingCommissionBonuses]);

  const addBonus = () => {
    append({
      commission: 0,
      lPoint: 0,
      rPoint: 0,
      qPackageId: null,
      uPackageId: null,
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
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '20% 20% 20% 34%' },
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

              <Field.Select
                name={`groupSettingCommissionBonuses[${index}].qPackageId`}
                label="Package"
              >
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashsed' }} />
                {packages.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.productName}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>

            <Box
              key={`${item.id}-second`}
              rowGap={2}
              columnGap={1}
              display="grid"
              alignItems="center"
              sx={{
                mb: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '61% 34% auto' },
              }}
            >
              <Box textAlign="end">
                {editable && (
                  <Checkbox
                    checked={editable[index]}
                    onChange={(event) => {
                      setEditable({ ...editable, [index]: event.target.checked });

                      if (!event.target.checked) {
                        setValue(`groupSettingCommissionBonuses[${index}].uPackageId`, null);
                      }
                    }}
                  />
                )}
              </Box>

              {editable && (
                <Field.Select
                  name={`groupSettingCommissionBonuses[${index}].uPackageId`}
                  label="Unqualified Package"
                  disabled={!editable[index]}
                >
                  <MenuItem value="">None</MenuItem>
                  <Divider sx={{ borderStyle: 'dashsed' }} />
                  {packages.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.productName}
                    </MenuItem>
                  ))}
                </Field.Select>
              )}

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

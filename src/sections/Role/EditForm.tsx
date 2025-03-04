import type { Role } from 'src/__generated__/graphql';

import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { PERMISSIONS } from 'src/consts';

import { Form, Field } from 'src/components/Form';

import { Schema, type SchemaType } from './schema';
import { useCreateRole, useUpdateRole } from './useApollo';

interface Props {
  current?: Role;
}

export default function EditForm({ current }: Props) {
  const router = useRouter();
  const [disabled, setDisabled] = useState({ role: false, sale: false, commission: false });
  const [checkValue, setCheckValue] = useState({
    role: {
      roleNone: true,
      roleView: false,
      none1: false,
      roleEdit: false,
      roleAssign: false,
    },
    sale: {
      saleNone: true,
      saleView: false,
      none1: false,
      saleEdit: false,
      none2: false,
      salePast: false,
    },
    commission: {
      commissionNone: true,
      commissionView: false,
      none1: false,
      commissionEdit: false,
      calculation: false,
    },
  });

  const defaultValues = useMemo(
    () => (current ? Schema.safeParse(current)?.data ?? ({} as SchemaType) : {}),
    [current]
  );

  const methods = useForm<SchemaType>({ resolver: zodResolver(Schema), defaultValues });

  const { reset, handleSubmit } = methods;

  const { loading, createRole } = useCreateRole();
  const { loading: updateLoading, updateRole } = useUpdateRole();

  const onSubmit = handleSubmit(async (newData) => {
    try {
      const roles = Object.values(checkValue.role)
        .map((val, index) => (val ? index : -1))
        .filter((index) => index !== -1);
      const sales = Object.values(checkValue.sale)
        .map((val, index) => (val ? index : -1))
        .filter((index) => index !== -1);
      const commissions = Object.values(checkValue.commission)
        .map((val, index) => (val ? index : -1))
        .filter((index) => index !== -1);

      /* eslint-disable no-bitwise */
      const role = roles.reduce((acc, num) => acc | num, 0);
      const sale = sales.reduce((acc, num) => acc | num, 0);
      const commission = commissions.reduce((acc, num) => acc | num, 0);

      if (current) {
        await updateRole({
          variables: { data: { id: current.id, ...newData, role, sale, commission } },
        });
      } else {
        await createRole({ variables: { data: { ...newData, role, sale, commission } } });
      }

      reset();
      router.push(paths.dashboard.roles.root);
    } catch (error) {
      console.log('error => ', error);
    }
  });

  // Function to handle the state change of Switch
  const handleSwitchChange = (
    category: 'role' | 'sale' | 'commission',
    field: string,
    value: boolean
  ) => {
    setCheckValue((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));

    if (field.includes('None') && value) {
      if (category === 'role') {
        setCheckValue((prev) => ({ ...prev, role: { ...prev.role, roleView: false } }));
      }
      if (category === 'sale') {
        setCheckValue((prev) => ({
          ...prev,
          sale: { ...prev.sale, saleView: false },
        }));
      }
      if (category === 'commission') {
        setCheckValue((prev) => ({
          ...prev,
          commission: { ...prev.commission, commissionView: false },
        }));
      }
    }

    if ((field.includes('None') || field.includes('View')) && value) {
      if (category === 'role') {
        setCheckValue((prev) => ({ ...prev, role: { ...prev.role, roleEdit: false } }));
      }
      if (category === 'sale') {
        setCheckValue((prev) => ({
          ...prev,
          sale: { ...prev.sale, saleEdit: false, salePast: false },
        }));
      }
      if (category === 'commission') {
        setCheckValue((prev) => ({
          ...prev,
          commission: { ...prev.commission, commissionEdit: false, calculation: false },
        }));
      }
    }
  };

  useEffect(() => {
    const updateDisabledState = (
      field: 'role' | 'sale' | 'commission',
      none: boolean,
      view: boolean
    ) => {
      setDisabled((prev) => ({
        ...prev,
        [field]: none || view,
      }));
    };

    updateDisabledState('role', checkValue.role.roleNone, checkValue.role.roleView);
    updateDisabledState('sale', checkValue.sale.saleNone, checkValue.sale.saleView);
    updateDisabledState(
      'commission',
      checkValue.commission.commissionNone,
      checkValue.commission.commissionView
    );
  }, [checkValue]);

  useEffect(() => {
    if (current) {
      const { role, sale, commission } = current;

      setCheckValue({
        role: {
          roleNone: role === 0,
          roleView: role === 1,
          none1: false,
          roleEdit: role === 3 || role === 7,
          roleAssign: role === 4 || role === 7,
        },
        sale: {
          saleNone: sale === 0,
          saleView: sale === 1,
          none1: false,
          saleEdit: sale === 3 || sale === 7,
          none2: false,
          salePast: sale === 5 || sale === 7,
        },
        commission: {
          commissionNone: commission === 0,
          commissionView: commission === 1,
          none1: false,
          commissionEdit: commission === 3 || commission === 7,
          calculation: commission === 4 || commission === 7,
        },
      });
    }
  }, [current]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: '30% 70%',
        }}
        sx={{ mb: 3 }}
      >
        <Field.Text name="name" label="Name" />
        <Field.Text name="description" label="Description" />
      </Box>

      <Box
        rowGap={4}
        columnGap={4}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Stack>
          <Typography variant="h6">Role</Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.role.roleNone}
                onChange={(event) => handleSwitchChange('role', 'roleNone', event.target.checked)}
              />
            }
            label={PERMISSIONS.NONE_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.role.roleView}
                onChange={(event) => handleSwitchChange('role', 'roleView', event.target.checked)}
                disabled={(disabled.role && !checkValue.role.roleView) || checkValue.role.roleNone}
              />
            }
            label={PERMISSIONS.VIEWER_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.role.roleEdit}
                onChange={(event) => handleSwitchChange('role', 'roleEdit', event.target.checked)}
                disabled={disabled.role}
              />
            }
            label={PERMISSIONS.EDITOR_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.role.roleAssign}
                onChange={(event) => handleSwitchChange('role', 'roleAssign', event.target.checked)}
                disabled={disabled.role}
              />
            }
            label={PERMISSIONS.ASSIGN_ROLE_PERMISSION.label}
          />
        </Stack>

        <Stack>
          <Typography variant="h6">Sale</Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.sale.saleNone}
                onChange={(event) => handleSwitchChange('sale', 'saleNone', event.target.checked)}
              />
            }
            label={PERMISSIONS.NONE_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.sale.saleView}
                onChange={(event) => handleSwitchChange('sale', 'saleView', event.target.checked)}
                disabled={(disabled.sale && !checkValue.sale.saleView) || checkValue.sale.saleNone}
              />
            }
            label={PERMISSIONS.VIEWER_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.sale.saleEdit}
                onChange={(event) => handleSwitchChange('sale', 'saleEdit', event.target.checked)}
                disabled={disabled.sale}
              />
            }
            label={PERMISSIONS.EDITOR_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.sale.salePast}
                onChange={(event) => handleSwitchChange('sale', 'salePast', event.target.checked)}
                disabled={disabled.sale}
              />
            }
            label={PERMISSIONS.PAST_EDIT_PERMISSION.label}
          />
        </Stack>

        <Stack>
          <Typography variant="h6">Commission</Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <FormControlLabel
            control={
              <Switch
                checked={checkValue.commission.commissionNone}
                onChange={(event) =>
                  handleSwitchChange('commission', 'commissionNone', event.target.checked)
                }
              />
            }
            label={PERMISSIONS.NONE_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.commission.commissionView}
                onChange={(event) =>
                  handleSwitchChange('commission', 'commissionView', event.target.checked)
                }
                disabled={
                  (disabled.commission && !checkValue.commission.commissionView) ||
                  checkValue.commission.commissionNone
                }
              />
            }
            label={PERMISSIONS.VIEWER_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.commission.commissionEdit}
                onChange={(event) =>
                  handleSwitchChange('commission', 'commissionEdit', event.target.checked)
                }
                disabled={disabled.commission}
              />
            }
            label={PERMISSIONS.EDITOR_PERMISSION.label}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checkValue.commission.calculation}
                onChange={(event) =>
                  handleSwitchChange('commission', 'calculation', event.target.checked)
                }
                disabled={disabled.commission}
              />
            }
            label={PERMISSIONS.COMMISSOIN_CALCULATION_PERMISSION.label}
          />
        </Stack>
      </Box>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={current ? updateLoading : loading}
        >
          {current ? 'Update' : 'Create'}
        </LoadingButton>
      </Stack>
    </Form>
  );
}

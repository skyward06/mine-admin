import type { Role } from 'src/__generated__/graphql';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ROLES, ROLE_TYPE } from 'src/consts';

import { Form, Field } from 'src/components/Form';

import { Schema, type SchemaType } from './schema';
import { useCreateRole, useUpdateRole } from './useApollo';

interface Props {
  current?: Role;
}

export default function EditForm({ current }: Props) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => (current ? Schema.safeParse(current)?.data ?? ({} as SchemaType) : {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const methods = useForm<SchemaType>({ resolver: zodResolver(Schema), defaultValues });

  const { reset, handleSubmit } = methods;

  const { loading, createRole } = useCreateRole();
  const { loading: updateLoading, updateRole } = useUpdateRole();

  const onSubmit = handleSubmit(async (newData) => {
    try {
      if (current) {
        await updateRole({ variables: { data: { id: current.id, ...newData } } });
      } else {
        await createRole({
          variables: {
            data: newData,
          },
        });
      }

      reset();
      router.push(paths.dashboard.roles.root);
    } catch (error) {
      console.log('error => ', error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        <Field.Text name="name" label="Name" />
        <Field.Text name="description" label="Description" />

        {ROLE_TYPE.map((role) => (
          <Field.Select name={role.name} label={role.label}>
            {ROLES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Field.Select>
        ))}
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

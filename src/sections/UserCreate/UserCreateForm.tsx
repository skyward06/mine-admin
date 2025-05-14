import axios from 'axios';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useCallback } from 'react';
import { ApolloError, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/formatNumber';

import { CONFIG } from 'src/config';
import { PERMISSIONS } from 'src/consts';
import { gql } from 'src/__generated__/gql';
import { AdminStatus } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { Form, Field } from 'src/components/Form';

import { useAuthContext } from 'src/auth/hooks';

import { useFetchRoles } from '../Role/useApollo';

// ----------------------------------------------------------------------

const CREATE_USER = gql(/* GraphQL */ `
  mutation createAdmin($data: CreateAdminInput!) {
    createAdmin(data: $data) {
      id
      frontActions {
        ...FrontActionFields
      }
    }
  }
`);

// ----------------------------------------------------------------------
export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

const NewUserSchema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  fullName: zod.string({ required_error: 'Full Name is required' }),
  roleId: zod.string().optional(),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  avatar: zod.custom<File | string>().nullable(),
});

export default function UserCreateForm() {
  const router = useRouter();

  const [fileLoading, setFileLoading] = useState<boolean>();
  const [avatar, setAvatar] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<File | string | null>(null);

  const defaultValues = useMemo(
    () => ({
      email: '',
      username: '',
      avatar: null,
    }),
    []
  );

  const { user } = useAuthContext();
  const { roles } = useFetchRoles();
  const [submit, { loading }] = useMutation(CREATE_USER);

  const methods = useForm<NewUserSchemaType>({
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ ...data }) => {
    try {
      await submit({
        variables: {
          data: {
            ...data,
            status: AdminStatus.Enabled,
            avatar,
            password: '',
          },
        },
      });
      reset();
      toast.success('Admin created sccuessfully!');
      router.push(paths.dashboard.user.root);
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;
        if (error.path?.includes('email')) {
          setError('email', { type: 'manual', message: error?.message || '' });
        }
      } else {
        toast.error(err.message);
      }
    }
  });

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setFileLoading(true);
    setAvatarUrl(newFile);

    const formData = new FormData();

    acceptedFiles.forEach((file) => formData.append('avatar', file));

    try {
      const { data } = await axios.post(`${CONFIG.SITE_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data) {
        setAvatar(data.files[0].url);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setFileLoading(false);
    }
  }, []);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatar"
                value={avatarUrl}
                validator={(fileData) => {
                  if (fileData.size > 1000000) {
                    return {
                      code: 'file-too-large',
                      message: `File is larger than ${fData(1000000)}`,
                    };
                  }
                  return null;
                }}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Select your favorite avatar
                  </Typography>
                }
                onDrop={handleDrop}
              />
            </Box>

            <Box display="flex" justifyContent="center">
              {fileLoading && <Iconify icon="line-md:uploading-loop" width={50} />}
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Personal Information</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Personal information here.
              </Typography>
            </Stack>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <Field.Text name="username" label="Username" />
              <Field.Text name="fullName" label="Full Name" />
              <Field.Text name="email" label="Email Address" />
              {(user?.role?.role === PERMISSIONS.ASSIGN_ROLE_PERMISSION.value ||
                user?.role?.role === 7) && (
                <Field.Select name="roleId" label="Role">
                  {roles.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Field.Select>
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" color="primary" loading={loading}>
                Create Admin
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

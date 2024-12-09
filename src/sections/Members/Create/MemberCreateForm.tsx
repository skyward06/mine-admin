import states from 'states-us';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { generateRandomString } from 'src/utils/helper';

import { CONTACT } from 'src/consts';
import { TeamStrategy } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { Form, Field } from 'src/components/Form';

import TXCWallets from './txcWallets';
import OtherWallets from './otherWallets';
import { Schema, type SchemaType } from './schema';
import { CREATE_MEMBER, FETCH_MEMBERS_QUERY } from '../query';

// ----------------------------------------------------------------------

interface Member {
  id: string;
  username: string;
}

export default function MemberCreateForm() {
  const [fetchMembers, { loading: memberLoading, data: memberData }] =
    useLazyQuery(FETCH_MEMBERS_QUERY);

  const members = memberData?.members.members ?? [];

  const [member, setMember] = useState<Member>();
  const [state, setState] = useState<string>();
  const [ID, setID] = useState<string>();

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      mobile: '',
      ID: '',
      primaryAddress: '',
      secondaryAddress: '',
      state: '',
      city: '',
      syncWithSendy: true,
      zipCode: '',
      sponsorId: '',
      txcWallets: [{ percent: 100 }],
    }),
    []
  );

  const [submit, { loading }] = useMutation(CREATE_MEMBER);

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const hasDuplicates = (arr: any[]) => {
    const seen = new Set();

    return arr.some((item: any) => {
      if (seen.has(item.address)) {
        return true;
      }

      seen.add(item.address);

      return false;
    });
  };

  const onSubmit = handleSubmit(
    async ({ firstName, lastName, txcWallets, otherWallets, teamStrategy, ...data }) => {
      try {
        const total = txcWallets.reduce((prev: number, save: any) => prev + save.percent, 0);

        if (hasDuplicates([...txcWallets, ...otherWallets])) {
          toast.warning('Duplicated wallet address!');
          return;
        }

        if (!member?.id.length) {
          toast.error('Sponsor Name is required');
          return;
        }

        if (total === 100) {
          await submit({
            variables: {
              data: {
                ...data,
                fullName: `${firstName} ${lastName}`,
                sponsorId: member?.id,
                state,
                ID: ID ?? '',
                teamStrategy: teamStrategy as TeamStrategy,
                wallets: [...txcWallets, ...otherWallets].map(({ percent, ...rest }) => ({
                  percent: percent * 100,
                  ...rest,
                })),
              },
            },
          });

          reset();
          toast.success('Create success!');
          router.push(paths.dashboard.members.root);
        } else {
          toast.warning('Sum of percent muse be 100%');
        }
      } catch (err) {
        if (err instanceof ApolloError) {
          const [error] = err.graphQLErrors;

          if (error.path?.includes('username')) {
            setError('username', { type: 'manual', message: error?.message || '' });
          }

          if (error.path?.includes('email')) {
            setError('email', { type: 'manual', message: error?.message || '' });
          }

          error.path?.forEach((item: any, index: number) => {
            if (item.includes('wallets')) {
              setError(`txcWallets.${index}.address`, {
                type: 'manual',
                message: 'Invalid Address',
              });
            }
          });
        } else {
          toast.error(err.message);
        }

        toast.error(err.message);
      }
    }
  );

  useEffect(() => {
    fetchMembers({
      variables: {
        page: '1,5',
        filter: {
          OR: [
            { username: { contains: member?.username ?? '', mode: 'insensitive' } },
            { fullName: { contains: member?.username ?? '', mode: 'insensitive' } },
          ],
          status: true,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid md={12} xl={6}>
          <Card sx={{ p: 3, mb: 2 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="username" label="Username" required />
              <Field.Text name="email" label="Email" required />
              <Field.Text name="firstName" label="First Name" required />
              <Field.Text name="lastName" label="Last Name" required />
              <Field.Phone name="mobile" label="Mobile" />
              <Autocomplete
                fullWidth
                options={members}
                loading={memberLoading}
                loadingText={<LoadingButton loading={memberLoading} />}
                getOptionLabel={(option) => `${option!.username}-${option!.fullName}`}
                renderInput={(params) => (
                  <TextField {...params} label="Sponsor Name" margin="none" required />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option!.username}>
                    {`${option!.username} (${option!.fullName})`}
                  </li>
                )}
                onInputChange={(_, username: string) => {
                  setMember({ id: '', username: username.split('-')[0] });
                }}
                onChange={(_, value) => {
                  setMember({ id: value?.id ?? '', username: value?.username ?? '' });
                }}
              />
              <Field.Text name="primaryAddress" label="Address" />
              <Field.Text name="secondaryAddress" label="Address Line 2" />
              <Field.Text name="city" label="City" />
              <Autocomplete
                freeSolo
                fullWidth
                options={states}
                getOptionLabel={(option: any) => option.name}
                renderInput={(params) => (
                  <TextField {...params} name="state" label="States" margin="none" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option!.name}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value: any) => setState(value.name)}
                onInputChange={(_, value: any) => setState(value)}
              />
              <Field.Text name="zipCode" label="ZIP Code" />
              <Field.Text name="assetId" label="Coin ID" />
              <Field.Select name="preferredContact" label="Preferred Contact">
                {CONTACT.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="preferredContactDetail" label="Preferred Contact Detail" />
              <Field.Text
                name="ID"
                label="ID"
                required
                value={ID}
                onChange={(event) => setID(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setID(generateRandomString())}>
                        <Iconify icon="lets-icons:sort-random" width={24} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Field.Select name="teamStrategy" label="Team Strategy">
                {Object.values(TeamStrategy).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Switch name="syncWithSendy" label="Subscribe to Sendy" sx={{ p: 0 }} />
            </Box>
          </Card>
        </Grid>
        <Grid md={12} xl={6}>
          <TXCWallets />
          <OtherWallets />
        </Grid>
      </Grid>

      <Stack alignItems="flex-start">
        <LoadingButton type="submit" variant="contained" loading={loading}>
          Create Member
        </LoadingButton>
      </Stack>
    </Form>
  );
}

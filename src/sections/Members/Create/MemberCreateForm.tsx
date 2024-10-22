import { z as zod } from 'zod';
import states from 'states-us';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation, useLazyQuery, useQuery as useGraphQuery } from '@apollo/client';

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

import { useBoolean } from 'src/hooks/useBoolean';

import { CONTACT } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { Form, Field } from 'src/components/Form';

import MemberWallets from './MemberWallets';
import { CREATE_MEMBER, FETCH_PAYOUTS_QUERY, FETCH_MEMBERS_QUERY } from '../query';

// ----------------------------------------------------------------------
export type NewMemberSchemaType = zod.infer<typeof NewMemberSchema>;

const NewMemberSchema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  firstName: zod.string({ required_error: 'First Name is required' }),
  lastName: zod.string({ required_error: 'Last Name is required' }),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  mobile: zod.string({ required_error: 'Mobile is required' }),
  city: zod.string({ required_error: 'City is required' }),
  zipCode: zod.string({ required_error: 'ZIPCode is required' }),
  state: zod.string({ required_error: 'State is required' }),
  primaryAddress: zod.string({ required_error: 'Address is required' }),
  secondaryAddress: zod.string({ required_error: 'Address Line 2 is required' }),
  sponsorId: zod.string().optional(),
  assetId: zod.string({ required_error: 'AssetID is required' }),
  preferredContact: zod.string().optional().nullable(),
  preferredContactDetail: zod.string().optional().nullable(),
  wallets: zod.array(
    zod.object({
      payoutId: zod.string({ required_error: 'Payout is required' }),
      address: zod.string({ required_error: 'Address is required' }),
      percent: zod.number({ required_error: 'Percent is required' }),
    })
  ),
});

interface Member {
  id: string;
  username: string;
}

export default function MemberCreateForm() {
  const boolean = useBoolean();

  const { data: payoutsData } = useGraphQuery(FETCH_PAYOUTS_QUERY, {
    variables: {},
  });

  const [fetchMembers, { loading: memberLoading, data: memberData }] =
    useLazyQuery(FETCH_MEMBERS_QUERY);

  const payouts = payoutsData?.payouts.payouts ?? [];
  const members = memberData?.members.members ?? [];

  const [member, setMember] = useState<Member>();
  const [state, setState] = useState<string>();

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      username: '',
      fullName: '',
      email: '',
      mobile: '',
      primaryAddress: '',
      secondaryAddress: '',
      state: '',
      city: '',
      zipCode: '',
      sponsorId: '',
      wallets: [
        {
          percent: 100,
        },
      ],
    }),
    []
  );

  const [submit, { loading }] = useMutation(CREATE_MEMBER);

  const methods = useForm<NewMemberSchemaType>({
    resolver: zodResolver(NewMemberSchema),
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

  const handleSendyStatus = () => boolean.onToggle();

  const onSubmit = handleSubmit(async ({ firstName, lastName, wallets, ...data }) => {
    try {
      const total = wallets.reduce((prev: number, save: any) => prev + save.percent, 0);

      if (hasDuplicates(wallets)) {
        toast.warning('Duplicated wallet address!');
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
              syncWithSendy: !boolean.value,
              wallets: wallets.map(({ percent, ...rest }) => ({
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

        if (error.path?.includes('assetId')) {
          setError('assetId', { type: 'manual', message: error?.message || '' });
        }

        error.path?.forEach((item: any, index: number) => {
          if (item.includes('wallets')) {
            setError(`wallets.${index}.address`, {
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
  });

  useEffect(() => {
    fetchMembers({
      variables: {
        page: '1,5',
        filter: {
          OR: [{ username: { contains: member?.username ?? '', mode: 'insensitive' } }],
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
              <Field.Text name="username" label="Username" />
              <Field.Text
                name="email"
                label="Email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSendyStatus} edge="end">
                        {boolean.value ? (
                          <Iconify icon="uis:sync-slash" width={24} />
                        ) : (
                          <Iconify icon="uil:sync" width={24} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Field.Text name="firstName" label="First Name" />
              <Field.Text name="lastName" label="Last Name" />
              <Field.Phone name="mobile" label="Mobile" />
              <Autocomplete
                fullWidth
                options={members}
                loading={memberLoading}
                loadingText={<LoadingButton loading={memberLoading} />}
                getOptionLabel={(option) => option!.username}
                renderInput={(params) => (
                  <TextField {...params} label="Sponsor Name" margin="none" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option!.username}>
                    {`${option!.username} (${option!.fullName})`}
                  </li>
                )}
                onInputChange={(_, username: string) => {
                  setMember({ id: '', username });
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
              <Field.Text name="assetId" label="Asset ID" />
              <Field.Select name="preferredContact" label="Preferred Contact">
                {CONTACT.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="preferredContactDetail" label="Preferred Contact Detail" />
            </Box>
          </Card>
        </Grid>
        <Grid md={12} xl={6}>
          <MemberWallets payouts={payouts} />

          <Stack alignItems="flex-end">
            <LoadingButton type="submit" variant="contained" loading={loading}>
              Create Member
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Form>
  );
}

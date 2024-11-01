import type { Member } from 'src/__generated__/graphql';

import { z as zod } from 'zod';
import states from 'states-us';
import isEqual from 'lodash/isEqual';
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
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CONTACT } from 'src/consts';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import MemberWallets from './MemberWallets';
import { UPDATE_MEMBER, FETCH_PAYOUTS_QUERY, FETCH_MEMBERS_QUERY } from '../../query';

// ----------------------------------------------------------------------

type Props = {
  currentMember: Member;
};

interface Edit {
  id: string;
  username: string;
  fullName?: string;
}

// ----------------------------------------------------------------------
export type MemberGeneralSchemaType = zod.infer<typeof MemberGeneralSchema>;

const MemberGeneralSchema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  fullName: zod.string(),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  mobile: zod.string({ required_error: 'Mobile is required' }),
  city: zod.string().optional().nullable(),
  zipCode: zod.string().optional().nullable(),
  state: zod.string().optional().nullable(),
  primaryAddress: zod.string({ required_error: 'Address is required' }),
  secondaryAddress: zod.string().optional().nullable(),
  sponsorId: zod.string().optional().nullable(),
  assetId: zod.string({ required_error: 'AssetID is required' }),
  preferredContact: zod.string().optional().nullable(),
  preferredContactDetail: zod.string().optional().nullable(),
  syncWithSendy: zod.boolean().default(true),
  memberWallets: zod.array(
    zod.object({
      payoutId: zod.string({ required_error: 'Payout is required' }),
      address: zod.string({ required_error: 'Address is required' }),
      percent: zod.number({ required_error: 'Percent is required' }),
    })
  ),
});

export default function MemberGeneral({ currentMember }: Props) {
  const router = useRouter();

  const { fullName } = currentMember;

  const [, first, last]: any = fullName.match(/^(\S+)\s+(.*)/);

  const [firstName, setFirstName] = useState<string>(first);
  const [lastName, setLastName] = useState<string>(last);
  const [state, setState] = useState<string>();

  const { data: payoutsData } = useGraphQuery(FETCH_PAYOUTS_QUERY, {
    variables: {},
  });

  const [fetchMembers, { loading: memberLoading, data: memberData }] =
    useLazyQuery(FETCH_MEMBERS_QUERY);

  const payouts = payoutsData?.payouts.payouts ?? [];
  const members = memberData?.members.members ?? [];

  const [member, setMember] = useState<Edit>();

  const [submit, { loading }] = useMutation(UPDATE_MEMBER);

  const defaultValues = useMemo(() => {
    const { data } = MemberGeneralSchema.safeParse(currentMember);

    return data ? { ...data, firstName: first, lastName: last } : ({} as MemberGeneralSchemaType);
  }, [currentMember, first, last]);

  const methods = useForm<MemberGeneralSchemaType>({
    resolver: zodResolver(MemberGeneralSchema),
    defaultValues,
  });

  const { setError, handleSubmit } = methods;

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

  const onSubmit = handleSubmit(async (newMember) => {
    try {
      if (isEqual(newMember, defaultValues)) {
        toast.warning('No changes to save');
        return;
      }

      const total = newMember.memberWallets.reduce(
        (prev: number, save: any) => prev + save.percent,
        0
      );

      if (hasDuplicates(newMember.memberWallets)) {
        toast.warning('Duplicated wallet address!');
        return;
      }

      if (total === 100) {
        await submit({
          variables: {
            data: {
              id: currentMember.id,
              username: newMember.username,
              email: newMember.email,
              fullName: `${firstName} ${lastName}`,
              mobile: newMember.mobile,
              primaryAddress: newMember.primaryAddress,
              secondaryAddress: newMember.secondaryAddress,
              sponsorId: member?.id || null,
              assetId: newMember.assetId,
              city: newMember.city,
              state,
              syncWithSendy: newMember.syncWithSendy,
              preferredContact: newMember.preferredContact,
              preferredContactDetail: newMember.preferredContactDetail,
              zipCode: newMember.zipCode,
              wallets: newMember.memberWallets.map(({ percent, ...rest }) => ({
                percent: percent * 100,
                ...rest,
              })),
            },
          },
        });

        toast.success('Update success!');

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
            setError(`memberWallets.${index}.address`, {
              type: 'manual',
              message: 'Invalid Address',
            });
          }
        });
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
          <Card sx={{ p: 3 }}>
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
              <Field.Text name="email" label="Email" defaultValue={currentMember.email} />
              <Field.Text
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Field.Text
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Field.Phone name="mobile" label="Mobile" />
              <Autocomplete
                fullWidth
                options={members}
                loading={memberLoading}
                loadingText={<LoadingButton loading={memberLoading} />}
                getOptionLabel={(option) => option!.username}
                value={member ?? currentMember!.sponsor}
                renderInput={(params) => (
                  <TextField {...params} label="Sponsor Name" margin="none" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option!.username}>
                    {`${option!.username} (${option!.fullName})`}
                  </li>
                )}
                onInputChange={(_, username: string) => {
                  setMember({ id: currentMember?.sponsorId ?? '', username });
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
                value={{ name: state ?? currentMember.state }}
                renderInput={(params) => (
                  <TextField {...params} name="state" label="State" margin="none" />
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
              <Field.Switch name="syncWithSendy" label="Subscribe to Sendy" sx={{ p: 0 }} />
            </Box>
          </Card>
        </Grid>
        <Grid md={12} xl={6}>
          <MemberWallets payouts={payouts} wallets={currentMember?.memberWallets ?? []} />
        </Grid>
      </Grid>

      <Stack alignItems="flex-start" sx={{ mt: 2 }}>
        <LoadingButton type="submit" variant="contained" loading={loading}>
          Save Changes
        </LoadingButton>
      </Stack>
    </Form>
  );
}

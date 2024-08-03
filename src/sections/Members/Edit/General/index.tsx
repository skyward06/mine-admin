import type { Member } from 'src/__generated__/graphql';

import { z as zod } from 'zod';
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
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { UPDATE_MEMBER, FETCH_PAYOUTS_QUERY, FETCH_MEMBERS_QUERY } from '../../query';

// ----------------------------------------------------------------------

type Props = {
  currentMember: Member;
};

interface Edit {
  id: string;
  username: string;
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
  primaryAddress: zod.string({ required_error: 'Address is required' }),
  secondaryAddress: zod.string().optional().nullable(),
  payoutId: zod.string({ required_error: 'TXC Payout is required' }),
  sponsorId: zod.string().optional().nullable(),
  wallet: zod.string({ required_error: 'TXC Cold is required' }),
});

export default function MemberGeneral({ currentMember }: Props) {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>(currentMember.fullName.split(' ')[0]);
  const [lastName, setLastName] = useState<string>(currentMember.fullName.split(' ')[1]);

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
    const { fullName } = currentMember;
    const { data } = MemberGeneralSchema.safeParse(currentMember);

    return data
      ? { ...data, firstName: fullName.split(' ')[0], lastName: fullName.split(' ')[1] }
      : ({} as MemberGeneralSchemaType);
  }, [currentMember]);

  const methods = useForm<MemberGeneralSchemaType>({
    resolver: zodResolver(MemberGeneralSchema),
    defaultValues,
  });

  const { setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newMember) => {
    try {
      if (isEqual(newMember, defaultValues)) {
        toast.warning('No changes to save');
        return;
      }

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
            payoutId: newMember.payoutId,
            // sponsorId: member?.id,
            wallet: newMember.wallet,
            assetId: newMember.wallet.substring(1, 7),
          },
        },
      });

      toast.success('Update success!');

      router.push(paths.dashboard.members.root);
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;
        if (error.path?.includes('email')) {
          setError('email', { type: 'manual', message: error?.message || '' });
        }
      }
      toast.error(err.message);
    }
  });

  useEffect(() => {
    fetchMembers({
      variables: {
        page: '1,5',
        filter: { OR: [{ username: { contains: member?.username ?? '', mode: 'insensitive' } }] },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid md={12}>
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
                    {option!.username}
                  </li>
                )}
                onInputChange={(_, username: string) => {
                  setMember({ id: '', username });
                }}
                onChange={(_, value) => {
                  setMember({ id: value?.id ?? '', username: value?.username ?? '' });
                }}
              />
              <Field.Text name="primaryAddress" label="Primay Address" />
              <Field.Text name="secondaryAddress" label="Address Line 2" />
              <Field.Select name="payoutId" label="TXC Payout">
                {payouts.map((option) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.method}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="wallet" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

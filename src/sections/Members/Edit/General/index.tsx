import states from 'states-us';
import countries from 'country-list';
import isEqual from 'lodash/isEqual';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation } from '@apollo/client';
import { useRef, useMemo, useState, useEffect } from 'react';

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
import {
  TeamReport,
  type Promo,
  type Member,
  TeamStrategy,
  CommissionDefaultEnum,
} from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import SearchMiner from 'src/components/SearchMiner';

import { useFetchPromos } from 'src/sections/Promos/useApollo';

import TXCWallets from './txcWallets';
import OtherWallets from './otherWallets';
import { Schema, type SchemaType } from './schema';
import { getWallets, hasDuplicates } from './helper';
import { UPDATE_MEMBER, APPROVE_MEMBER } from '../../query';

// ----------------------------------------------------------------------

type Props = {
  currentMember: Member;
};

export default function MemberGeneral({ currentMember }: Props) {
  const router = useRouter();

  const { fullName, memberWallets } = currentMember;

  const [txcWallets, otherWallets] = getWallets(memberWallets);

  const [, first, last]: any = fullName.trim().match(/^(\S+)\s+(.*)/);

  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [memberId, setMemberId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>(first);
  const [lastName, setLastName] = useState<string>(last);

  const [submit, { loading }] = useMutation(UPDATE_MEMBER);
  const [approve] = useMutation(APPROVE_MEMBER);
  const { promos, fetchPromos } = useFetchPromos();

  const ref = useRef<boolean>(false);

  const defaultValues = useMemo(() => {
    const { data } = Schema.safeParse({ ...currentMember, txcWallets, otherWallets });

    return data ? { ...data, firstName: first, lastName: last } : ({} as SchemaType);
  }, [currentMember, first, last, txcWallets, otherWallets]);

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { setError, handleSubmit } = methods;

  useEffect(() => {
    fetchPromos({ variables: { filter: { status: true } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (newMember) => {
    try {
      if (isEqual(newMember, defaultValues)) {
        toast.warning('No changes to save');
        return;
      }

      const total = newMember.txcWallets.reduce(
        (prev: number, save: any) => prev + save.percent,
        0
      );

      if (hasDuplicates([...newMember.txcWallets, ...newMember.otherWallets])) {
        toast.warning('Duplicated wallet address!');
        return;
      }

      if (!memberId?.length && !currentMember.sponsorId) {
        toast.error('Sponsor Name is required');
        return;
      }

      if (!newMember.assetId) {
        toast.error('Coin ID is required');
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
              sponsorId: memberId ?? currentMember.sponsorId,
              assetId: newMember.assetId,
              promoCode: newMember.promoCode,
              city: newMember.city,
              state,
              country,
              syncWithSendy: newMember.syncWithSendy,
              preferredContact: newMember.preferredContact,
              preferredContactDetail: newMember.preferredContactDetail,
              zipCode: newMember.zipCode,
              teamReport: newMember.teamReport as TeamReport[],
              teamStrategy: newMember.teamStrategy as TeamStrategy,
              commissionDefault: newMember.commissionDefault as CommissionDefaultEnum,
              wallets: [...newMember.txcWallets, ...newMember.otherWallets].map(
                ({ percent, ...rest }) => ({
                  percent: percent * 100,
                  ...rest,
                })
              ),
            },
          },
        });

        if (ref.current) {
          await approve({
            variables: {
              data: {
                id: currentMember.id,
              },
            },
          });
        }

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
            setError(`txcWallets.${index}.address`, {
              type: 'manual',
              message: 'Invalid Address',
            });
          }
        });
      }

      toast.error(err.message);
    }
  });

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
              <Field.Text name="username" label="Username" required />
              <Field.Text name="email" label="Email" defaultValue={currentMember.email} required />
              <Field.Text
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Field.Text
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <Field.Phone name="mobile" label="Mobile" />
              <SearchMiner
                label="Sponsor"
                setMemberId={setMemberId}
                currentMember={currentMember.sponsor}
              />
              <Field.Text name="primaryAddress" label="Address" />
              <Field.Text name="secondaryAddress" label="Address Line 2" />
              <Autocomplete
                freeSolo
                fullWidth
                options={countries.getNames()}
                getOptionLabel={(option: any) => option}
                value={country ?? currentMember.country}
                renderInput={(params) => (
                  <TextField {...params} name="country" label="Country" margin="none" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                onChange={(_, value: any) => setCountry(value)}
                onInputChange={(_, value: any) => setCountry(value)}
              />
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
              <Field.Text name="city" label="City" />
              <Field.Text name="zipCode" label="ZIP Code" />
              <Field.Text name="assetId" label="Coin ID" />
              <Field.Select name="promoCode" label="PromoCode">
                {promos.map((option: Promo) => (
                  <MenuItem key={option.id} value={option.code}>
                    {option.description}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Select name="preferredContact" label="Preferred Contact">
                {CONTACT.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="preferredContactDetail" label="Preferred Contact Detail" />
              <Field.Select name="teamStrategy" label="Team Strategy" required>
                {Object.values(TeamStrategy).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.MultiSelect
                name="teamReport"
                label="Team Report"
                checkbox
                options={Object.values(TeamReport).map((option) => ({
                  label: option,
                  value: option,
                }))}
              />
              <Field.Select
                name="commissionDefault"
                label="Commission Default"
                defaultValue="MANUAL"
                required
              >
                {Object.values(CommissionDefaultEnum).map((option) => (
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
          <TXCWallets wallets={txcWallets} />
          <OtherWallets wallets={otherWallets} />
        </Grid>
      </Grid>

      <Stack alignItems="flex-start" flexDirection="row" spacing={2} sx={{ mt: 2 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading && !ref.current}
          disabled={loading && ref.current}
        >
          Save Changes
        </LoadingButton>
        {!currentMember.status &&
          (currentMember.allowState === 'PENDING' || currentMember.allowState === 'PAID') && (
            <LoadingButton
              variant="contained"
              loading={loading && ref.current}
              onClick={async () => {
                ref.current = true;
                await onSubmit();
              }}
              disabled={loading && !ref.current}
            >
              Save and Approve
            </LoadingButton>
          )}
      </Stack>
    </Form>
  );
}

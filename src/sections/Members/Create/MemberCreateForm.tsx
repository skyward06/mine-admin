import states from 'states-us';
import countries from 'country-list';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation } from '@apollo/client';

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
  type Promo,
  TeamReport,
  TeamStrategy,
  CommissionDefaultEnum,
} from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import SearchMiner from 'src/components/SearchMiner';

import { useFetchPromos } from 'src/sections/Promos/useApollo';

import TXCWallets from './txcWallets';
import { CREATE_MEMBER } from '../query';
import OtherWallets from './otherWallets';
import { Schema, type SchemaType } from './schema';

// ----------------------------------------------------------------------

export default function MemberCreateForm() {
  const [memberId, setMemberId] = useState<string>('');
  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      primaryAddress: '',
      secondaryAddress: '',
      state: '',
      city: '',
      teamStrategy: 'MANUAL',
      teamReport: [''],
      syncWithSendy: true,
      zipCode: '',
      sponsorId: '',
      txcWallets: [{ percent: 100 }],
    }),
    []
  );

  const [submit, { loading }] = useMutation(CREATE_MEMBER);
  const { promos, fetchPromos } = useFetchPromos();

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

  useEffect(() => {
    fetchPromos({ variables: { filter: { status: true } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(
    async ({
      firstName,
      lastName,
      txcWallets,
      otherWallets,
      teamReport,
      teamStrategy,
      commissionDefault,
      ...data
    }) => {
      try {
        const total = txcWallets.reduce((prev: number, save: any) => prev + save.percent, 0);

        if (hasDuplicates([...txcWallets, ...otherWallets])) {
          toast.warning('Duplicated wallet address!');
          return;
        }

        if (!memberId?.length) {
          toast.error('Sponsor Name is required');
          return;
        }

        if (total === 100) {
          await submit({
            variables: {
              data: {
                ...data,
                fullName: `${firstName} ${lastName}`,
                sponsorId: memberId,
                state,
                country,
                teamReport: teamReport as TeamReport[],
                teamStrategy: teamStrategy as TeamStrategy,
                commissionDefault: commissionDefault as CommissionDefaultEnum,
                wallets: [...txcWallets, ...otherWallets].map(({ percent, ...rest }) => ({
                  percent: percent * 100,
                  ...rest,
                })),
              },
            },
          });

          reset();
          toast.success('Miner created sccuessfully!');
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
              <SearchMiner label="Sponsor" setMemberId={setMemberId} />
              <Field.Text name="primaryAddress" label="Address" />
              <Field.Text name="secondaryAddress" label="Address Line 2" />
              <Autocomplete
                freeSolo
                fullWidth
                options={countries.getNames()}
                getOptionLabel={(option: any) => option}
                defaultValue="United States of America"
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
              <Field.Select
                name="teamStrategy"
                label="Team Strategy"
                defaultValue="MANUAL"
                required
              >
                {Object.values(TeamStrategy).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.MultiSelect
                name="teamReport"
                label="Team Teport"
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

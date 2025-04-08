import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, formatDate, customizeDate } from 'src/utils/format-time';

import { type GroupSetting, CommissionDefaultEnum } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import Bonuses from './Bonuses';
import { Schema, type SchemaType } from './schema';
import { useFetchPackages } from '../Products/useApollo';
import { useCreateGroupSettings, useUpdateGroupSettings } from './useApollo';

interface Props {
  current?: GroupSetting;
}

export default function EditForm({ current }: Props) {
  const router = useRouter();
  const defaultValues = useMemo(
    () =>
      current
        ? Schema.safeParse({
            ...current,
            limitDate: formatDate(current.limitDate),
          }).data ?? { commissionDefaults: [] }
        : {
            name: '',
            commissionDefaults: [],
            sponsorBonusPackageId: null,
            rollSponsorBonusPackageId: null,
            limitDate: `${today('YYYY-MM-DD')}`,
          },
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { packages, fetchPackages } = useFetchPackages();
  const { loading, createGroupSettings } = useCreateGroupSettings();
  const { loading: updateLoading, updateGroupSettings } = useUpdateGroupSettings();

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(
    async ({ limitDate, sponsorBonusPackageId, rollSponsorBonusPackageId, ...newData }) => {
      try {
        if (current) {
          await updateGroupSettings({
            variables: {
              data: {
                ...newData,
                id: current.id,
                sponsorBonusPackageId: sponsorBonusPackageId === '' ? null : sponsorBonusPackageId,
                rollSponsorBonusPackageId:
                  rollSponsorBonusPackageId === '' ? null : rollSponsorBonusPackageId,
                limitDate: customizeDate(limitDate),
                commissionDefaults: newData.commissionDefaults as CommissionDefaultEnum[],
              },
            },
          });
        } else {
          await createGroupSettings({
            variables: {
              data: {
                ...newData,
                sponsorBonusPackageId: sponsorBonusPackageId === '' ? null : sponsorBonusPackageId,
                rollSponsorBonusPackageId:
                  rollSponsorBonusPackageId === '' ? null : rollSponsorBonusPackageId,
                limitDate: customizeDate(limitDate),
                commissionDefaults: newData.commissionDefaults as CommissionDefaultEnum[],
              },
            },
          });
        }

        reset();
        router.push(paths.dashboard.groupSettings.root);
      } catch (error) {
        toast.error(error.message);
      }
    }
  );

  useEffect(() => {
    fetchPackages({ variables: { filter: { status: true } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
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
          <Field.Text name="name" label="Name" />
          <Field.DatePicker name="limitDate" label="Limit Date" format="YYYY-MM-DD" />

          {['sponsorBonusPackageId', 'rollSponsorBonusPackageId'].map((field) => {
            const label = field.replace(/([A-Z])/g, ' $1');
            const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
            return (
              <Field.Select key={field} name={field} label={capitalizedLabel}>
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {packages.map((option) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.productName}
                  </MenuItem>
                ))}
              </Field.Select>
            );
          })}

          <Field.MultiSelect
            name="commissionDefaults"
            label="Commission Defaults"
            checkbox
            options={Object.values(CommissionDefaultEnum).map((option) => ({
              label: option,
              value: option,
            }))}
          />
        </Box>

        <Bonuses
          groupSettingCommissionBonuses={current?.groupSettingCommissionBonuses ?? []}
          packages={packages}
        />
      </Card>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={current ? updateLoading : loading}
        >
          {current ? 'Edit' : 'Create'}
        </LoadingButton>
      </Stack>
    </Form>
  );
}

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { Schema, type SchemaType } from './schema';
import { Templates } from '../Campaign/Send/Templates';
import { useCreateAutoCampaign, useUpdateAutoCampaign } from '../useApollo';

import type { AutoCampaign } from './List/type';

interface Props {
  current?: AutoCampaign;
}

export default function EditForm({ current }: Props) {
  const router = useRouter();

  const [templateId, setTemplateId] = useState<string>('');

  const { loading: createLoading, createAutoCampaign } = useCreateAutoCampaign();
  const { loading: updateLoading, updateAutoCampaign } = useUpdateAutoCampaign();

  const defaultValues = useMemo<SchemaType>(
    () =>
      current
        ? Schema.safeParse(current)?.data ?? ({} as SchemaType)
        : { sender: '', subject: '', approvedCommission: true },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newData) => {
    try {
      const data = { ...newData, templateId };

      if (current) {
        const { data: result } = await updateAutoCampaign({
          variables: { data: { id: current.id, ...data } },
        });

        if (result?.updateAutoCampaign) {
          toast.success('Auto Campaign updated successfully');
        }
      } else {
        const { data: result } = await createAutoCampaign({ variables: { data } });

        if (result?.createAutoCampaign) {
          toast.success('Auto Campaign created successfully');
        }
      }

      router.push(paths.dashboard.communication.root);
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Communication"
        links={[
          { name: 'Communication', href: paths.dashboard.communication.root },
          { name: 'Auto Campaign' },
          { name: current?.subject ?? 'New' },
        ]}
        sx={{
          mb: { xs: 2, md: 3 },
        }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(3, 1fr)',
          }}
          alignItems="center"
          my={2}
        >
          <Field.Switch name="approvedCommission" label="Approved Commission" />
          <Field.Text name="sender" label="Sender" />
          <Field.Text name="subject" label="Subject" />
        </Box>

        <Templates setTemplateId={setTemplateId} pagination={false} sx={{ borderRadius: 1 }} />

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={current ? updateLoading : createLoading}
          >
            {current ? 'Edit' : 'Create'}
          </LoadingButton>
        </Stack>
      </Form>
    </DashboardContent>
  );
}

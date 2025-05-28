import type { Member } from 'src/__generated__/graphql';

import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import SearchMiner from './SearchMiner';
import { Schema, type SchemaType } from './schema';
import { useCreateShareAccount, useUpdateShareAccount } from './useApollo';

interface Props {
  current?: any;
}

export default function EditForm({ current }: Props) {
  const router = useRouter();

  const [memberIds, setMemberIds] = useState<string[]>();

  const { loading: createLoading, createShareAccount } = useCreateShareAccount();
  const { loading: updateLoading, updateShareAccount } = useUpdateShareAccount();

  const defaultValues = useMemo<SchemaType>(
    () => (current ? Schema.safeParse(current).data ?? ({} as SchemaType) : { note: '' }),
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ note }) => {
    try {
      const { data } = current
        ? await updateShareAccount({
            variables: {
              data: {
                id: current?.id,
                note,
                memberIds: memberIds ?? current.members.map((item: Member) => item.id),
              },
            },
          })
        : await createShareAccount({
            variables: {
              data: { note, memberIds: memberIds ?? [] },
            },
          });

      if (data) {
        toast.success('Shared successfully');
      }

      router.push(paths.dashboard.shared.root);

      reset();
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <SearchMiner currentMembers={current?.members ?? []} setMemberIds={setMemberIds} />
      <Field.Text name="note" label="Note" multiline rows={3} sx={{ mt: 2 }} />

      <Stack direction="row" justifyContent="flex-end" pt={2}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={createLoading || updateLoading}
        >
          {current ? 'Update' : 'Share'}
        </LoadingButton>
      </Stack>
    </Form>
  );
}

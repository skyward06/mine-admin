import type { AdminNotes } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import { ScrollBar } from 'src/components/ScrollBar';

import { useCreateNote, useUpdateNote } from './useApollo';

// ----------------------------------------------------------------------
export type NewNoteSchemaType = zod.infer<typeof NewNoteSchema>;

interface Props {
  memberId: string;
  open: UseBooleanReturn;
  current?: AdminNotes;
}

const NewNoteSchema = zod.object({
  description: zod.string({ required_error: 'Content is required' }),
});

export default function CreateForm({ open, memberId, current }: Props) {
  const defaultValues = useMemo(
    () =>
      current
        ? (NewNoteSchema.safeParse(current).data ?? ({} as NewNoteSchemaType))
        : { description: '' },
    [current]
  );

  console.log('current => ', current);

  const methods = useForm<NewNoteSchemaType>({
    resolver: zodResolver(NewNoteSchema),
    defaultValues,
  });

  const { loading, createNote } = useCreateNote();
  const { loading: updateLoading, updateNote } = useUpdateNote();

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ description }) => {
    try {
      if (current) {
        await updateNote({
          variables: { data: { id: current.id, description } },
        });
      } else {
        await createNote({ variables: { data: { memberId, description } } });
      }

      reset();
      toast.success('Create success!');
      open.onFalse();
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;

        if (error.path?.includes('description')) {
          setError('description', { type: 'manual', message: error?.message || '' });
        }
      } else {
        toast.error(err.message);
      }

      toast.error(err.message);
    }
  });

  return (
    <ScrollBar
      sx={{
        borderRadius: 1,
        p: 3,
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack rowGap={3}>
          <Typography variant="h5">{current ? 'Edit' : 'Add'} Note</Typography>

          <Field.Text name="description" label="Content" multiline minRows={3} />

          <Stack alignItems="flex-start">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={current ? updateLoading : loading}
            >
              {current ? 'Edit' : 'Create'} Note
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </ScrollBar>
  );
}

import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ProofType } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { Schema, type SchemaType } from './schema';
import LinkForm from '../PrepaidCommission/LinkForm';
import { useCreateProof, useUpdateProof } from './useApollo';
import { FileManagerNewFolderDialog } from '../Sales/Upload';
import { FileRecentItem } from '../Sales/Edit/FileRecentItem';

// ----------------------------------------------------------------------

interface Props {
  current?: any;
}

export default function EditForm({ current }: Props) {
  const [files, setFiles] = useState<string[]>();

  const router = useRouter();

  const defaultValues = useMemo(
    () =>
      current
        ? Schema.safeParse(current)?.data ?? ({} as SchemaType)
        : {
            amount: 0,
            refId: '',
            type: ProofType.Sale,
          },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { loading, createProof } = useCreateProof();
  const { loading: updateLoading, updateProof } = useUpdateProof();

  const handleUpdate = (data: any) => {
    setFiles((prev) => [...(prev ?? []), ...data.files]);
  };

  const onDelete = (id: string) => {
    setFiles(files?.filter((file: any) => id !== file.id));
  };

  const onSubmit = handleSubmit(async (newData) => {
    try {
      if (current) {
        await updateProof({
          variables: {
            data: {
              ...newData,
              id: current.id,
              fileIds: files?.map((file: any) => file.id),
            },
          },
        });
      } else {
        await createProof({
          variables: {
            data: {
              ...newData,
              fileIds: files?.map((file: any) => file.id),
            },
          },
        });
      }

      reset();
      router.push(paths.dashboard.proof.root);
    } catch (err) {
      toast.error(err.message);
    }
  });

  useEffect(() => {
    if (current && current.files) {
      setFiles(current?.files?.map((file: any) => file));
    }
  }, [current]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={9}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Proof</Typography>
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
              <Field.Text type="number" name="amount" label="Amount" />

              <Field.Text name="note" label="Note" />
              <Field.Select name="type" label="Proof Type">
                {Object.values(ProofType).map((item: string) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="refId" label="Reference ID" />
            </Box>

            <Divider flexItem sx={{ borderStyle: 'dashed', my: 2 }} />

            <LinkForm />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={current ? updateLoading : loading}
              >
                {current ? 'Edit' : 'Create'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <FileManagerNewFolderDialog handleUpdate={handleUpdate} />

          <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', mt: 1 }}>
            {files?.map((file: any) => (
              <FileRecentItem key={file.id} file={file} onDelete={onDelete} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
}

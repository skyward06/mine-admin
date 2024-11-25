import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today, formatDate, customizeDate } from 'src/utils/format-time';

import { ProofType } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { Schema, type SchemaType } from './schema';
import LinkForm from '../PrepaidCommission/LinkForm';
import { useCreateProof, useUpdateProof } from './useApollo';
import { FileManagerNewFolderDialog } from '../Sales/Upload';
import { FileRecentItem } from '../Sales/Edit/FileRecentItem';
import { PROOF_VALUES, type PROOF_KEY_VALUE_TYPE } from './const';

// ----------------------------------------------------------------------

interface Props {
  current?: any;
}
type NestedMenu = {
  [key: string]: NestedMenu | ProofType;
};

// Convert flat list to a nested structure
function createNestedMenu(list: ProofType[]): NestedMenu {
  const root: NestedMenu = {};
  list.forEach((item) => {
    if (!(item in PROOF_VALUES)) return;
    const parts = PROOF_VALUES[item as PROOF_KEY_VALUE_TYPE].split(':');
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? item : {};
      }
      current = current[part] as NestedMenu;
    });
  });
  return root;
}

function renderMenu(menu: NestedMenu, path: string[] = []): React.ReactNode {
  return Object.keys(menu).map((key) => {
    const currentPath = [...path, key].join(':');

    if (typeof menu[key] === 'string') {
      return (
        <option key={currentPath} value={menu[key] as string}>
          {key}
        </option>
      );
    }
    return (
      <optgroup label={currentPath} key={key}>
        {renderMenu(menu[key] as NestedMenu, [...path, key])}
      </optgroup>
    );
  });
}

export default function EditForm({ current }: Props) {
  const [files, setFiles] = useState<string[]>();

  const router = useRouter();

  const defaultValues = useMemo(
    () =>
      current
        ? Schema.safeParse({ ...current, orderedAt: formatDate(current.orderedAt) })?.data ??
          ({} as SchemaType)
        : {
            amount: 0,
            refId: '',
            orderedAt: `${today('YYYY-MM-DD')}`,
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

  const onSubmit = handleSubmit(async ({ orderedAt, ...newData }) => {
    try {
      if (current) {
        await updateProof({
          variables: {
            data: {
              ...newData,
              orderedAt: customizeDate(orderedAt),
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
              orderedAt: customizeDate(orderedAt),
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
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Field.Select name="type" label="Type" native>
                  {renderMenu(createNestedMenu(Object.values(ProofType)))}
                </Field.Select>
                <Field.Text type="number" name="amount" label="Amount" />
              </Stack>

              <Field.Text name="note" label="Note" />
              <Field.DatePicker name="orderedAt" label="Ordered At" format="YYYY-MM-DD" />
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

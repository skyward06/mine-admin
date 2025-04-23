import type { EmailTemplate } from 'src/__generated__/graphql';

import handlebars from 'handlebars';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor, Toolbar, HtmlButton, EditorProvider } from 'react-simple-wysiwyg';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { SAMPLE_VARS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { Schema, type SchemaType } from './schema';
import { useCreateTemplate, useUpdateTemplate } from '../useApollo';

interface Props {
  current?: EmailTemplate;
}

export default function EditorView({ current }: Props) {
  const [html, setHtml] = useState('');
  const source = useBoolean();
  const htmlButton = document.querySelector('[aria-label="View HTML"]') as HTMLButtonElement;

  const router = useRouter();

  document.getElementsByClassName('rsw-ce')[0]?.setAttribute('contenteditable', 'false');

  const { loading: createLoading, createEmailTemplate } = useCreateTemplate();
  const { loading: updateLoading, updateEmailTemplate } = useUpdateTemplate();

  const defaultValues = useMemo(
    () =>
      current
        ? Schema.safeParse(current).data ?? ({} as SchemaType)
        : { templateID: 0, subject: '', description: '' },
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onChange = (e: any) => {
    setHtml(e.target.value);
  };

  const onSubmit = handleSubmit(async (newData) => {
    try {
      if (!newData.subject) {
        toast.error('Subject is required');
      }

      if (!newData.description) {
        toast.error('Description is required');
      }

      const { data } = current
        ? await updateEmailTemplate({
            variables: { data: { ...newData, id: current?.id!, body: html } },
          })
        : await createEmailTemplate({
            variables: { data: { ...newData, body: html } },
          });

      if (data) {
        toast.success('Successfully saved!');

        router.push(paths.dashboard.communication.root);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  });

  useEffect(() => {
    setHtml(current?.body ?? '');
  }, [current]);

  useEffect(() => {
    if (htmlButton) {
      htmlButton.click();
    }

    const handleHtmlButtonClick = () => {
      source.onToggle();
    };

    if (htmlButton) {
      htmlButton.addEventListener('click', handleHtmlButtonClick);
    }

    return () => {
      if (htmlButton) {
        htmlButton.removeEventListener('click', handleHtmlButtonClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlButton]);

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Communication"
        links={[
          { name: 'Communication' },
          { name: 'Email Templates', href: paths.dashboard.communication.root },
          { name: current?.subject ?? 'New' },
        ]}
        sx={{
          mb: { xs: 2, md: 3 },
        }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box display="grid" gridTemplateColumns="15% 25% 58%" columnGap={2} mb={2}>
          <Field.Text
            type="number"
            name="templateID"
            label="Template ID"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ pt: 0.3 }}>
                  EM
                </InputAdornment>
              ),
            }}
          />
          <Field.Text name="subject" label="Subject" />
          <Field.Text name="description" label="Description" />
        </Box>

        <EditorProvider>
          <Editor
            value={source.value ? handlebars.compile(html)(SAMPLE_VARS) : html}
            onChange={onChange}
            style={{ height: source.value ? '100%' : '500px' }}
          >
            <Toolbar>
              <HtmlButton aria-label="View HTML" />
            </Toolbar>
          </Editor>
        </EditorProvider>

        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          loading={current ? updateLoading : createLoading}
        >
          Save
        </LoadingButton>
      </Form>
    </DashboardContent>
  );
}

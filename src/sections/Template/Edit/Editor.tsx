import handlebars from 'handlebars';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor, Toolbar, HtmlButton, EditorProvider } from 'react-simple-wysiwyg';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { useUpdateTemplate } from '../useApollo';
import { Schema, type SchemaType } from './schema';

import type { EmailTemplate } from '../List/type';

interface Props {
  current: EmailTemplate;
}

export default function Template({ current }: Props) {
  const [html, setHtml] = useState('Insert here...');
  const [content, setContent] = useState('');

  const source = useBoolean();
  const htmlButton = document.querySelector('[aria-label="View HTML"]') as HTMLButtonElement;

  const defaultValues = useMemo(
    () =>
      current
        ? Schema.safeParse(current).data ?? ({} as SchemaType)
        : { subject: '', description: '' },
    [current]
  );

  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues,
  });
  const { loading, updateTemplate } = useUpdateTemplate();

  const { handleSubmit } = methods;

  const onChange = (e: any) => {
    setHtml(e.target.value);
  };

  const onSubmit = handleSubmit(async (newData) => {
    try {
      const { data } = await updateTemplate({
        variables: { data: { ...newData, id: current.id, body: html } },
      });

      if (data) {
        toast.success('Successfully saved!');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  });

  useEffect(() => {
    setHtml(current.body);
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

  useEffect(() => {
    setContent(source.value ? handlebars.compile(html)(current?.sampleVars) : html);
  }, [html, source, current]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box display="grid" gridTemplateColumns="30% 70%" columnGap={2} mb={2}>
        <Field.Text name="subject" label="Subject" />
        <Field.Text name="description" label="Description" />
      </Box>

      <EditorProvider>
        <Editor
          value={content}
          onChange={onChange}
          style={{ height: source.value ? '100%' : '500px' }}
        >
          <Toolbar>
            <HtmlButton aria-label="View HTML" />
          </Toolbar>
        </Editor>
      </EditorProvider>

      <LoadingButton type="submit" variant="contained" sx={{ mt: 2 }} loading={loading}>
        Save
      </LoadingButton>
    </Form>
  );
}

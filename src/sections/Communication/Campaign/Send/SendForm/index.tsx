import type { EmailTemplate } from 'src/__generated__/graphql';

import handlebars from 'handlebars';
import { useState, useEffect } from 'react';
import { Editor, EditorProvider } from 'react-simple-wysiwyg';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SAMPLE_VARS } from 'src/consts';

interface Props {
  emails: string[];
  listType: string;
  template: EmailTemplate;
}

export default function SendForm({ emails, template, listType }: Props) {
  const [html, setHtml] = useState<any>('');

  document.getElementsByClassName('rsw-ce')[0]?.setAttribute('contenteditable', 'false');

  useEffect(() => {
    setHtml(template?.body);
  }, [template]);

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Stack width={1} direction="row" spacing={2}>
          <Typography variant="subtitle1">Subject:</Typography>
          <Typography>{template?.subject}</Typography>
        </Stack>
        <Stack width={1} direction="row" spacing={2}>
          <Typography variant="subtitle1">List Type:</Typography>
          <Typography>{listType}</Typography>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ py: 4 }}>
        <Stack width={0.5}>
          <pre>{emails.join('\n')}</pre>
        </Stack>
        <Stack width={1}>
          <EditorProvider>
            <Editor value={handlebars.compile(html)(SAMPLE_VARS)} />
          </EditorProvider>
        </Stack>
      </Stack>
    </>
  );
}

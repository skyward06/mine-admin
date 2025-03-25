import handlebars from 'handlebars';
import { useState, useEffect } from 'react';
import { Editor, EditorProvider } from 'react-simple-wysiwyg';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { SAMPLE_VARS, CAMPAIGN_LIST_TYPE } from 'src/consts';
import { CampaignListType, type EmailTemplate } from 'src/__generated__/graphql';

interface Props {
  emails: string[];
  setListType: Function;
  template: EmailTemplate;
}

export default function SendForm({ emails, template, setListType }: Props) {
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
        <Stack width={0.2}>
          <Typography variant="subtitle1">List Type:</Typography>
        </Stack>
        <Stack width={0.8}>
          <Select
            fullWidth
            size="small"
            onChange={(event) => setListType(event.target.value)}
            defaultValue={CampaignListType.All}
          >
            {Object.keys(CAMPAIGN_LIST_TYPE).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
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

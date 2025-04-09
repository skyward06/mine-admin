import type { EmailTemplate } from 'src/__generated__/graphql';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import EmailTemplateView from 'src/components/Template';

interface Props {
  emails: string[];
  listType: string;
  setSender: Function;
  template: EmailTemplate;
}

export default function SendForm({ emails, template, listType, setSender }: Props) {
  return (
    <>
      <Stack direction={{ md: 'row', xs: 'column' }} spacing={2} alignItems="center">
        <Stack width={1} direction="row" spacing={2}>
          <Typography variant="subtitle1">Subject:</Typography>
          <Typography>{template?.subject}</Typography>
        </Stack>
        <Stack width={1} direction="row" spacing={2}>
          <Typography variant="subtitle1">List Type:</Typography>
          <Typography>{listType}</Typography>
        </Stack>
        <Stack width={1} direction="row" spacing={2} alignItems="center">
          <Typography variant="subtitle1">Sender:</Typography>
          <TextField
            size="small"
            fullWidth
            onChange={(event) => setSender(event.target.value)}
            required
          />
        </Stack>
      </Stack>

      <Stack direction={{ md: 'row', xs: 'column' }} sx={{ py: 4 }} spacing={2}>
        <Stack width={{ md: 0.5, xs: 1 }} border="1px solid #eeeeee" borderRadius={1} p={2}>
          <Box
            height={{ md: 'calc(100vh - 330px)', xs: 200 }}
            style={{ overflowY: 'scroll', overflowX: 'hidden' }}
          >
            {emails.join('\n')}
          </Box>
        </Stack>
        <Stack width={1}>
          <EmailTemplateView body={template.body} />
        </Stack>
      </Stack>
    </>
  );
}

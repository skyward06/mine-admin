import type { Proof } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { formatDateTime } from 'src/utils/format-time';

import { ScrollBar } from 'src/components/ScrollBar';
import { EmptyContent } from 'src/components/EmptyContent';

import { FileRecentItem } from 'src/sections/Sales/List/FileRecentItem';

import { PROOF_VALUES } from '../EditForm';

import type { PROOF_KEY_VALUE_TYPE } from '../EditForm';

interface Props {
  row: Proof;
  open: UseBooleanReturn;
}

export default function Detail({ row, open }: Props) {
  const { amount, refId, type, note, files, reflinks, createdAt } = row;

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 400 } }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6"> Info </Typography>
          <Typography variant="body2">{formatDateTime(createdAt)}</Typography>
        </Stack>
        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">Main</Typography>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Reference Type:
            </Typography>
            <Typography variant="body2">
              {PROOF_VALUES[type as PROOF_KEY_VALUE_TYPE].split(':').pop()}
            </Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Reference ID:
            </Typography>
            <Typography variant="body2">{refId}</Typography>
          </Stack>

          <Stack direction="row" columnGap={2}>
            <Typography variant="body2" color="text.disabled">
              Amount:
            </Typography>
            <Typography variant="body2">{amount}</Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Note</Typography>
          <Typography variant="body2">{note}</Typography>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Reference Link</Typography>

          {reflinks?.map((link) => (
            <Stack direction="row" columnGap={1}>
              <Typography>{link?.linkType}:</Typography>
              <Typography
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                <Link to={link?.link ?? ''} target="_blank">
                  {link?.link}
                </Link>
              </Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Files</Typography>

          {isEmpty(files) ? (
            <EmptyContent />
          ) : (
            files?.map((file: any) => <FileRecentItem key={file.id} file={file} />)
          )}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

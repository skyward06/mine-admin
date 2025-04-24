import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { customizeFullName } from 'src/utils/helper';
import { formatDateTime } from 'src/utils/format-time';

import { BUG_REPORT_STATUS } from 'src/consts';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { EmptyContent } from 'src/components/EmptyContent';
import { Label, type LabelColor } from 'src/components/Label';

import { FileRecentItem } from 'src/sections/Sales/List/FileRecentItem';

import { useFetchBugReport } from '../useApollo';

interface Props {
  open: UseBooleanReturn;
  id: string;
}

export default function Detail({ open, id }: Props) {
  const { loading, bugReport, fetchBugReport } = useFetchBugReport();

  useEffect(() => {
    if (open.value && id) {
      fetchBugReport({ variables: { data: { id } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open.value, id]);

  return (
    <Drawer
      open={open.value}
      onClose={() => open.onFalse()}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 375 } }}
    >
      <ScrollBar
        sx={{
          borderRadius: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              <Typography variant="subtitle1">{formatDateTime(bugReport?.createdAt)}</Typography>
              <Label color={BUG_REPORT_STATUS[bugReport?.status!]?.color as LabelColor}>
                {BUG_REPORT_STATUS[bugReport?.status!]?.value}
              </Label>
            </>
          )}
        </Stack>

        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">Info</Typography>

          {loading ? (
            <Skeleton />
          ) : (
            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Subject:
              </Typography>
              <Typography variant="body2">{bugReport?.subject}</Typography>
            </Stack>
          )}

          {loading ? (
            <Skeleton />
          ) : (
            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Description:
              </Typography>
              <Typography variant="body2">{bugReport?.description}</Typography>
            </Stack>
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Files</Typography>

          {isEmpty(bugReport?.files) ? (
            <EmptyContent />
          ) : (
            bugReport?.files?.map((file: any) => <FileRecentItem key={file.id} file={file} />)
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          {bugReport?.status === 'DONE' && (
            <Stack direction="row" columnGap={1}>
              <Iconify icon="emojione:sports-medal" />
              This issue was solved by
              <Typography variant="subtitle1">
                {customizeFullName(bugReport.solvedBy?.fullName ?? '')}
              </Typography>
            </Stack>
          )}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

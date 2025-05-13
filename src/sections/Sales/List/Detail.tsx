import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { formatDateTime } from 'src/utils/format-time';
import { formatID, isValidUrl, isTransaction, customizeFullName } from 'src/utils/helper';

import { PREPAID_TYPE } from 'src/consts';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { EmptyContent } from 'src/components/EmptyContent';

import { useFetchSaleById } from '../useApollo';
import { FileRecentItem } from './FileRecentItem';

interface Props {
  open: UseBooleanReturn;
  id: string;
}

export default function Detail({ open, id }: Props) {
  const { loading, sale, fetchSaleById } = useFetchSaleById();

  useEffect(() => {
    if (open.value && id) {
      fetchSaleById({ variables: { data: { id }, logsize: 1 } });
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
          <Typography variant="h6"> {formatID(sale?.ID ?? '', 'S')} </Typography>
          <Stack direction="row">
            <Typography>
              <Iconify
                icon="codicon:circle-filled"
                sx={{ color: sale?.status ? 'green' : 'text.disabled', mt: 0.3 }}
              />
            </Typography>
            <Typography variant="subtitle1">{sale?.status ? 'active' : 'inactive'}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Typography variant="subtitle1">User</Typography>

          {loading ? (
            <Skeleton />
          ) : (
            <Stack direction="row" justifyContent="space-between">
              <ListItemText
                primary={customizeFullName(sale?.member?.fullName ?? '')}
                secondary={sale?.member?.username}
                primaryTypographyProps={{ typography: 'subtitle1' }}
                secondaryTypographyProps={{
                  component: 'span',
                  color: 'text.disabled',
                }}
              />

              <Typography variant="body2">{formatDateTime(sale?.updatedAt)}</Typography>
            </Stack>
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Package</Typography>

          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Product Name:
                </Typography>
                <Typography variant="body2">{sale?.package?.productName}</Typography>
              </Stack>

              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Hash Power:
                </Typography>
                <Typography variant="body2">{sale?.package?.token}</Typography>
              </Stack>

              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Amount:
                </Typography>
                <Typography variant="body2">{sale?.package?.amount}</Typography>
              </Stack>

              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Point:
                </Typography>
                <Typography variant="body2">{sale?.package?.point}</Typography>
              </Stack>

              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Free Share:
                </Typography>
                <Typography variant="body2">{sale?.sponsorCnt ? 'Yes' : 'No'}</Typography>
              </Stack>

              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Metal Peer Payment:
                </Typography>
                <Typography variant="body2">{sale?.isMetal ? 'Yes' : 'No'}</Typography>
              </Stack>

              <Stack direction="row" columnGap={2}>
                <Typography variant="body2" color="text.disabled">
                  Visibility:
                </Typography>
                <Iconify
                  icon={sale?.package?.enrollVisibility ? 'eva:eye-outline' : 'tabler:eye-off'}
                  sx={{
                    color: (theme) =>
                      sale?.package?.enrollVisibility
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light,
                  }}
                />
              </Stack>
            </>
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Note</Typography>

          {loading ? <Skeleton /> : <Typography variant="body2">{sale?.proof?.note}</Typography>}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Reference Link</Typography>

          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              {sale?.proof?.reflinks?.map((link) => (
                <Stack direction="row" columnGap={1}>
                  <Typography>{link?.linkType}:</Typography>
                  <Typography
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    <Link
                      to={
                        isValidUrl(link?.link ?? '')
                          ? link?.link
                          : isTransaction(link?.link ?? '', link.linkType)
                            ? `${(PREPAID_TYPE as any)[link.linkType]?.transaction}/${link?.link}`
                            : `${(PREPAID_TYPE as any)[link.linkType]?.address}/${link?.link}`
                      }
                      target="_blank"
                    >
                      {link?.link}
                    </Link>
                  </Typography>
                </Stack>
              ))}
            </>
          )}

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          <Typography variant="subtitle1">Files</Typography>

          {isEmpty(sale?.proof?.files) ? (
            <EmptyContent />
          ) : (
            sale?.proof?.files?.map((file: any) => <FileRecentItem key={file.id} file={file} />)
          )}
        </Stack>
      </ScrollBar>
    </Drawer>
  );
}

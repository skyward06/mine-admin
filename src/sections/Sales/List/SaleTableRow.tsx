import type { Sale } from 'src/__generated__/graphql';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { formatDate, formatDateTime } from 'src/utils/format-time';

import { FREE_SHARE_ID_1, FREE_SHARE_ID_2 } from 'src/consts';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';

import { FileRecentItem } from './FileRecentItem';

// ----------------------------------------------------------------------

type Props = {
  row: Sale;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function SaleTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();
  const open = useBoolean();

  const {
    id,
    member,
    package: product,
    paymentMethod,
    paymentConfirm,
    orderedAt,
    statisticsSales,
    status,
    note,
    updatedAt,
  } = row;

  const [firstName, lastName] = member?.fullName.split(' ') ?? ['', ''];

  return (
    <>
      <TableRow hover>
        <TableCell
          align="left"
          sx={{
            cursor: 'pointer',
            '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
          }}
          onClick={() => {
            router.push(paths.dashboard.members.edit(member?.id ?? ''));
          }}
        >
          <ListItemText
            primary={member?.username}
            secondary={member?.email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell align="left">{member?.assetId}</TableCell>
        <TableCell align="left">{product?.productName}</TableCell>
        <TableCell align="left">{paymentMethod}</TableCell>
        <TableCell align="left">{product?.amount}</TableCell>
        <TableCell align="left">{product?.token}</TableCell>
        <TableCell align="left">
          <ListItemText
            primary={formatDate(orderedAt)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title="View" placement="top" arrow>
            <IconButton onClick={() => open.onTrue()}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              onClick={() => {
                router.push(`${paths.dashboard.sales.edit(id)}`);
              }}
            >
              <Iconify icon="solar:pen-2-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color="error"
              disabled={!!statisticsSales?.length}
              onClick={() => {
                confirm.onTrue();
                setSelected(id);
              }}
            >
              <Iconify icon="bxs:coffee-togo" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

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
            <Stack direction="row">
              <Typography>
                <Iconify
                  icon="codicon:circle-filled"
                  sx={{ color: status ? 'green' : 'text.disabled', mt: 0.3 }}
                />
              </Typography>
              <Typography variant="subtitle1">{status ? 'active' : 'inactive'}</Typography>
            </Stack>
          </Stack>
          <Stack spacing={1} sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
            <Typography variant="subtitle1">User</Typography>

            <Stack direction="row" justifyContent="space-between">
              <ListItemText
                primary={`${firstName} ${lastName.length && lastName[0].toUpperCase()}.`}
                secondary={member?.username}
                primaryTypographyProps={{ typography: 'subtitle1' }}
                secondaryTypographyProps={{
                  component: 'span',
                  color: 'text.disabled',
                }}
              />

              <Typography variant="body2">{formatDateTime(updatedAt)}</Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

            <Typography variant="subtitle1">Package</Typography>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Product Name:
              </Typography>
              <Typography variant="body2">{product?.productName}</Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Hash Power:
              </Typography>
              <Typography variant="body2">{product?.token}</Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Amount:
              </Typography>
              <Typography variant="body2">{product?.amount}</Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Point:
              </Typography>
              <Typography variant="body2">{product?.point}</Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Free Share:
              </Typography>
              <Typography variant="body2">
                {id === FREE_SHARE_ID_1 || id === FREE_SHARE_ID_2 ? 'Yes' : 'No'}
              </Typography>
            </Stack>

            <Stack direction="row" columnGap={2}>
              <Typography variant="body2" color="text.disabled">
                Visibility:
              </Typography>
              <Iconify
                icon={product?.enrollVisibility ? 'eva:eye-outline' : 'tabler:eye-off'}
                sx={{
                  color: (theme) =>
                    product?.enrollVisibility
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                }}
              />
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

            <Typography variant="subtitle1">Note</Typography>
            <Typography variant="body2">{note}</Typography>

            <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

            <Typography variant="subtitle1">Files</Typography>

            {paymentConfirm?.map((file: any) => <FileRecentItem key={file.id} file={file} />)}
          </Stack>
        </ScrollBar>
      </Drawer>
    </>
  );
}

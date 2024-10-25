import type { Package } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';

import { FREE_SHARE_ID_1, FREE_SHARE_ID_2 } from 'src/consts';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

import { useUpdatePackage } from '../useApollo';

// ----------------------------------------------------------------------

type Props = {
  row: Package;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function ProductTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();

  const { id, amount, date, productName, point, enrollVisibility, token, sales, status } = row;

  const { updatePackage, loading } = useUpdatePackage();

  return (
    <TableRow hover>
      <TableCell align="left">{formatDate(date)}</TableCell>
      <TableCell align="left">{amount}</TableCell>
      <TableCell align="left">{productName}</TableCell>
      <TableCell align="left">
        {(id === FREE_SHARE_ID_1 || id === FREE_SHARE_ID_2) && (
          <Label variant="soft" color="primary">
            Free Share
          </Label>
        )}
      </TableCell>
      <TableCell align="left">{point}</TableCell>
      <TableCell align="left">{token}</TableCell>
      <TableCell align="center">
        <IconButton
          disabled={!status || id === FREE_SHARE_ID_1 || id === FREE_SHARE_ID_2}
          onClick={() =>
            updatePackage({
              variables: { data: { id, enrollVisibility: !enrollVisibility } },
            })
          }
          sx={{
            color: (theme) =>
              enrollVisibility ? theme.palette.primary.dark : theme.palette.primary.light,
          }}
        >
          {loading ? (
            <Iconify icon="line-md:loading-loop" />
          ) : (
            <Iconify icon={enrollVisibility ? 'eva:eye-outline' : 'tabler:eye-off'} />
          )}
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton
            color="primary"
            onClick={() => {
              router.push(`${paths.dashboard.products.edit(id)}`);
            }}
            disabled={id === FREE_SHARE_ID_1 || id === FREE_SHARE_ID_2}
          >
            <Iconify icon="solar:pen-2-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top" arrow>
          <IconButton
            color="error"
            disabled={!!sales?.length}
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
  );
}

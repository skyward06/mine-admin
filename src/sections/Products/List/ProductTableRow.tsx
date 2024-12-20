import type { Package } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';

import { NO_PRODUCT } from 'src/consts';

import { Iconify } from 'src/components/Iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { useUpdatePackage } from '../useApollo';

// ----------------------------------------------------------------------

type Props = {
  row: Package;
  confirm: UseBooleanReturn;
  setSelected: Function;
};

export default function ProductTableRow({ row, confirm, setSelected }: Props) {
  const router = useRouter();
  const popover = usePopover();

  const {
    id,
    amount,
    date,
    productName,
    point,
    enrollVisibility,
    token,
    sales,
    status,
    freeShare,
  } = row;

  const { updatePackage, loading } = useUpdatePackage();

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{formatDate(date)}</TableCell>
        <TableCell align="left">{amount}</TableCell>
        <TableCell align="left">{productName}</TableCell>
        <TableCell align="left">{point}</TableCell>
        <TableCell align="left">{token}</TableCell>
        <TableCell align="center">
          <IconButton
            disabled={!status || id === NO_PRODUCT}
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
          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={popover.onOpen}
            disabled={freeShare || id === NO_PRODUCT}
          >
            <Iconify icon="eva:more-horizontal-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push(`${paths.dashboard.products.edit(id)}`);
            }}
          >
            <Iconify icon="solar:pen-2-bold" color="green" />
            Edit
          </MenuItem>
          <MenuItem
            disabled={!!sales?.length}
            onClick={() => {
              confirm.onTrue();
              setSelected(id);
            }}
          >
            <Iconify icon="bxs:coffee-togo" color="red" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}

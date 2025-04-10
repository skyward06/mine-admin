import type { WeeklyCommission } from 'src/sections/Commission/type';

import dayjs from 'dayjs';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatID } from 'src/utils/helper';
import { formatWeekNumber } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

import Detail from 'src/sections/Commission/Member/Detail';

// ----------------------------------------------------------------------

type Props = {
  row: WeeklyCommission;
};

type Checked = {
  checked: boolean;
  value: string;
};

export default function CommissionTableRow({ row }: Props) {
  const router = useRouter();
  const [checked, setChecked] = useState<Checked>({ checked: false, value: '' });

  const open = useBoolean();

  const {
    id,
    ID,
    begL,
    begR,
    newL,
    newR,
    maxL,
    maxR,
    endL,
    endR,
    pkgL,
    pkgR,
    email,
    username,
    memberId,
    commission,
    weekStartDate,
  } = row;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatID(ID ?? '', 'C'));
      setChecked({ value: formatID(ID ?? '', 'C'), checked: true });

      setTimeout(() => {
        setChecked({ checked: false, value: '' });
      }, 3000);
    } catch (err) {
      console.error('Failed to copy test: ', err);
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">
          <ListItemText
            primary={`week #${formatWeekNumber(weekStartDate)}`}
            secondary={`${dayjs(weekStartDate).utc().format('MM/DD')} - ${dayjs(weekStartDate).utc().add(6, 'day').format('MM/DD')}`}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell onClick={handleCopy}>
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {formatID(ID, 'C')}

            {checked.value === formatID(ID ?? '', 'C') && (
              <Iconify icon="line-md:check-all" color="green" />
            )}
          </Stack>
        </TableCell>
        <TableCell
          align="left"
          onClick={() => router.push(paths.dashboard.members.edit(memberId ?? ''))}
        >
          <ListItemText
            primary={username}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell align="left">{`L${begL}, R${begR}`}</TableCell>
        <TableCell align="left">{`L${newL}, R${newR}`}</TableCell>
        <TableCell align="left">{`L${maxL}, R${maxR}`}</TableCell>
        <TableCell align="left">{`L${pkgL}, R${pkgR}`}</TableCell>
        <TableCell align="left">{`L${endL}, R${endR}`}</TableCell>
        <TableCell align="left">{commission ?? 0}</TableCell>
        <TableCell align="center">
          <Tooltip title="View" placement="top" arrow>
            <IconButton color="default" onClick={() => open.onTrue()}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Detail open={open} id={id} />
    </>
  );
}

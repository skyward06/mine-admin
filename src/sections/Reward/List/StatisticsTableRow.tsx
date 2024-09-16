import { useMemo, useState } from 'react';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean, type UseBooleanReturn } from 'src/hooks/useBoolean';

import { fDate, fTime, formatDate } from 'src/utils/format-time';

import { EXPLORER_PATH } from 'src/consts';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

import ConfirmDrawer from './ConfirmDrawer';

// ----------------------------------------------------------------------

type Props = {
  // Todo: Update type to Statistics
  row: any;
  confirm: UseBooleanReturn;
  loading: boolean;
  selected: boolean;
  memberStatistics: any[];
  statisticsId: string;
  table: any;
  setSelected: Function;
  onSelectRow: VoidFunction;
  setStatisticsId: Function;
  confirmStatistics: Function;
};

export default function StatisticsTableRow({
  row,
  confirm: removeConfirm,
  loading,
  selected,
  statisticsId,
  setStatisticsId,
  setSelected,
  onSelectRow,
  memberStatistics,
  confirmStatistics,
  table,
}: Props) {
  const {
    id,
    transactionId,
    issuedAt,
    newBlocks,
    totalBlocks,
    totalHashPower,
    totalMembers,
    txcShared,
    from,
    to,
    status,
  } = row;

  const confirm = useBoolean();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const diff = newBlocks * 254 - txcShared / 10 ** 8;

  const reward = useMemo(() => {
    const rewardData = memberStatistics.reduce(
      (prev: any, current) =>
        current?.member?.memberWallets?.reduce(
          (save: any, item: { address: any; percent: any }) =>
            save && save[item?.address ?? '']
              ? {
                  ...save,
                  [item?.address ?? '']: {
                    ...save[item?.address ?? ''],
                    txcShared:
                      save[item?.address ?? ''].txcShared +
                      ((item?.percent ?? 0) * current.txcShared) / 10000,
                  },
                }
              : {
                  ...save,
                  [item?.address ?? '']: {
                    address: item?.address,
                    txcShared: ((item?.percent ?? 0) * current.txcShared) / 10000,
                  },
                },
          prev
        ),
      {}
    );

    return Object.values(rewardData).filter((item: any) => item.txcShared !== 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberStatistics]);

  return (
    <>
      <TableRow hover selected={selected} sx={{ cursor: 'pointer' }}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>{formatDate(issuedAt)}</TableCell>
        <TableCell>{newBlocks}</TableCell>
        <TableCell>{totalBlocks}</TableCell>
        <TableCell>{totalHashPower}</TableCell>
        <TableCell>{totalMembers}</TableCell>
        <TableCell>{txcShared / 10 ** 8}</TableCell>
        <TableCell>{diff.toFixed(8).endsWith('0') ? diff.toFixed(8) : diff.toFixed(8)}</TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(from)}
            secondary={fTime(from)}
            primaryTypographyProps={{ typography: 'caption', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell>
          <ListItemText
            primary={fDate(to)}
            secondary={fTime(to)}
            primaryTypographyProps={{ typography: 'caption', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {status ? (
            <Label variant="soft" color="success">
              Confirmed
            </Label>
          ) : (
            <Label variant="soft" color="error">
              Pending
            </Label>
          )}
        </TableCell>
        <TableCell align="center">
          {status ? (
            <>
              <Tooltip title="View" placement="top" arrow>
                <IconButton
                  color="success"
                  onClick={() => router.push(paths.dashboard.reward.view(id))}
                >
                  <Iconify icon="solar:eye-bold" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Explorer" placement="top" arrow>
                <IconButton color="info" href={`${EXPLORER_PATH}${transactionId}`} target="_blank">
                  <Iconify icon="bxs:right-top-arrow-circle" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Edit" placement="top" arrow>
                <IconButton
                  color="default"
                  onClick={() => router.push(paths.dashboard.reward.edit(id))}
                >
                  <Iconify icon="solar:pen-2-bold" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Confirm" placement="top" arrow>
                <IconButton
                  color="success"
                  disabled={false}
                  onClick={() => {
                    setStatisticsId(id);
                    setIsOpen(true);
                  }}
                >
                  <Iconify icon="bxs:check-circle" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color="error"
              disabled={status || table.selected.length}
              onClick={() => {
                removeConfirm.onTrue();
                setSelected([id]);
              }}
            >
              <Iconify icon="bxs:coffee-togo" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDrawer
        reward={reward}
        isOpen={isOpen}
        loading={loading}
        confirm={confirm}
        setIsOpen={setIsOpen}
        statisticsId={statisticsId}
        confirmStatistics={confirmStatistics}
      />
    </>
  );
}

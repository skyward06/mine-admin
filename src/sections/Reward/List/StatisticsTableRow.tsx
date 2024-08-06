import { useMemo, useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
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

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';
import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

type Props = {
  // Todo: Update type to Statistics
  row: any;
  confirm: UseBooleanReturn;
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
  const copy = useBoolean();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
                      ((item?.percent ?? 0) * current.txcShared) / 100,
                  },
                }
              : {
                  ...save,
                  [item?.address ?? '']: {
                    address: item?.address,
                    txcShared: ((item?.percent ?? 0) * current.txcShared) / 100,
                  },
                },
          prev
        ),
      {}
    );

    return Object.values(rewardData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberStatistics]);

  const initial = ['sendmany "" "{'];
  const sendmany = [
    ...initial,
    ...reward!.map(
      (item: any, index) =>
        `\\"${item?.address}\\": ${item?.txcShared.toFixed(8)}${index === reward.length - 1 ? '}"' : ','}`
    ),
  ];

  useEffect(() => {
    if (copy.value) {
      setTimeout(() => {
        copy.onFalse();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copy]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sendmany.join('\n'));
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
        <TableCell>{newBlocks * 254 - txcShared / 10 ** 8}</TableCell>

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
            <Tooltip title="View" placement="top" arrow>
              <IconButton
                color="success"
                onClick={() => router.push(paths.dashboard.reward.view(id))}
              >
                <Iconify icon="solar:eye-bold" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Edit" placement="top" arrow>
              <IconButton
                color="default"
                onClick={() => router.push(paths.dashboard.reward.edit(id))}
              >
                <Iconify icon="solar:pen-2-bold" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Confirm" placement="top" arrow>
            <IconButton
              color="success"
              disabled={status}
              onClick={() => {
                setStatisticsId(id);
                setIsOpen(true);
              }}
            >
              <Iconify icon="bxs:check-circle" />
            </IconButton>
          </Tooltip>
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

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: { xs: 1, sm: 700 } } }}
      >
        <Paper sx={{ p: 3 }}>
          <ComponentBlock
            sx={{
              display: 'block',
              alignItems: 'unset',
              overflow: 'auto',
              maxHeight: 800,
              backgroundColor: '#f2f2f2',
            }}
          >
            {sendmany.length === 1 ? (
              <LoadingScreen />
            ) : (
              sendmany.map((item) => (
                <>
                  {item}
                  <br />
                </>
              ))
            )}
          </ComponentBlock>
          <Paper sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2, mr: 2 }}
              onClick={() => {
                handleCopy();
                copy.onTrue();
              }}
              startIcon={
                copy.value ? <Iconify icon="mingcute:check-fill" /> : <Iconify icon="bxs:copy" />
              }
            >
              {copy.value ? 'Copied' : 'Copy'}
            </Button>
            <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={confirm.onTrue}>
              Confirm
            </Button>
          </Paper>
        </Paper>
      </Drawer>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content="Are you sure?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              confirm.onFalse();

              await confirmStatistics({
                variables: { data: { id: statisticsId } },
              });

              router.refresh();
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}

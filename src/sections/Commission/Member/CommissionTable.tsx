import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  ITextFilterParams,
  SelectionChangedEvent,
} from '@ag-grid-community/core';

import dayjs from 'dayjs';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useAgQuery as useQueryString } from 'src/routes/hooks';

import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import { parseFilterModel } from 'src/utils/parseFilter';
import { formatWeekNumber } from 'src/utils/format-time';
import { formatID, customizeFullName } from 'src/utils/helper';

import { COMMISSION_TYPE } from 'src/consts';
import { ConfirmationStatus, CommissionDefaultEnum } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';

import SelectedBar from './SelectedBar';
import StatusRenderer from './StatusRenderer';
import { ActionRender } from './ActionRenderer';
import { parseType } from '../Preview/parseType';
import { useFetchCommissions } from '../useApollo';

import type { WeeklyCommission } from '../type';

type BasicWeeklyCommission = Omit<WeeklyCommission, 'hasUSDC'>;

interface Props {
  status: string;
  customFilter: any;
}

export default function CommissionTable({ status, customFilter }: Props) {
  const router = useRouter();

  const { copy } = useCopyToClipboard();

  const [ids, setIds] = useState<string[]>([]);

  const [{ page = '1,50', sort = 'ID', filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () => parseFilterModel(customFilter, filter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, filter, customFilter]
  );

  const { loading, rowCount, weeklyCommissions, fetchCommissions } = useFetchCommissions();

  const handleCopy = useCallback(
    (value: string) => {
      toast.success('Copied!');
      copy(value);
    },
    [copy]
  );

  useEffect(() => {
    fetchCommissions({
      variables: { filter: { ...graphQueryFilter, status: status.toUpperCase() }, page, sort },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<BasicWeeklyCommission>[]>(() => {
    const baseColDef: ColDef<BasicWeeklyCommission>[] = [
      {
        field: 'ID',
        headerName: 'ID',
        width: 120,
        resizable: true,
        editable: false,
        initialSort: 'asc',
        cellClass: 'ag-cell-center tabular-nums',
        filter: 'agNumberColumnFilter',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) => (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {formatID(data?.ID ?? '', 'C')}
            <IconButton onClick={() => handleCopy(`${formatID(data?.ID ?? '', 'C')}`)}>
              <Iconify icon="iconamoon:copy-fill" />
            </IconButton>
          </Stack>
        ),
      },
      {
        field: 'weekStartDate',
        headerName: 'Week',
        width: 120,
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) => (
          <>
            <Typography
              variant="body2"
              fontWeight={600}
            >{`week #${formatWeekNumber(data?.weekStartDate)}`}</Typography>
            <Typography variant="body2">{`${dayjs(data?.weekStartDate).utc().format('MM/DD')} - ${dayjs(data?.weekStartDate).utc().add(6, 'day').format('MM/DD')}`}</Typography>
          </>
        ),
      },
      {
        field: 'fullName',
        headerName: 'Name',
        width: 120,
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) => (
          <Box
            sx={{
              cursor: 'pointer',
              '&:hover': { color: (theme) => theme.vars.palette.grey[500] },
            }}
            onClick={() => router.push(paths.dashboard.members.edit(data?.memberId!))}
          >
            {customizeFullName(data?.fullName ?? '')}
          </Box>
        ),
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 200,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1.5 }}
          >
            <Typography variant="body2">{data?.username}</Typography>
            {data?.isTexitRanger && (
              <Iconify
                icon="emojione:star"
                sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.3)' } }}
              />
            )}
          </Stack>
        ),
      },
      {
        headerName: 'BegLR',
        width: 100,
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'ag-cell-center',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) =>
          `L${data?.begL}, R${data?.begR}`,
      },
      {
        headerName: 'NewLR',
        width: 100,
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'ag-cell-center',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) =>
          `L${data?.newL}, R${data?.newR}`,
      },
      {
        headerName: 'MaxLR',
        width: 100,
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'ag-cell-center',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) =>
          `L${data?.maxL}, R${data?.maxR}`,
      },
      {
        headerName: 'Package',
        width: 100,
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'ag-cell-center',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) =>
          data?.status !== COMMISSION_TYPE.NONE.label ? `L${data?.pkgL}, R${data?.pkgR}` : 'None',
      },
      {
        headerName: 'EndLR',
        width: 100,
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'ag-cell-center',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) =>
          `L${data?.endL}, R${data?.endR}`,
      },
      {
        field: 'commission',
        headerName: 'Commissions',
        width: 120,
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'paymentMethod',
        headerName: 'Method',
        width: 180,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
        filterParams: {
          values: Object.values(CommissionDefaultEnum),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<WeeklyCommission>,
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) => (
          <Stack direction="row" alignItems="center" spacing={2}>
            {data?.paymentMethod}

            {data?.hasUSDC && data.paymentMethod === CommissionDefaultEnum.Usdc && (
              <Iconify icon="ic:twotone-check-box" color="green" />
            )}
          </Stack>
        ),
      },
      {
        field: 'note',
        headerName: 'Note',
        width: 200,
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        colId: 'action',
        width: 60,
        pinned: 'right',
        resizable: false,
        editable: false,
        sortable: false,
        cellClass: 'ag-cell-center',
        cellRenderer: ActionRender,
      },
    ];

    if (status === ConfirmationStatus.Pending.toLowerCase()) {
      baseColDef.push({
        headerName: 'Status',
        width: 200,
        sortable: false,
        cellClass: 'ag-cell-center',
        cellRenderer: StatusRenderer,
      });
    }

    return baseColDef;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, status]);

  const handleSelectionChange = (event: SelectionChangedEvent<BasicWeeklyCommission, any>) => {
    setIds(event.api.getSelectedRows().map((item) => item.id));
  };

  return (
    <Box width="100%">
      {ids.length ? <SelectedBar ids={ids} status={status.toLowerCase()} /> : null}

      <AgGrid<BasicWeeklyCommission>
        gridKey="commission-member-list"
        loading={loading}
        rowData={weeklyCommissions}
        columnDefs={colDefs}
        totalRowCount={rowCount}
        rowSelection={{ mode: 'multiRow' }}
        selectionColumnDef={{ cellClass: 'ag-cell-center' }}
        onSelectionChanged={handleSelectionChange}
        rowHeight={50}
      />
    </Box>
  );
}

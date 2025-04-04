import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams, SelectionChangedEvent } from '@ag-grid-community/core';

import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';
import { formatWeekNumber } from 'src/utils/format-time';
import { formatID, customizeFullName } from 'src/utils/helper';

import { CONFIG } from 'src/config';
import { COMMISSION_TYPE } from 'src/consts';
import { ConfirmationStatus } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import SelectedBar from './SelectedBar';
import StatusRenderer from './StatusRenderer';
import { ActionRender } from './ActionRenderer';
import { useFetchCommissions } from '../useApollo';

import type { WeeklyCommission } from '../type';

interface Props {
  status: string;
  customFilter: any;
}

export default function CommissionTable({ status, customFilter }: Props) {
  const router = useRouter();

  const [ids, setIds] = useState<string[]>([]);

  const [{ page = '1,50', sort = 'ID', filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () => parseFilterModel(customFilter, filter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, filter, customFilter]
  );

  const { loading, rowCount, weeklyCommissions, fetchCommissions } = useFetchCommissions();

  useEffect(() => {
    fetchCommissions({
      variables: { filter: { ...graphQueryFilter, status: status.toUpperCase() }, page, sort },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<WeeklyCommission>[]>(() => {
    const baseColDef: ColDef<WeeklyCommission>[] = [
      {
        field: 'ID',
        headerName: 'ID',
        width: 120,
        resizable: true,
        editable: false,
        initialSort: 'asc',
        cellClass: 'ag-cell-center',
        filter: 'agNumberColumnFilter',
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) =>
          formatID(data?.ID ?? '', 'C'),
      },
      {
        field: 'weekStartDate',
        headerName: 'Week',
        width: 120,
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) => (
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
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) => (
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
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) => (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" mt={1.5}>
              {data?.username}
            </Typography>
            {data?.isTexitRanger && (
              <Avatar alt="coin" src={`${CONFIG.site.basePath}/assets/coin.jpg`} sx={{ mt: 0.5 }} />
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
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) =>
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
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) =>
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
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) =>
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
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) =>
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
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyCommission>) =>
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
        field: 'commissionDefault',
        headerName: 'Default',
        width: 120,
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
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
        width: 180,
        sortable: false,
        cellClass: 'ag-cell-center',
        cellRenderer: StatusRenderer,
      });
    }

    return baseColDef;
  }, [router, status]);

  const handleSelectionChange = (event: SelectionChangedEvent<WeeklyCommission, any>) => {
    setIds(event.api.getSelectedRows().map((item) => item.id));
  };

  return (
    <Box width="100%">
      {ids.length ? <SelectedBar ids={ids} status={status.toLowerCase()} /> : null}
      <AgGrid<WeeklyCommission>
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

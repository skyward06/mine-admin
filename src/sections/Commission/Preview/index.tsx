import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ISetFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { customizeFullName } from 'src/utils/helper';
import { parseFilterModel } from 'src/utils/parseFilter';
import { formatWeekNumber } from 'src/utils/format-time';

import { COMMISSION_TYPE } from 'src/consts';
import { ConfirmationStatus, CommissionDefaultEnum } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import { parseType } from './parseType';
import { ActionRender } from './ActionRenderer';
import { useFetchCommissions } from '../useApollo';

import type { WeeklyCommission } from '../type';

type BasicWeeklyCommission = Omit<WeeklyCommission, 'hasUSDC'>;

export default function CommissionMemberListView() {
  const [{ page = '1,50', sort = 'commission', filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () =>
      parseFilterModel(
        {
          AND: [
            { status: ConfirmationStatus.Preview },
            {
              OR: [
                { commission: { gt: 0 } },
                { newL: { gt: 0 } },
                { newR: { gt: 0 } },
                { begL: { gt: 0 } },
                { begR: { gt: 0 } },
              ],
            },
          ],
        },
        filter
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  const { loading, rowCount, weeklyCommissions, fetchCommissions } = useFetchCommissions();

  useEffect(() => {
    fetchCommissions({
      variables: { filter: { ...graphQueryFilter }, page, sort },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<BasicWeeklyCommission>[]>(
    () => [
      {
        field: 'weekStartDate',
        headerName: 'Week',
        width: 130,
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
        width: 130,
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) =>
          customizeFullName(data?.fullName ?? ''),
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 150,
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
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
        width: 150,
        resizable: true,
        editable: false,
        initialSort: 'asc',
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
        } as ISetFilterParams<BasicWeeklyCommission>,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicWeeklyCommission>) =>
          data?.paymentMethod,
      },
      {
        field: 'shortNote',
        headerName: 'Note',
        flex: 1,
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
    ],
    []
  );

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <AgGrid<BasicWeeklyCommission>
        gridKey="commission-preview-list"
        loading={loading}
        rowData={weeklyCommissions}
        columnDefs={colDefs}
        totalRowCount={rowCount}
        selectionColumnDef={{ cellClass: 'ag-cell-center' }}
        rowHeight={50}
      />
    </Card>
  );
}

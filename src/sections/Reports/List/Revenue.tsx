import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { fCurrency } from 'src/utils/formatNumber';
import { customizeFullName } from 'src/utils/helper';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';

import { useFetchRevenues } from '../useApollo';

import type { MemberInOutRevenue } from './type';

export default function Revenue() {
  const [{ page = '1,50', sort = 'amount', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, revenues, fetchRevenues } = useFetchRevenues();

  useEffect(() => {
    fetchRevenues({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<MemberInOutRevenue>[]>(
    () => [
      {
        field: 'username',
        headerName: 'Username',
        width: 300,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
      },
      {
        field: 'fullName',
        headerName: 'FullName',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<MemberInOutRevenue>) =>
          customizeFullName(data?.fullName!),
      },
      {
        field: 'commission',
        headerName: 'Commission ($)',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<MemberInOutRevenue>) =>
          fCurrency(data?.commission),
      },
      {
        field: 'amount',
        headerName: 'Sponsored ($)',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<MemberInOutRevenue>) =>
          fCurrency(data?.amount),
      },
      {
        field: 'percent',
        headerName: '%',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<MemberInOutRevenue>) => (
          <Typography
            variant="body2"
            sx={{ mt: 0.6 }}
            color={data?.percent! > 100 ? 'red' : 'default'}
          >
            {data?.percent === 10 ** 20 ? '###' : data?.percent}
          </Typography>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <AgGrid<MemberInOutRevenue>
        gridKey="report-revenue-list"
        loading={loading}
        rowData={revenues}
        columnDefs={colDefs}
        totalRowCount={rowCount}
        rowHeight={50}
      />
    </Card>
  );
}

import type { Sale } from 'src/sections/Sales/List/type';
import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, IDateFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';

import { AgGrid } from 'src/components/AgGrid';
import { CustomName } from 'src/components/AgGrid/Renderers';

import { useFetchSales } from 'src/sections/Sales/useApollo';

export default function MetalListView() {
  const [query, { setFilter }] = useAgQuery();

  if (!query.filter) {
    setFilter({ isMetal: true });
  }

  const { loading, rowCount, sales } = useFetchSales();

  const colDefs = useMemo<ColDef<Sale>[]>(
    () => [
      {
        field: 'member.username',
        headerName: 'Name',
        width: 300,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Sale>) => (
          <CustomName
            id={data?.memberId ?? ''}
            username={data?.member?.username ?? ''}
            email={data?.member?.email ?? ''}
          />
        ),
      },
      {
        field: 'toMember.username',
        headerName: 'Peer',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Sale>) => (
          <CustomName
            id={data?.memberId ?? ''}
            username={data?.member?.username ?? ''}
            email={data?.member?.email ?? ''}
          />
        ),
      },
      {
        field: 'orderedAt',
        headerName: 'Ordered At',
        width: 300,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Sale>) => formatDate(data?.orderedAt),
        cellClass: 'ag-cell-center',
      },
      {
        field: 'package.amount',
        headerName: 'Amount',
        width: 300,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
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
      <AgGrid<Sale>
        gridKey="metal-sale-list"
        loading={loading}
        rowData={sales}
        columnDefs={colDefs}
        totalRowCount={rowCount}
        rowHeight={50}
      />
    </Card>
  );
}

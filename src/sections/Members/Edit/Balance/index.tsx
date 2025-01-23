import type { Balance } from 'src/__generated__/graphql';
import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, IDateFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';

import { paths } from 'src/routes/paths';
import { useParams, useAgQuery } from 'src/routes/hooks';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';

import { AgGrid } from 'src/components/AgGrid';

import { useFetchBalances } from 'src/sections/Members/useApollo';

type BalanceTableDataType = Omit<Balance, 'member' | 'memberId'>;

export default function BalanceList() {
  const params = useParams();
  const [query, { setFilter }] = useAgQuery();

  if (!query.filter) {
    setFilter({ memberId: params.id });
  }

  const { loading, rowCount, balances } = useFetchBalances();

  const colDefs = useMemo<ColDef<BalanceTableDataType>[]>(
    () => [
      {
        field: 'date',
        headerName: 'Date',
        width: 160,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        initialSort: 'desc',
        cellRenderer: ({ data }: CustomCellRendererProps<BalanceTableDataType>) =>
          formatDate(data?.date),
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'amountInCents',
        headerName: 'Amount ($)',
        width: 150,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ',
        cellRenderer: ({ data }: CustomCellRendererProps<BalanceTableDataType>) =>
          data && data.amountInCents > 0
            ? `+${(data.amountInCents / 100).toFixed(2)}`
            : ((data?.amountInCents ?? 0) / 100).toFixed(2),
      },
      {
        field: 'note',
        headerName: 'Note',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'extra2',
        headerName: 'Reference',
        width: 150,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BalanceTableDataType>) =>
          data?.extra1 === 'Sale' ? (
            <Link to={paths.dashboard.sales.edit(formatID(data.extra2?.split('-')[1]!, 'S'))}>
              {data?.extra2}
            </Link>
          ) : (
            data?.extra2
          ),
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
      <AgGrid<BalanceTableDataType>
        gridKey="miner-balance-list"
        loading={loading}
        rowData={balances}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

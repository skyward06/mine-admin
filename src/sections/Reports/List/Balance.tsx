import type { BalancesByMember } from 'src/sections/Balance/List/type';
import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';

import Card from '@mui/material/Card';

import { AgGrid } from 'src/components/AgGrid';

import { useFetchBalancesByMember } from 'src/sections/Balance/List/useApollo';

export default function BalanceList() {
  const { loading, rowCount, balances } = useFetchBalancesByMember();

  const colDefs = useMemo<ColDef<BalancesByMember>[]>(
    () => [
      {
        field: 'username',
        headerName: 'Username',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'fullName',
        headerName: 'FullName',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'balance',
        headerName: 'Amount ($)',
        width: 300,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ',
        cellRenderer: ({ data }: CustomCellRendererProps<BalancesByMember>) =>
          data && data.balance > 0
            ? `+${(data.balance / 100).toFixed(2)}`
            : ((data?.balance ?? 0) / 100).toFixed(2),
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
      <AgGrid<BalancesByMember>
        gridKey="report-balance-list"
        loading={loading}
        rowData={balances}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

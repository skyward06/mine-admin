import type { Balance } from 'src/__generated__/graphql';
import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, IDateFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { AgGrid } from 'src/components/AgGrid';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { useFetchBalances } from 'src/sections/Balance/List/useApollo';

type BalanceTableDataType = Omit<Balance, 'memberId'>;

export default function BalanceList() {
  const { loading, rowCount, balances } = useFetchBalances();
  const router = useRouter();

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
        field: 'member.username',
        headerName: 'Miner',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
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
    <DashboardContent>
      <Breadcrumbs
        heading="Balance"
        links={[{ name: 'Balance', href: paths.dashboard.balance.root }, { name: 'All' }]}
        action={
          <Button variant="contained" onClick={() => router.push(paths.dashboard.balance.new)}>
            Pay Miner
          </Button>
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <AgGrid<BalanceTableDataType>
          gridKey="balance-list"
          loading={loading}
          rowData={balances}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>
    </DashboardContent>
  );
}

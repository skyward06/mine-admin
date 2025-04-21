import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { CHAIN_TYPE, CHAIN_UNIT, TRANSACTION_STATUS } from 'src/consts';
import { PaymentType, WaitTransactionStatus } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import { parseType } from './parseType';
import { useFetchTransactions } from '../useApollo';
import { parseType as chainParse } from '../Address/parseType';

import type { Transaction } from './type';
import type { Address } from '../Address/type';

export default function Orders() {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, transactions, fetchTransactions } = useFetchTransactions();

  useEffect(() => {
    fetchTransactions({ variables: { filter: graphQueryFilter, page, sort } });
  }, [graphQueryFilter, page, sort, fetchTransactions]);

  const colDefs = useMemo<ColDef<Transaction>[]>(
    () => [
      {
        field: 'waitAddress.address',
        headerName: 'Address',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'waitAddress.initBalance',
        headerName: 'Balance',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) =>
          (data?.waitAddress?.initBalance ?? 0) / CHAIN_UNIT[data?.type!],
      },
      {
        field: 'waitAddress.receivedBalance',
        headerName: 'Received Balance',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) =>
          (data?.waitAddress?.receivedBalance ?? 0) / CHAIN_UNIT[data?.type!],
      },
      {
        field: 'waitAddress.status',
        headerName: 'Status',
        width: 150,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(WaitTransactionStatus),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Transaction>,
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) =>
          data ? TRANSACTION_STATUS[data?.waitAddress?.status!] : '',
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 150,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(PaymentType),
          valueFormatter: (params: any) => chainParse(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Address>,
        cellRenderer: ({ data }: CustomCellRendererProps<Address>) =>
          data ? CHAIN_TYPE[data.type] : '',
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 150,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        initialSort: 'desc',
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) =>
          formatDate(data?.createdAt),
      },
      {
        field: 'waitAddress.receivedAt',
        headerName: 'Received At',
        width: 150,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) =>
          formatDate(data?.waitAddress?.receivedAt),
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
      <AgGrid<Transaction>
        gridKey="payment-transaction-list"
        loading={loading}
        rowData={transactions}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

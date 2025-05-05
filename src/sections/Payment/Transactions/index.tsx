import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { makeDecimal } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { PaymentType } from 'src/__generated__/graphql';
import { CHAIN_TYPE, CHAIN_UNIT, EXPLORER_PATH } from 'src/consts';

import { AgGrid } from 'src/components/AgGrid';

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
        field: 'hash',
        headerName: 'Hash',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) => (
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer' }}
            onClick={() => window.open(`${EXPLORER_PATH}${data?.hash}`)}
          >
            {data?.hash}
          </Typography>
        ),
      },
      {
        field: 'from',
        headerName: 'From',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'to',
        headerName: 'To',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'balance',
        headerName: 'Balance',
        width: 150,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) =>
          makeDecimal(
            (data?.balance ?? 0) / 10 ** CHAIN_UNIT[data?.type!],
            CHAIN_UNIT[data?.type!]
          ),
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 100,
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
        width: 200,
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

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { makeDecimal } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';
import { truncateMiddle } from 'src/utils/formatNumber';
import { parseFilterModel } from 'src/utils/parseFilter';

import { PaymentToken } from 'src/__generated__/graphql';
import {
  CHAIN_TYPE,
  CHAIN_UNIT,
  TOKEN_TYPE,
  ETH_ADDRESS_PATH,
  ETH_TRANSACTION_PATH,
} from 'src/consts';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';

import { ActionRender } from './ActionRenderer';
import { useFetchTransactions } from '../useApollo';
import { parseType as chainParse } from '../Address/parseType';

import type { Transaction } from './type';

type BasicTransaction = Omit<Transaction, 'order'>;

type Checked = {
  checked: boolean;
  id: string;
  field: string;
  value: string;
};

export default function Transactions() {
  const [checked, setChecked] = useState<Checked>({ checked: false, id: '', field: '', value: '' });

  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, transactions, fetchTransactions } = useFetchTransactions();

  const handleCopy = async (id: string, field: string, data: string) => {
    try {
      await navigator.clipboard.writeText(data);

      setChecked({ id, field, value: data, checked: true });

      setTimeout(() => {
        setChecked({ checked: false, id: '', field: '', value: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to copy test: ', error);
    }
  };

  useEffect(() => {
    fetchTransactions({ variables: { filter: graphQueryFilter, page, sort } });
  }, [graphQueryFilter, page, sort, fetchTransactions]);

  const colDefs = useMemo<ColDef<BasicTransaction>[]>(
    () => [
      {
        field: 'hash',
        headerName: 'Hash',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) => (
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(`${ETH_TRANSACTION_PATH}${data?.hash}`)}
            >
              {truncateMiddle(data?.hash ?? '', 20, false)}
            </Typography>

            <Iconify
              icon={
                checked.id === data?.hash && checked.field === 'hash'
                  ? 'system-uicons:check'
                  : 'stash:copy-light'
              }
              sx={{ cursor: 'pointer' }}
              onClick={() => handleCopy(data?.hash ?? '', 'hash', data?.hash ?? '')}
            />
          </Stack>
        ),
      },
      {
        field: 'from',
        headerName: 'From',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) => (
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(`${ETH_ADDRESS_PATH}${data?.from}`)}
            >
              {truncateMiddle(data?.from ?? '', 20)}
            </Typography>

            <Iconify
              icon={
                checked.id === data?.hash && checked.field === 'from'
                  ? 'system-uicons:check'
                  : 'stash:copy-light'
              }
              onClick={() => handleCopy(data?.hash ?? '', 'from', data?.from ?? '')}
            />
          </Stack>
        ),
      },
      {
        field: 'to',
        headerName: 'To',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) => (
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(`${ETH_ADDRESS_PATH}${data?.to}`)}
            >
              {truncateMiddle(data?.to ?? '', 20)}
            </Typography>

            <Iconify
              icon={
                checked.id === data?.hash && checked.field === 'to'
                  ? 'system-uicons:check'
                  : 'stash:copy-light'
              }
              onClick={() => handleCopy(data?.hash ?? '', 'to', data?.from ?? '')}
            />
          </Stack>
        ),
      },
      {
        field: 'balance',
        headerName: 'Balance',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) =>
          makeDecimal(
            (data?.balance ?? 0) / 10 ** CHAIN_UNIT[data?.tokenType!],
            CHAIN_UNIT[data?.tokenType!]
          ),
      },
      {
        field: 'chain',
        headerName: 'Chain',
        width: 150,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(PaymentToken),
          valueFormatter: (params: any) => chainParse(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<BasicTransaction>,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) =>
          data ? CHAIN_TYPE[data?.chain!] : '',
      },
      {
        field: 'tokenType',
        headerName: 'Token',
        width: 150,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(PaymentToken),
          valueFormatter: (params: any) => chainParse(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<BasicTransaction>,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) =>
          data ? TOKEN_TYPE[data?.tokenType!] : '',
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        initialSort: 'desc',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) =>
          formatDate(data?.createdAt),
      },
      {
        colId: 'action',
        width: 50,
        resizable: false,
        editable: false,
        sortable: false,
        cellClass: 'ag-action-cell',
        cellRenderer: ActionRender,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checked]
  );

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <AgGrid<BasicTransaction>
        gridKey="payment-transaction-list"
        loading={loading}
        rowData={transactions}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

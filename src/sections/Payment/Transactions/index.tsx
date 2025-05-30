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

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';
import { truncateMiddle } from 'src/utils/formatNumber';
import { parseFilterModel } from 'src/utils/parseFilter';

import { PaymentChain, PaymentToken } from 'src/__generated__/graphql';
import { CHAIN_TYPE, TOKEN_TYPE, ETH_TRANSACTION_PATH } from 'src/consts';

import { Label } from 'src/components/Label';
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
        flex: 1,
        minWidth: 300,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) => (
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              fontFamily="monospace"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(`${ETH_TRANSACTION_PATH}${data?.hash}`)}
            >
              {truncateMiddle(data?.hash ?? '', 30, false)}
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
        field: 'chain',
        headerName: 'Chain',
        width: 200,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(PaymentChain),
          valueFormatter: (params: any) => chainParse(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<BasicTransaction>,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicTransaction>) =>
          data ? CHAIN_TYPE[data?.chain!] : '',
      },
      {
        field: 'tokenType',
        headerName: 'Token',
        width: 250,
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
        headerName: 'Type',
        width: 250,
        resizable: true,
        editable: false,
        sortable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Transaction>) =>
          data?.order ? (
            <Stack direction="row" spacing={1} mt={0.5}>
              <Label color="primary">Order</Label>
              <Label color="default">{formatID(data.order.ID, 'O')}</Label>
            </Stack>
          ) : (
            <Label color="secondary">Collect</Label>
          ),
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 250,
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
        gridKey="payment-transactions-list"
        loading={loading}
        rowData={transactions}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
  INumberFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';
import { fNumber, fCurrency } from 'src/utils/formatNumber';

import { CHAIN_UNIT, ORDER_STATUS, REQUEST_TYPE } from 'src/consts';
import { OrderStatus, OrderRequestType } from 'src/__generated__/graphql';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';

import { useFetchOrders } from '../useApollo';
import { ActionRender } from './ActionRenderer';
import { orderType, parseType } from './parseType';

import type { BasicOrder } from './type';

type Order = Omit<BasicOrder, 'expiredAt'>;

export default function Orders() {
  const router = useRouter();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, orders, fetchOrders } = useFetchOrders();

  useEffect(() => {
    fetchOrders({ variables: { filter: graphQueryFilter, page, sort } });
  }, [graphQueryFilter, page, sort, fetchOrders]);

  const colDefs = useMemo<ColDef<Order>[]>(
    () => [
      {
        field: 'ID',
        headerName: 'Order ID',
        width: 150,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as INumberFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) => formatID(data?.ID ?? '', 'O'),
      },
      {
        field: 'fullName',
        headerName: 'Full Name',
        flex: 1,
        minWidth: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) => (
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', '&:hover': { color: '#00a873' } }}
            onClick={() => router.push(paths.dashboard.members.edit(data?.memberId ?? ''))}
          >
            {data?.fullName}
          </Typography>
        ),
        cellClass: 'ag-cell-center',
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 180,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(OrderStatus),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Order>,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) => (
          <Stack direction="row" justifyContent="space-between">
            {data ? ORDER_STATUS[data.status] : ''}
            {data?.paymentChain && (
              <Label variant="soft" mt={0.5}>
                {data.paymentChain}
              </Label>
            )}
          </Stack>
        ),
      },
      {
        field: 'usdBalance',
        headerName: 'USD Balance',
        width: 150,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'tabular-nums ag-right-aligned-cell',
        filterParams: { buttons: ['reset'] } as INumberFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          fCurrency(data?.usdBalance, { minimumFractionDigits: 2 }),
      },
      {
        field: 'requiredBalance',
        headerName: 'Required Balance',
        width: 150,
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'tabular-nums ag-right-aligned-cell',
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          data?.paymentToken &&
          fNumber((data?.requiredBalance ?? 0) / 10 ** CHAIN_UNIT[data?.paymentToken!], {
            minimumFractionDigits: 2,
          }),
      },
      {
        field: 'paidBalance',
        headerName: 'Paid Balance',
        width: 150,
        resizable: true,
        editable: false,
        sortable: false,
        cellClass: 'tabular-nums ag-right-aligned-cell',
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          data?.paymentToken &&
          fNumber((data?.paidBalance ?? 0) / 10 ** CHAIN_UNIT[data?.paymentToken!], {
            minimumFractionDigits: 2,
          }),
      },
      {
        field: 'requestType',
        headerName: 'Request Type',
        width: 200,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(OrderRequestType),
          valueFormatter: (params: any) => orderType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Order>,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          data ? REQUEST_TYPE[data.requestType] : '',
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
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) => formatDate(data?.createdAt),
      },
      {
        colId: 'action',
        width: 50,
        resizable: false,
        editable: false,
        sortable: false,
        pinned: 'right',
        cellClass: 'ag-action-cell',
        cellRenderer: ActionRender,
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
      <AgGrid<Order>
        gridKey="payment-order-list"
        loading={loading}
        rowData={orders}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

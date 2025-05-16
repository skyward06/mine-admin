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

import { paths } from 'src/routes/paths';
import { useRouter, useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';
import { formatID, makeDecimal } from 'src/utils/helper';

import { CHAIN_UNIT, ORDER_STATUS } from 'src/consts';
import { OrderStatus } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import { parseType } from './parseType';
import { useFetchOrders } from '../useApollo';
import { ActionRender } from './ActionRenderer';

import type { Order } from './type';

type BasicOrder = Omit<Order, 'expiredAt'>;

export default function Orders() {
  const router = useRouter();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, orders, fetchOrders } = useFetchOrders();

  useEffect(() => {
    fetchOrders({ variables: { filter: graphQueryFilter, page, sort } });
  }, [graphQueryFilter, page, sort, fetchOrders]);

  const colDefs = useMemo<ColDef<BasicOrder>[]>(
    () => [
      {
        field: 'ID',
        headerName: 'Order ID',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicOrder>) =>
          formatID(data?.ID ?? '', 'O'),
      },
      {
        field: 'member.fullName',
        headerName: 'Full Name',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicOrder>) => (
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', '&:hover': { color: '#00a873' } }}
            onClick={() => router.push(paths.dashboard.members.edit(data?.member?.id ?? ''))}
          >
            {data?.member?.fullName}
          </Typography>
        ),
        cellClass: 'ag-cell-center',
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 200,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(OrderStatus),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<BasicOrder>,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicOrder>) =>
          data ? ORDER_STATUS[data.status] : '',
      },
      {
        field: 'usdBalance',
        headerName: 'Requested Balance',
        width: 250,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicOrder>) =>
          makeDecimal(
            (data?.usdBalance ?? 0) / 10 ** CHAIN_UNIT[data?.paymentToken!],
            CHAIN_UNIT[data?.paymentToken!]
          ),
      },
      {
        field: 'paidBalance',
        headerName: 'Received Balance',
        width: 250,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicOrder>) =>
          makeDecimal(
            (data?.usdBalance ?? 0) / 10 ** CHAIN_UNIT[data?.paymentToken!],
            CHAIN_UNIT[data?.paymentToken!]
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
        cellRenderer: ({ data }: CustomCellRendererProps<BasicOrder>) =>
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
      <AgGrid<BasicOrder>
        gridKey="payment-order-list"
        loading={loading}
        rowData={orders}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

// const BooleanFormatter = (params: any) => (params.value === 'true' ? 'Sign Up' : 'Add Hash');

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
import { formatID, makeDecimal, customizeFullName } from 'src/utils/helper';

import { CHAIN_UNIT, ORDER_STATUS } from 'src/consts';
import { OrderStatus } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import { parseType } from './parseType';
import { useFetchOrders } from '../useApollo';
import { ActionRender } from './ActionRenderer';
import { StatusRenderer } from './StatusRenderer';

import type { Order } from './type';

export default function Orders() {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, orders, fetchOrders } = useFetchOrders();

  useEffect(() => {
    fetchOrders({ variables: { filter: graphQueryFilter, page, sort } });
  }, [graphQueryFilter, page, sort, fetchOrders]);

  const colDefs = useMemo<ColDef<Order>[]>(
    () => [
      {
        field: 'id',
        headerName: 'Order ID',
        width: 150,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) => formatID(data?.id ?? '', 'O'),
      },
      {
        field: 'member.fullName',
        headerName: 'Full Name',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          customizeFullName(data?.member?.fullName ?? ''),
      },
      {
        field: 'package.productName',
        headerName: 'Produce Name',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(OrderStatus),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Order>,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          data ? ORDER_STATUS[data.status] : '',
      },
      {
        field: 'waitAddress.totalBalance',
        headerName: 'Requested Balance',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          makeDecimal(
            (data?.waitAddress?.totalBalance ?? 0) / 10 ** CHAIN_UNIT[data?.waitAddress?.type!],
            CHAIN_UNIT[data?.waitAddress?.type!]
          ),
      },
      {
        field: 'waitAddress.receivedBalance',
        headerName: 'Received Balance',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Order>) =>
          makeDecimal(
            (data?.waitAddress?.receivedBalance ?? 0) / 10 ** CHAIN_UNIT[data?.waitAddress?.type!],
            CHAIN_UNIT[data?.waitAddress?.type!]
          ),
      },
      {
        field: 'signUpOrder',
        headerName: 'Status',
        width: 120,
        filter: 'agMultiColumnFilter',
        filterParams: {
          values: ['true', 'false'],
          valueFormatter: BooleanFormatter,
        } as ISetFilterParams<Order>,
        cellRenderer: StatusRenderer,
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

const BooleanFormatter = (params: any) => (params.value === 'true' ? 'Sign Up' : 'Add Hash');

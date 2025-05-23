import type { Invoice } from 'src/sections/Invoice/List/type';
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

import { type Member, InvoiceStatusEnum } from 'src/__generated__/graphql';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';

import { parseType } from 'src/sections/Invoice/parseType';
import { useFetchInvoices } from 'src/sections/Invoice/useApollo';
import { FileRenderer } from 'src/sections/Invoice/List/FileRenderer';
import { ActionRender } from 'src/sections/Invoice/List/ActoinRenderer';

interface Props {
  currentMember: Member;
}

export default function InvoiceListView({ currentMember }: Props) {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const { loading, invoices, rowCount, fetchInvoices } = useFetchInvoices();

  const graphQueryFilter = useMemo(
    () => parseFilterModel({ refId: { endsWith: `-${currentMember.id}` } }, filter),
    [filter, currentMember]
  );

  useEffect(() => {
    fetchInvoices({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page, sort]);

  const colDefs = useMemo<ColDef<Invoice>[]>(
    () => [
      {
        field: 'id',
        headerName: 'Invoice No',
        width: 100,
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell',
        cellRenderer: ({ data }: CustomCellRendererProps<Invoice>) =>
          data?.id.toString().padStart(6, '0'),
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 250,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 500,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'amountInCents',
        headerName: 'Amount',
        width: 150,
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell',
        cellRenderer: ({ data }: CustomCellRendererProps<Invoice>) =>
          (data?.amountInCents ?? 0) / 100,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(InvoiceStatusEnum),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Invoice>,
        cellRenderer: ({ data }: CustomCellRendererProps<Invoice>) =>
          data?.status === InvoiceStatusEnum.Paid ? (
            <Label variant="soft" color="success">
              Paid
            </Label>
          ) : (
            <Label variant="soft" color="warning">
              Pending
            </Label>
          ),
      },
      {
        colId: 'attached',
        headerName: 'Attached',
        width: 150,
        filter: false,
        resizable: true,
        editable: false,
        sortable: false,
        cellRenderer: FileRenderer,
      },
      {
        field: 'dueDate',
        headerName: 'Due Date',
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
        cellRenderer: ({ data }: CustomCellRendererProps<Invoice>) => formatDate(data?.dueDate),
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
        cellRenderer: ({ data }: CustomCellRendererProps<Invoice>) => formatDate(data?.createdAt),
      },
      {
        colId: 'action',
        width: 50,
        pinned: 'right',
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
      <AgGrid<Invoice>
        gridKey="invoice-list"
        loading={loading}
        rowData={invoices}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

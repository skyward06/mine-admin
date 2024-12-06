import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, IDateFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { formatDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { useFetchPayments } from '../useApollo';
import { ActionRender } from './ActionRenderer';

import type { PaymentMethod } from './type';

export default function PaymentListView() {
  const { loading, payments, rowCount } = useFetchPayments();

  const colDefs = useMemo<ColDef<PaymentMethod>[]>(
    () => [
      {
        field: 'name',
        headerName: 'Payment Method',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'visible',
        headerName: 'Visible',
        width: 300,
        // filter: 'agBooleanColumnFilter',
        filter: false,
        resizable: true,
        editable: false,
        // filterParams: {
        //   values: [true, false],
        //   defaultToNothingSelected: true,
        //   valueFormatter: (params: any) => parseType(params.value),
        // },
        cellRenderer: ({ data }: CustomCellRendererProps<PaymentMethod>) =>
          data?.visible && (
            <Label variant="soft" color="success">
              Visible
            </Label>
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
        cellRenderer: ({ data }: CustomCellRendererProps<PaymentMethod>) =>
          formatDate(data?.createdAt),
      },
      {
        colId: 'action',
        headerName: 'Action',
        width: 150,
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
    <DashboardContent>
      <Breadcrumbs
        heading="Payment Methods"
        links={[{ name: 'Payment Methods', href: paths.dashboard.payment.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.payment.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Payment
          </Button>
        }
      />
      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <AgGrid<PaymentMethod>
          gridKey="payment-list"
          loading={loading}
          rowData={payments}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>
    </DashboardContent>
  );
}

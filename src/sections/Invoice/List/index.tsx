import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { DashboardContent } from 'src/layouts/dashboard';
import { InvoiceStatusEnum } from 'src/__generated__/graphql';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { parseType } from '../parseType';
import { FileRenderer } from './FileRenderer';
import { ActionRender } from './ActoinRenderer';
import SearchPeriod from '../../Placement/List/searchPeriod';
import { useFetchInvoices, useGenerateWeekInvoice } from '../useApollo';

import type { Invoice } from './type';

export default function InvoiceListView() {
  const openWeek = useBoolean();
  const [weekStartDate, setWeekStartDate] = useState<string>('');

  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const { loading, invoices, rowCount, fetchInvoices } = useFetchInvoices();
  const { loading: generateLoading, generateWeekInvoice } = useGenerateWeekInvoice();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const onPeriodChange = async (value: any) => {
    setWeekStartDate(formatDate(`${dayjs(value).startOf('week')}`, 'YYYY-MM-DD'));
  };

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
    <DashboardContent>
      <Breadcrumbs
        heading="Invoice"
        links={[{ name: 'Invoice', href: paths.dashboard.invoice.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => openWeek.onTrue()}
            sx={{ mb: 1 }}
          >
            <Iconify icon="streamline:ai-generate-variation-spark" sx={{ mr: 0.5 }} /> ReGenerate
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
        <AgGrid<Invoice>
          gridKey="invoice-list"
          loading={loading}
          rowData={invoices}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>

      <ConfirmDialog
        open={openWeek.value}
        onClose={openWeek.onFalse}
        title="Select Week"
        content={<SearchPeriod onChange={onPeriodChange} />}
        action={
          <LoadingButton
            loading={generateLoading}
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                const { data } = await generateWeekInvoice({
                  variables: {
                    data: {
                      weekStartDate,
                    },
                  },
                });

                if (data) {
                  toast.success('Successfully re-generated!');
                  openWeek.onFalse();
                }
              } catch (error) {
                toast.error(error.message);
              }
            }}
          >
            Regenerate
          </LoadingButton>
        }
      />
    </DashboardContent>
  );
}

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';
import { formatID, customizeFullName } from 'src/utils/helper';

import { PEER } from 'src/consts';
import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import ExportButton from 'src/components/ExportButton';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { CustomName } from 'src/components/AgGrid/Renderers';
import { LoadingScreen } from 'src/components/loading-screen';
import { StatusRenderer } from 'src/components/AgGrid/Renderers/Status';
import { BooleanFormatter } from 'src/components/AgGrid/Renderers/BooleanFormatter';

import { ActionRender } from './ActionRenderer';
import { useRemoveSale, useFetchSales } from '../useApollo';

import type { Sale } from './type';

export default function SaleListView() {
  const { loading, rowCount, sales } = useFetchSales();
  const { loading: removeLoading, removeSale } = useRemoveSale();

  const confirm = useBoolean();

  const colDefs = useMemo<ColDef<Sale>[]>(
    () => [
      {
        field: 'ID',
        headerName: 'ID',
        width: 140,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        initialSort: 'desc',
        cellRenderer: ({ data }: CustomCellRendererProps<Sale>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center' }}>
            {formatID(data?.ID ?? '', 'S')}
            {data?.freeShareSale && (
              <Label variant="soft" color="success">
                Free
              </Label>
            )}
          </Stack>
        ),
        cellClass: 'ag-number-cell ag-cell-center',
      },
      {
        field: 'member.username',
        headerName: 'Name',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Sale>) => (
          <CustomName
            id={data?.memberId ?? ''}
            username={data?.member?.username ?? ''}
            email={data?.member?.email ?? ''}
          />
        ),
      },
      {
        field: 'member.assetId',
        headerName: 'Asset ID',
        width: 110,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
      },
      {
        field: 'package.productName',
        headerName: 'ProductName',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
      },
      {
        field: 'paymentMethod',
        headerName: 'Payment Method',
        width: 180,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<Sale>) =>
          data?.paymentMethod === PEER ? (
            <Stack direction="row" justifyContent="space-between">
              <Stack>{PEER}</Stack>
              <Stack>{customizeFullName(data.toMember?.fullName ?? '')}</Stack>
            </Stack>
          ) : (
            data?.paymentMethod
          ),
      },
      {
        field: 'package.amount',
        headerName: 'Amount',
        width: 100,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
      },
      {
        field: 'package.token',
        headerName: 'Hash Power',
        width: 130,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-cell-center',
      },
      {
        field: 'package.point',
        headerName: 'Point',
        width: 90,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        filter: 'agMultiColumnFilter',
        filterParams: {
          values: ['true', 'false'],
          valueFormatter: BooleanFormatter,
        } as ISetFilterParams<Sale>,
        cellRenderer: StatusRenderer,
      },
      {
        field: 'orderedAt',
        headerName: 'Ordered At',
        width: 130,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Sale>) => formatDate(data?.orderedAt),
        cellClass: 'ag-cell-center',
      },
      {
        colId: 'action',
        pinned: 'right',
        width: 60,
        resizable: false,
        editable: false,
        sortable: false,
        cellClass: 'ag-cell-center',
        cellRenderer: ActionRender,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const token = localStorage.getItem(CONFIG.storageTokenKey) ?? '';

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Sale"
        links={[{ name: 'Sale', href: paths.dashboard.sales.root }, { name: 'List' }]}
        action={
          <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5}>
            <Button
              component={RouterLink}
              href={paths.dashboard.sales.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Sale
            </Button>
            <ExportButton target="sales" token={token} variant="contained" />
          </Stack>
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <AgGrid<Sale>
          gridKey="sale-list"
          loading={loading}
          rowData={sales}
          columnDefs={colDefs}
          totalRowCount={rowCount}
          rowHeight={50}
        />
      </Card>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          removeLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <Typography>This sale will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          )
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              const promise = await removeSale({ variables: { data: { id: 'selected' } } });
              const result = promise.data?.removeSale.result;

              if (result === 'success') {
                toast.success('Sale removed successfully');
              } else {
                toast.error('You are not allowed to remove this sale');
              }

              confirm.onFalse();
            }}
          >
            Confirm
          </Button>
        }
      />
    </DashboardContent>
  );
}

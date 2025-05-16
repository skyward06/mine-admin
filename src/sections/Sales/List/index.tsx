import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  CellClickedEvent,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useAgQuery as useQueryString } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { parseFilterModel } from 'src/utils/parseFilter';
import { formatDate, isSaturday } from 'src/utils/format-time';
import { formatID, customizeFullName } from 'src/utils/helper';

import { CONFIG } from 'src/config';
import { PERMISSIONS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import ExportButton from 'src/components/ExportButton';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';
import { StatusRenderer } from 'src/components/AgGrid/Renderers/Status';
import { BooleanFormatter } from 'src/components/AgGrid/Renderers/BooleanFormatter';

import { useAuthContext } from 'src/auth/hooks';

import { ActionRender } from './ActionRenderer';
import { useRemoveSale, useFetchSales } from '../useApollo';

import type { BasicSale } from './type';

type Checked = {
  checked: boolean;
  value: string;
};

export default function SaleListView() {
  const { user } = useAuthContext();
  const router = useRouter();

  const { loading, rowCount, sales } = useFetchSales();
  const { loading: removeLoading, removeSale } = useRemoveSale();

  const [{ sort = 'ID', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const confirm = useBoolean();
  const [checked, setChecked] = useState<Checked>({ checked: false, value: '' });

  const handleCopy = async ({ data }: CellClickedEvent<BasicSale, any>) => {
    try {
      await navigator.clipboard.writeText(formatID(data?.ID ?? '', 'S'));
      setChecked({ value: formatID(data?.ID ?? '', 'S'), checked: true });

      setTimeout(() => {
        setChecked({ checked: false, value: '' });
      }, 3000);
    } catch (err) {
      console.error('Failed to copy test: ', err);
    }
  };

  const colDefs = useMemo<ColDef<BasicSale>[]>(
    () => [
      {
        field: 'ID',
        headerName: 'ID',
        width: 120,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        initialSort: 'desc',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicSale>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {formatID(data?.ID ?? '', 'S')}

            {checked.value === formatID(data?.ID ?? '', 'S') ? (
              <Iconify icon="line-md:check-all" color="green" />
            ) : (
              data!.sponsorCnt > 0 && (
                <Label variant="soft" color="success">
                  Free
                </Label>
              )
            )}
          </Stack>
        ),
        cellClass: 'ag-number-cell ag-cell-center',
        onCellClicked: handleCopy,
      },
      {
        field: 'fullName',
        headerName: 'Name',
        width: 180,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 160,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicSale>) => (
          <Typography
            variant="body2"
            onClick={() => router.push(paths.dashboard.members.edit(data?.memberId!))}
            sx={{
              mt: 0.7,
              cursor: 'pointer',
              '&:hover': { color: (theme) => theme.vars.palette.primary.main },
            }}
          >
            {data?.username}
          </Typography>
        ),
      },
      {
        field: 'productName',
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
        width: 160,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
      },
      {
        field: 'toFullName',
        headerName: 'P2P Member',
        width: 130,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<BasicSale>) =>
          customizeFullName(data?.toFullName ?? ''),
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 100,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
      },
      {
        field: 'point',
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
        } as ISetFilterParams<BasicSale>,
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
        cellRenderer: ({ data }: CustomCellRendererProps<BasicSale>) => formatDate(data?.orderedAt),
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
    [checked]
  );

  const token = localStorage.getItem(CONFIG.storageTokenKey) ?? '';

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Sale"
        links={[{ name: 'Sale', href: paths.dashboard.sales.root }, { name: 'List' }]}
        action={
          <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5}>
            {(user?.role?.sale === PERMISSIONS.EDITOR_PERMISSION.value ||
              user?.role?.sale === PERMISSIONS.PAST_EDIT_PERMISSION.value ||
              user?.role?.sale === 7) && (
              <Button
                component={RouterLink}
                href={paths.dashboard.sales.new}
                variant="contained"
                color="primary"
                disabled={
                  !(
                    user?.role?.sale === PERMISSIONS.EDITOR_PERMISSION.value ||
                    user?.role?.sale === PERMISSIONS.PAST_EDIT_PERMISSION.value ||
                    user?.role?.sale === 7
                  ) && isSaturday()
                }
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                New Sale
              </Button>
            )}
            <ExportButton
              target="export-sales"
              token={token}
              variant="contained"
              params={{ filter: graphQueryFilter, sort }}
            />
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
        <AgGrid<BasicSale>
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

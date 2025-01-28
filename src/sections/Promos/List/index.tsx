import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { DashboardContent } from 'src/layouts/dashboard';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { StatusRenderer } from 'src/components/AgGrid/Renderers/Status';
import { BooleanFormatter } from 'src/components/AgGrid/Renderers/BooleanFormatter';

import { useFetchPromos } from '../useApollo';
import { ActionRender } from './ActionRenderer';

import type { Promo } from './type';

export default function ProofListView() {
  const { loading, promos, rowCount, fetchPromos } = useFetchPromos();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  useEffect(() => {
    fetchPromos({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const colDefs = useMemo<ColDef<Promo>[]>(
    () => [
      {
        field: 'code',
        headerName: 'Code',
        width: 200,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        width: 200,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Promo>) => formatDate(data?.startDate),
      },
      {
        field: 'endDate',
        headerName: 'End Date',
        width: 200,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Promo>) => formatDate(data?.endDate),
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        filter: 'agMultiColumnFilter',
        filterParams: {
          values: ['true', 'false'],
          valueFormatter: BooleanFormatter,
        } as ISetFilterParams<Promo>,
        cellRenderer: StatusRenderer,
      },
      {
        colId: 'action',
        width: 60,
        pinned: 'right',
        resizable: false,
        editable: false,
        sortable: false,
        cellRenderer: ActionRender,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Promo"
        links={[{ name: 'Promo', href: paths.dashboard.promos.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.promos.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Promo
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
        <AgGrid<Promo>
          gridKey="promo-list"
          loading={loading}
          rowData={promos}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>
    </DashboardContent>
  );
}

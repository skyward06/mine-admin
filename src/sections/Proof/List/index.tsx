import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { formatDate } from 'src/utils/format-time';

import { PROOF_TYPE } from 'src/consts';
import { ProofType } from 'src/__generated__/graphql';
import { DashboardContent } from 'src/layouts/dashboard';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { parseType } from './parseType';
import { FileRenderer } from './FileRenderer';
import { useFetchProofs } from '../useApollo';
import { ActionRender } from './ActionRenderer';

import type { Proof } from './type';

export default function ProofListView() {
  const { loading, proofs, rowCount } = useFetchProofs();

  const colDefs = useMemo<ColDef<Proof>[]>(
    () => [
      {
        field: 'amount',
        headerName: 'Amount',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell',
      },
      {
        field: 'type',
        headerName: 'Proof Type',
        width: 200,
        filter: 'agMultiColumnFilter',
        filterParams: {
          values: Object.values(ProofType).filter((value) => value !== ProofType.Prepay),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Proof>,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Proof>) =>
          data ? PROOF_TYPE[data.type] : '',
      },
      {
        field: 'note',
        headerName: 'Note',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
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
        cellRenderer: ({ data }: CustomCellRendererProps<Proof>) => formatDate(data?.createdAt),
      },
      {
        field: 'orderedAt',
        headerName: 'Ordered At',
        width: 150,
        filter: 'agDateColumnFilter',
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Proof>) => formatDate(data?.orderedAt),
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
        heading="Proof"
        links={[{ name: 'Proof', href: paths.dashboard.proof.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.proof.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Proof
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
        <AgGrid<Proof>
          gridKey="proof-list"
          loading={loading}
          rowData={proofs}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>
    </DashboardContent>
  );
}

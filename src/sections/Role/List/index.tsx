import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { AgGrid } from 'src/components/AgGrid';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { useFetchRoles } from '../useApollo';
import { ActionRender } from './ActionRenderer';

import type { Role } from './type';

export default function RoleList() {
  const { loading, rowCount, roles } = useFetchRoles();

  type RoleTable = Omit<Role, 'frontActions'>;

  const router = useRouter();

  const colDefs = useMemo<ColDef<RoleTable>[]>(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'sale',
        headerName: 'Sale',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'proof',
        headerName: 'Proof',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'member',
        headerName: 'Member',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'balance',
        headerName: 'Balance',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'additions',
        headerName: 'Additions',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'commission',
        headerName: 'Commission',
        flex: 1,
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
        colId: 'action',
        width: 60,
        pinned: 'right',
        resizable: false,
        editable: false,
        sortable: false,
        cellRenderer: ActionRender,
      },
    ],
    []
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Role"
        links={[{ name: 'Role' }, { name: 'List' }]}
        sx={{
          mb: { xs: 2, md: 3 },
        }}
        action={
          <Button variant="contained" onClick={() => router.push(paths.dashboard.roles.new)}>
            Create Role
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
        <AgGrid<RoleTable>
          gridKey="role-list"
          loading={loading}
          rowData={roles}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>
    </DashboardContent>
  );
}

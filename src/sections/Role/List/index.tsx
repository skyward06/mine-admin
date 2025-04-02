import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { PERMISSIONS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import { useFetchRoles } from '../useApollo';
import { ActionRender } from './ActionRenderer';

import type { Role } from './type';

export default function RoleList() {
  const { loading, rowCount, roles } = useFetchRoles();
  const { user } = useAuthContext();

  const router = useRouter();

  const colDefs = useMemo<ColDef<Role>[]>(
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
        field: 'role',
        headerName: 'Role',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Role>) => (
          <>
            {data?.role === 7 ? (
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Label variant="soft" color="success">
                  Editor
                </Label>
                <Label variant="soft" color="success">
                  Assign Role
                </Label>
              </Stack>
            ) : (
              <Label variant="soft" color="success">
                {data?.role === 0 && 'None'}
                {data?.role === 1 && 'View Only'}
                {data?.role === 3 && 'Editor'}
                {data?.role === 4 && 'Assign Role'}
              </Label>
            )}
          </>
        ),
      },
      {
        field: 'sale',
        headerName: 'Sale',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Role>) => (
          <>
            {data?.sale === 7 ? (
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Label variant="soft" color="success">
                  Editor
                </Label>
                <Label variant="soft" color="success">
                  Past Editor
                </Label>
              </Stack>
            ) : (
              <Label variant="soft" color="success">
                {data?.sale === 0 && 'None'}
                {data?.sale === 1 && 'View Only'}
                {data?.sale === 3 && 'Editor'}
                {data?.sale === 5 && 'Pass Editor'}
              </Label>
            )}
          </>
        ),
      },
      {
        field: 'commission',
        headerName: 'Commission',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Role>) => (
          <>
            {data?.commission === 7 ? (
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Label variant="soft" color="success">
                  Editor
                </Label>
                <Label variant="soft" color="success">
                  Commission Calculation
                </Label>
              </Stack>
            ) : (
              <Label variant="soft" color="success">
                {data?.commission === 0 && 'None'}
                {data?.commission === 1 && 'View Only'}
                {data?.commission === 3 && 'Editor'}
                {data?.commission === 4 && 'Commission Calculation'}
              </Label>
            )}
          </>
        ),
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
          user?.role?.role === PERMISSIONS.EDITOR_PERMISSION.value || user?.role?.sale === 7 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(paths.dashboard.roles.new)}
            >
              Create Role
            </Button>
          ) : null
        }
      />
      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <AgGrid<Role>
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

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  IDateFilterParams,
  ITextFilterParams,
  INumberFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { paths } from 'src/routes/paths';
import { useRouter, useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';
import { Label, type LabelColor } from 'src/components/Label';

import { ActionRender } from './ActionRender';
import { useFetchShareAccounts } from '../useApollo';

import type { ShareAccount } from './type';

const LABEL_COLOR = ['primary', 'secondary', 'info', 'success', 'warning', 'default', 'error'];

export default function SharedList() {
  const router = useRouter();

  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, shareAccounts, fetchShareAccounts } = useFetchShareAccounts();

  useEffect(() => {
    fetchShareAccounts({ variables: { filter: graphQueryFilter, page, sort } });
  }, [graphQueryFilter, page, sort, fetchShareAccounts]);

  const colDefs = useMemo<ColDef<ShareAccount>[]>(
    () => [
      {
        headerName: '',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<ShareAccount>) => (
          <Stack direction="row" spacing={1} mt={0.5}>
            {data?.members?.map((item, index) => (
              <Label
                variant="soft"
                color={LABEL_COLOR[index % 7] as LabelColor}
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(paths.dashboard.members.edit(item.id))}
              >
                {item.username}
              </Label>
            ))}
          </Stack>
        ),
      },
      {
        field: 'cashPotential',
        headerName: 'Cash Potential',
        width: 250,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        sortable: false,
        filterParams: { buttons: ['reset'] } as INumberFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<ShareAccount>) => (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {data?.cashPotential}
            {data?.isTexitRanger && <Iconify icon="noto:star" />}
          </Stack>
        ),
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
        cellRenderer: ({ data }: CustomCellRendererProps<ShareAccount>) =>
          formatDate(data?.createdAt),
      },
      {
        colId: 'action',
        width: 50,
        resizable: false,
        editable: false,
        sortable: false,
        pinned: 'right',
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
      <AgGrid<ShareAccount>
        gridKey="shared-list"
        loading={loading}
        rowData={shareAccounts}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

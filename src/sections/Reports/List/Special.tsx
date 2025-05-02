import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { customizeFullName } from 'src/utils/helper';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';

import { useFetchWinners } from '../useApollo';

import type { WdmsvegasContestWinner } from './type';

const sortOrder = {
  level: 'level,sponsored,points',
  sponsored: 'sponsored,level,points',
  points: 'level,points,sponsored',
};

export default function Special() {
  const [{ page = '1,50', sort = 'level', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, winners, fetchWinners } = useFetchWinners();

  useEffect(() => {
    fetchWinners({
      variables: {
        filter: graphQueryFilter,
        page,
        sort: sortOrder[sort as keyof typeof sortOrder],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<WdmsvegasContestWinner>[]>(
    () => [
      {
        field: 'username',
        headerName: 'Username',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
      },
      {
        field: 'fullName',
        headerName: 'FullName',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<WdmsvegasContestWinner>) =>
          customizeFullName(data?.fullName!),
      },
      {
        field: 'sponsored',
        headerName: 'Sponsored',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
      },
      {
        field: 'points',
        headerName: 'Points',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
      },
      {
        field: 'level',
        headerName: 'Level',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellClass: 'ag-number-cell ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<WdmsvegasContestWinner>) => (
          <Stack direction="row" spacing={1}>
            {new Array(data?.level).fill(<Iconify icon="streamline-emojis:game-dice" />)}
          </Stack>
        ),
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
      <AgGrid<WdmsvegasContestWinner>
        gridKey="report-revenue-list"
        loading={loading}
        rowData={winners}
        columnDefs={colDefs}
        totalRowCount={rowCount}
        rowHeight={50}
      />
    </Card>
  );
}

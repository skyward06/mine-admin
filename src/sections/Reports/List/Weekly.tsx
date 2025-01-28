import type { ColDef } from '@ag-grid-community/core';
import type { CustomCellRendererProps } from '@ag-grid-community/react';

import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { RouterLink } from 'src/routes/components';
import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatWeekNumber } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';
import { FileThumbnail } from 'src/components/FileThumbnail';

import { useFetchWeeklyReports } from '../useApollo';

import type { WeeklyReport } from '../type';

export default function WeeklyReports() {
  const [{ page = '1,50', sort = 'weekStartDate', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, weeklyReports: reports, fetchWeeklyReports } = useFetchWeeklyReports();

  useEffect(() => {
    fetchWeeklyReports({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'weekStartDate',
        headerName: 'Week',
        width: 800,
        filter: 'agDateColumnFilter',
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyReport>) =>
          `week #${formatWeekNumber(data?.weekStartDate)} (${dayjs(data?.weekStartDate).utc().format('MM/DD')} - ${dayjs(data?.weekStartDate).utc().add(6, 'day').format('MM/DD')})`,
      },
      {
        field: 'fileId',
        headerName: 'File',
        flex: 1,
        cellRenderer: ({ data }: CustomCellRendererProps<WeeklyReport>) => (
          <Link component={RouterLink} href={data?.file.url ?? ''} target="_blank">
            <Stack direction="row" columnGap={2}>
              <FileThumbnail file="png" sx={{ width: 24 }} />
              {data?.file.originalName}
            </Stack>
          </Link>
        ),
      },
    ],
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
      <AgGrid<WeeklyReport>
        gridKey="weekly-report-list"
        loading={loading}
        rowData={reports}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

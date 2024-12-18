import type { ColDef } from '@ag-grid-community/core';
import type { CustomCellRendererProps } from '@ag-grid-community/react';

import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatWeekNumber } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { DashboardContent } from 'src/layouts/dashboard';

import { AgGrid } from 'src/components/AgGrid';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { FileThumbnail } from 'src/components/FileThumbnail';

import { useFetchWeeklyReports, useGenerateWeeklyReports } from '../useApollo';

import type { WeeklyReport } from '../type';

export default function WeeklyReports() {
  const [all, setAll] = useState<boolean>(false);

  const [{ page = '1,50', sort = 'weekStartDate', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading: generateLoading, generateWeeklyReport } = useGenerateWeeklyReports();
  const { loading, rowCount, weeklyReports: reports, fetchWeeklyReports } = useFetchWeeklyReports();

  const handleGenerate = async () => {
    try {
      setAll(false);
      const { data } = await generateWeeklyReport({ variables: { data: { all: false } } });

      if (data) {
        toast.success('Successfully generated!');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  };

  const handleReGenerate = async () => {
    try {
      setAll(true);
      const { data } = await generateWeeklyReport({ variables: { data: { all: true } } });

      if (data) {
        toast.success('Successfully generated!');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  };

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
    <DashboardContent>
      <Breadcrumbs
        heading="Weekly Report"
        links={[
          { name: 'Weekly Report', href: paths.dashboard.weeklyReports.root },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Box
            display="grid"
            columnGap={2}
            sx={{ pr: 2, gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '45% 55%' } }}
          >
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="fluent-mdl2:generate" />}
              loading={!all && generateLoading}
              color="primary"
              onClick={handleGenerate}
              sx={{ mb: 1 }}
            >
              Generate
            </LoadingButton>
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="streamline:ai-generate-variation-spark" />}
              loading={all && generateLoading}
              color="primary"
              onClick={handleReGenerate}
              sx={{ mb: 1 }}
            >
              ReGenerate
            </LoadingButton>
          </Box>
        }
      />

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
    </DashboardContent>
  );
}

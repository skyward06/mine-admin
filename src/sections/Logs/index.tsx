import { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';

import { customizeDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { ScrollBar } from 'src/components/ScrollBar';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { TableNoData, TableSkeleton, TablePaginationCustom } from 'src/components/Table';

import LogFilter from './LogFilter';
import LogTableRow from './LogTableRow';
import { useFetchLogs } from './useApollo';

import type { LogFilterType } from './type';

export default function LogView() {
  const theme = useTheme();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery<LogFilterType>();

  const { filter, page = { page: 1, pageSize: 50 } } = query;

  const { loading, logs, rowCount, fetchLogs } = useFetchLogs();

  const notFound = !logs.length;

  useEffect(() => {
    fetchLogs({
      variables: {
        who: filter?.who,
        role: filter?.role,
        status: filter?.status,
        action: filter?.action,
        beforeWhen: filter?.to && customizeDate(filter.to),
        afterWhen: filter?.from && customizeDate(filter.from),
        start: page?.page,
        size: page?.pageSize,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setQuery({ ...query, page: { page: 1, pageSize: 50 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Log"
        links={[{ name: 'Log', href: paths.dashboard.logs.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <LogFilter query={query} setQuery={setQuery} />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <ScrollBar>
          <Table
            size="small"
            sx={{ minWidth: 960, borderCollapse: 'separate', borderSpacing: '0 4px' }}
          >
            {loading ? (
              <>
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
              </>
            ) : (
              <TableBody>
                {logs.map((row) => (
                  <LogTableRow key={row.id} row={row} />
                ))}

                <TableNoData
                  notFound={notFound}
                  sx={{
                    m: -2,
                    mt: -1,
                    borderRadius: 1,
                    border: `dashed 1px ${theme.vars.palette.divider}`,
                  }}
                />
              </TableBody>
            )}
          </Table>
        </ScrollBar>

        <TablePaginationCustom
          count={loading ? 0 : rowCount}
          page={loading ? 0 : page!.page - 1}
          rowsPerPage={page?.pageSize}
          onPageChange={(_, curPage) => setPage(curPage + 1)}
          onRowsPerPageChange={(event) => setPageSize(parseInt(event.target.value, 10))}
        />
      </TableContainer>
    </DashboardContent>
  );
}

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import { tableCellClasses } from '@mui/material/TableCell';

import { paths } from 'src/routes/paths';

import { formatID } from 'src/utils/helper';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { ScrollBar } from 'src/components/ScrollBar';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { TableNoData, TableSkeleton, TableHeadCustom } from 'src/components/Table';

import LogTableRow from './LogTableRow';
import { useFetchSaleById } from '../useApollo';

const TABLE_HEAD = [
  { id: 'who', label: 'Actor', sortable: false },
  { id: 'role', label: 'Role', sortable: false },
  { id: 'action', label: 'Action', sortable: false },
  { id: 'when', label: 'Time', sortable: false },
  { id: 'status', label: 'Status', sortable: false },
];

export default function LogView() {
  const theme = useTheme();
  const params = useParams();

  const { id } = params;

  const { loading, sale, fetchSaleById } = useFetchSaleById();

  const notFound = !sale?.logs?.length;

  useEffect(() => {
    fetchSaleById({ variables: { data: { id: id ?? '' }, logsize: 10 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: Sale`}</title>
      </Helmet>

      <DashboardContent>
        <Breadcrumbs
          heading="Sale Log"
          links={[
            { name: 'Sale', href: paths.dashboard.sales.root },
            { name: formatID(sale?.ID ?? '', 'S') },
          ]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <ScrollBar>
            <Table
              size="small"
              sx={{ minWidth: 960, borderCollapse: 'separate', borderSpacing: '0 4px' }}
            >
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                rowCount={loading ? 0 : sale?.logs!.length}
                sx={{
                  [`& .${tableCellClasses.head}`]: {
                    '&:first-of-type': { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                    '&:last-of-type': { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
                  },
                }}
              />
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
                  {sale?.logs!.map((row) => <LogTableRow key={row!.id} row={row!} />)}

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
        </TableContainer>
      </DashboardContent>
    </>
  );
}

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { paths } from 'src/routes/paths';
import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { BUG_REPORT_STATUS } from 'src/consts';
import { DashboardContent } from 'src/layouts/dashboard';
import { BugReportStatus } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { Label, type LabelColor } from 'src/components/Label';

import { parseType } from './parseType';
import { FileRenderer } from './FileRenderer';
import { ActionRender } from './ActionRenderer';
import { useFetchBugReports } from '../useApollo';

import type { BugReport } from './type';

export default function BugList() {
  const { loading, bugReports, rowCount, fetchBugReports } = useFetchBugReports();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  useEffect(() => {
    fetchBugReports({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, page]);

  const colDefs = useMemo<ColDef<BugReport>[]>(
    () => [
      {
        field: 'subject',
        headerName: 'Subject',
        width: 300,
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
        field: 'status',
        headerName: 'Status',
        width: 150,
        filter: 'agMultiColumnFilter',
        filterParams: {
          values: Object.values(BugReportStatus),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<BugReport>,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<BugReport>) => (
          <Label variant="soft" color={BUG_REPORT_STATUS[data?.status!].color as LabelColor}>
            {data ? BUG_REPORT_STATUS[data.status].value : ''}
          </Label>
        ),
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
        cellRenderer: ({ data }: CustomCellRendererProps<BugReport>) => formatDate(data?.createdAt),
      },
      {
        colId: 'action',
        pinned: 'right',
        width: 60,
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
        heading="Bug Report"
        links={[{ name: 'Bug Report', href: paths.dashboard.bugReport.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <AgGrid<BugReport>
          gridKey="bug-list"
          loading={loading}
          rowData={bugReports}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>
    </DashboardContent>
  );
}

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { CAMPAIGN_LIST_TYPE } from 'src/consts';
import { CampaignListType } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import { ActionRender } from './ActionRender';
import { StatusRenderer } from './StatusRenderer';
import { useFetchSchedule } from '../../useApollo';
import { parseType } from '../../Campaign/List/parseType';

import type { Schedule } from './type';

export default function ScheduleView() {
  const { loading, rowCount, schedule, fetchSchedule } = useFetchSchedule();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const colDefs = useMemo<ColDef<Schedule>[]>(
    () => [
      {
        field: 'subject',
        headerName: 'Subject',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'sender',
        headerName: 'Sender',
        width: 250,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'listType',
        headerName: 'List Type',
        width: 200,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(CampaignListType),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Schedule>,
        cellRenderer: ({ data }: CustomCellRendererProps<Schedule>) =>
          data ? CAMPAIGN_LIST_TYPE[data.listType] : '',
      },
      {
        field: 'lastRun',
        headerName: 'Last Run',
        width: 200,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Schedule>) =>
          data?.lastRun && formatDate(data.lastRun),
      },
      {
        field: 'nextRun',
        headerName: 'Next Run',
        width: 200,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<Schedule>) => formatDate(data?.nextRun),
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        filter: 'agMultiColumnFilter',
        filterParams: {
          values: ['true', 'false'],
          valueFormatter: BooleanFormatter,
        } as ISetFilterParams<Schedule>,
        cellRenderer: StatusRenderer,
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
        cellRenderer: ({ data }: CustomCellRendererProps<Schedule>) => formatDate(data?.createdAt),
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

  useEffect(() => {
    fetchSchedule({ variables: { sort, page, filter: graphQueryFilter } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <AgGrid<Schedule>
        gridKey="communication-schedule-list"
        loading={loading}
        rowData={schedule}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

const BooleanFormatter = (params: any) => (params.value === 'true' ? 'Enabled' : 'Diabled');

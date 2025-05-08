import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, IDateFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';

import { ActionRender } from './ActionRender';
import { useFetchAutoCampaigns } from '../../useApollo';

import type { AutoCampaign } from './type';

export default function AutoCampaignListView() {
  const { loading, rowCount, autoCampaigns, fetchAutoCampaigns } = useFetchAutoCampaigns();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const colDefs = useMemo<ColDef<AutoCampaign>[]>(
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
        width: 300,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 300,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<AutoCampaign>) =>
          formatDate(data?.createdAt),
      },
      {
        field: 'approvedCommission',
        headerName: '',
        width: 50,
        sortable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<AutoCampaign>) =>
          data?.approvedCommission && <Iconify icon="ic:twotone-check-box" color="green" />,
        cellClass: 'ag-cell-center',
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
    fetchAutoCampaigns({ variables: { sort, page, filter: graphQueryFilter } });
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
      <AgGrid<AutoCampaign>
        gridKey="communication-auto-campaign-list"
        loading={loading}
        rowData={autoCampaigns}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

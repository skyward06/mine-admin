import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ISetFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import { CAMPAIGN_LIST_TYPE } from 'src/consts';
import { CampaignListType } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import { parseType } from './parseType';
import { ActionRender } from './ActionRenderer';
import { useFetchCampaigns } from '../../useApollo';

import type { Campaign } from './type';

export function CampaignListView() {
  const { loading, campaigns, rowCount, fetchCampaigns } = useFetchCampaigns();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  useEffect(() => {
    fetchCampaigns({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<Campaign>[]>(
    () => [
      {
        field: 'subject',
        headerName: 'Subject',
        width: 800,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'listType',
        headerName: 'List Type',
        width: 300,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(CampaignListType),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Campaign>,
        cellRenderer: ({ data }: CustomCellRendererProps<Campaign>) =>
          data ? CAMPAIGN_LIST_TYPE[data.listType] : '',
      },
      {
        field: 'listExtra',
        headerName: 'List Extra',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Campaign>) =>
          data?.listExtra ? (data.listExtra as any)?.name : '',
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
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <AgGrid<Campaign>
        gridKey="campaign-list"
        loading={loading}
        rowData={campaigns}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

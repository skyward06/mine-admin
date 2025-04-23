import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatID } from 'src/utils/helper';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';

import { ActionRender } from './ActionRenderer';
import { useFetchTemplates } from '../../useApollo';

import type { EmailTemplate } from './type';

export function TemplateListView() {
  const { loading, rowCount, templates, fetchTemplates } = useFetchTemplates();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  useEffect(() => {
    fetchTemplates({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<EmailTemplate>[]>(
    () => [
      {
        field: 'templateID',
        headerName: 'ID',
        width: 120,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        initialSort: 'desc',
        cellRenderer: ({ data }: CustomCellRendererProps<EmailTemplate>) =>
          formatID(data?.templateID ?? '', 'EM', 4),
        cellClass: 'ag-number-cell',
      },
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
        field: 'description',
        headerName: 'Description',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
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
      <AgGrid<EmailTemplate>
        gridKey="template-list"
        loading={loading}
        rowData={templates}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

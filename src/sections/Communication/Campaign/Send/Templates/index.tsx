import type { ColDef, RowSelectedEvent, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';

import { useFetchTemplates } from '../../../useApollo';

import type { EmailTemplate } from '../../../Template/List/type';

interface Props {
  setTemplateId: Function;
  pagination?: boolean;
  [key: string]: unknown;
}

export function Templates({ setTemplateId, pagination = true, ...other }: Props) {
  const { loading, rowCount, templates, fetchTemplates } = useFetchTemplates();
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const handleRowSelected = (event: RowSelectedEvent<EmailTemplate, any>) => {
    if (event.node.isSelected()) {
      setTemplateId(event.data?.id);
    }
  };

  useEffect(() => {
    fetchTemplates({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<EmailTemplate>[]>(
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
        field: 'description',
        headerName: 'Description',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
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
      {...other}
    >
      <AgGrid<EmailTemplate>
        gridKey="campaign-template-list"
        rowSelection={{ mode: 'singleRow' }}
        onRowSelected={handleRowSelected}
        loading={loading}
        rowData={templates}
        columnDefs={colDefs}
        totalRowCount={rowCount}
        pagination={pagination}
      />
    </Card>
  );
}

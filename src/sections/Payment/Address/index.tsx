import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ISetFilterParams, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo, useEffect } from 'react';

import Card from '@mui/material/Card';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import { CHAIN_TYPE, CHAIN_UNIT } from 'src/consts';
import { ChainType } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';

import { parseType } from './parseType';
import { ActionRender } from './ActionRenderer';
import { useFetchAddresses } from '../useApollo';

import type { Address } from './type';

export default function Addresses() {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, addresses, fetchAddresses } = useFetchAddresses();

  useEffect(() => {
    fetchAddresses({ variables: { filter: graphQueryFilter, page, sort } });
  }, [graphQueryFilter, page, sort, fetchAddresses]);

  const colDefs = useMemo<ColDef<Address>[]>(
    () => [
      {
        field: 'address',
        headerName: 'Address',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 300,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(ChainType),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Address>,
        cellRenderer: ({ data }: CustomCellRendererProps<Address>) =>
          data ? CHAIN_TYPE[data.type] : '',
      },
      {
        field: 'balance',
        headerName: 'Balance',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Address>) =>
          (data?.balance ?? 0) / CHAIN_UNIT[data?.type!],
      },
      {
        colId: 'action',
        width: 50,
        resizable: false,
        editable: false,
        sortable: false,
        cellClass: 'ag-action-cell',
        cellRenderer: ActionRender,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <AgGrid<Address>
        gridKey="payment-address-list"
        loading={loading}
        rowData={addresses}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

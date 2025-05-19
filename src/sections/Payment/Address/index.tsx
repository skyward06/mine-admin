import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  CellClickedEvent,
  ISetFilterParams,
  ITextFilterParams,
  INumberFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { makeDecimal } from 'src/utils/helper';
import { fCurrency } from 'src/utils/formatNumber';
import { parseFilterModel } from 'src/utils/parseFilter';

import { CHAIN_TYPE, CHAIN_UNIT } from 'src/consts';
import { PaymentToken } from 'src/__generated__/graphql';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';

import { parseType } from './parseType';
import { ActionRender } from './ActionRenderer';
import { useFetchAddresses } from '../useApollo';
import { StatusRenderer } from './StatusRenderer';

import type { Address } from './type';

type Checked = {
  checked: boolean;
  value: string;
};

export default function Addresses() {
  const [checked, setChecked] = useState<Checked>({ checked: false, value: '' });

  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, addresses, fetchAddresses } = useFetchAddresses();

  const handleCopy = async ({ data }: CellClickedEvent<Address, any>) => {
    try {
      await navigator.clipboard.writeText(data?.address ?? '');
      setChecked({ value: data?.address!, checked: true });

      setTimeout(() => {
        setChecked({ checked: false, value: '' });
      }, 3000);
    } catch (err) {
      console.error('Failed to copy test: ', err);
    }
  };

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
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<Address>) => (
          <Stack direction="row" justifyContent="space-between" sx={{ cursor: 'pointer' }}>
            <Typography variant="body2">{data?.address}</Typography>

            {checked.value === data?.address && <Iconify icon="ci:check" color="#00cca4" />}
          </Stack>
        ),
        onCellClicked: handleCopy,
      },
      {
        field: 'chain',
        headerName: 'Chain',
        width: 300,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(PaymentToken),
          valueFormatter: (params: any) => parseType(params.value),
          defaultToNothingSelected: true,
        } as ISetFilterParams<Address>,
        cellRenderer: ({ data }: CustomCellRendererProps<Address>) =>
          data ? CHAIN_TYPE[data.chain] : '',
      },
      {
        field: 'balance',
        headerName: 'Chain Balance',
        flex: 1,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as INumberFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<Address>) =>
          fCurrency(
            makeDecimal(
              (data?.balance ?? 0) / 10 ** CHAIN_UNIT[data?.chain!],
              CHAIN_UNIT[data?.chain!]
            )
          ),
      },
      {
        field: 'isUsed',
        headerName: 'Status',
        width: 120,
        filter: 'agMultiColumnFilter',
        filterParams: {
          values: ['true', 'false'],
          valueFormatter: BooleanFormatter,
        } as ISetFilterParams<Address>,
        cellRenderer: StatusRenderer,
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
    [checked]
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

const BooleanFormatter = (params: any) => (params.value === 'true' ? 'Used' : 'None');

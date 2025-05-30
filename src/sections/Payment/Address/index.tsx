import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
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
import { truncateMiddle } from 'src/utils/formatNumber';
import { parseFilterModel } from 'src/utils/parseFilter';

import { PaymentChain } from 'src/__generated__/graphql';
import { CHAIN_TYPE, CHAIN_UNIT, ETH_ADDRESS_PATH } from 'src/consts';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';

import { parseType } from './parseType';
import { ActionRender } from './ActionRenderer';
import { useFetchAddresses } from '../useApollo';
import { StatusRenderer } from './StatusRenderer';

import type { Address } from './type';

type Checked = {
  id: string;
  value: string;
  checked: boolean;
};

export default function Addresses() {
  const [checked, setChecked] = useState<Checked>({ checked: false, id: '', value: '' });

  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, addresses, fetchAddresses } = useFetchAddresses();

  const handleCopy = async (id: string, data: string) => {
    try {
      await navigator.clipboard.writeText(data);

      setChecked({ id, value: data, checked: true });

      setTimeout(() => {
        setChecked({ checked: false, id: '', value: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to copy test: ', error);
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
        minWidth: 300,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellClass: 'ag-cell-center',
        cellRenderer: ({ data }: CustomCellRendererProps<Address>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            <Typography
              variant="body2"
              fontFamily="monospace"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(`${ETH_ADDRESS_PATH}${data?.address}`)}
            >
              {truncateMiddle(data?.address ?? '', 30)}
            </Typography>

            <Iconify
              icon={checked.id === data?.address ? 'system-uicons:check' : 'stash:copy-light'}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleCopy(data?.address ?? '', data?.address ?? '')}
            />
          </Stack>
        ),
      },
      {
        field: 'chain',
        headerName: 'Chain',
        width: 300,
        filter: 'agMultiColumnFilter',
        resizable: true,
        editable: false,
        filterParams: {
          values: Object.values(PaymentChain),
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
          makeDecimal(
            (data?.balance ?? 0) / 10 ** CHAIN_UNIT[data?.chain!],
            CHAIN_UNIT[data?.chain!]
          ),
      },
      {
        field: 'isUsed',
        headerName: 'Status',
        width: 200,
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

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  ISetFilterParams,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatWeekNumber } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { DashboardContent } from 'src/layouts/dashboard';
import { PaymentChain } from 'src/__generated__/graphql';
import { CHAIN_TYPE, ETH_ADDRESS_PATH } from 'src/consts';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { parseType } from 'src/sections/Payment/Address/parseType';

import { useFetchCollectAddress } from '../useApollo';

import type { CollectAddress } from './type';

type Checked = {
  id: string;
  value: string;
  checked: boolean;
};

export default function CollectAddressListView() {
  const [checked, setChecked] = useState<Checked>({ checked: false, id: '', value: '' });

  const [{ page = '1,50', sort = 'weekStartDate', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, addresses, rowCount, fetchCollectAddress } = useFetchCollectAddress();

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
    fetchCollectAddress({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<CollectAddress>[]>(
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
        cellRenderer: ({ data }: CustomCellRendererProps<CollectAddress>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            <Typography
              variant="body2"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(`${ETH_ADDRESS_PATH}${data?.address}`)}
            >
              {data?.address}
            </Typography>

            <Iconify
              icon={checked.id === data?.id ? 'system-uicons:check' : 'stash:copy-light'}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleCopy(data?.id ?? '', data?.address ?? '')}
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
        } as ISetFilterParams<CollectAddress>,
        cellRenderer: ({ data }: CustomCellRendererProps<CollectAddress>) =>
          data ? CHAIN_TYPE[data?.chain!] : '',
      },
      {
        field: 'weekStartDate',
        headerName: 'Week',
        width: 400,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        initialSort: 'desc',
        cellRenderer: ({ data }: CustomCellRendererProps<CollectAddress>) =>
          `${dayjs(data?.weekStartDate).startOf('week').format('MM/DD/YYYY')} - ${dayjs(data?.weekStartDate).endOf('week').format('MM/DD/YYYY')} (Week - ${formatWeekNumber(data?.weekStartDate)})`,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checked]
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Collect Address"
        links={[
          { name: 'Collect Address', href: paths.dashboard.setAddress.root },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.setAddress.new}
            variant="contained"
            color="primary"
          >
            Set
          </Button>
        }
      />

      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <AgGrid<CollectAddress>
          gridKey="collect-address-list"
          loading={loading}
          rowData={addresses}
          columnDefs={colDefs}
          totalRowCount={rowCount}
        />
      </Card>
    </DashboardContent>
  );
}

import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  CellClickedEvent,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { AgGrid } from 'src/components/AgGrid';
import { Iconify } from 'src/components/Iconify';

import { useFetchPeerAcceptable } from '../useApollo';

import type { PeerAcceptableReportMember } from './type';

type Checked = {
  checked: boolean;
  id: string;
  field: string;
  value: string;
};

export default function PeerList() {
  const router = useRouter();

  const [checked, setChecked] = useState<Checked>({ checked: false, id: '', field: '', value: '' });

  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();
  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, rowCount, members, fetchPeerAcceptable } = useFetchPeerAcceptable();

  const handleCopy = async (id: string, field: string, data: string) => {
    try {
      await navigator.clipboard.writeText(data);
      setChecked({ id, field, value: data, checked: true });

      setTimeout(() => {
        setChecked({ checked: false, id: '', field: '', value: '' });
      }, 3000);
    } catch (err) {
      console.error('Failed to copy test: ', err);
    }
  };

  useEffect(() => {
    fetchPeerAcceptable({ variables: { page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<PeerAcceptableReportMember>[]>(
    () => [
      {
        field: 'ID',
        headerName: 'ID',
        width: 200,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<PeerAcceptableReportMember>) =>
          formatID(data?.ID ?? '', 'M'),
      },
      {
        field: 'username',
        headerName: 'Username',
        flex: 1,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<PeerAcceptableReportMember>) => (
          <Typography
            variant="body2"
            onClick={() => router.push(paths.dashboard.members.edit(data?.id!))}
            sx={{
              mt: 0.7,
              cursor: 'pointer',
              '&:hover': { color: (theme) => theme.vars.palette.primary.main },
            }}
          >
            {data?.username}
          </Typography>
        ),
      },
      {
        field: 'fullName',
        headerName: 'Full Name',
        width: 300,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<PeerAcceptableReportMember>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {data?.fullName}

            {checked.id === data?.id && checked.field === 'fullName' && (
              <Iconify icon="line-md:check-all" color="green" />
            )}
          </Stack>
        ),
        onCellClicked: ({ data }: CellClickedEvent<PeerAcceptableReportMember, any>) =>
          handleCopy(data?.id ?? '', 'fullName', data?.fullName ?? ''),
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        width: 200,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<PeerAcceptableReportMember>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {data?.mobile}

            {checked.id === data?.id && checked.field === 'mobile' && (
              <Iconify icon="line-md:check-all" color="green" />
            )}
          </Stack>
        ),
        onCellClicked: ({ data }: CellClickedEvent<PeerAcceptableReportMember, any>) =>
          handleCopy(data?.id ?? '', 'mobile', data?.mobile ?? ''),
      },
      {
        field: 'assetId',
        headerName: 'Asset ID',
        width: 200,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'peerETHAddress',
        headerName: 'Peer Address',
        width: 200,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
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
        cellRenderer: ({ data }: CustomCellRendererProps<PeerAcceptableReportMember>) =>
          formatDate(data?.createdAt),
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
      <AgGrid<PeerAcceptableReportMember>
        gridKey="report-member-list"
        loading={loading}
        rowData={members}
        columnDefs={colDefs}
        totalRowCount={rowCount}
      />
    </Card>
  );
}

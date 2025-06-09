import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type {
  ColDef,
  CellClickedEvent,
  IDateFilterParams,
  ITextFilterParams,
} from '@ag-grid-community/core';

import { useMemo, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams, useAgQuery as useQueryString } from 'src/routes/hooks';

import { formatID } from 'src/utils/helper';
import { formatDate } from 'src/utils/format-time';
import { parseFilterModel } from 'src/utils/parseFilter';

import { Label } from 'src/components/Label';
import { AgGrid } from 'src/components/AgGrid';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';

import { ActionRender } from './ActionRender';
import { useUpdateMember, useFetchMembers } from '../useApollo';

import type { BasicMember } from './type';

interface Props {
  customFilter: any;
}

type Checked = {
  checked: boolean;
  id: string;
  field: string;
  value: string;
};

export default function MemberListTable({ customFilter }: Props) {
  const router = useRouter();

  const [checked, setChecked] = useState<Checked>({ checked: false, id: '', field: '', value: '' });

  const sponsorId = useSearchParams().get('sponsorId');

  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();
  const graphQueryFilter = useMemo(
    () => parseFilterModel({ ...customFilter, ...(sponsorId && { sponsorId }) }, filter),
    [filter, customFilter, sponsorId]
  );

  const { loading, rowCount, members, fetchMembers } = useFetchMembers();

  const { updateMember } = useUpdateMember();

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

  const handlePRChange = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    try {
      await updateMember({
        variables: {
          data: {
            id,
            placementRequested: event.target.checked,
          },
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMembers({ variables: { filter: graphQueryFilter, page, sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphQueryFilter, page, sort]);

  const colDefs = useMemo<ColDef<any>[]>(
    () => [
      {
        field: 'ID',
        headerName: 'ID',
        width: 120,
        filter: 'agNumberColumnFilter',
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) =>
          formatID(data?.ID ?? '', 'M'),
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 200,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) => (
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
        width: 200,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {data?.fullName}

            {checked.id === data?.id && checked.field === 'fullName' && (
              <Iconify icon="line-md:check-all" color="green" />
            )}
          </Stack>
        ),
        onCellClicked: ({ data }: CellClickedEvent<BasicMember, any>) =>
          handleCopy(data?.id ?? '', 'fullName', data?.fullName ?? ''),
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        width: 160,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        cellClass: 'tabular-nums',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) => (
          <Stack direction="row" columnGap={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {data?.mobile}

            {checked.id === data?.id && checked.field === 'mobile' && (
              <Iconify icon="line-md:check-all" color="green" />
            )}
          </Stack>
        ),
        onCellClicked: ({ data }: CellClickedEvent<BasicMember, any>) =>
          handleCopy(data?.id ?? '', 'mobile', data?.mobile ?? ''),
      },
      {
        field: 'assetId',
        headerName: 'Asset ID',
        width: 130,
        resizable: true,
        editable: false,
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      ...(customFilter.allowState === 'PENDING'
        ? [
            {
              field: 'signUpPaymentType',
              headerName: 'Payment Type',
              width: 170,
              resizable: true,
              editable: false,
              filter: 'agTextColumnFilter',
              cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) => (
                <Stack direction="row" spacing={1} mt={0.5} alignItems="center">
                  <Typography variant="body2">{data?.signUpPaymentType}</Typography>
                  {data?.paymentMade && <Iconify icon="ic:twotone-check-box" color="green" />}
                </Stack>
              ),
            },
          ]
        : [
            {
              field: 'totalIntroducers',
              headerName: 'Sponsor',
              width: 130,
              resizable: true,
              editable: false,
              filter: 'agNumberColumnFilter',
              cellClass: 'tabular-nums',
              cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) => (
                <Typography
                  variant="body2"
                  onClick={() =>
                    window.open(`${paths.dashboard.members.root}?sponsorId=${data?.id}`, '_blank')
                  }
                  sx={{
                    mt: 0.7,
                    cursor: 'pointer',
                    '&:hover': { color: (theme) => theme.vars.palette.primary.main },
                  }}
                >
                  {data?.totalIntroducers}
                </Typography>
              ),
            },
          ]),
      {
        field: 'placementRequested',
        headerName: 'PR',
        width: 90,
        resizable: true,
        editable: false,
        sortable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) => (
          <Switch
            sx={{ mt: -0.5 }}
            defaultChecked={data?.placementRequested === true}
            onChange={(event) => handlePRChange(event, data?.id ?? '')}
          />
        ),
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 200,
        resizable: true,
        editable: false,
        sortable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) => (
          <Stack direction="row" columnGap={1} mt={0.5}>
            {data?.allowState === 'APPROVED' && (
              <Label variant="soft" color="success">
                Approved
              </Label>
            )}
            {data?.allowState === 'PENDING' && (
              <Label variant="soft" color="warning">
                Pending
              </Label>
            )}
            {data?.allowState === 'PAID' && (
              <Label variant="soft" color="secondary">
                Paid
              </Label>
            )}
            {data?.allowState === 'GRAVEYARD' && (
              <Label variant="soft" color="error">
                Graveyard
              </Label>
            )}
            {data?.allowState === 'BLOCKED' && (
              <Label variant="soft" color="error">
                Block
              </Label>
            )}
            {!data?.emailVerified && (
              <Label variant="soft" color="error">
                Unverified
              </Label>
            )}
            {data?.adminFullname && (
              <Label variant="soft" color="primary">
                {data.adminFullname.split(' ').filter(Boolean)[0]}
              </Label>
            )}
          </Stack>
        ),
      },
      {
        field: 'lastAdminNote',
        headerName: 'Admin Notes',
        width: 300,
        resizable: true,
        editable: false,
        sortable: false,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 130,
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['reset'],
          defaultOption: 'greaterThan',
          filterOptions: ['greaterThan', 'lessThan', 'equals', 'notEqual'],
        } as IDateFilterParams,
        resizable: true,
        editable: false,
        cellRenderer: ({ data }: CustomCellRendererProps<BasicMember>) =>
          formatDate(data?.createdAt),
      },
      {
        colId: 'action',
        pinned: 'right',
        width: 50,
        resizable: false,
        editable: false,
        sortable: false,
        cellClass: 'ag-action-cell',
        cellRenderer: ActionRender,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checked, customFilter]
  );

  return (
    <AgGrid<BasicMember>
      gridKey="member-list"
      loading={loading}
      rowData={members}
      columnDefs={colDefs}
      totalRowCount={rowCount}
    />
  );
}

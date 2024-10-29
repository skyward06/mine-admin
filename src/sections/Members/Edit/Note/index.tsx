import type { Member } from 'src/__generated__/graphql';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

import { useQuery } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/Dialog';
import { SearchInput } from 'src/components/SearchInput';
import { LoadingScreen } from 'src/components/loading-screen';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import EditForm from './EditForm';
import NoteTableRow from './NoteTableRow';
import { useFetchNotes, useRemoveNote } from './useApollo';
import NoteTableFiltersResult from './NoteTableFiltersResult';

import type { INotePrismaFilter, INoteTableFilters } from './types';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'createdAt', label: 'Date', width: 200, sortable: true },
  { id: 'admin.username', label: 'Admin', width: 200, sortable: true },
  { id: 'description', label: 'Content', sortable: true },
  { id: 'action', label: 'Action', align: 'center', width: 200, sortable: true },
];

const defaultFilter: INoteTableFilters = {
  search: '',
};

interface Props {
  currentMember: Member;
}

export default function NoteListView({ currentMember }: Props) {
  const table = useTable({ defaultDense: true });
  const [selected, setSelected] = useState<string>('');

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery<INoteTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: INotePrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [{ description: { contains: filter.search, mode: 'insensitive' } }];
    }

    filterObj.memberId = currentMember.id;

    return filterObj;
  }, [filter, currentMember]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const confirm = useBoolean();
  const open = useBoolean();

  const canReset = !!filter.search;

  const { loading: removeLoading, removeNote } = useRemoveNote();
  const { loading, rowCount, notes, fetchNotes } = useFetchNotes();

  useEffect(() => {
    fetchNotes({
      variables: {
        page: page && `${page.page},${page.pageSize}`,
        filter: graphQueryFilter,
        sort: graphQuerySort,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notFound = (canReset && !notes?.length) || !notes?.length;

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <>
      <Card>
        <Stack direction="row">
          <Stack width={1}>
            <SearchInput search={filter.search} onSearchChange={handleSearchChange} />
          </Stack>
          <Stack width={0.07} sx={{ pt: 2.5, pr: 2 }}>
            <Button
              startIcon={<Iconify icon="system-uicons:create" sx={{ cursor: 'pointer' }} />}
              onClick={() => open.onTrue()}
            >
              Add
            </Button>
          </Stack>
        </Stack>

        {canReset && !loading && (
          <NoteTableFiltersResult results={rowCount!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <ScrollBar sx={{ maxHeight: 480 }}>
          <Table stickyHeader size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1260 }}>
            <TableHeadCustom
              order={sort && sort[Object.keys(sort)[0]]}
              orderBy={sort && Object.keys(sort)[0]}
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : notes!.length}
              onSort={(id) => {
                if (id !== 'action') {
                  const isAsc = sort && sort[id] === 'asc';
                  const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                  setQuery({ ...query, sort: newSort });
                }
              }}
            />
            {loading ? (
              <>
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
                <TableSkeleton height={26} />
              </>
            ) : (
              <TableBody>
                {notes!.map((row: any) => (
                  <NoteTableRow
                    key={row!.id}
                    row={row!}
                    confirm={confirm}
                    memberId={currentMember.id}
                    setSelected={setSelected}
                  />
                ))}

                <TableNoData notFound={notFound} />
              </TableBody>
            )}
          </Table>
        </ScrollBar>

        <TablePaginationCustom
          count={loading ? 0 : rowCount!}
          page={loading ? 0 : page!.page - 1}
          rowsPerPage={page?.pageSize}
          onPageChange={(_, curPage) => {
            setPage(curPage + 1);
          }}
          onRowsPerPageChange={(event) => {
            setPageSize(parseInt(event.target.value, 10));
          }}
          //
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          removeLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <Typography>This note will be removed permanently!</Typography>
              <Typography>Are you sure?</Typography>
            </>
          )
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              const promise = await removeNote({ variables: { data: { id: selected } } });
              const result = promise.data?.removeAdminNote.result;

              if (result === 'success') {
                toast.success('Note removed successfully');
              } else {
                toast.error('Something went wrong!');
              }

              confirm.onFalse();
            }}
          >
            Confirm
          </Button>
        }
      />

      <Drawer
        open={open.value}
        onClose={() => open.onFalse()}
        anchor="right"
        PaperProps={{ sx: { width: 550, background: '#fff' } }}
      >
        <EditForm open={open} memberId={currentMember.id} />
      </Drawer>
    </>
  );
}

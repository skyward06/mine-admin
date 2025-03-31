import type { CampaignMember } from 'src/__generated__/graphql';

import { useMemo, useState } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import { alpha } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/useBoolean';

import { formatDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { Label, type LabelColor } from 'src/components/Label';
import {
  useTable,
  TableNoData,
  getComparator,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import Detail from 'src/sections/Members/Edit/Communication/Detail';

/* ------------------------------------------------------------------------- */

interface Props {
  subject: string;
  emails: CampaignMember[];
}

type ApplyFilterProps = {
  inputData: any[];
  comparator: (a: any, b: any) => number;
};

const TABS: { value: string; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'sent', label: 'Sent', color: 'secondary' },
  { value: 'open', label: 'Open', color: 'success' },
  { value: 'failed', label: 'Failed', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'email', label: 'Email', sortable: true },
  { id: 'openTime', label: 'Opened Time', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'sentTime', label: 'Sent Time', sortable: true },
];

export default function EmailView({ subject, emails }: Props) {
  const tabs = useTabs('all');
  const table = useTable({ defaultDense: true, defaultRowsPerPage: 20 });
  const open = useBoolean();
  const [body, setBody] = useState<string>('');

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData:
          tabs.value === 'sent'
            ? emails.filter((item) => item.sent)
            : tabs.value === 'open'
              ? emails.filter((item) => item.open)
              : tabs.value === 'failed'
                ? emails.filter((item) => !item.sent)
                : emails,
        comparator: getComparator(table.order, table.orderBy),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [emails, tabs.value]
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    tabs.setValue(newValue);
  };

  const notFound = !dataFiltered.length;

  return (
    <Card sx={{ my: 2 }}>
      <Tabs
        value={tabs.value}
        onChange={handleTabChange}
        sx={{
          px: 2.5,
          boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            iconPosition="end"
            icon={
              <Label variant={(tab.value === tabs.value && 'filled') || 'soft'} color={tab.color}>
                {tab.value === 'all' && emails.length}
                {tab.value === 'sent' && emails.filter((item) => item.sent).length}
                {tab.value === 'open' && emails.filter((item) => item.open).length}
                {tab.value === 'failed' && emails.filter((item) => !item.sent).length}
              </Label>
            }
          />
        ))}
      </Tabs>

      <ScrollBar>
        <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 720 }}>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            headLabel={TABLE_HEAD}
            onSort={table.onSort}
            numSelected={table.selected.length}
            rowCount={
              dataFiltered.slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              ).length
            }
          />
          <TableBody>
            {dataFiltered
              .slice(
                table.page * table.rowsPerPage,
                table.page * table.rowsPerPage + table.rowsPerPage
              )
              .map((row) => (
                <TableRow
                  hover
                  key={row.email}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    open.onTrue();
                    setBody(emails.find((item) => item.email === row.email)?.body ?? '');
                  }}
                >
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.openTime ? formatDateTime(row.openTime) : 'Not opened yet'}
                  </TableCell>
                  <TableCell>
                    <Iconify
                      icon={row.open ? 'akar-icons:double-check' : 'lucide:check'}
                      color={row.sent ? 'green' : '#999999'}
                    />
                  </TableCell>
                  <TableCell>
                    {tabs.value === 'failed' ? 'Not sent yet' : formatDateTime(row.sentTime)}
                  </TableCell>
                </TableRow>
              ))}
            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </ScrollBar>

      <TablePaginationCustom
        page={table.page}
        dense={table.dense}
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />

      <Detail subject={subject} open={open} body={body} />
    </Card>
  );
}

function applyFilter({ inputData, comparator }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}

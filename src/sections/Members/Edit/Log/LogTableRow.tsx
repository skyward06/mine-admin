import type { MemberLog } from 'src/__generated__/graphql';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/useBoolean';

import { fDateTime } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

interface Props {
  row: MemberLog;
}

export default function LogTableRow({ row }: Props) {
  const { who, role, action, when, status, before, after } = row;

  const theme = useTheme();

  const details = useBoolean();
  const open = useBoolean();

  const defaultStyles = {
    borderTop: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    borderBottom: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    '&:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderLeft: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    },
    '&:last-of-type': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderRight: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
    },
  };

  function compareObjects(obj1: any, obj2: any, path: string = ''): string[] {
    let differences: string[] = [];

    // Check if both are null or undefined
    if (obj1 === obj2) return differences;

    // Check if both are objects and not null
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      differences.push(`${path}*${JSON.stringify(obj1 ?? '')}*${JSON.stringify(obj2 ?? '')}`);
      return differences;
    }

    // Check if they have the same number of keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const allKeys = [...keys1, ...keys2];

    allKeys.forEach((key) => {
      const fullPath = path ? `${path}.${key}` : key;

      differences = differences.concat(compareObjects(obj1[key], obj2[key], fullPath));
    });

    return Array.from(new Set(differences));
  }

  const diff = compareObjects(before, after);

  const result = diff.map((item) => {
    const [key, firstJSON, secondJSON] = item.split('*');

    const [initial, index, title, subtitle] = key.split('.');

    console.log('index => ', index);

    const first = JSON.parse(firstJSON);
    const second = JSON.parse(secondJSON);

    if (initial === 'memberWallets') {
      if (title) {
        return `${title}${subtitle ? ` (${subtitle})` : ''}*${typeof first === 'number' ? first / 100 : first}*${typeof second === 'number' ? second / 100 : second}`;
      }
      return `address**${second.address}`;
    }

    return `${key}*${first}*${second}`;
  });

  return (
    <>
      <TableRow
        onClick={() => open.onTrue()}
        sx={{
          borderRadius: 1,
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: 'background.paper',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': { backgroundColor: 'background.paper', boxShadow: theme.customShadows.z20 },
            cursor: 'pointer',
          },
          [`& .${tableCellClasses.root}`]: { ...defaultStyles },
          ...(details.value && { [`& .${tableCellClasses.root}`]: { ...defaultStyles } }),
        }}
      >
        <TableCell>{who}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>{action}</TableCell>
        <TableCell>{fDateTime(when, 'MM/DD/YYYY hh:mm:ss')}</TableCell>
        <TableCell>
          {status ? (
            <Iconify icon="ep:success-filled" color="#22C55E" />
          ) : (
            <Iconify icon="uis:times-circle" color="#B71D18" />
          )}
        </TableCell>
      </TableRow>

      <Drawer
        open={open.value}
        onClose={() => open.onFalse()}
        anchor="right"
        PaperProps={{ sx: { width: 500, background: '#fff', p: 3 } }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{who}</Typography>
          <Typography>
            {status ? (
              <Iconify icon="ep:success-filled" color="#22C55E" />
            ) : (
              <Iconify icon="uis:times-circle" color="#B71D18" />
            )}
          </Typography>
        </Stack>

        <Typography>{fDateTime(when, 'MM/DD/YYYY hh:mm:ss')}</Typography>
        {result.map((item) => {
          const [key, first, second] = item.split('*');

          const [title] = key.split('.');

          return (
            <Card
              sx={{
                borderRadius: 1,
                mt: 2,
                p: 2,
                [`&.${tableRowClasses.selected}, &:hover`]: {
                  backgroundColor: 'background.paper',
                  boxShadow: theme.customShadows.z20,
                  transition: theme.transitions.create(['background-color', 'box-shadow'], {
                    duration: theme.transitions.duration.shortest,
                  }),
                  '&:hover': {
                    backgroundColor: 'background.paper',
                    boxShadow: theme.customShadows.z20,
                  },
                },
                [`& .${tableCellClasses.root}`]: { ...defaultStyles },
                ...(details.value && { [`& .${tableCellClasses.root}`]: { ...defaultStyles } }),
              }}
            >
              <Stack direction="row">
                <Stack width={0.2}>
                  <Typography fontWeight="bold">Item:</Typography>
                  <Typography fontWeight="bold">Before:</Typography>
                  <Typography fontWeight="bold">After:</Typography>
                </Stack>
                <Stack>
                  <Typography>{title}</Typography>
                  <Typography>
                    {first || (
                      <Label variant="filled" color="info">
                        None
                      </Label>
                    )}
                  </Typography>
                  <Typography>{second}</Typography>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Drawer>
    </>
  );
}

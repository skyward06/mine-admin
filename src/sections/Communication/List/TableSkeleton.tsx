import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableSkeleton() {
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 2 }}>
          <Skeleton sx={{ borderRadius: 1.5, width: 800 }} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}

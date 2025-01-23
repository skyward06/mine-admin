import type { UseBooleanReturn } from 'src/hooks/useBoolean';
import type { WeeklyCommission } from 'src/__generated__/graphql';

import Dialog from '@mui/material/Dialog';

import SplitForm from './SplitForm';

interface Props {
  open: UseBooleanReturn;
  row: WeeklyCommission;
}

export default function SplitCommission({ open, row }: Props) {
  return (
    <Dialog open={open.value} onClose={open.onFalse} title="Commission" fullWidth maxWidth="lg">
      <SplitForm open={open} row={row} />
    </Dialog>
  );
}

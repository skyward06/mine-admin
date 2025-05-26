import type { Member } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useNavigate } from 'react-router';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { ConfirmDialog } from 'src/components/Dialog';

interface Props {
  open: UseBooleanReturn;
  member: Member;
}

export default function ConfirmCreateSale({ open, member }: Props) {
  const navigate = useNavigate();

  return (
    <ConfirmDialog
      open={open.value}
      title="Confirm"
      onClose={open.onFalse}
      content="Will you create a sale or not?"
      action={
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            navigate(paths.dashboard.sales.new, {
              state: { id: member.id, username: member.username, fullName: member.fullName },
            })
          }
        >
          OK
        </Button>
      }
    />
  );
}

import type { Member } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { paths } from 'src/routes/paths';

import { toast } from 'src/components/SnackBar';

interface Props {
  open: UseBooleanReturn;
  member: Member;
}

export default function ConfirmCreateSale({ open, member }: Props) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open.value}
      maxWidth="xs"
      fullWidth
      sx={{ [`& .css-2vtdcu-MuiPaper-root-MuiDialog-paper`]: { borderRadius: 1 } }}
    >
      <DialogTitle>Confirm</DialogTitle>

      <DialogContent sx={{ py: 7 }}>
        <Typography>Will you create a sale or not?</Typography>
      </DialogContent>

      <DialogActions>
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
        <Button
          variant="outlined"
          onClick={() => {
            navigate(paths.dashboard.members.root);
            toast.success('Updated successfully!');
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

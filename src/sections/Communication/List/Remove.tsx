import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { toast } from 'src/components/SnackBar';

import MemberListTable from './MemberListTable';
import { useRemoveMemberList } from '../useApollo';

interface Props {
  open: UseBooleanReturn;
}

export default function RemoveMemberList({ open }: Props) {
  const { removeMemberList } = useRemoveMemberList();

  const handleRemove = async (id: string) => {
    try {
      const { data } = await removeMemberList({ variables: { data: { id } } });

      if (data) {
        toast.success('Successfully removed!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open.value} onClose={open.onFalse}>
      <DialogTitle>Remove Memberlist Group</DialogTitle>
      <DialogContent>
        <MemberListTable handleRemove={handleRemove} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={open.onFalse}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

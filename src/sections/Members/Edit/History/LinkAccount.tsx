import type { Member } from 'src/__generated__/graphql';
import type { UseBooleanReturn } from 'src/hooks/useBoolean';

import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { toast } from 'src/components/SnackBar';
import SearchMiner from 'src/components/SearchMiner';
import { useShareWithMember } from '../../useApollo';

interface Props {
  currentMember: Member;
  open: UseBooleanReturn;
}

export default function LinkAccount({ open, currentMember }: Props) {
  const [memberId, setMemberId] = useState<string>('');

  const { loading, shareWithMember } = useShareWithMember();

  const handleShareMember = async () => {
    try {
      const { data } = await shareWithMember({
        variables: { data: { parentId: memberId, childId: currentMember.id } },
      });

      if (data) {
        toast.success('Successfully shared account!');
        open.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open.value} fullWidth maxWidth="xs" onClose={open.onFalse}>
      <DialogTitle>Link account</DialogTitle>
      <DialogContent>
        <Paper sx={{ py: 2 }}>
          <SearchMiner setMemberId={setMemberId} />
        </Paper>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleShareMember}
        >
          Link
        </LoadingButton>
        <Button variant="outlined" onClick={open.onFalse}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

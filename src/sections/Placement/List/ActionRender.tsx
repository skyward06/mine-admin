import type { UsePopoverReturn } from 'src/components/custom-popover';
import type { TeamStrategy, PlacementMember } from 'src/__generated__/graphql';

import { useState } from 'react';
import { ApolloError } from '@apollo/client';

import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useBoolean } from 'src/hooks/useBoolean';

import { PlacementStatus, PlacementPosition } from 'src/__generated__/graphql';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import SearchMiner from 'src/components/SearchMiner';
import { ConfirmDialog } from 'src/components/Dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { useUpdateMember } from 'src/sections/Members/useApollo';

import { useRemoveMemberFromPlacementTree } from './useApollo';

interface Props {
  popover: UsePopoverReturn;
  expandAll?: (id: string) => Promise<void>;
  collapseAll?: (id: string) => Promise<void>;
  data: PlacementMember;
}

export default function ActionRender({
  popover,
  data: { id, status, placementStatus, placementParentId, placementPosition, cmnCalculatedWeeks },
  expandAll,
  collapseAll,
}: Props) {
  const state = useBoolean();
  const addModal = useBoolean();
  const editModal = useBoolean();
  const removeModal = useBoolean();
  const confirmModal = useBoolean();

  const [teamStrategy, setTeamStrategy] = useState<string>('');
  const [position, setPosition] = useState<PlacementPosition>(PlacementPosition.Left);
  const [memberId, setMemberId] = useState<string>('');
  const [strategy, setStrategy] = useState<'LEFT' | 'RIGHT'>();

  const { loading, updateMember } = useUpdateMember();
  const { loading: removeLoading, removeMember } = useRemoveMemberFromPlacementTree();

  const onRemove = () => {
    popover.onClose();
    removeModal.onTrue();
  };

  const onEdit = async () => {
    setMemberId(placementParentId!);
    popover.onClose();
    editModal.onTrue();
  };

  const onAdd = async () => {
    setMemberId('');
    popover.onClose();
    addModal.onTrue();
  };

  const addContent = (
    <Paper sx={{ py: 1 }}>
      <SearchMiner
        label="Miner(Child)"
        setMemberId={setMemberId}
        setTeamStrategy={setTeamStrategy}
        filter={{ placementParentId: null }}
      />
      <RadioGroup
        row
        defaultValue="LEFT"
        sx={{ px: 1 }}
        onChange={(event) => {
          const value = event.target.value as PlacementPosition;
          if (value === PlacementPosition.Left || value === PlacementPosition.Right) {
            setPosition(value);
          }
        }}
      >
        <FormControlLabel
          value="LEFT"
          label="Left"
          color="#00b8d9"
          control={<Radio size="medium" />}
        />
        <FormControlLabel value="RIGHT" label="Right" control={<Radio size="medium" />} />
      </RadioGroup>
    </Paper>
  );

  const editContent = (
    <Paper sx={{ py: 1 }}>
      <SearchMiner
        label="Miner(Parent)"
        setMemberId={setMemberId}
        setTeamStrategy={setTeamStrategy}
      />
      <RadioGroup
        row
        defaultValue={placementPosition}
        sx={{ px: 1 }}
        onChange={(event) => {
          const value = event.target.value as PlacementPosition;
          if (value === PlacementPosition.Left || value === PlacementPosition.Right) {
            setPosition(value);
          }
        }}
      >
        <FormControlLabel
          value="LEFT"
          label="Left"
          color="#00b8d9"
          control={<Radio size="medium" />}
        />
        <FormControlLabel value="RIGHT" label="Right" control={<Radio size="medium" />} />
      </RadioGroup>
    </Paper>
  );

  const removeContent = (
    <Typography>The subtree data will be removed. Are you sure you want to proceed?</Typography>
  );

  const confirmStrategy = async (curId: string, curPId: string, curPos: string, st: boolean) => {
    try {
      const newData: any = {
        id: curId,
        placementParentId: curPId,
        placementPosition: curPos,
        ...(st && {
          placementStatus: PlacementStatus.Visible,
        }),
      };

      if (st) {
        newData.teamStrategy = strategy as TeamStrategy;
      }

      const { data } = await updateMember({
        variables: {
          data: newData,
        },
      });

      if (data?.updateMember.id && !loading) {
        toast.success('Successfully updated!');

        addModal.onFalse();
        editModal.onFalse();
      }

      confirmModal.onFalse();
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;

        toast.error(error.message);
      }
    }
  };

  const handleVisible = async () => {
    try {
      const { data } = await updateMember({
        variables: { data: { id, placementStatus: PlacementStatus.Visible } },
      });

      if (data) {
        toast.success('Successfully changed!');
        popover.onClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'left-center' } }}
      >
        <MenuList>
          <MenuItem
            disabled={id === placementParentId || !!cmnCalculatedWeeks}
            onClick={onRemove}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem onClick={onEdit} disabled={!!cmnCalculatedWeeks || !status}>
            <Iconify icon="bxs:pencil" />
            Edit
          </MenuItem>

          {placementStatus !== PlacementStatus.Temp && (
            <MenuItem onClick={onAdd}>
              <Iconify icon="mdi:plus-circle-outline" />
              Add
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              if (expandAll) expandAll(id);
              popover.onClose();
            }}
          >
            <Iconify icon="fluent:arrow-expand-all-16-filled" />
            Expand All
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (collapseAll) collapseAll(id);
              popover.onClose();
            }}
          >
            <Iconify icon="fluent:arrow-collapse-all-16-filled" />
            Collapse All
          </MenuItem>

          {placementStatus === PlacementStatus.Temp && (
            <MenuItem onClick={handleVisible}>
              <Iconify icon={loading ? 'eos-icons:bubble-loading' : 'streamline:visible'} />
              Visible
            </MenuItem>
          )}
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={addModal.value}
        title="Add placement"
        onClose={() => addModal.onFalse()}
        content={addContent}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            loading={loading}
            onClick={() => {
              if (position === PlacementPosition.Left) {
                setStrategy(PlacementPosition.Right);
              } else {
                setStrategy(PlacementPosition.Left);
              }

              if (position === (teamStrategy as unknown as PlacementPosition)) {
                confirmModal.onTrue();
              } else {
                confirmStrategy(memberId, id, position, true);
              }
            }}
          >
            OK
          </LoadingButton>
        }
      />

      <ConfirmDialog
        open={editModal.value}
        title="Edit placement"
        onClose={() => editModal.onFalse()}
        content={editContent}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            loading={loading}
            onClick={() => {
              if (position === PlacementPosition.Left) {
                setStrategy(PlacementPosition.Right);
              } else {
                setStrategy(PlacementPosition.Left);
              }

              confirmStrategy(id, memberId, position, false);
            }}
          >
            OK
          </LoadingButton>
        }
      />

      <ConfirmDialog
        open={removeModal.value}
        onClose={() => removeModal.onFalse()}
        title="Remove placement"
        content={removeContent}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            loading={removeLoading}
            onClick={async () => {
              const { data } = await removeMember({ variables: { data: { id } } });

              if (data) {
                toast.success('Removed placement successfully!');
              }
            }}
          >
            OK
          </LoadingButton>
        }
      />

      <Dialog fullWidth maxWidth="xs" open={confirmModal.value} onClose={confirmModal.onFalse}>
        <DialogTitle sx={{ pb: 2 }}>Confirm Team Strategy</DialogTitle>

        <DialogContent>{`Do you want to change your team strategy to "${strategy}"`}</DialogContent>

        <DialogActions>
          <LoadingButton
            variant="contained"
            color="success"
            loading={state.value && loading}
            onClick={() => {
              state.onTrue();
              confirmStrategy(memberId, id, position, true);
            }}
          >
            Change
          </LoadingButton>

          <LoadingButton
            variant="contained"
            color="info"
            loading={!state.value && loading}
            onClick={() => {
              confirmStrategy(memberId, id, position, false);
            }}
          >
            Skip
          </LoadingButton>

          <Button variant="outlined" color="inherit" onClick={confirmModal.onFalse}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

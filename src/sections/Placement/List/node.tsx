import debounce from 'lodash/debounce';
import { ApolloError } from '@apollo/client';
import { useState, useEffect, useContext, useCallback } from 'react';

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { formatDate } from 'src/utils/format-time';
import { customizeFullName } from 'src/utils/helper';

import { type TeamStrategy, PlacementPosition } from 'src/__generated__/graphql';

import { Label } from 'src/components/Label';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ConfirmDialog } from 'src/components/Dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import {
  useFetchMembers,
  useUpdateMember,
  useRemoveMemberPlacement,
} from 'src/sections/Members/useApollo';

import NodeContext from './nodeContext';

import type { NodeProps } from './type';

// ----------------------------------------------------------------------

export function StandardNode({
  id,
  username,
  fullName,
  createdAt,
  commission,
  placementParentId,
  placementPosition,
  cmnCalculatedWeeks,
}: NodeProps) {
  const status = useBoolean();
  const isCreate = useBoolean();
  const addModal = useBoolean();
  const editModal = useBoolean();
  const removeModal = useBoolean();
  const confirmModal = useBoolean();

  const router = useRouter();
  const popover = usePopover();

  const [position, setPosition] = useState<PlacementPosition>(PlacementPosition.Left);
  const [checked, setChecked] = useState<boolean>(false);
  const [memberUsername, setMemberUserName] = useState<string | null>(null);
  const [targetUserId, setTargetUserId] = useState<string>('');
  const [strategy, setStrategy] = useState<'LEFT' | 'RIGHT'>();

  const { loading, updateMember } = useUpdateMember();
  const { loading: memberLoading, members, fetchMembers } = useFetchMembers();
  const { loading: removeLoading, removeMemberPlacement } = useRemoveMemberPlacement();

  const onRemove = () => {
    popover.onClose();
    removeModal.onTrue();
  };

  const onEdit = async () => {
    await fetchMembers({
      variables: {
        filter: {
          id: placementParentId,
        },
      },
    });
    setTargetUserId(placementParentId!);
    popover.onClose();
    editModal.onTrue();
  };

  const onAdd = async () => {
    setMemberUserName('');
    setTargetUserId('');
    popover.onClose();
    addModal.onTrue();
  };

  const handleChange = debounce((value: string) => {
    setMemberUserName(value);
  }, 300);

  useEffect(() => {
    if (memberUsername === null) return;
    fetchMembers({
      variables: {
        filter: {
          ...(addModal.value && {
            placementParentId: null,
          }),
          OR: [
            { username: { contains: memberUsername, mode: 'insensitive' } },
            { fullName: { contains: memberUsername, mode: 'insensitive' } },
          ],
        },
        page: '1,10',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberUsername]);

  const getMemberById = useCallback(
    (_id: string) => members.find((mb) => mb!.id === _id),
    [members]
  );

  const { visibleMap, expandTree, collapseTree, expandAll, collapseAll } = useContext(NodeContext);

  const addContent = (
    <Paper sx={{ py: 1 }}>
      <Autocomplete
        fullWidth
        options={members.map((mb) => mb!.id)}
        loading={memberLoading}
        loadingText={<LoadingButton loading={memberLoading} />}
        getOptionLabel={(option) => {
          const mbr = getMemberById(option);
          return mbr ? mbr.username : memberUsername || '';
        }}
        renderInput={(params) => <TextField {...params} label="Miner Name(Child)" margin="none" />}
        renderOption={(props, option) => {
          const mbr = getMemberById(option);
          return (
            <li {...props} key={option}>
              {`${mbr!.username} (${mbr!.fullName})`};
            </li>
          );
        }}
        onInputChange={(_, name: string) => {
          if (!memberLoading) {
            handleChange(name);
          }
        }}
        onChange={(_, value) => {
          setTargetUserId(value ?? '');
        }}
        value={targetUserId}
        filterOptions={(options) => options}
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
      <Autocomplete
        fullWidth
        options={members.map((mb) => mb!.id)}
        loading={memberLoading}
        loadingText={<LoadingButton loading={memberLoading} />}
        getOptionLabel={(option) => {
          const mbr = getMemberById(option);
          return mbr ? mbr.username : memberUsername || '';
        }}
        renderInput={(params) => <TextField {...params} label="Miner Name(Parent)" margin="none" />}
        renderOption={(props, option) => {
          const mbr = getMemberById(option);
          return (
            <li {...props} key={option}>
              {`${mbr!.username} (${mbr!.fullName})`};
            </li>
          );
        }}
        onInputChange={(_, name: string) => {
          if (!memberLoading) {
            handleChange(name);
          }
        }}
        onChange={(_, value) => {
          setTargetUserId(value ?? '');
        }}
        value={targetUserId}
        filterOptions={(options) => options}
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
    <Paper>
      <FormControlLabel
        key="checkbox"
        label="Will you remove the sub-tree data?"
        labelPlacement="end"
        control={
          <Checkbox
            name="removeId"
            onChange={(event) => {
              setChecked(event.target.checked);
            }}
          />
        }
      />
    </Paper>
  );

  const confirmStrategy = async (curId: string, curPId: string, curPos: string) => {
    try {
      const newData: any = {
        id: curId,
        placementParentId: curPId,
        placementPosition: curPos,
      };

      if (status) {
        newData.teamStrategy = strategy as TeamStrategy;
      }

      const { data } = await updateMember({
        variables: {
          data: newData,
        },
      });

      if (data?.updateMember.id && !loading) {
        toast.success('Successfully added!');

        if (isCreate.value) {
          addModal.onFalse();
        } else {
          editModal.onFalse();
        }
      }

      confirmModal.onFalse();
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;

        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
          minWidth: 200,
          borderRadius: 1.5,
          textAlign: 'left',
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
        }}
      >
        <IconButton
          color={popover.open ? 'inherit' : 'default'}
          onClick={popover.onOpen}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>

        <Typography
          variant="subtitle2"
          noWrap
          sx={{
            mb: 0.5,
            cursor: 'pointer',
            '&:hover': { color: (theme) => theme.vars.palette.Alert.errorIconColor },
          }}
          onClick={() => router.push(paths.dashboard.members.edit(id))}
        >
          {customizeFullName(fullName)}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 0.5, background: 'translation' }}
        >
          <Typography
            variant="caption"
            component="div"
            noWrap
            sx={{ color: 'text.secondary', mt: 0.5 }}
          >
            {username}
          </Typography>

          <Stack>
            {placementPosition !== 'NONE' && (
              <Label
                variant={placementPosition === 'LEFT' ? 'soft' : 'outlined'}
                color="info"
                sx={{ fontSize: 10, border: placementPosition === 'LEFT' ? 'none' : 1 }}
              >
                {placementPosition}
              </Label>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="gray" component="div" noWrap sx={{ mt: 1 }}>
            L {commission?.begL || 0}/{commission?.newL || 0}
          </Typography>
          <Typography variant="caption" color="gray" component="div" noWrap sx={{ mt: 1 }}>
            {commission?.begR || 0}/{commission?.newR || 0} R
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="caption"
            component="div"
            noWrap
            sx={{ color: 'text.secondary', mt: 0.5 }}
          >
            {formatDate(createdAt)}
          </Typography>

          <Stack>
            {visibleMap[id] !== 3 && (
              <Iconify
                icon={`mdi:${visibleMap[id] === 1 ? 'plus' : 'minus'}-circle-outline`}
                sx={{ mt: 0.15, cursor: 'pointer' }}
                onClick={() => {
                  if (visibleMap[id] === 1) expandTree(id);
                  else if (visibleMap[id] === 2) collapseTree(id);
                }}
              />
            )}
          </Stack>
        </Stack>
      </Card>

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

          <MenuItem onClick={onEdit} disabled={!!cmnCalculatedWeeks}>
            <Iconify icon="bxs:pencil" />
            Edit
          </MenuItem>

          <MenuItem onClick={onAdd}>
            <Iconify icon="mdi:plus-circle-outline" />
            Add
          </MenuItem>
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
              confirmModal.onTrue();
              isCreate.onTrue();

              if (position === PlacementPosition.Left) {
                setStrategy(PlacementPosition.Right);
              } else {
                setStrategy(PlacementPosition.Left);
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
              confirmModal.onTrue();
              isCreate.onFalse();

              if (position === PlacementPosition.Left) {
                setStrategy(PlacementPosition.Right);
              } else {
                setStrategy(PlacementPosition.Left);
              }
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
              if (checked) {
                const { data } = await removeMemberPlacement({ variables: { data: { id } } });
                if (data?.removeCompleteMemberPlacement.result === 'success') {
                  toast.success('Successfully removed placement including sub-tree data!');
                  removeModal.onFalse();
                }
              } else {
                const { data } = await updateMember({
                  variables: { data: { id, placementParentId: null } },
                });
                if (data?.updateMember.id && !loading) {
                  toast.success('Successfully removed placement!');
                  removeModal.onFalse();
                }
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
            loading={status.value && loading}
            onClick={() => {
              status.onTrue();
              if (isCreate.value) {
                confirmStrategy(targetUserId, id, position);
              } else {
                confirmStrategy(id, targetUserId, position);
              }
            }}
          >
            Change
          </LoadingButton>

          <LoadingButton
            variant="contained"
            color="info"
            loading={!status.value && loading}
            onClick={() => {
              status.onFalse();
              if (isCreate.value) {
                confirmStrategy(targetUserId, id, position);
              } else {
                confirmStrategy(id, targetUserId, position);
              }
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

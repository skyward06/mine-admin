import { useState, useEffect, useContext } from 'react';

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { fDate } from 'src/utils/format-time';

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

interface Member {
  id: string;
  username: string;
}

export function StandardNode({
  id,
  placementParentId,
  placementPosition,
  placementParent,
  username,
  fullName,
  createdAt,
}: NodeProps) {
  const addModal = useBoolean();
  const editModal = useBoolean();
  const removeModal = useBoolean();

  const router = useRouter();
  const popover = usePopover();

  const [position, setPosition] = useState<string>('LEFT');
  const [checked, setChecked] = useState<boolean>(false);
  const [member, setMember] = useState<Member>();

  const { loading, updateMember } = useUpdateMember();
  const { loading: memberLoading, members, fetchMembers } = useFetchMembers();
  const { loading: removeLoading, removeMemberPlacement } = useRemoveMemberPlacement();

  const [firstName, lastName] = fullName ? fullName.split(' ') : ['', ''];

  const onRemove = () => {
    popover.onClose();
    removeModal.onTrue();
  };

  const onEdit = () => {
    popover.onClose();
    editModal.onTrue();

    fetchMembers({ variables: { page: '1,10' } });
  };

  const onAdd = () => {
    popover.onClose();
    addModal.onTrue();

    fetchMembers({
      variables: {
        filter: { placementParentId: null },
        page: '1,10',
      },
    });
  };

  useEffect(() => {
    fetchMembers({
      variables: {
        filter: {
          ...(addModal.value && {
            placementParentId: null,
          }),
          username: { contains: member?.username, mode: 'insensitive' },
        },
        page: '1,10',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  const { visibleMap, expandTree, collapseTree } = useContext(NodeContext);

  const addContent = (
    <Paper sx={{ py: 1 }}>
      <Autocomplete
        fullWidth
        options={members}
        loading={memberLoading}
        loadingText={<LoadingButton loading={memberLoading} />}
        getOptionLabel={(option) => option!.username}
        renderInput={(params) => <TextField {...params} label="Miner Name(Child)" margin="none" />}
        renderOption={(props, option) => (
          <li {...props} key={option!.username}>
            {option!.username}
          </li>
        )}
        onInputChange={(_, name: string) => {
          setMember({ id: '', username: name });
        }}
        onChange={(_, value) => {
          setMember({ id: value?.id ?? '', username: value?.username ?? '' });
        }}
      />
      <RadioGroup
        row
        defaultValue="LEFT"
        sx={{ px: 1 }}
        onChange={(event) => setPosition(event.target.value)}
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
        options={members}
        loading={memberLoading}
        loadingText={<LoadingButton loading={memberLoading} />}
        getOptionLabel={(option) => option!.username}
        value={member || placementParent}
        renderInput={(params) => <TextField {...params} label="Miner Name(Parent)" margin="none" />}
        renderOption={(props, option) => (
          <li {...props} key={option!.username}>
            {option!.username}
          </li>
        )}
        onInputChange={(_, name: string) => {
          setMember({ id: placementParent?.id ?? '', username: name });
        }}
        onChange={(_, value) => {
          setMember({ id: value?.id ?? '', username: value?.username ?? '' });
        }}
      />
      <RadioGroup
        row
        defaultValue={placementPosition}
        sx={{ px: 1 }}
        onChange={(event) => setPosition(event.target.value)}
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
          {`${firstName} ${lastName.length && lastName[0].toUpperCase()}.`}
        </Typography>

        <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
          {username}
        </Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ background: 'translation' }}>
          <Typography
            variant="caption"
            component="div"
            noWrap
            sx={{ color: 'text.secondary', mt: 0.5 }}
          >
            {fDate(createdAt)}
          </Typography>

          <Stack direction="row" columnGap={1}>
            <Stack>
              {placementPosition && (
                <Label
                  variant={placementPosition === 'LEFT' ? 'soft' : 'outlined'}
                  color="info"
                  sx={{ fontSize: 10, border: placementPosition === 'LEFT' ? 'none' : 1 }}
                >
                  {placementPosition}
                </Label>
              )}
            </Stack>
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
            disabled={id === placementParentId}
            onClick={onRemove}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem onClick={onEdit}>
            <Iconify icon="bxs:pencil" />
            Edit
          </MenuItem>

          <MenuItem onClick={onAdd}>
            <Iconify icon="mdi:plus-circle-outline" />
            Add
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
            onClick={async () => {
              try {
                const { data } = await updateMember({
                  variables: {
                    data: { id: member?.id, placementParentId: id, placementPosition: position },
                  },
                });

                if (data?.updateMember.id && !loading) {
                  toast.success('Successfully added!');

                  expandTree(id);
                  addModal.onFalse();
                }
              } catch (err) {
                console.log('err => ', err);
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
            onClick={async () => {
              try {
                const { data } = await updateMember({
                  variables: {
                    data: {
                      id,
                      placementParentId: member?.id,
                      placementPosition: position,
                    },
                  },
                });

                if (data?.updateMember.id && !loading) {
                  toast.success('Successfully added!');
                  editModal.onFalse();
                }
              } catch (err) {
                console.log('err => ', err);
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
    </>
  );
}

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { useBoolean } from 'src/hooks/useBoolean';

import { useFetchMembers } from 'src/sections/Members/useApollo';

interface Member {
  id: string;
  username: string;
}

interface Props {
  onMinerChange: Function;
  weekStartDate: string;
}

export default function PlacementListView({ onMinerChange, weekStartDate }: Props) {
  const { fetchMembers, members, loading } = useFetchMembers();

  const addModal = useBoolean();
  const [miner, setMiner] = useState<Member>();

  useEffect(() => {
    fetchMembers({
      variables: {
        filter: {
          ...(addModal.value && {
            placementParentId: null,
          }),
          OR: [
            { username: { contains: miner?.username, mode: 'insensitive' } },
            { fullName: { contains: miner?.username, mode: 'insensitive' } },
          ],
          createdAt: {
            lt: dayjs(weekStartDate).add(1, 'week').toDate(),
          },
        },
        page: '1,10',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [miner]);

  return (
    <Autocomplete
      sx={{ width: 200 }}
      options={members}
      loading={loading}
      loadingText={<LoadingButton loading={loading} />}
      getOptionLabel={(option) => `${option!.username}-${option!.fullName}`}
      renderInput={(params) => (
        <TextField {...params} label="Miner Name" margin="none" size="small" />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option!.username}>
          {option!.username}
        </li>
      )}
      onInputChange={(_, name: string) => {
        setMiner({ id: '', username: name });
      }}
      onChange={(_, value) => {
        setMiner({ id: value?.id ?? '', username: value?.username ?? '' });
        onMinerChange(value?.id);
      }}
    />
  );
}

import type { Member } from 'src/__generated__/graphql';

import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useFetchMembers } from 'src/sections/Members/useApollo';

import { Iconify } from '../Iconify';

interface Props {
  currentMember?: Member | null;
  setMemberId?: Function;
  setTeamStrategy?: Function;
  filter?: any;
}

export default function SearchMiner({
  currentMember,
  setMemberId,
  setTeamStrategy,
  filter,
}: Props) {
  const [username, setUsername] = useState<string>();

  const { loading, members, fetchMembers } = useFetchMembers();

  useEffect(() => {
    fetchMembers({
      variables: {
        filter: {
          ...filter,
          status: true,
          OR: [
            { username: { contains: username ?? '', mode: 'insensitive' } },
            { fullName: { contains: username ?? '', mode: 'insensitive' } },
          ],
        },
        page: '1,10',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (setMemberId) {
      setMemberId(members.find((member) => member.username === username?.split(' (')[0])?.id);
    }

    if (setTeamStrategy) {
      setTeamStrategy(
        members.find((member) => member.username === username?.split(' (')[0])?.teamStrategy
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Autocomplete
      fullWidth
      options={members.map((item) => `${item.username} (${item.fullName})`)}
      isOptionEqualToValue={(option, value) => option === value}
      value={
        username ?? (currentMember && `${currentMember?.username} (${currentMember?.fullName})`)
      }
      loading={loading}
      loadingText={<Iconify icon="line-md:loading-loop" />}
      renderInput={(params) => <TextField {...params} label="Miner Name(Child)" margin="none" />}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      onChange={(_, value) => setUsername(value ?? '')}
      onInputChange={(_, value) => setUsername(value)}
    />
  );
}

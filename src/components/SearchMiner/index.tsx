import type { Member } from 'src/__generated__/graphql';

import { useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {
  loading?: boolean;
  username?: string;
  members: Member[];
  currentMember?: Member | null;
  setMemberId: Function;
  setUsername: Function;
}

export default function SearchMiner({
  loading,
  members,
  username,
  setMemberId,
  setUsername,
  currentMember,
}: Props) {
  useEffect(() => {
    setMemberId(members.find((member) => member.username === username?.split(' (')[0])?.id);
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
      renderInput={(params) => <TextField {...params} label="Miner Name(Child)" margin="none" />}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      onChange={(_, value) => setUsername(value)}
      onInputChange={(_, value) => setUsername(value)}
    />
  );
}

import type { Member } from 'src/__generated__/graphql';

import { useEffect } from 'react';

import { Field } from '../Form';

interface Props {
  loading?: boolean;
  name: string;
  username?: string;
  members: Member[];
  currentMember?: Member | null;
  setMemberId: Function;
  setUsername: Function;
}

export default function SearchMiner({
  loading,
  name,
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
    <Field.Autocomplete
      name={name}
      fullWidth
      options={members.map((item) => `${item.username} (${item.fullName})`)}
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) => option === value}
      value={
        username ?? (currentMember && `${currentMember?.username} (${currentMember?.fullName})`)
      }
      loading={loading}
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

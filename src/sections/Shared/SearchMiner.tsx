import type { Member } from 'src/__generated__/graphql';

import { useState, useEffect } from 'react';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Iconify } from 'src/components/Iconify';

import { useFetchMemberSearch } from 'src/sections/Members/useApollo';

interface Props {
  currentMembers: Member[];
  setMemberIds?: Function;
}

export default function SearchMiner({ currentMembers, setMemberIds }: Props) {
  const [username, setUsername] = useState<string>();
  const [current, setCurrent] = useState<any[]>([]);
  const [debouncedUsername, setDebouncedUsername] = useState<string>();

  const { loading, members, fetchMemberSearch } = useFetchMemberSearch();

  useEffect(() => {
    fetchMemberSearch({
      variables: {
        filter: {
          status: true,
          OR: [
            { username: { contains: debouncedUsername ?? '', mode: 'insensitive' } },
            { fullName: { contains: debouncedUsername ?? '', mode: 'insensitive' } },
          ],
        },
        page: '1,10',
      },
    });
  }, [debouncedUsername, fetchMemberSearch, username]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(username);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (currentMembers.length) {
      setCurrent(currentMembers.map((item) => `${item?.id}()${item?.username}()${item?.fullName}`));
    }
  }, [currentMembers]);

  return (
    <Autocomplete
      fullWidth
      multiple
      options={members.map((item) => `${item.id}()${item.username}()${item.fullName}`)}
      isOptionEqualToValue={(option, value) => option === value}
      value={current}
      loading={loading}
      loadingText={<Iconify icon="line-md:loading-loop" />}
      renderInput={(params) => <TextField {...params} label="Miner" margin="none" />}
      renderOption={(props, option) => (
        <li {...props} key={option} value={option.split('()')[0]}>
          {option.split('()')[1]} ({option.split('()')[2]})
        </li>
      )}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option}
            label={`${option.split('()')[1]} (${option.split('()')[2]})`}
            color="info"
            variant="soft"
          />
        ))
      }
      onInputChange={(_, value) => setUsername(value)}
      onChange={(_, value: any) => {
        setCurrent(value);

        if (setMemberIds) {
          setMemberIds(value.map((item: any) => item.split('()')[0]));
        }
      }}
    />
  );
}

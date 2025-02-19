import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { REMOVE_NOTE, CREATE_NOTE, UPDATE_NOTE, FETCH_NOTES_QUERY } from './query';

export function useFetchNotes() {
  const [fetchNotes, { loading, data }] = useLazyQuery(FETCH_NOTES_QUERY);

  const rowCountRef = useRef(data?.adminNotes.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.adminNotes.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    notes: data?.adminNotes.adminNotes ?? [],
    fetchNotes,
  };
}

export function useCreateNote() {
  const [createNote, { loading }] = useMutation(CREATE_NOTE, {
    awaitRefetchQueries: true,
    refetchQueries: ['AdminNotes', 'FetchMembers'],
  });

  return { loading, createNote };
}

export function useUpdateNote() {
  const [updateNote, { loading }] = useMutation(UPDATE_NOTE, {
    awaitRefetchQueries: true,
    refetchQueries: ['AdminNotes', 'FetchMembers'],
  });

  return { loading, updateNote };
}

export function useRemoveNote() {
  const [removeNote, { loading, error }] = useMutation(REMOVE_NOTE, {
    awaitRefetchQueries: true,
    refetchQueries: ['AdminNotes', 'FetchMembers'],
  });

  return { loading, error, removeNote };
}

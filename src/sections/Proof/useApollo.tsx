import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { CREATE_PROOF, REMOVE_PROOF, UPDATE_PROOF, FETCH_PROOF_QUERY } from './query';

export function useFetchProofs() {
  const [fetchProofs, { loading, data, called }] = useLazyQuery(FETCH_PROOF_QUERY);

  const rowCountRef = useRef(data?.proofs.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.proofs.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    proofs: data?.proofs.proofs ?? [],
    fetchProofs,
  };
}

export function useCreateProof() {
  const [createProof, { loading }] = useMutation(CREATE_PROOF, {
    awaitRefetchQueries: true,
    refetchQueries: ['Proofs'],
  });

  return { loading, createProof };
}

export function useUpdateProof() {
  const [updateProof, { loading }] = useMutation(UPDATE_PROOF, {
    awaitRefetchQueries: true,
    refetchQueries: ['Proofs'],
  });

  return { loading, updateProof };
}

export function useRemoveProof() {
  const [removeProof, { loading, error }] = useMutation(REMOVE_PROOF, {
    awaitRefetchQueries: true,
    refetchQueries: ['Proofs'],
  });

  return { loading, error, removeProof };
}

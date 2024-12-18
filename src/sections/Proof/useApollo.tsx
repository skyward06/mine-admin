import { useRef, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { useAgQuery as useQueryString } from 'src/routes/hooks';

import { parseFilterModel } from 'src/utils/parseFilter';

import { CREATE_PROOF, REMOVE_PROOF, UPDATE_PROOF, FETCH_PROOF_QUERY } from './query';

export function useFetchProofs() {
  const [{ page = '1,50', sort = 'createdAt', filter }] = useQueryString();

  const graphQueryFilter = useMemo(() => parseFilterModel({}, filter), [filter]);

  const { loading, data } = useQuery(FETCH_PROOF_QUERY, {
    variables: { filter: graphQueryFilter, page, sort },
  });

  const rowCountRef = useRef(data?.proofs.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.proofs.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    proofs: data?.proofs.proofs ?? [],
  };
}

export function useFetchProof(id: string) {
  const { loading, data } = useQuery(FETCH_PROOF_QUERY, {
    variables: { filter: { id } },
  });

  return { loading, proof: data?.proofs.proofs ?? [] };
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

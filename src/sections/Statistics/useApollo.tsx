import { useLazyQuery } from '@apollo/client';

import { GENERAL_QUERY, FETCH_BLOCKS_QUERY } from './query';

export function useFetchGeneral() {
  const [fetchGeneral, { loading, data }] = useLazyQuery(GENERAL_QUERY);

  return { loading, data, fetchGeneral };
}

export function useFetchBlocksQuery() {
  const [fetchBlocks, { loading, data }] = useLazyQuery(FETCH_BLOCKS_QUERY);

  return { loading, blocks: data?.blocks.blocks ?? [], fetchBlocks };
}

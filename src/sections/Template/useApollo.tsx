import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { FETCH_TEMPLATE_BY_ID, FETCH_TEMPLATE_QUERY, UPDATE_EMAIL_TEMPLATE } from './query';

export function useFetchTemplates() {
  const [fetchTemplates, { loading, data }] = useLazyQuery(FETCH_TEMPLATE_QUERY);

  const rowCountRef = useRef(data?.emailTemplates.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.emailTemplates.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, rowCount, templates: data?.emailTemplates.templates ?? [], fetchTemplates };
}

export function useFetchTemplateById() {
  const [fetchTemplateById, { loading, data }] = useLazyQuery(FETCH_TEMPLATE_BY_ID);

  return { loading, template: data?.emailTemplateById, fetchTemplateById };
}

export function useUpdateTemplate() {
  const [updateTemplate, { loading, data, error }] = useMutation(UPDATE_EMAIL_TEMPLATE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Templates'],
  });

  return { loading, data, error, updateTemplate };
}

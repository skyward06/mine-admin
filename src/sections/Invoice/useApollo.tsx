import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  MOVE_TO_PAID,
  UPDATE_INVOICE,
  FETCH_INVOICE_BY_ID,
  FETCH_INVOICES_QUERY,
  GENERATE_WEEK_INVOICE,
  REGENERATE_INVOICE_BY_ID,
} from './query';

export function useFetchInvoices() {
  const [fetchInvoices, { loading, data, called }] = useLazyQuery(FETCH_INVOICES_QUERY);

  const rowCountRef = useRef(data?.invoices.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.invoices.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    called,
    loading,
    rowCount,
    invoices: data?.invoices.invoices ?? [],
    fetchInvoices,
  };
}

export function useFetchInvoiceById() {
  const [fetchInvoiceById, { loading, data, error }] = useLazyQuery(FETCH_INVOICE_BY_ID);

  return { loading, invoice: data?.invoiceById, error, fetchInvoiceById };
}

export function useMoveToPaid() {
  const [moveToPaid, { loading, data, error }] = useMutation(MOVE_TO_PAID, {
    awaitRefetchQueries: true,
    refetchQueries: ['Invoices'],
  });

  return { loading, data, error, moveToPaid };
}

export function useUpdateInvoice() {
  const [updateInvoice, { loading, data, error }] = useMutation(UPDATE_INVOICE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Invoices'],
  });

  return { loading, data, error, updateInvoice };
}

export function useGenerateWeekInvoice() {
  const [generateWeekInvoice, { loading, data, error }] = useMutation(GENERATE_WEEK_INVOICE);

  return { loading, data, error, generateWeekInvoice };
}

export function useRegenerateInvoice() {
  const [regenerateInvoice, { loading, data, error }] = useMutation(REGENERATE_INVOICE_BY_ID);

  return { loading, data, error, regenerateInvoice };
}

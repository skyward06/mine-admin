import { useRef, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import {
  CANCEL_ORDER,
  REFERSH_BALANCE,
  FETCH_ORDER_QUERY,
  FETCH_ORDERS_QUERY,
  FETCH_ADDRESSES_QUERY,
  FETCH_TRANSACTION_QUERY,
  FETCH_ADDRESS_BY_ADDRESS,
  FETCH_TRANSACTION_BY_HASH,
} from './query';

export function useFetchOrders() {
  const [fetchOrders, { loading, data, called }] = useLazyQuery(FETCH_ORDERS_QUERY);

  const rowCountRef = useRef(data?.orders.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.orders.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, rowCount, called, orders: data?.orders.orders ?? [], fetchOrders };
}

export function useFetchOrder() {
  const [fetchOrder, { loading, data }] = useLazyQuery(FETCH_ORDER_QUERY);

  return { loading, order: data?.orderById, fetchOrder };
}

export function useFetchAddresses() {
  const [fetchAddresses, { loading, data, called }] = useLazyQuery(FETCH_ADDRESSES_QUERY);

  const rowCountRef = useRef(data?.addresses.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.addresses.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return { loading, rowCount, called, addresses: data?.addresses.addresses ?? [], fetchAddresses };
}

export function useFetchAddressByAddress() {
  const [fetchAddressByAddress, { loading, data, error }] = useLazyQuery(FETCH_ADDRESS_BY_ADDRESS);

  return { loading, address: data?.addressByAddress, error, fetchAddressByAddress };
}

export function useFetchTransactions() {
  const [fetchTransactions, { loading, data, called }] = useLazyQuery(FETCH_TRANSACTION_QUERY);

  const rowCountRef = useRef(data?.transactions.total ?? 0);

  const rowCount = useMemo(() => {
    const newTotal = data?.transactions.total ?? undefined;

    if (newTotal !== undefined) {
      rowCountRef.current = newTotal;
    }

    return rowCountRef.current;
  }, [data]);

  return {
    loading,
    rowCount,
    called,
    transactions: data?.transactions.transactions ?? [],
    fetchTransactions,
  };
}

export function useFetchTransactionByHash() {
  const [fetchTransactionByHash, { loading, data, error }] =
    useLazyQuery(FETCH_TRANSACTION_BY_HASH);

  return { loading, transaction: data?.transactionByHash, error, fetchTransactionByHash };
}

export function useCancelOrder() {
  const [cancelOrder, { loading, data, error }] = useMutation(CANCEL_ORDER, {
    awaitRefetchQueries: true,
    refetchQueries: ['Orders'],
  });

  return { loading, data, error, cancelOrder };
}

export function useRefreshBalance() {
  const [refreshBalances, { loading, data, error }] = useMutation(REFERSH_BALANCE, {
    awaitRefetchQueries: true,
    refetchQueries: ['Addresses'],
  });

  return { loading, data, error, refreshBalances };
}

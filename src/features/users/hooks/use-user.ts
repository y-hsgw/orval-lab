'use client';

import { useGetUser } from '@/generated/users/users';

export function useUser(id: number) {
  const query = useGetUser(id);

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

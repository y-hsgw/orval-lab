'use client';

import { useGetUser } from '@/generated/api';

export function UserCard({ id }: { id: number }) {
  const { data: user, isLoading, isError, error } = useGetUser(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error instanceof Error ? error.message : 'Failed to load user'}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <section>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </section>
  );
}

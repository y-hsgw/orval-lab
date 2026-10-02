import { UserCard } from '@/features/users/components/user-card';

export default function ClientExamplePage() {
  return (
    <main>
      <h1>Client Component + custom hook</h1>
      <UserCard id={1} />
    </main>
  );
}

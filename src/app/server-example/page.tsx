import { getUser } from '@/generated/users/users';

export default async function ServerExamplePage() {
  const user = await getUser(1);

  return (
    <main>
      <h1>Server Component</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </main>
  );
}

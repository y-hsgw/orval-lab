import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Orval Lab</h1>
      <ul>
        <li>
          <Link href="/server-example">Server Component example</Link>
        </li>
        <li>
          <Link href="/client-example">Client Component + custom hook example</Link>
        </li>
      </ul>
    </main>
  );
}

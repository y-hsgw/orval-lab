# orval-lab

Next.js App Router + Orval + TanStack Query の検証用リポジトリです。

## 検証したい構成

### Server Component

```text
Server Component
  -> Orval が生成した通常の API 関数
  -> fetch
  -> API
```

```tsx
import { getUser } from '@/generated/users/users';

export default async function Page() {
  const user = await getUser(1);

  return <p>{user.name}</p>;
}
```

### Client Component

```text
Client Component
  -> 自作 custom hook
  -> Orval が生成した TanStack Query hook
  -> fetch
  -> API
```

```ts
'use client';

import { useGetUser } from '@/generated/users/users';

export function useUser(id: number) {
  const query = useGetUser(id);

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
```

## Orval 設定

```ts
output: {
  mode: 'tags-split',
  client: 'react-query',
  httpClient: 'fetch',
}
```

- `client: 'react-query'`: TanStack Query 用の hook / query options 等を生成する
- `httpClient: 'fetch'`: API 通信に Fetch API を使う
- `mode: 'tags-split'`: OpenAPI の tag 単位で生成コードを分割する

このリポジトリでは OpenAPI の `users` tag から `src/generated/users/` 以下が生成される想定です。

## 実行

```bash
npm install
npm run generate
npm run typecheck
npm run dev
```

生成物は Orval による自動生成コードなので、アプリ固有ロジックは `src/features` 側に置きます。

## 責務

```text
src/generated
  OpenAPI / Orval の世界

src/features/*/hooks
  Client 側のアプリ固有 hook

src/app
  Next.js の Server / Client Components
```

Server Component では不要な TanStack Query を経由せず、生成された通常関数を直接利用します。
Client Component では Orval の hook を直接 UI に露出させず、自作 custom hook でラップします。

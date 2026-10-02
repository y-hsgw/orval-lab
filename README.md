# orval-lab

Next.js App Router + Orval + TanStack Query の検証用リポジトリです。

## 検証する構成

### Server Component

```text
Server Component
  -> Orval が生成した通常の API 関数
  -> fetch
  -> API
```

```tsx
import { getUser } from '@/generated/api';

export default async function Page() {
  const user = await getUser(1);

  return <p>{user.name}</p>;
}
```

### Client Component

```text
Client Component
  -> Orval が生成した TanStack Query hook
  -> fetch
  -> API
```

```tsx
'use client';

import { useGetUser } from '@/generated/api';

export function UserCard({ id }: { id: number }) {
  const { data: user, isLoading } = useGetUser(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <p>{user?.name}</p>;
}
```

単純に API を1つ呼ぶだけなら custom hook は作らず、Orval が生成した `useGetUser` をそのまま使います。
複数 API の組み合わせやアプリ固有ロジックが必要になった場合だけ custom hook を追加します。

## Orval 設定

```ts
output: {
  mode: 'split',
  target: './src/generated/api.ts',
  schemas: './src/generated/model',
  client: 'react-query',
  httpClient: 'fetch',
}
```

- `client: 'react-query'`: TanStack Query 用の query / mutation hooks を生成する
- `httpClient: 'fetch'`: API 通信に Fetch API を使う
- `mode: 'split'`: endpoint と model を分けて生成する

生成結果:

```text
src/generated/
├─ api.ts
└─ model/
   ├─ index.ts
   └─ user.ts
```

## 実行

```bash
npm install
npm run generate
npm run typecheck
npm run dev
```

`src/generated` は Git にコミットします。
CI では `npm run generate` 後に生成差分がないことを確認します。

## 責務

```text
src/generated
  OpenAPI から Orval が生成した API client / hooks / model

src/features
  アプリ固有の UI / ロジック

src/app
  Next.js の Server / Client Components
```

Server Component では TanStack Query を経由せず、生成された通常関数を直接利用します。
Client Component では生成された `useGetUser` などの TanStack Query hook を直接利用できます。

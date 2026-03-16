# Next.js × Rails API モノレポテンプレート

新しいプロジェクトをすぐに始められる**最小限の環境構築テンプレート**です。

## 技術スタック

| | |
|---|---|
| **api** | Ruby 4.0.1 / Rails 8.1.2 / PostgreSQL 16 |
| **web** | Node.js 24.14.0 / Next.js 16.1.6 / React 19 / TypeScript / Tailwind CSS v4 |

- ポート: api=3001 / web=3000 / db=5432

## ディレクトリ構成

```
.
├── apps/
│   ├── api/   # Rails API
│   └── web/   # Next.js
├── compose.yml
└── .github/
    ├── workflows/ci.yml
    └── dependabot.yml
```

## 使い方

### 1. リポジトリを作成してクローン

1. このリポジトリ右上の「Use this template」→「Create a new repository」
2. 作成された自分のリポジトリをクローン

```bash
git clone <作成したリポジトリのURL>
cd <リポジトリ名>
```

### 2. 初回セットアップ（node_modules のインストール）

```bash
docker compose -f compose.yml -f compose.dev.yml run --rm web npm install
```

Docker 経由で `node_modules` をホストに生成します。VSCode の IntelliSense・型補完はこのディレクトリを参照します。

> `package.json` を変更した場合のみ再実行してください。依存関係がすでに存在する場合、npm は差分のみをインストールします。

VSCode を使わない場合は手順2をスキップできます。
その場合 `node_modules` をコンテナ内に保持するため、`compose.dev.yml` を以下のように変更してください。

```yaml
# compose.dev.yml
volumes:
  - ./apps/web:/app
  - /app/node_modules  # コメントを外す
```

### 3. 起動

```bash
docker compose -f compose.yml -f compose.dev.yml up
```

### 3. 動作確認

- Web: http://localhost:3000
- API疎通確認: `GET http://localhost:3001/api/v1/health`
  - レスポンス: `{"status":"ok","message":"APIが正常に動作しています"}`

### 4. 停止

```bash
docker compose down
```

ボリュームも削除する場合:
```bash
docker compose down -v
```

## 環境変数

開発環境の環境変数は `compose.yml` に記載済みです。

| 変数名 | デフォルト値 | 対象 |
|---|---|---|
| `DATABASE_HOST` | db | api |
| `DATABASE_USER` | postgres | api |
| `DATABASE_PASSWORD` | password | api |
| `DATABASE_NAME` | app_development | api |
| `CORS_ORIGINS` | http://localhost:3000 | api |
| `NEXT_PUBLIC_API_BASE_URL` | http://localhost:3001/api/v1 | web |

本番環境では `.env` / `.env.local` ファイルで管理してください。

## カスタマイズ

- **api**: `apps/api/` 配下にエンドポイントを追加。`/api/v1/health` はサンプルなので削除してください。
- **web**: `apps/web/src/app/page.tsx` を書き換えてください。`layout.tsx` のメタデータ（title / description / lang）も変更してください。

## 注意事項

- Docker Desktop が必要です（Mac / Windows 対応）
- エディタは **VSCode を前提**としています。他のエディタでは IntelliSense が動作しない場合があります。
- **このテンプレートは開発環境専用です。本番環境へのデプロイ設定（セキュリティ・インフラ構成など）は各自でカスタマイズしてください。**

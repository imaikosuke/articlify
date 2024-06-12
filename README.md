# Articlify

Articlifyは、技育CAMPハッカソンVol.6に参加して開発した記事管理アプリケーションです。このプロジェクトは、効率的な記事管理と要約自動生成を目指して設計しています。

## 技術スタック

このプロジェクトは[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)で作成された[Next.js](https://nextjs.org/)のプロジェクトです.

- Next.js
- TypeScript
- TailwindCSS
- Redux
- Firebase Firestore
- Firebase Authentication
- Vercel
- OpenAI GPT-4o
- Qiita API

## Chrome拡張機能

Articlifyには、Chrome拡張機能を通じて記事を簡単に追加できる機能があります。この拡張機能のソースコードは以下のリポジトリで管理されています。

- [Articlify Chrome Extension Repository](https://github.com/kou7306/Articlify_extend)

## インストールとセットアップ

### 依存関係のインストール

リポジトリをクローンして依存関係をインストールします。

```zsh
git clone https://github.com/imaikosuke/articlify.git
cd articlify
npm install
```

### 環境変数の設定

`firebaseConfig.js`やその他の環境変数を設定します。必要な環境変数は以下の通りです。

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

OPENAI_API_KEY=your_openai_api_key
QIITA_API_TOKEN=your_qiita_api_token

```

### 開発サーバーの起動
開発サーバーを起動します。
```bash
npm run dev
```
ブラウザで`http://localhost:3000`にアクセスして、アプリケーションを確認します。

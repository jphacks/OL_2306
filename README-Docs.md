# ドキュメント

## 実行方法

以下の環境変数をルート直下の`.env`に記述

```.env
MYSQL_HOST=ホスト名 #（例：mysql）
MYSQL_USER=ユーザー名 #（例：root）
MYSQL_PORT=ポート #（例：3306）
MYSQL_PASSWORD=パスワード #（例：password）
MYSQL_DATABASE=DB名 #（例：my_db）
TZ=タイムゾーン #（例：Asia/Tokyo）
NEXTJS_PORT=Next.jsのポート #（例：8080）
```

インストール

```bash
docker compose run --rm nextjs-app npm i
# モジュールを新しくインストールする場合は以下
docker compose run --rm nextjs-app npm i {モジュール名}
```

以下のコマンドでコンテナ起動

```bash
docker compose up -d
```

コンテナを修了する

```bash
docker compose down
```

起動しているプロセスを確認

```bash
docker ps
```

コンテナの中に入る

```bash
docker exec -it {コンテナ名} sh
```

MySQLにログイン

```sh
mysql -u root -p # この次にパスワードを入力
```

## ディレクトリ構成

- `/app`：Next.jsのアプリ
- `/app/src/pages`：ページを作成する
- `/app/src/pages/api`：APIを作成する
- `/app/src/features`：画面・機能ごとに使うコンポーネントを作成
  - 下階層
    - `/home`：ホーム画面
    - `/message`：メッセージ画面
    - `/signin`：サインイン画面
    - `/signup`：サインアップ画面
    - `/timeline`：タイムライン機能
- `/app/src/application`：共通で使うコンポーネントや関数を作成
  - 下階層
    - `/lib`：関数
    - `/providers`：プロバイダー
    - `/types`：型ファイル
    - `/UI`：共通コンポーネント（ヘッダー・フッターなど）
- `/initdb.d`：初期化のSQL

## アーキテクチャ

**Container・Presentational**について

Container：コンポーネントのロジックを記述

Presentational：コンポーネントのUIを記述

実装例は[features/signin内のコンポーネント](./app/src/features/signin/UI/Container/SigninCon.tsx)を参照
# CLAUDE.md — task-board

## プロジェクト概要

タスク管理ボードアプリケーション。

---

## Git 運用ルール

### コード変更のたびにGitHubへプッシュする

コードを変更するたびに、以下の手順で必ずGitHubにプッシュすること。

```
git add <変更ファイル>
git commit -m "<変更内容を簡潔に説明するメッセージ>"
git push origin <ブランチ名>
```

### ブランチ戦略

- `main` — 本番相当の安定ブランチ。直接コミット禁止。
- `dev` / `feature/*` — 開発・機能追加用ブランチ。作業完了後にPRを作成して `main` へマージ。

### コミットメッセージ規約

```
<type>: <subject>

type:
  feat     新機能
  fix      バグ修正
  refactor リファクタリング（動作変更なし）
  style    フォーマット・空白調整（ロジック変更なし）
  test     テスト追加・修正
  docs     ドキュメントのみの変更
  chore    ビルド設定・依存関係など
```

例:
```
feat: タスクの優先度フィルター機能を追加
fix: 期限切れタスクが削除できないバグを修正
```

### プルリクエスト

- `main` への直接プッシュは禁止。PRを通してマージする。
- PRには変更内容・テスト手順を必ず記載する。

---

## デプロイ先

| 環境 | URL |
|---|---|
| 本番（GitHub Pages） | https://fc-kawaguchi.github.io/task-board/ |
| ローカル開発 | http://localhost:5173 |

デプロイは以下のコマンド一発で完了する（`dist/` をビルドして `gh-pages` ブランチへプッシュ）。

```
npm run deploy
```

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | React 18 |
| ビルドツール | Vite 6 |
| 言語 | JavaScript (JSX) |
| スタイリング | Plain CSS（CSS Modules 不使用） |
| 状態管理 | React `useState` / `useEffect`（外部ライブラリなし） |
| データ永続化 | `localStorage` |
| デプロイ | `gh-pages` パッケージ → GitHub Pages |

---

## コンポーネント命名規約

- **ファイル名・コンポーネント名**: PascalCase（例: `App.jsx`, `TaskItem.jsx`）
- **CSS ファイル**: コンポーネントと同名（例: `App.css`）
- **イベントハンドラ関数**: `handle〇〇` または動詞 + 対象の camelCase（例: `handleKeyDown`, `addTask`, `toggleTask`）
- **state 変数**: camelCase の名詞（例: `tasks`, `inputText`）
- **定数（モジュールスコープ）**: UPPER_SNAKE_CASE（例: `STORAGE_KEY`）

---

## 開発ガイドライン

- 新機能は小さな単位で実装し、その都度コミット＆プッシュする。
- 動作確認が取れた変更のみコミットする（壊れた状態でプッシュしない）。
- 機密情報（APIキー、パスワード等）は絶対にコミットしない。`.env` はGitignoreに含める。

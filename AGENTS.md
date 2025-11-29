# Repository Guidelines

## プロジェクト構成
- `src/App.tsx`: アプリ状態・ビュー切替（timeline/stage/signing/favorites）・ロケール/お気に入り保存のハブ。
- `src/views/`: 各ビューのページレイアウト。`src/components/`: 再利用コンポーネント。
- `src/data.ts`: タイムテーブル・ステージ色・サイン会データ。`src/types.ts`: 共有型。`src/utils.ts`: 時刻パース/カウントダウン。`src/i18n.ts`: 翻訳とロケール検出。
- `public/`: 静的アセット。`index.html`: Vite React の起点。`vite.config.ts`: Vite/PWA 設定。ビルド成果物は `dist/`。

## ビルド・テスト・開発コマンド
- 依存インストール: `pnpm install`（`pnpm-lock.yaml` あり）。
- 開発サーバー（HMR）: `pnpm dev`。
- 本番ビルド: `pnpm build`（`tsc` 型チェック後に `vite build`）。
- ビルド確認: `pnpm preview`（`dist/` をローカル配信）。

## コーディング規約・命名
- 技術スタック: TypeScript + React 18。関数コンポーネントとフックを基本に。
- フォーマット: インデント2スペース。モジュール単位で読みやすく import を整理。明示的なフォーマッタ設定なし—エディタの TS/Prettier 既定で揃えつつ、スタイル差分を増やさない。
- 命名: コンポーネント/ビューは `PascalCase`、ヘルパー/フックは `camelCase`、CSS クラスは説明的なハイフン区切り。
- 状態管理: `useState`/`useEffect`/`useMemo` を優先。グローバル状態ライブラリは必要性がある場合のみ。

## テスト方針
- 自動テストは未整備。`src/utils.ts` などロジック変更時は軽量テスト追加を推奨（Vitest + React Testing Library が Vite と相性良）。
- テストファイル名は対象コードの近くに `*.test.ts` / `*.test.tsx`。決定論的でデータ駆動のテストを心がける。
- UI 変更時は開発サーバーで4ビューを目視確認し、翻訳キー表示が崩れていないかチェック。

## コミット・PR ガイド
- コミットは短い命令形サマリ（例: `Add Spotify link to act cards`, `Align clock refresh to minute ticks`）。関連変更をまとめ、WIP コミットは避ける。
- PR には変更概要、再現/確認手順、UI 変更はスクリーンショットまたは動画を添付。可能なら課題リンクを追加し、データやロケール変更があれば明記。

## セキュリティと設定
- API キーやシークレットはコミットしない。現状は `src/data.ts` 内の同梱データのみ使用。
- 外部サービスを追加する場合は環境変数で設定し、必要値を PR で記述。変更に伴う手順があれば README か PR で共有。

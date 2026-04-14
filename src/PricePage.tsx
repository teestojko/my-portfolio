import React, { useState } from "react";
import "./price-page.css";
import { useNavigate } from "react-router-dom";

const categories = [
    { key: "crud", label: "💻 CRUD機能" },
    { key: "search", label: "🔍 検索＋フィルター" },
    { key: "laravel", label: "💻 Laravel" },
    { key: "docker", label: "Docker" },
    { key: "git", label: "Git" },
    { key: "file", label: "📺画像アップロード" },
    { key: "extra", label: "✅ 補足タスク" },
] as const;

const priceData = {
    crud: [
        {
            title: "一覧表示",
            desc: "DBからデータ取得＋Bladeテンプレート構成(簡易・5項目以下)",
            details: [
                { hours: "4h", price: "¥8,000" },
            ],
        },
        {
            title: "一覧表示",
            desc: "DBからデータ取得＋Bladeテンプレート構成(中規模・10項目前後)",
            details: [
                { hours: "6h", price: "¥12,000" },
            ],
        },
        {
            title: "一覧表示",
            desc: "DBからデータ取得＋Bladeテンプレート構成(複雑・リレーション含む)",
            details: [
                { hours: "8h", price: "¥16,000" },
            ],
        },
        {
            title: "登録機能",
            desc: "フォーム表示＋バリデーション＋保存処理",
            hours: "6h",
            price: "¥12,000",
        },
        {
            title: "編集機能",
            desc: "編集フォーム＋更新処理",
            hours: "6h",
            price: "¥12,000",
        },
        {
            title: "削除機能",
            desc: "ソフトデリート＋復元対応",
            hours: "3h",
            price: "¥6,000",
        },
    ],
    search: [
        {
            title: "検索フォーム作成（単一項目）",
            desc: "入力フォーム＋クエリパラメータ対応、GET送信、Controller処理",
            hours: "3h",
            price: "¥6,000",
        },
        {
            title: "複合条件検索フォーム",
            desc: "複数項目（例：名前＋日付＋カテゴリ）のAND/OR検索対応",
            hours: "5h",
            price: "¥10,000",
        },
        {
            title: "フィルター機能（カテゴリ/タグ）",
            desc: "カテゴリ・タグ等のプルダウン/チェックボックスによる絞り込み",
            hours: "4h",
            price: "¥8,000",
        },
        {
            title: "ページネーション対応",
            desc: "検索結果のページ分割（Laravel標準paginate）",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "ソート機能",
            desc: "昇順/降順・カスタム並び替え（カラム指定）対応",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "検索条件保持",
            desc: "ページネーションや再訪時に条件を保持（セッション・hidden入力）",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "部分一致・前方一致・完全一致対応",
            desc: "LIKE・=・REGEXPの切り替え対応",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "Ajax検索（非同期）",
            desc: "Axios/jQueryで入力即時反映、候補表示",
            hours: "3h",
            price: "¥8,000",
        },
    ],
    laravel: [
        {
            title: "Laravel初期設定",
            desc: ".env設定＋キー生成＋初期ルーティング",
            hours: "3h",
            price: "¥6,000",
        },
        {
            title: "マイグレーション作成",
            desc: "テーブル定義・カラム追加",
            hours: "2h(テーブル毎に)",
            price: "¥4,000~",
        },
        {
            title: "バリデーション追加",
            desc: "FormRequestでの検証",
            hours: "2h(ファイル毎に)",
            price: "¥4,000~",
        },
        {
            title: "Seeder作成",
            desc: "テストデータ投入",
            hours: "2h(ファイル毎に)",
            price: "¥4,000~",
        },
        {
            title: "権限管理",
            desc: "ユーザーロール別アクセス制御",
            hours: "10h",
            price: "¥20,000",
        },
        {
            title: "ER図の作成",
            desc: "DB構造の視覚化（draw.io等）",
            hours: "4~6h",
            price: "¥8,000~¥12,000",
        },
    ],
    docker: [
        {
            title: "Docker環境構築（ベース）",
            desc: "Dockerfile / docker-compose.yml 作成、基本サービス構成",
            hours: "4h",
            price: "¥8,000",
        },
        {
            title: "Laravel用PHPコンテナ設定",
            desc: "php.ini調整、Composerインストール、必要拡張モジュール導入",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "MySQLコンテナ設定",
            desc: "データ永続化設定（volume）、初期DB作成、接続確認",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "Nginxコンテナ設定",
            desc: "default.conf 作成、Laravel用ルーティング設定（public配下）",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "環境変数設定",
            desc: ".envファイル作成、APP_KEY生成、DB接続設定",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "動作確認 & デバッグ",
            desc: "コンテナ起動、ビルド確認、エラーログ確認",
            hours: "1h",
            price: "¥2,000",
        },
    ],
    git: [
        {
            title: "Git初期設定",
            desc: "リポジトリ作成、.gitignore設定、初期コミット",
            hours: "1h",
            price: "¥2,000",
        },
        {
            title: "Gitフロー構築",
            desc: "main / develop / feature ブランチ戦略設定、運用ルール作成",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "リモートリポジトリ連携",
            desc: "GitHub/GitLabの設定、SSHキー登録、push/pull動作確認",
            hours: "1h",
            price: "¥2,000",
        },
        {
            title: "Pull Request運用",
            desc: "PRテンプレート作成、レビュー手順作成、マージルール設定",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "タグ・リリース運用",
            desc: "バージョンタグ付与、リリースブランチ作成、CHANGELOG更新",
            hours: "1h",
            price: "¥2,000",
        },
        {
            title: "コンフリクト解消対応",
            desc: "競合発生時の調査・解消手順、再マージ",
            hours: "2h",
            price: "¥¥4,000",
        },
    ],
    file: [
        {
            title: "画像アップロード（単枚）",
            desc: "フォーム作成、バリデーション（形式・容量）、保存処理、表示設定",
            hours: "3h",
            price: "¥6,000",
        },
        {
            title: "複数枚アップロード",
            desc: "複数ファイル対応（3〜5枚）、配列バリデーション、保存・表示",
            hours: "5h",
            price: "¥10,000",
        },
        {
            title: "画像リサイズ・サムネイル生成",
            desc: "Intervention Image等を用いたリサイズ・サムネイル作成",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "外部ストレージ対応（S3等）",
            desc: "AWS S3接続設定、.env調整、ACL設定、表示URL管理",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "非同期アップロード対応",
            desc: "Axios/jQueryによるAjax送信、プレビュー表示",
            hours: "3h",
            price: "¥6,000",
        },
        {
            title: "ファイル削除処理",
            desc: "ストレージからの削除、DBパス削除、UI反映",
            hours: "1h",
            price: "¥2,000",
        },
    ],
    extra: [
        {
            title: "PHPUnitテスト作成（単体)",
            desc: "ControllerやUseCaseのUnitテスト,Mock使用・バリデーション・例外確認など含む",
            hours: "4h(機能毎に)",
            price: "¥8,000",
        },
        {
            title: "Featureテスト作成",
            desc: "複数の動作・権限確認などの流れを確認する機能テスト",
            hours: "6h(機能毎に)",
            price: "¥12,000",
        },
        {
            title: "API仕様書（Swagger or Scramble）",
            desc: "Laravel APIのエンドポイント仕様書作成",
            hours: "1h(エンドポイント毎に)",
            price: "¥2,000",
        },
        {
            title: "GitHub Actions導入",
            desc: "CI/CD設定",
            hours: "5h",
            price: "¥10,000",
        },
    ],
};

const PricePage: React.FC = () => {
    const [activeKey, setActiveKey] = useState<typeof categories[number]["key"]>("crud");

    const navigate = useNavigate();  // navigate関数を使用

    // 戻るボタンのクリックハンドラー
    const handleBackButton = () => {
        navigate(-1);  // 前のページに戻る
    };

    return (
        <div
            className="price-page"
            style={{
                background: `url(${import.meta.env.VITE_API_URL}/images/noise.png) repeat,
                            linear-gradient(135deg, #f9f9f9 0%, #858585 100%)`,
                backgroundBlendMode: "overlay"
            }}
            >
            <h1>単価一覧</h1>

            <div className="category-buttons">
                {categories.map((cat) => (
                <button
                    key={cat.key}
                    className={activeKey === cat.key ? "active" : ""}
                    onClick={() => setActiveKey(cat.key)}
                >
                    {cat.label}
                </button>
                ))}
            </div>

            <table className="price-table">
                <thead>
                <tr>
                    <th>タスク</th>
                    <th>詳細内容</th>
                    <th>工数</th>
                    <th>単価</th>
                </tr>
                </thead>
                <tbody>
                    {priceData[activeKey as keyof typeof priceData].map((item, i) => (
                        <React.Fragment key={i}>
                        {"details" in item && item.details
                            ? item.details.map((detail, j) => (
                                <tr key={`${i}-${j}`}>
                                <td>{item.title}</td>
                                <td>{item.desc}</td>
                                <td>{detail.hours}</td>
                                <td>{detail.price}</td>
                                </tr>
                            ))
                            : (
                                <tr>
                                <td>{item.title}</td>
                                <td>{item.desc}</td>
                                <td>{item.hours}</td>
                                <td>{item.price}</td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="back-button">
                <button onClick={handleBackButton} className="back-button-link">
                    Back
                </button>
            </div>

        </div>
    );
};

export default PricePage;

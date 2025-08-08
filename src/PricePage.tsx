import React, { useState } from "react";
import "./price-page.css";

// カテゴリ定義
const categories = [
    { key: "crud", label: "💻 CRUD機能" },
    { key: "search", label: "🔍 検索＋フィルター" },
    { key: "laravel", label: "💻 Laravel + Docker" },
    { key: "extra", label: "✅ 補足タスク" },
    { key: "complex", label: "📦 複合タスク" },
    { key: "rate", label: "👨‍💻 時間単価" },
] as const;

// 単価データ
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
                { hours: "4h", price: "16,000" },
            ],
        },
        {
            title: "登録機能",
            desc: "フォーム表示＋バリデーション＋保存処理()",
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
            title: "検索フォーム作成",
            desc: "入力フォーム＋クエリパラメータ対応",
            hours: "5h",
            price: "¥10,000",
        },
        {
            title: "フィルター機能",
            desc: "カテゴリ・タグなどの絞り込み",
            hours: "4h",
            price: "¥8,000",
        },
        {
            title: "ページネーション対応",
            desc: "検索結果のページ分割",
            hours: "2h",
            price: "¥4,000",
        },
    ],
    laravel: [
        {
            title: "Docker環境構築",
            desc: "Laravel + MySQL + Nginx",
            hours: "6h",
            price: "¥15,000",
        },
        {
            title: "Laravel初期設定",
            desc: ".env設定＋キー生成＋初期ルーティング",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "マイグレーション作成",
            desc: "テーブル定義・カラム追加",
            hours: "1h",
            price: "¥2,000",
        },
    ],
    extra: [
        {
            title: "バリデーション追加",
            desc: "FormRequestでの検証",
            hours: "2h",
            price: "¥4,000",
        },
        {
            title: "Seeder作成",
            desc: "テストデータ投入",
            hours: "1h",
            price: "¥2,000",
        },
        {
            title: "ファイルアップロード",
            desc: "画像保存＋パス管理",
            hours: "3h",
            price: "¥6,000",
        },
    ],
    complex: [
        {
            title: "複合機能実装",
            desc: "CRUD＋検索＋API連携",
            hours: "20h",
            price: "¥50,000",
        },
        {
            title: "権限管理",
            desc: "ユーザーロール別アクセス制御",
            hours: "10h",
            price: "¥25,000",
        },
    ],
    rate: [
        {
            title: "時間単価（スポット作業）",
            desc: "短時間対応・バグ修正",
            hours: "1h",
            price: "¥2,000",
        },
        {
            title: "長時間契約",
            desc: "10時間以上のまとまった作業",
            hours: "10h〜",
            price: "¥18,000〜",
        },
    ],
};

const PricePage: React.FC = () => {
    const [activeKey, setActiveKey] = useState<typeof categories[number]["key"]>("crud");

    return (
        <div className="price-page">
            <h1>単価一覧</h1>

            {/* カテゴリボタン */}
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

            {/* テーブル表示 */}
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
        </div>
    );
};

export default PricePage;

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./price-page.css";

const categories = [
  { key: "crud", label: "💻 CRUD機能" },
  { key: "search", label: "🔍 検索＋フィルター" },
  { key: "laravel", label: "💻 Laravel + Docker" },
  { key: "extra", label: "✅ 補足タスク" },
  { key: "complex", label: "📦 複合タスク" },
  { key: "rate", label: "👨‍💻 時間単価" },
] as const;

type CategoryKey = typeof categories[number]["key"];

type PriceItem = {
  title: string;
  desc: string;
  hours?: string;
  price?: string;
  details?: { type: string; hours: string; price: string }[];
};

const data: Record<CategoryKey, PriceItem[]> = {
  crud: [
    {
      title: "一覧表示",
      desc: "データ取得＋Bladeテンプレート構成",
      details: [
        { type: "簡易（5項目以下）", hours: "4h", price: "¥8,000" },
        { type: "中規模（10項目前後）", hours: "6h", price: "¥12,000" },
        { type: "複雑（リレーション含む）", hours: "8h", price: "¥16,000" },
      ],
    },
    { title: "登録画面 + POST処理", desc: "入力フォーム＋Requestバリデーション＋保存", hours: "6h", price: "¥12,000" },
    { title: "編集画面 + 更新処理", desc: "値の保持＋PUT処理＋バリデーション", hours: "6h", price: "¥12,000" },
    { title: "削除処理（Delete）", desc: "削除ボタン設置＋ソフトデリートor物理削除対応", hours: "3h", price: "¥6,000" },
    { title: "バリデーション設計", desc: "フィールド数3〜6個程度＋ルール（Request）", hours: "2h", price: "¥4,000〜" },
    { title: "テーブル構造（Migration,Seeder）", desc: "マイグレーション＋Seeder（Model数に応じて）", hours: "2h", price: "¥4,000〜" },
    { title: "モデル作成（Eloquent）", desc: "モデル定義＋fillable＋リレーション設定含む", hours: "2h", price: "¥4,000〜" },
  ],
  search: [
    { title: "単項目検索", desc: "Request取得 → クエリビルダに適用（LIKE or =）", hours: "1h", price: "¥2,000" },
    { title: "複数項目検索（AND）", desc: "AND条件で処理、バリデーション", hours: "2h〜", price: "¥4,000〜" },
    { title: "OR検索／複合条件", desc: "where(function($q){...}) 等で分岐制御", hours: "2〜4h", price: "¥4,000〜8,000" },
    { title: "セレクトボックスによるフィルター", desc: "フォーム作成、選択状態保持、条件分岐", hours: "3h", price: "¥8,000" },
    { title: "ページネーション", desc: "Laravelのpaginate()活用", hours: "2h", price: "¥5,000" },
    { title: "ソート機能", desc: "並び替え項目指定＋リンク生成、クエリ維持", hours: "2h", price: "¥5,000" },
    { title: "検索条件の保持", desc: "old()やrequest()による再表示", hours: "1h", price: "¥3,000" },
    { title: "Ajax検索", desc: "JS非同期送信＋Laravelルート分離＋JSON返却", hours: "6h", price: "¥15,000" },
  ],
  laravel: [
    { title: "管理画面一覧表示（簡易）", desc: "テーブル＋Blade構成、データ取得・表示中心", hours: "9h", price: "¥30,000" },
    { title: "ログイン／認証機能", desc: "Laravel Fortify等＋簡単バリデーション", hours: "18h", price: "¥60,000" },
    { title: "REST API作成", desc: "Laravel APIルート作成＋バリデーション＋JSONレスポンス", hours: "15h", price: "¥50,000" },
    { title: "Docker開発環境構築", desc: "docker-compose.yml＋PHP/MySQL/nginx設定", hours: "12〜18h", price: "¥40,000〜60,000" },
    { title: "画像アップロード", desc: "バリデーション、保存、パス管理、表示処理（ローカル or S3）", hours: "6h〜", price: "¥20,000〜" },
  ],
  extra: [
    { title: "単体テスト作成", desc: "Controller/UseCaseのUnitテスト バリデーション・例外確認", hours: "2〜4h", price: "¥5,000〜10,000" },
    { title: "Featureテスト作成", desc: "複数動作・権限確認などの機能テスト", hours: "4〜6h", price: "¥10,000〜15,000" },
  ],
  complex: [
    { title: "支払い履歴画面", desc: "一覧＋検索＋詳細表示＋制限", price: "¥100,000〜150,000" },
    { title: "会員登録〜マイページ機能", desc: "登録・編集・退会・プロフィール", price: "¥100,000〜200,000" },
    { title: "API連携データ取得画面", desc: "外部API呼び出し＋一覧表示", price: "¥80,000〜120,000" },
  ],
  rate: [
    { title: "時間単価", desc: "時給（税込） ¥2,500〜¥3,000 / 月 ¥400,000〜480,000" },
  ],
};

const PricePage: React.FC = () => {
  const [activeCat, setActiveCat] = useState<CategoryKey>("crud");

  return (
    <div className="price-page">
      <h1>機能別 単価表</h1>

      {/* タブ */}
      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={activeCat === cat.key ? "active" : ""}
            onClick={() => setActiveCat(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      >
        {data[activeCat].map((item, index) => (
          <SwiperSlide key={index}>
            <div className="price-card">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              {item.details ? (
                <ul>
                  {item.details.map((d, i) => (
                    <li key={i}>
                      {d.type} — {d.hours} / {d.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {item.hours && <p>⏱ {item.hours}</p>}
                  {item.price && <p>💰 {item.price}</p>}
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PricePage;

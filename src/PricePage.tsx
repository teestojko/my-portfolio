import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./price-page.css";

const PricePage: React.FC = () => {
  const crudItems = [
    {
      title: "一覧表示",
      description: "データ取得＋Bladeテンプレート構成",
      detail: [
        { type: "簡易（5項目以下）", hours: "4h", price: "¥8,000" },
        { type: "中規模（10項目前後）", hours: "6h", price: "¥12,000" },
        { type: "複雑（リレーション含む）", hours: "8h", price: "¥16,000" },
      ],
    },
    {
      title: "登録画面の表示 + POST処理",
      description: "入力フォーム＋Requestバリデーション＋保存",
      hours: "6h",
      price: "¥12,000",
    },
    {
      title: "編集画面の表示 + 更新処理",
      description: "値の保持＋PUT処理＋バリデーション",
      hours: "6h",
      price: "¥12,000",
    },
    {
      title: "削除処理（Delete）",
      description: "削除ボタン設置＋ソフトデリートor物理削除対応",
      hours: "3h",
      price: "¥6,000",
    },
  ];

  const optionItems = [
    { title: "Ajax／非同期読み込み対応", price: "＋¥8,000" },
    { title: "表示項目が10項目以上", price: "＋¥4,000（CRUD毎）" },
    { title: "複数リレーション（親子関係等）", price: "＋¥3,000〜" },
    { title: "ボタン（編集・削除）付き行アクション", price: "各＋¥1,000" },
  ];

  return (
    <div className="price-page">
      <h1>💻 CRUD機能 単価表</h1>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {crudItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="price-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.detail ? (
                <ul>
                  {item.detail.map((d, i) => (
                    <li key={i}>
                      <strong>{d.type}</strong> — {d.hours} / {d.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <strong>{item.hours}</strong> / {item.price}
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <h2 className="option-title">🧩 オプション価格</h2>
      <div className="option-list">
        {optionItems.map((opt, i) => (
          <div key={i} className="option-item">
            <span>{opt.title}</span>
            <span>{opt.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "./furima-page.css";
import "swiper/css/pagination";

const FurimaPage: React.FC = () => {
  const navigate = useNavigate();  // navigate関数を使用

  // 戻るボタンのクリックハンドラー
  const handleBackButton = () => {
    navigate(-1);  // 前のページに戻る
  };
  return (
    <div className="furima">
      <div className="furima-title">
        ネットショッピングアプリ
      </div>
      {/* Swiperで横スクロール */}
      <div className="furima-img-all">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >

          <SwiperSlide><img className="furima-img" src="/images/furima-index.png" alt="furima-index" /></SwiperSlide>
          <SwiperSlide><img className="furima-img" src="/images/furima-navi.png" alt="furima-navi" /></SwiperSlide>
          <SwiperSlide><img className="furima-img" src="/images/furima-detail.png" alt="furima-detail" /></SwiperSlide>
          <SwiperSlide><img className="furima-img" src="/images/furima-search.png" alt="furima-search" /></SwiperSlide>
        </Swiper>
      </div>
      <div className="furima-text-all">
        <ul className="furima-ul">
          <li className="furima-text-page">
            出品商品一覧、詳細、出品、プロフィール、カート、レビューページ &マイページ
          </li>
          <li className="furima-text-page">
            管理者用ページ
          </li>
          <li className="furima-text">
            fortifyのメール認証を使用したログイン機能
          </li>
          <li className="furima-text">
            購入履歴、販売履歴表示
          </li>
          <li className="furima-text">
            レビュー画面で商品評価機能
          </li>
          <li className="furima-text">
            カテゴリー、商品名、価格帯、価格帯、人気順での検索機能
          </li>
          <li className="furima-text">
            出品者、購入者でメッセージ機能
          </li>
          <li className="furima-text">
            お気に入り商品を追加機能
          </li>
          <li className="furima-text">
            画像をストレージに保存機能
          </li>
          <li className="furima-text">
            クーポン使用機能
          </li>
          <li className="furima-text">
            クーポン、手数料を含めたStripe決済機能
          </li>
          <li className="furima-text">
            AWSのEC2,RDS,S3を使用した、アプリのデプロイ
          </li>
          <li className="furima-text">
            クーポン作成機能
          </li>
        </ul>
      </div>
      <div className="back-button">
        <button onClick={handleBackButton} className="back-button-link">
          Back
        </button>
      </div>
    </div>
  );
}

export default FurimaPage;

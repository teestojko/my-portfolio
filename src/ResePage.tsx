import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./rese-page.css";

const ResePage: React.FC = () => {
  const navigate = useNavigate(); // navigate関数を使用

  // 戻るボタンのクリックハンドラー
  const handleBackButton = () => {
    navigate(-1); // 前のページに戻る
  };

  return (
    <div className="rese">
      <div className="rese-title">飲食店予約アプリ</div>
      {/* <div className="rese-img-all">
        <img className="rese-img" src="/images/shop-detail.png" alt="Shop Detail" />
        <img className="rese-img" src="/images/rese-my-page.png" alt="My Page" />
      </div> */}
      {/* Swiperで横スクロール */}
        <div className="furima-img-all">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}  // 一度に表示するスライドを1つに固定
            navigation={true}  // クリックでスライド
            grabCursor={false} // カーソル変更を無効化
            modules={[Navigation]} // 遅延読み込みを追加
        >
          <SwiperSlide>
            <img className="rese-img" src="/images/rese.png" alt="Rese" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="rese-img" src="/images/rese-stripe.png" alt="Rese Stripe" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="rese-img" src="/images/rese-evaluation.png" alt="Rese Evaluation" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="rese-img" src="/images/rese-shop-detail.png" alt="Shop Detail" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="rese-img" src="/images/rese-my-page.png" alt="My Page" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="rese-text-all">
        <ul className="rese-ul">
          <li className="rese-text-page">飲食店一覧、詳細、レビューページ &マイページ</li>
          <li className="rese-text-page">管理者用ページ</li>
          <li className="rese-text-page">店舗代表者用ページ</li>
          <li className="rese-text-page-none"></li>
          <li className="rese-text">Fortifyのメール認証を使用したログイン機能</li>
          <li className="rese-text">レビュー画面で店舗評価機能</li>
          <li className="rese-text">エリア、ジャンル、名前検索、並べ替え機能</li>
          <li className="rese-text">お気に入り機能</li>
          <li className="rese-text">予約当日の朝に、予約情報のリマインダー送信機能</li>
          <li className="rese-text">店舗照合用のQRコードの表示機能</li>
          <li className="rese-text">Stripe決済機能</li>
          <li className="rese-text">AWSのEC2, RDS, S3を使用したアプリのデプロイ</li>
          <li className="rese-text">店舗代表者作成機能</li>
          <li className="rese-text">ユーザーにメール送信機能</li>
          <li className="rese-text">店舗作成、変更機能</li>
        </ul>
      </div>
      <div className="back-button">
        <button onClick={handleBackButton} className="back-button-link">
          Back
        </button>
      </div>
    </div>
  );
};

export default ResePage;

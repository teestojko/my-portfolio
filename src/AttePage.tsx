import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./atte-page.css";

const AttePage: React.FC = () => {
  const navigate = useNavigate();  // navigate関数を使用

  // 戻るボタンのクリックハンドラー
  const handleBackButton = () => {
    navigate(-1);  // 前のページに戻る
  };

  return (
    <div className="atte">
      <div className="atte-title">
        ネットショッピングアプリ
      </div>

      {/* Swiperで横スクロール */}
      <div className="atte-img-all">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}  // 一度に表示するスライドを1つに固定
          navigation={true}  // クリックでスライド
          grabCursor={false} // カーソル変更を無効化
          modules={[Navigation]} // 遅延読み込みを追加
        >
          <SwiperSlide>
            <img className="atte-img" src="/images/atte-index.png" alt="atte-index" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="atte-img" src="/images/atte-date-list.png" alt="atte-date-list" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="atte-img" src="/images/atte-user-list.png" alt="atte-user-list" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="atte-img" src="/images/atte-user-data.png" alt="atte-user-data" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="atte-text-all">
        <ul className="atte-ul">
          <li className="atte-text-page">出品商品一覧、詳細、出品、プロフィール、カート、レビューページ &マイページ</li>
          <li className="atte-text-page">管理者用ページ</li>
          <li className="atte-text">Fortifyのメール認証を使用したログイン機能</li>
          <li className="atte-text">購入履歴、販売履歴表示</li>
          <li className="atte-text">レビュー画面で商品評価機能</li>
          <li className="atte-text">カテゴリー、商品名、価格帯、人気順での検索機能</li>
          <li className="atte-text">出品者、購入者でメッセージ機能</li>
          <li className="atte-text">お気に入り商品を追加機能</li>
          <li className="atte-text">画像をストレージに保存機能</li>
          <li className="atte-text">クーポン使用機能</li>
          <li className="atte-text">クーポン、手数料を含めたStripe決済機能</li>
          <li className="atte-text">クーポン作成機能</li>
          <li className="atte-text">ポイント機能</li>
          <li className="atte-text">通報機能</li>
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

export default AttePage;





import React, { useEffect, useRef }  from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./furima-page.css";

const FurimaPage: React.FC = () => {
  const navigate = useNavigate();  // navigate関数を使用

  // 戻るボタンのクリックハンドラー
  const handleBackButton = () => {
    navigate(-1);  // 前のページに戻る
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const bubbleLifeTime = 20;
    const noOfBubbles = 100;

    const init = () => {
      for (let i = 0; i < noOfBubbles; i++) {
        wrapperRef.current!.appendChild(createBubble());
      }
    };

    const createBubble = () => {
      const circleContainer = document.createElement("div");
      circleContainer.classList.add("circle_container");
      circleContainer.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
      circleContainer.appendChild(createCircle());
      return circleContainer;
    };

    const createCircle = () => {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.animationDelay = `${Math.random() * bubbleLifeTime}s`;
      const side = `${5 + Math.floor(Math.random() * 5)}px`;
      circle.style.width = side;
      circle.style.height = side;
      return circle;
    };

    init();
  }, []);

  return (
    <div className="furima">
      <div className="wrapper" ref={wrapperRef}>
      <div className="furima-title">
        ネットショッピングアプリ
      </div>

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
            <img className="furima-img" src="/images/furima-index.png" alt="furima-index" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="furima-img" src="/images/furima-navi.png" alt="furima-navi" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="furima-img" src="/images/furima-detail.png" alt="furima-detail" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="furima-img" src="/images/furima-search.png" alt="furima-search" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="furima-text-all">
        <ul className="furima-ul">
          <li className="furima-text-page">出品商品一覧、詳細、出品、プロフィール、カート、レビューページ &マイページ</li>
          <li className="furima-text-page">管理者用ページ</li>
          <li className="furima-text">Fortifyのメール認証を使用したログイン機能</li>
          <li className="furima-text">購入履歴、販売履歴表示</li>
          <li className="furima-text">レビュー画面で商品評価機能</li>
          <li className="furima-text">カテゴリー、商品名、価格帯、人気順での検索機能</li>
          <li className="furima-text">出品者、購入者でメッセージ機能</li>
          <li className="furima-text">お気に入り商品を追加機能</li>
          <li className="furima-text">画像をストレージに保存機能</li>
          <li className="furima-text">クーポン使用機能</li>
          <li className="furima-text">クーポン、手数料を含めたStripe決済機能</li>
          <li className="furima-text">クーポン作成機能</li>
          <li className="furima-text">ポイント機能</li>
          <li className="furima-text">通報機能</li>
        </ul>
      </div>

      <div className="back-button">
        <button onClick={handleBackButton} className="back-button-link">
          Back
        </button>
        </div>
        </div>
    </div>
  );
}

export default FurimaPage;





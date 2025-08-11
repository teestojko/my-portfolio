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

        <div className="night-ocean">
          {/* 星空 */}
          <div className="stars-bg">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="atte-title">
            勤怠管理アプリ
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

          <div className="back-button">
            <button onClick={handleBackButton} className="back-button-link">
            Back
            </button>
          </div>

        <div className="atte-text-all">
            <ul className="atte-ul">
            <li className="atte-text">fortifyログイン機能</li>
            <li className="atte-text">出勤、退勤、休憩開始、休憩終了の打刻機能</li>
            <li className="atte-text">出勤時間から休憩時間を引いた実質労働時間の保存機能</li>
            <li className="atte-text">日付別勤怠管理ページ</li>
            <li className="atte-text">ユーザー一覧ページ</li>
            <li className="atte-text">ユーザー別勤怠管理ページ</li>
            </ul>
        </div>
      </div>
    );
}

export default AttePage;





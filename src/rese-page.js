import React from "react";
import "./rese-page.css";

function ResePage() {
  return (
    <div className="rese">
      <div className="rese-img-all">
        <img className="rese-img" src="/images/shop-detail.png" alt="shop-detail" />
        <img className="rese-img" src="/images/my-page.png" alt="my-page" />
      </div>
      <div className="rese-text-all">
        <ul className="rese-ul">
          <li className="rese-text-page">
            飲食店一覧、詳細、レビューページ &マイページ
          </li>
          <li className="rese-text-page">
            管理者用ページ
          </li>
          <li className="rese-text">
            fortifyのメール認証を使用したログイン機能
          </li>
          <li className="rese-text">
            飲食店予約機能
          </li>
          <li className="rese-text">
            レビュー画面で店舗評価機能
          </li>
          <li className="rese-text">
            エリア、ジャンル、名前検索
          </li>
          <li className="rese-text">
            レビュー評価順に並べ替え機能
          </li>
          <li className="rese-text">
            お気に入り店舗を追加機能
          </li>
          <li className="rese-text">
            画像をストレージに保存機能
          </li>
          <li className="rese-text">
            予約当日の朝に、予約情報のリマインダー送信機能
          </li>
          <li className="rese-text">
            店舗照合用のQRコードの表示機能
          </li>
          <li className="rese-text">
            Stripe決済機能
          </li>
          <li className="rese-text">
            AWSのEC2,RDS,S3を使用した、アプリのデプロイ
          </li>
          <li className="rese-text">
            店舗代表者作成機能
          </li>
          <li className="rese-text">
            ユーザーにメール送信機能
          </li>
          <li className="rese-text-page">
            店舗代表者用ページ
          </li>
          <li className="rese-text">
            店舗作成機能
          </li>
          <li className="rese-text">
            店舗情報変更機能
          </li>
          <li className="rese-text">
            予約一覧表示
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ResePage;

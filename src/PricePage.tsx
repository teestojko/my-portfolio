import React from "react";
import "./price-page.css";

const priceData = {
  crud: [
    {
      title: "一覧表示",
      desc: "データ取得＋Bladeテンプレート構成",
      details: [
        { type: "簡易・5項目以下", hours: "4h", price: "¥8,000" },
        { type: "中規模・10項目前後", hours: "6h", price: "¥12,000" },
        { type: "複雑・リレーション含む", hours: "8h", price: "¥16,000" },
      ],
    },
    {
      title: "登録画面の表示 + POST処理",
      desc: "入力フォーム＋Requestバリデーション＋保存",
      hours: "6h",
      price: "¥12,000",
    },
    {
      title: "編集画面の表示 + 更新処理",
      desc: "値の保持＋PUT処理＋バリデーション",
      hours: "6h",
      price: "¥12,000",
    },
    {
      title: "削除処理（Delete）",
      desc: "削除ボタン設置＋ソフトデリートor物理削除対応",
      hours: "3h",
      price: "¥6,000",
    },
  ],
  option: [
    { type: "Ajax／非同期読み込み対応（jQuery/Axios）", price: "＋¥8,000" },
    { type: "表示項目が10項目以上", price: "＋¥4,000（CRUD毎に）" },
    { type: "リレーションが複数存在する（親子関係等）", price: "＋¥3,000〜" },
    { type: "ボタン（編集・削除）付き行アクション", price: "各＋¥1,000" },
  ],
};

const PricePage: React.FC = () => {
  return (
    <div className="price-page">
      <h1>💻 CRUD機能 単価一覧</h1>

      {/* CRUD機能テーブル */}
      <h2>CRUD機能</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>タスク</th>
            <th>詳細内容</th>
            <th>工数目安</th>
            <th>単価（税込）</th>
          </tr>
        </thead>
        <tbody>
          {priceData.crud.map((item, idx) =>
            item.details ? (
              item.details.map((detail, dIdx) => (
                <tr key={`${idx}-${dIdx}`}>
                  {dIdx === 0 && (
                    <>
                      <td rowSpan={item.details.length}>{item.title}</td>
                      <td rowSpan={item.details.length}>{item.desc}</td>
                    </>
                  )}
                  <td>{detail.hours}</td>
                  <td>{detail.price}</td>
                </tr>
              ))
            ) : (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.hours}</td>
                <td>{item.price}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* オプション価格 */}
      <h2>🧩 条件追加オプション価格</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>オプション内容</th>
            <th>加算目安</th>
          </tr>
        </thead>
        <tbody>
          {priceData.option.map((opt, idx) => (
            <tr key={idx}>
              <td>{opt.type}</td>
              <td>{opt.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricePage;

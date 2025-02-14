import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ResePage from "./ResePage";
import FurimaPage from "./FurimaPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // 型アサーションを追加
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rese" element={<ResePage />} />
        <Route path="/furima" element={<FurimaPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// Web Vitals を測定（必要に応じて変更）
reportWebVitals(console.log);

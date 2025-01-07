import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { useTextAnimation } from "./changeText";
import MovingCube from "./movingCube";
import { randomizeLights } from "./lightEffect";
import { useScrollEffect } from "./scroll";
import useMoveWorks from "./moveWorks";
import ProfileChangeText from "./profileChangeText";
import ResePage from "./pages/ResePage";  // ResePageコンポーネントを作成してインポート
import FurimaPage from "./pages/FurimaPage";  // FurimaPageコンポーネントを作成してインポート

function App() {
  const backgroundRef = useRef(null);
  const workTitleRef = useRef(null);
  const worksRef = useRef(null);
  const skillRef = useRef(null);
  const contactRef = useRef(null);

  // スムーズスクロールを実現する関数
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth", // スムーズスクロールを有効化
      });
    }
  };

  // カスタムフックでテキストアニメーションを制御
  const animatedText = useTextAnimation("portfolio", "web engineer\nTetsuya Kishi", 4000, 100);

  useEffect(() => {
    // 光のエフェクトを初期化
    randomizeLights();
  }, []);

  useScrollEffect(backgroundRef);
  useMoveWorks(workTitleRef);

  return (
    <Router>
      <div className="portfolio">
        <nav className="fixed-menu">
          <ul>
            <li onClick={() => scrollToSection(backgroundRef)}>Profile</li>
            <li onClick={() => scrollToSection(worksRef)}>Works</li>
            <li onClick={() => scrollToSection(skillRef)}>Skill</li>
            <li onClick={() => scrollToSection(contactRef)}>Contact</li>
          </ul>
        </nav>
        <div className="scene-container">
          <MovingCube />
          <div className="scene-text">{animatedText}</div>
        </div>
        <div ref={backgroundRef} className="custom-background">
          <div className="profile-container">
            <h1>profile</h1>
            <ProfileChangeText />
          </div>
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="light-effect"></div>
          ))}
        </div>
        <div ref={worksRef} className="section profile-section">
          <div ref={workTitleRef} className="work-container-inner">
            <h1 className="work-container-title">
              {["w", "o", "r", "k", "s"].map((char, index) => (
                <span className="title-animation" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                  {char}
                </span>
              ))}
            </h1>
            <div className="work-container-img-all">
              <Link to="/rese">
                <img className="work-container-img" src="/rese.png" alt="rese" />
              </Link>
              <Link to="/furima">
                <img className="work-container-img" src="/furima.png" alt="furima" />
              </Link>
            </div>
          </div>
        </div>
        <div ref={skillRef} className="section skill-section">
          <div className="skill-content">
            <h1>SKILL</h1>
          </div>
        </div>
        <div ref={contactRef} className="section contact-section">
          <h1>Contact</h1>
          <p>Email: 7195.teesu.1031@gmail.com</p>
        </div>
      </div>

      {/* ルート定義 */}
      <Routes>
        <Route path="/rese" element={<ResePage />} />
        <Route path="/furima" element={<FurimaPage />} />
      </Routes>
    </Router>
  );
}

export default App;

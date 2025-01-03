import React, { useRef, useEffect } from "react";
import "./App.css";
import { useTextAnimation } from "./changeText";
import MovingCube from "./movingCube";
import { randomizeLights } from "./lightEffect";
import { useScrollEffect } from "./scroll";
import useMoveWorks from "./moveWorks";

function App() {
  const backgroundRef = useRef(null);
  const workTitleRef = useRef(null);
  const worksRef = useRef(null);
  const profileRef = useRef(null);
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
    <>
      <nav className="fixed-menu">
        <ul>
          <li onClick={() => scrollToSection(worksRef)}>Works</li>
          <li onClick={() => scrollToSection(profileRef)}>Profile</li>
          <li onClick={() => scrollToSection(contactRef)}>Contact</li>
        </ul>
      </nav>
      <div className="scene-container">
        <MovingCube />
        <div className="scene-text">{animatedText}</div>
      </div>
      <div ref={backgroundRef} className="custom-background">
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
            <img className="work-container-img" src="/images/rese.png" alt="rese" />
            <img className="work-container-img" src="/images/furima.png" alt="furima" />
          </div>
        </div>
      </div>
      <div ref={profileRef} className="section profile-section">
        
      </div>
      <div ref={contactRef} className="section contact-section">
        
      </div>
    </>
  );
}

export default App;



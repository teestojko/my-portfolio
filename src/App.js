import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { useTextAnimation } from "./changeText";
import MovingCube from "./movingCube";
import { randomizeLights } from "./lightEffect";
import { useScrollEffect } from "./scroll";
import useMoveWorks from "./moveWorks";
import ProfileChangeText from "./profileChangeText";

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
      {/* <div ref={worksRef} className="section profile-section">
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
              <img className="work-container-img" src="/images/rese.png" alt="rese" />
            </Link>
            <Link to="/furima">
              <img className="work-container-img" src="/images/furima.png" alt="furima" />
            </Link>
          </div>
        </div>
      </div> */}


      <div ref={worksRef} className="section profile-section">
        <div ref={workTitleRef} className="work-container-inner">


          <div className="svg-container">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                {/* 花びら用グラデーション */}
                <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "rgb(255,211,0)", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "rgb(255,165,0)", stopOpacity: 1 }}
                  />
                </linearGradient>

                {/* 種の部分用グラデーション */}
                <radialGradient id="seedGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{ stopColor: "rgb(139,69,19)", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "rgb(85,53,30)", stopOpacity: 1 }} />
                </radialGradient>

                {/* ぼやけ効果のフィルター */}
                <filter id="blurFilter" x="0" y="0" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
                </filter>
              </defs>

              {/* 全体にぼやけ効果を適用 */}
              <g filter="url(#blurFilter)">
                {/* 花びら */}
                <g transform="translate(50,50)">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <path
                      key={i}
                      d="M0,-30 Q5,-15 0,0 Q-5,-15 0,-30"
                      fill="url(#petalGrad)"
                      transform={`rotate(${i * 15})`}
                    />
                  ))}
                </g>

                {/* 種の部分 */}
                <circle cx="50" cy="50" r="10" fill="url(#seedGrad)" />
              </g>
            </svg>
          </div>





          <h1 className="work-container-title">
            {["w", "o", "r", "k", "s"].map((char, index) => (
              <span
                className="title-animation"
                key={index}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
          <div className="work-container-img-all">
            <Link to="/rese">
              <img className="work-container-img" src="/images/rese.png" alt="rese" />
            </Link>
            <Link to="/furima">
              <img className="work-container-img" src="/images/furima.png" alt="furima" />
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
  );
}

export default App;

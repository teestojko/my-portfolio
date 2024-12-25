import { useState, useEffect } from "react";
import LightEffects from "./LightEffects";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "images/underwater.jpg",
    "images/sky.jpg",
  ];
  const texts = [
    { comment: "今よりも\nより良い明日へ", credit: "Photo by Cristian Palmer on Unsplash" },
    { comment: "共に新たな創造を...", credit: "Photo by Sam Schooler on Unsplash" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]); // 依存配列に images.length を追加


  return (
    <div className="portfolio">
      <div className="portfolio_inner">
        {/* <img src={images[currentIndex]} alt="Portfolio" className="active" /> */}
        <div className="image-container">
        {images.map((src, index) => (
          <img
            key={index}
            src={src} // 直接 src を使用
            alt={`Image ${index + 1}`} // 任意の alt テキスト
            className={index === currentIndex ? "active" : ""}
          />
        ))}
    </div>
        <div className="text-overlay active">
          <div className="portfolio_comment">{texts[currentIndex].comment}</div>
          <div className="image_credit">{texts[currentIndex].credit}</div>
        </div>

        {/* 光のエフェクトを追加 */}
        <LightEffects />

        <div className="custom-background">
          <div className="overlay-content">
            <div className="portfolio_company">
              <p className="company_message hidden">あなたの作りたいを<br />叶えます</p>
              <p className="company_title hidden">web engineer<br />Tetsuya Kishi</p>
            </div>
          </div>
        </div>

        <div className="extra-content hidden">
          <svg id="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            {/* SVGコンテンツをここに追加 */}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;

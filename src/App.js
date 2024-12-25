import useImageChanger from "./utils/changeImage";
import LightEffects from "./LightEffects";
import "./App.css";

function App() {
  const images = [
    "/images/underwater.jpg",
    "/images/sky.jpg",
  ];
  const texts = [
    { comment: "今よりも\nより良い明日へ", credit: "Photo by Cristian Palmer on Unsplash" },
    { comment: "共に新たな創造を...", credit: "Photo by Sam Schooler on Unsplash" },
  ];

  const { currentImage, currentText, currentIndex } = useImageChanger(images, texts, 3000);

  return (
    <div className="portfolio">
      <div className="portfolio_inner">
        <div className="image-container">
          {images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt="Portfolio" 
              className={`image-container-img ${currentIndex === index ? 'active' : ''}`} 
            />
          ))}
        </div>
        {/* <div className="image-container">
          <img src={currentImage} alt="Portfolio" className="image-container-img" />
        </div> */}
        <div className="text-overlay active">
          <div className="portfolio_comment">{currentText.comment}</div>
          <div className="image_credit">{currentText.credit}</div>
        </div>
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

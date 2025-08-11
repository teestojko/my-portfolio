import React, { useRef, useEffect } from "react";
import "./App.css";
import { useTextAnimation } from "./changeText";
import MovingCube from "./movingCube";
import { randomizeLights } from "./lightEffect";
import { useScrollEffect } from "./scroll";
import ProfileChangeText from "./profileChangeText";
import SlideDisplay from './SlideDisplay';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs, faLaravel, faPhp, faDocker,
  faVuejs, faHtml5, faReact, faAws, faGithub
} from "@fortawesome/free-brands-svg-icons";

const App: React.FC = () => {
  // useRef に型を指定
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const worksRef = useRef<HTMLDivElement | null>(null);
  const skillRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth", // スムーズスクロールを有効化
      });
    }
  };

  // カスタムフックでテキストアニメーションを制御
  const animatedText: string = useTextAnimation("portfolio", "web engineer\nTetsuya Kishi", 4000, 100);

  useEffect(() => {
    // 光のエフェクトを初期化
    randomizeLights();
  }, []);

  useScrollEffect(backgroundRef);

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
      <div ref={backgroundRef} className="section custom-background">
        <div className="profile-container">
          <div className="profile-title">profile</div>
          <ProfileChangeText />
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="light-effect"></div>
        ))}
      </div>

      <div ref={worksRef} className="section work-section">
          <h1 className="work-container-title">
            WORKS
          </h1>
        {/* <div className="work-container-img-all">
          <Link className="link atte-link" to="/atte">
              <img className="work-container-img" src="/images/atte-index.png" alt="atte" />
            </Link>
            <Link className="link rese-link" to="/rese">
              <img className="work-container-img" src="/images/rese.png" alt="rese" />
            </Link>
            <Link className="link furima-link" to="/furima">
              <img className="work-container-img" src="/images/furima.png" alt="furima" />
            </Link>
            <div className="price-content">
              <Link className="link price-link" to="/price">
                  単価のご相談をされたい方はこちら
              </Link>
            </div>
          </div> */}
        <SlideDisplay />
      </div>

      <div ref={skillRef} className="section skill-section">
        <div className="skill-content">
          <h1 className="skill-title">SKILL</h1>


          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
          <div className="shape shape5"></div>
          <div className="icon-all">
            <div className="skill-item">
              <div className="skill-name">
                Javascript
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faJs} style={{ color: "#FFD43B" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                Laravel
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faLaravel} style={{ color: "#FF2D20" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                php
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faPhp} style={{ color: "#FFD43B" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                Docker
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faDocker} style={{ color: "#19325d" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                Vue.js
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faVuejs} style={{ color: "#41B883" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                HTML/CSS
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faHtml5} style={{ color: "#E34F26" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                React
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faReact} style={{ color: "#61DAFB" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                AWS
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faAws} style={{ color: "#4b1aff" }} />
            </div>
            <div className="skill-item">
              <div className="skill-name">
                Github
              </div>
              <FontAwesomeIcon className="skill-icon" icon={faGithub} style={{ color: "#15003d" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="contact">
        <div ref={contactRef} className="section contact-section">
          <div>
            <h1 className="contact-title">Contact</h1>
            <div>
              Email: <a className="contact-mail" href="mailto:7195.teesu.1031@gmail.com">7195.teesu.1031@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

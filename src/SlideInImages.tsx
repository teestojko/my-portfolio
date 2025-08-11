import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function SlideInImages() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    imagesRef.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="work-container-img-all">

      <div className="content atte-content">
        <Link className="link atte-link" to="/atte">
          <img
            ref={(el) => { imagesRef.current[0] = el }}
            className="work-container-img"
            src="/images/atte-index.png"
            alt="atte"
          />
        </Link>
      </div>
      <div className="content rese-content">
        <Link className="link rese-link" to="/rese">
          <img
            ref={(el) => { imagesRef.current[1] = el }}
            className="work-container-img"
            src="/images/rese.png"
            alt="rese"
          />
        </Link>
      </div>
      <div className="content furima-content">
        <Link className="link furima-link" to="/furima">
          <img
            ref={(el) => { imagesRef.current[2] = el }}
            className="work-container-img"
            src="/images/furima.png"
            alt="furima"
          />
        </Link>
      </div>
      <div className="content price-content">
        <Link className="link price-link" to="/price">
          単価のご相談をされたい方はこちら
        </Link>
      </div>
    </div>
  );
}

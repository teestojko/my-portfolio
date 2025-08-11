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

  const images = [
    { to: "/atte", src: "/images/atte-index.png", alt: "atte" },
    { to: "/rese", src: "/images/rese.png", alt: "rese" },
    { to: "/furima", src: "/images/furima.png", alt: "furima" },
  ];

  return (
    <div className="work-container-img-all">
      {images.map((image, index) => {
        const slideClass = index % 2 === 0 ? "left" : "right"; // 偶数なら左、奇数なら右
        return (
          <Link
            className={`link ${slideClass}-link`}
            to={image.to}
            key={index}
          >
            <img
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              className={`work-container-img ${slideClass}`}
              src={image.src}
              alt={image.alt}
            />
          </Link>
        );
      })}
      <div className="price-content">
        <Link className="link price-link" to="/price">
          単価のご相談をされたい方はこちら
        </Link>
      </div>
    </div>
  );
}

// import { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

// export default function SlideDisplay() {
//     const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add("show");
//                     observer.unobserve(entry.target); // 1回だけアニメーション
//                 }
//             });
//         },
//         { threshold: 0.2 }
//         );

//         imagesRef.current.forEach((img) => {
//             if (img) observer.observe(img);
//         });

//         return () => observer.disconnect();
//     }, []);

//     return (
//         <div className="work-container-img-all">
//             <Link className="link atte-link" to="/atte">
//                 <img
//                     ref={(el) => { imagesRef.current[0] = el }}
//                     className="work-container-img"
//                     src="/images/atte-index.png"
//                     alt="atte"
//                 />
//             </Link>
//             <Link className="link rese-link" to="/rese">
//                 <img
//                     ref={(el) => { imagesRef.current[1] = el }}
//                     className="work-container-img"
//                     src="/images/rese.png"
//                     alt="rese"
//                 />
//             </Link>
//             <Link className="link furima-link" to="/furima">
//                 <img
//                     ref={(el) => { imagesRef.current[2] = el }}
//                     className="work-container-img"
//                     src="/images/furima.png"
//                     alt="furima"
//                 />
//             </Link>
//             <div className="price-content">
//                 <Link className="link price-link" to="/price">
//                     単価のご相談をされたい方はこちら
//                 </Link>
//             </div>
//         </div>
//     );
// }

import { useEffect, useRef } from "react";

type SlideInImagesProps = {
  images: { src: string; alt?: string }[];
  gap?: string; // 画像の間隔 (例: "50px")
  width?: string; // 画像の幅
  height?: string; // 画像の高さ
};

export default function SlideInImages({
  images,
  gap = "50px",
  width = "400px",
  height = "350px",
}: SlideInImagesProps) {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // 一度表示したら監視解除
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
    <div
      className="work-container-img-all"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap,
        width: "100%",
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          ref={(el) => {
            imagesRef.current[index] = el;
          }}
          src={image.src}
          alt={image.alt || ""}
          className="work-container-img"
          style={{
            width,
            height,
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            opacity: 0,
            transform: "translateY(50px)",
            transition: "transform 0.6s ease, opacity 0.6s ease",
          }}
        />
      ))}
    </div>
  );
}

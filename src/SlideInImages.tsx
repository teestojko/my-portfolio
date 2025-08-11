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
        />
      ))}
    </div>
  );
}

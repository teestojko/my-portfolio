import React, { useRef, useEffect } from "react";

const WorkLight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // `getContext` が失敗する可能性を考慮

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();

    // 粒のプロパティ
    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1, // 半径を少し大きめに
      opacity: Math.random() * 0.8 + 0.2, // 少し明るめの初期透明度
      opacityChange: (Math.random() * 0.02) - 0.01,
      glowSize: Math.random() * 10 + 5, // グローの大きさ
    }));

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // 透明度の変更
        particle.opacity += particle.opacityChange;
        if (particle.opacity <= 0 || particle.opacity >= 1) {
          particle.opacityChange *= -1;
        }

        // 粒の描画
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        // 光のぼやけ効果
        ctx.shadowBlur = particle.glowSize; // グローの大きさ
        ctx.shadowColor = `rgba(255, 255, 255, ${particle.opacity})`; // グローの色
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`; // 粒の色
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="lightCanvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default WorkLight;

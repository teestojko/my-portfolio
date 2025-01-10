import React, { useRef, useEffect } from "react";

const WorkLight = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 粒のプロパティ（追加：opacityChangeで透明度の変化速度を管理）
    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3,
      opacity: Math.random(),
      opacityChange: (Math.random() * 0.02) - 0.01, // -0.01 〜 0.01 の範囲
    }));

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        // 透明度の変更
        particle.opacity += particle.opacityChange;

        // 透明度が0〜1を超えないように調整し、反転
        if (particle.opacity <= 0 || particle.opacity >= 1) {
          particle.opacityChange *= -1; // 方向を反転
        }

        // 粒の描画
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();

    // ウィンドウリサイズ時にキャンバスサイズを調整
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

import React from "react";
import "./Shapes.css";

const Shapes: React.FC = () => {
  // 5つのshapeのスタイルをランダム生成
    const shapes = Array.from({ length: 5 }, (_, i) => {
        const left = Math.random() * 100; // 0〜100% の範囲
        const top = Math.random() * 100;
        const size = 50 + Math.random() * 30; // 50〜80vmax
        const morphTime = 10 + Math.random() * 15; // 10〜25s
        const spinTime = 20 + Math.random() * 10; // 20〜30s
        const reverseSpin = Math.random() > 0.5 ? "reverse" : "normal";

        return {
        id: i,
            style: {
                left: `${left}vmin`,
                top: `${top}vmin`,
                width: `${size}vmax`,
                height: `${size}vmax`,
                animation: `morph ${morphTime}s linear infinite alternate, spin ${spinTime}s linear infinite ${reverseSpin}`,
            },
        };
    });

    return (
        <div className="shapes-container">
            {shapes.map((shape) => (
                <div key={shape.id} className="shape" style={shape.style}></div>
            ))}
        </div>
    );
};

export default Shapes;

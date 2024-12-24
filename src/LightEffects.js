import { useEffect } from "react";
import "./LightEffects.css"; // スタイルを別ファイルで管理

const LightEffects = () => {
    useEffect(() => {
        const lightEffects = document.querySelectorAll(".light-effect");

        function randomizeLights() {
        lightEffects.forEach((light) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomScale = Math.random() * 1 + 1;
            const randomOpacity = Math.random() * 0.4 + 0.3;
            const randomHue = Math.floor(Math.random() * 360);
            const randomSaturation = Math.random() * 50 + 50;
            const randomLightness = Math.random() * 30 + 50;
            const randomColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;

            light.style.top = `${randomY}%`;
            light.style.left = `${randomX}%`;
            light.style.transform = `scale(${randomScale})`;
            light.style.opacity = randomOpacity;
            light.style.background = `radial-gradient(circle, ${randomColor}, transparent)`;
            const randomDuration = Math.random() * 3 + 2;
            light.style.transition = `all ${randomDuration}s ease-in-out`;
        });
        setTimeout(randomizeLights, 5000);
        }

        randomizeLights(); // 初回実行
    }, []);

    return (
        <div className="light-effects-container">
        {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="light-effect" />
        ))}
        </div>
    );
};

export default LightEffects;


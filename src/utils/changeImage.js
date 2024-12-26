import { useState, useEffect } from "react";

function useImageChanger(texts, interval = 3000) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const changeImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        const timer = setInterval(changeImage, interval);

        return () => clearInterval(timer); // クリーンアップ処理
    }, [images.length, interval]);

    return {
        currentImage: images[currentIndex],
        currentText: texts[currentIndex],
        currentIndex,
    };
}

export default useImageChanger;

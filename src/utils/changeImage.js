import { useState, useEffect } from "react";

function useImageChanger(images, texts, interval = 3000) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images.length || !texts.length) return;

        const changeImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        const timer = setInterval(changeImage, interval);

        return () => clearInterval(timer); // コンポーネントがアンマウントされたらクリーンアップ
    }, [images.length, texts.length, interval]);

    return {
        currentImage: images[currentIndex],
        currentText: texts[currentIndex],
        currentIndex,
    };
}

export default useImageChanger;

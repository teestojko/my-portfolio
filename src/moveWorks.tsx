import { useEffect } from "react";

// workTitleRef の型を HTMLDivElement | null に変更
const useMoveWorks = (workTitleRef: React.RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        const currentRef = workTitleRef.current; // ローカル変数にコピー

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (currentRef) {
                        currentRef.style.opacity = "1"; // currentRefがnullでないことを確認
                        currentRef.style.transform = "translateZ(0)";
                        currentRef.style.transition = "opacity 1s ease-out, transform 1s ease-out"; // スライド時間
                    }
                } else {
                    if (currentRef) {
                        currentRef.style.opacity = "0";
                        currentRef.style.transform = "translateZ(1000px)"; // スライド距離
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [workTitleRef]); // workTitleRefが変更される度に再実行
};

export default useMoveWorks;

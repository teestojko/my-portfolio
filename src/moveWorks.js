import { useEffect } from "react";

const useMoveWorks = (workTitleRef) => {
    useEffect(() => {
        const currentRef = workTitleRef.current; // ローカル変数にコピー

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            currentRef.style.opacity = 1;
            currentRef.style.transform = "translateZ(0)";
            currentRef.style.transition = "opacity 1s ease-out, transform 1s ease-out"; // スライド時間
            } else {
            currentRef.style.opacity = 0;
            currentRef.style.transform = "translateZ(1000px)"; // スライド距離
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
    }, [workTitleRef]);
};

export default useMoveWorks;

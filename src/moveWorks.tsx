import { useEffect } from "react";

const useMoveWorks = (workTitleRef: React.RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const target = workTitleRef.current;
                if (!target) return;

                if (entry.isIntersecting) {
                    target.style.opacity = "1";
                    target.style.transform = "translateY(0)";
                } else {
                    target.style.opacity = "0";
                    target.style.transform = "translateY(50px)"; // translateZではなく、確実に変化がわかる値に
                }
                target.style.transition = "opacity 1s ease-out, transform 1s ease-out"; // どちらのケースでも適用
            },
            { threshold: 0.1 }
        );

        const target = workTitleRef.current;
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [workTitleRef]); // workTitleRefが変わったら再実行
};

export default useMoveWorks;




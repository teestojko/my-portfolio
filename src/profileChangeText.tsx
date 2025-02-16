import React, { useState, useEffect, useRef } from "react";

const ProfileChangeText: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const profileTexts: string[] = [
        "プログラミングスクールにてスキルを磨き、現在webエンジニアとして活動中です。php,laravelを中心としたバックエンド、React,typescriptを組み込んだフロントエンドまで幅広くこなします。",
        "",
        "✨あなたの創りたいを叶えます✨",
        "webエンジニア 岸 哲也",
    ];

    const textRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = textRef.current;
        if (currentRef instanceof HTMLParagraphElement) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef instanceof HTMLParagraphElement) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <p ref={textRef} className="profile-detail">
            {profileTexts.map((text, index) => (
                <span
                    key={index}
                    className={`fade-in-text ${isVisible ? "visible" : ""}`}
                    style={{
                        display: "block",
                        transitionDelay: `${index * 3}s`, // 各行に3秒ずつ遅らせてフェードイン
                    }}
                >
                    {text}
                </span>
            ))}
        </p>
    );
};

export default ProfileChangeText;

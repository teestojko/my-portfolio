import React, { useState, useEffect, useRef } from "react";

const ProfileChangeText: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const profileTexts: string[] = [
        "バックエンドのPHP・Laravelから、フロントエンドのReact・TypeScriptまで幅広く対応可能です。",
        "また、Docker・Git・MySQL・AWS を駆使した開発環境の構築やデプロイにも精通しています。",
        "✨アイデアを形にするお手伝いをいたします✨",
        "💻 webエンジニア T K",
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
                        transitionDelay: `${index * 2}s`, // 各行に3秒ずつ遅らせてフェードイン
                        marginBottom: index === 2 ? "3rem" : "0",
                    }}
                >
                    {text}
                </span>
            ))}
        </p>
    );
};

export default ProfileChangeText;

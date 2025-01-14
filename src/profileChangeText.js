import React, { useState, useEffect, useRef } from "react";

const ProfileChangeText = () => {
    const [isVisible, setIsVisible] = useState(false);
    const profileTexts = [
        "Hi, I'm Tetsuya Kishi, a web engineer specializing in creating interactive and visually stunning web applications.",
        "My goal is to blend creativity with functionality to deliver excellent user experiences.",
        "Let's work together to create something amazing!",
    ];

    const textRef = useRef(null);

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

        if (currentRef) {
        observer.observe(currentRef);
        }

        return () => {
        if (currentRef) {
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
                transitionDelay: `${index * 3}s`, // 各行に2秒ずつ遅らせてフェードイン
            }}
            >
            {text}
            </span>
        ))}
        </p>
    );
};

export default ProfileChangeText;

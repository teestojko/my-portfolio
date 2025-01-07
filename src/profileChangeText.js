import React, { useState, useEffect, useRef } from "react";

const ProfileChangeText = () => {
  const [textIndex, setTextIndex] = useState(0);
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
          setIsVisible(true); // 要素が表示されたら開始
        }
      },
      { threshold: 0.5 } // 50%以上表示されたときにトリガー
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && textIndex < profileTexts.length) {
      const timer = setTimeout(() => {
        setTextIndex((prevIndex) => prevIndex + 1);
      }, 2000); // 2秒間隔で次のテキストを表示
      return () => clearTimeout(timer);
    }
  }, [textIndex, profileTexts.length, isVisible]);

  return (
    <p ref={textRef} className="profile-detail">
      {profileTexts.slice(0, textIndex + 1).map((text, index) => (
        <span key={index} style={{ display: "block", transition: "opacity 0.5s" }}>
          {text}
        </span>
      ))}
    </p>
  );
};

export default ProfileChangeText;

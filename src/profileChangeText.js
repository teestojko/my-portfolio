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
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = textRef.current; // 修正: textRef.current をローカル変数に保存

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // 修正: 保存したローカル変数を使用
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && textIndex < profileTexts.length) {
      const timer = setTimeout(() => {
        setTextIndex((prevIndex) => prevIndex + 1);
      }, 2000);
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

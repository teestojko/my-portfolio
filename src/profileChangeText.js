import React, { useState, useEffect } from "react";

const ProfileChangeText = () => {
  const [textIndex, setTextIndex] = useState(0);
  const profileTexts = [
    "Hi, I'm Tetsuya Kishi, a web engineer specializing in creating interactive and visually stunning web applications.",
    "My goal is to blend creativity with functionality to deliver excellent user experiences.",
    "Let's work together to create something amazing!",
  ];

  useEffect(() => {
    if (textIndex < profileTexts.length) {
      const timer = setTimeout(() => {
        setTextIndex((prevIndex) => prevIndex + 1);
      }, 2000); // 2秒間隔で次のテキストを表示
      return () => clearTimeout(timer);
    }
  }, [textIndex, profileTexts.length]);

  return (
    <p className="profile-detail">
      {profileTexts.slice(0, textIndex + 1).map((text, index) => (
        <span key={index} style={{ display: "block", transition: "opacity 0.5s" }}>
          {text}
        </span>
      ))}
    </p>
  );
};

export default ProfileChangeText;

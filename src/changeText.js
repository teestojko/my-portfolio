// import { useState, useEffect } from "react";

// // テキストアニメーションのカスタムフック
// export function useTextAnimation(initialText, targetText, delay = 2000, speed = 100) {
//     const [text, setText] = useState("");
//     const [index, setIndex] = useState(0);

//     useEffect(() => {
//         // 初期テキスト（portfolio）を徐々に表示
//         const initialInterval = setInterval(() => {
//             setIndex((prevIndex) => {
//                 if (prevIndex < initialText.length) {
//                     return prevIndex + 1;
//                 }
//                 clearInterval(initialInterval); // 初期テキストの表示完了
//                 return prevIndex;
//             });
//         }, 100); // 初期テキストのアニメーション速度（1秒間）

//         // 初期テキストの表示後、ターゲットテキストのアニメーション開始
//         const timeout = setTimeout(() => {
//             const targetInterval = setInterval(() => {
//                 setIndex((prevIndex) => {
//                     if (prevIndex < targetText.length + initialText.length) {
//                         return prevIndex + 1;
//                     }
//                     clearInterval(targetInterval); // 全文字の表示が完了したら停止
//                     return prevIndex;
//                 });
//             }, speed);
//         }, delay); // 初期テキストの表示完了後の遅延

//         return () => {
//             clearInterval(initialInterval);
//             clearTimeout(timeout);
//         };
//     }, [initialText, targetText, delay, speed]);

//     useEffect(() => {
//         if (index <= initialText.length) {
//             setText(initialText.slice(0, index)); // 初期テキストのアニメーション
//         } else {
//             setText(targetText.slice(0, index - initialText.length)); // ターゲットテキストのアニメーション
//         }
//     }, [index, initialText, targetText]);

//     return text; // 現在のテキストを返す
// }

import { useState, useEffect } from "react";

// テキストアニメーションのカスタムフック
export function useTextAnimation(initialText, targetText, delay = 2000, speed = 100) {
    const [textArray, setTextArray] = useState([]); // アニメーション対象の文字配列
    const [animationClasses, setAnimationClasses] = useState([]); // 各文字のアニメーションクラス

    useEffect(() => {
        // 初期テキストの文字を1文字ずつ配列に追加
        let currentText = [];
        const initialInterval = setInterval(() => {
            if (currentText.length < initialText.length) {
                currentText.push(initialText[currentText.length]);
                setTextArray([...currentText]);
                setAnimationClasses((prev) => [...prev, "fade-in-slide"]); // アニメーションを追加
            } else {
                clearInterval(initialInterval); // 初期テキストの表示が完了
            }
        }, speed);

        // 初期テキスト完了後、ターゲットテキストのアニメーション開始
        const timeout = setTimeout(() => {
            const targetInterval = setInterval(() => {
                if (currentText.length < initialText.length + targetText.length) {
                    const nextChar = targetText[currentText.length - initialText.length];
                    if (nextChar) {
                        currentText.push(nextChar);
                        setTextArray([...currentText]);
                        setAnimationClasses((prev) => [...prev, "fade-in-slide"]);
                    }
                } else {
                    clearInterval(targetInterval); // 全文字の表示が完了
                }
            }, speed);
        }, delay);

        return () => {
            clearInterval(initialInterval);
            clearTimeout(timeout);
        };
    }, [initialText, targetText, delay, speed]);

    return { textArray, animationClasses }; // 各文字と対応するクラスを返す
}


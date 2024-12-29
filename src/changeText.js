import { useState, useEffect } from "react";

// テキストアニメーションのカスタムフック
export function useTextAnimation(initialText, targetText, delay = 2000, speed = 100) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // 初期テキスト（portfolio）を徐々に表示
        const initialInterval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex < initialText.length) {
                    return prevIndex + 1;
                }
                clearInterval(initialInterval); // 初期テキストの表示完了
                return prevIndex;
            });
        }, 100); // 初期テキストのアニメーション速度（1秒間）

        // 初期テキストの表示後、ターゲットテキストのアニメーション開始
        const timeout = setTimeout(() => {
            const targetInterval = setInterval(() => {
                setIndex((prevIndex) => {
                    if (prevIndex < targetText.length + initialText.length) {
                        return prevIndex + 1;
                    }
                    clearInterval(targetInterval); // 全文字の表示が完了したら停止
                    return prevIndex;
                });
            }, speed);
        }, delay); // 初期テキストの表示完了後の遅延

        return () => {
            clearInterval(initialInterval);
            clearTimeout(timeout);
        };
    }, [initialText, targetText, delay, speed]);

    useEffect(() => {
        if (index <= initialText.length) {
            setText(initialText.slice(0, index)); // 初期テキストのアニメーション
        } else {
            setText(targetText.slice(0, index - initialText.length)); // ターゲットテキストのアニメーション
        }
    }, [index, initialText, targetText]);

    return text; // 現在のテキストを返す
}



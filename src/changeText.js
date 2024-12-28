import { useState, useEffect } from "react";

// テキストアニメーションのカスタムフック
export function useTextAnimation(initialText, targetText, delay = 2000, speed = 100) {
    const [text, setText] = useState(initialText);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setText(initialText); // 初期テキストを即座に設定

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setIndex((prevIndex) => {
                    if (prevIndex < targetText.length) {
                        return prevIndex + 1;
                    }
                    clearInterval(interval); // 全文字が表示されたらアニメーション停止
                    return prevIndex;
                });
            }, speed);
        }, delay); // アニメーション開始までの遅延

        return () => clearTimeout(timeout);
    }, [initialText, targetText, delay, speed]);

    useEffect(() => {
        if (index > 0) {
            setText(targetText.slice(0, index)); // 現在のインデックスまでの文字を表示
        }
    }, [index, targetText]);

    return text; // 現在のテキストを返す
}

export function randomizeLights() {
    const lightEffects = document.querySelectorAll('.light-effect');

    function updateLights() {
        lightEffects.forEach(light => {
            // ランダムな位置（0〜100%）
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;

            // ランダムなスケール（1〜2倍）
            const randomScale = Math.random() * 1 + 1;

            // ランダムな透明度（0.3〜0.7）
            const randomOpacity = Math.random() * 0.4 + 0.3;

            // ランダムな色（HSL値を使用してカラフルな効果を作成）
            const randomHue = Math.floor(Math.random() * 360); // 0〜360の色相
            const randomSaturation = Math.random() * 50 + 50; // 50%〜100%の彩度
            const randomLightness = Math.random() * 30 + 50; // 50%〜80%の明度
            const randomColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;

            // スタイルを適用
            light.style.top = `${randomY}%`;
            light.style.left = `${randomX}%`;
            light.style.transform = `scale(${randomScale})`;
            light.style.opacity = randomOpacity;
            light.style.background = `radial-gradient(circle, ${randomColor}, transparent)`;

            // ランダムな移動を設定
            const randomDuration = Math.random() * 3 + 2; // 2秒〜5秒
            light.style.transition = `all ${randomDuration}s ease-in-out`;
        });

        // 再帰的に呼び出してランダムな動きを繰り返す
        setTimeout(updateLights, 4000); // 5秒ごとに動きを更新
    }

    updateLights(); // 初回実行
}

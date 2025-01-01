import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Wave = () => {
  // DOM要素への参照を保持するためのref
  const waveRef = useRef(null);

  useEffect(() => {
    // waveRefが存在しない場合は何もしない
    if (!waveRef.current) return;

    // 背景にCSSのグラデーションを適用
    waveRef.current.style.background = "linear-gradient(to bottom, white, #cccccc)";
    waveRef.current.style.position = "absolute";
    waveRef.current.style.top = 0;
    waveRef.current.style.left = 0;
    waveRef.current.style.width = "100%";
    waveRef.current.style.height = "100%";
    waveRef.current.style.zIndex = -1; // シーンの後ろに配置

    // THREE.jsのシーンを作成
    const scene = new THREE.Scene();

    // カメラを作成（視野角75度、画面アスペクト比、描画距離を設定）
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // カメラの位置を調整

    // WebGLレンダラーを作成し、透明背景を有効化
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを設定

    // waveRefにレンダラーのDOM要素を追加
    waveRef.current.appendChild(renderer.domElement); 

    // 平面ジオメトリを作成（20x20の大きさ、100x100の分割数）
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);

    // 頂点の位置データを取得
    const positionAttribute = waveGeometry.attributes.position;
    const colorAttribute = new THREE.BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
    waveGeometry.setAttribute('color', colorAttribute);

    // マテリアルを作成（色のグラデーションを使用）
    const waveMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true, // 頂点ごとの色を使用
    });

    // 平面ジオメトリとマテリアルを組み合わせてメッシュを作成
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(wave); // メッシュをシーンに追加

    // アニメーション関数を定義
    const animateWave = () => {
      const time = Date.now() * 0.001; // 現在の時間（秒単位）

      // 各頂点の位置を更新
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i); // 頂点のX座標
        const y = positionAttribute.getY(i); // 頂点のY座標
        const z = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.5; // 新しいZ座標を計算
        positionAttribute.setZ(i, z); // Z座標を更新

        // 色の計算 (高さに基づいて色を変更)
        const color = new THREE.Color();
        const colorValue = Math.abs(Math.sin(z)); // Z座標（高さ）に基づいて色を変化
        color.setHSL(colorValue, 1, 0.5); // 色相（HSL）を設定
        colorAttribute.setXYZ(i, color.r, color.g, color.b); // 頂点ごとに色を設定
      }

      // ジオメトリが更新されたことを通知
      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;

      // シーンとカメラをレンダリング
      renderer.render(scene, camera);

      // 次のフレームのアニメーションを予約
      requestAnimationFrame(animateWave);
    };

    // アニメーションを開始
    animateWave();

    // クリーンアップ処理（コンポーネントのアンマウント時に実行）
    return () => {
      renderer.dispose(); // レンダラーのリソースを解放
    };
  }, []);

  // 全画面表示のスタイルを適用したコンテナを返す
  return <div ref={waveRef} />;
};

export default Wave;

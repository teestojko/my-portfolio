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
    waveRef.current.style.position = "relative"; // これでWaveの位置が親要素に相対的に配置される
    waveRef.current.style.width = "100%"; // 親要素に合わせて幅を100%に設定
    waveRef.current.style.height = "100%"; // 親要素に合わせて高さを100%に設定

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
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);

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

    // ランダムな位相を生成
    const randomOffsets = Array.from({ length: positionAttribute.count }, () => Math.random() * Math.PI * 2);

    // アニメーション関数を定義
    const animateWave = () => {
      const time = Date.now() * 0.001; // 現在の時間（秒単位）

      // 最大Z座標（頂点の高さ）と最小Z座標（最も低い部分）を初期化
      let minZ = Infinity;
      let maxZ = -Infinity;

      // 各頂点の位置をランダムに動かす
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);

        // ランダムな位相を使用してZ座標を変化させる
        const z = Math.sin(x * 2 + time + randomOffsets[i]) * Math.cos(y * 2 + time + randomOffsets[i]) * 0.5;
        positionAttribute.setZ(i, z);

        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
      }


      // 各頂点の色をZ座標に基づいて設定
      for (let i = 0; i < positionAttribute.count; i++) {
        const z = positionAttribute.getZ(i); // 頂点のZ座標

        // 頂点が最も高い部分（白）と最も低い部分（灰色）を決定
        const color = new THREE.Color();
        const normalizedHeight = (z - minZ) / (maxZ - minZ); // 0〜1に正規化

        // Z座標に基づいて色を設定（最も高い部分を白、最も低い部分を灰色）
        color.setRGB(1 - normalizedHeight, 1 - normalizedHeight, 1 - normalizedHeight); // 高さに応じて色を変化

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


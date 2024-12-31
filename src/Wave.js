import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Wave = () => {
  // DOM要素への参照を保持するためのref
  const waveRef = useRef(null);

  useEffect(() => {
    // waveRefが存在しない場合は何もしない
    if (!waveRef.current) return;

    // THREE.jsのシーンを作成
    const scene = new THREE.Scene();

    // カメラを作成（視野角75度、画面アスペクト比、描画距離を設定）
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // カメラの位置を調整

    // WebGLレンダラーを作成し、透明背景を有効化
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを設定
    waveRef.current.appendChild(renderer.domElement); // レンダラーのDOM要素を追加

    // 平面ジオメトリを作成（20x20の大きさ、100x100の分割数）
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);

    // マテリアルを作成（ランダムな色、ワイヤーフレームモード）
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff, // ランダムな色を設定
      wireframe: true, // ワイヤーフレーム表示を有効化
    });

    // // 平面ジオメトリとマテリアルを組み合わせてメッシュを作成
    // const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    // scene.add(wave); // メッシュをシーンに追加

    // 頂点の位置データを取得
    const positionAttribute = wave.geometry.attributes.position;

    // アニメーション関数を定義
    const animateWave = () => {
      const time = Date.now() * 0.001; // 現在の時間（秒単位）

      // 各頂点の位置を更新
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i); // 頂点のX座標
        const y = positionAttribute.getY(i); // 頂点のY座標
        const z = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.5; // 新しいZ座標を計算
        positionAttribute.setZ(i, z); // Z座標を更新
      }

      // ジオメトリが更新されたことを通知
      positionAttribute.needsUpdate = true;

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
  return <div ref={waveRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />;
};

export default Wave;

import * as THREE from "three";
import { useEffect, useRef } from "react";

function DistortedCircle() {
  // レンダリング用のコンテナを参照するための ref
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current; // 描画する DOM コンテナ

    // Three.js のシーンを作成
    const scene = new THREE.Scene();

    // カメラの設定（視野角、アスペクト比、近接クリップ距離、遠距離クリップ距離）
    const camera = new THREE.PerspectiveCamera(
      75, // 視野角
      container.clientWidth / container.clientHeight, // アスペクト比
      0.1, // 近接クリップ距離
      1000 // 遠距離クリップ距離
    );

    // レンダラーの作成とサイズの設定
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement); // DOM にレンダラーを追加

    // カメラの位置と向きを設定
    camera.position.set(0, 0, 5); // カメラを Z 軸方向に 5 移動
    camera.lookAt(0, 0, 0); // カメラがシーンの中心を見るよう設定

    // 円形のカーブ（EllipseCurve）を作成
    const circleCurve = new THREE.EllipseCurve(
      0, // x 座標の中心
      0, // y 座標の中心
      1, // x 軸の半径
      1, // y 軸の半径
      0, // 開始角度
      2 * Math.PI, // 終了角度（円周）
      false, // 時計回りかどうか
      0 // 回転角度
    );

    // カーブから点群を取得
    const points = circleCurve.getPoints(100); // 100個の点を生成

    // 点群をもとに BufferGeometry を作成
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // 線の素材（LineBasicMaterial）を設定
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // ジオメトリとマテリアルを結合して線を作成
    const line = new THREE.Line(geometry, material);
    scene.add(line); // シーンに線を追加

    // 形状を歪ませる関数
    const distortShape = (progress) => {
  const positions = geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const angle = Math.atan2(y, x);
    const radius = 1 + Math.sin(progress + angle) * 0; // 円の半径はそのまま
    
    // 上部 (y >= 0.9) は右に歪ませる (xを増加)
    if (y >= 0.9) {
      positions[i] = Math.cos(angle) * radius + 0.1;  // xを増加させる
    }
    // 下部 (y <= 0.9) は左に歪ませる (xを減少)
    else if (y <= -0.9) {
      positions[i] = Math.cos(angle) * radius - 0.1;  // xを減少させる
    } else {
      // 上下以外の部分はそのまま
      positions[i] = Math.cos(angle) * radius;
    }

    // y座標はそのまま維持
    positions[i + 1] = Math.sin(angle) * radius;
  }
  geometry.attributes.position.needsUpdate = true;
};


    // アニメーションの進行度を保持
    let progress = 0;

    // アニメーションループを設定
    const animate = () => {
      progress += 0.02; // アニメーションの進行を更新
      distortShape(progress); // 形状を歪ませる
      renderer.render(scene, camera); // シーンをレンダリング
      requestAnimationFrame(animate); // 次フレームをリクエスト
    };

    animate(); // アニメーションを開始

    // コンポーネントが破棄される際にレンダラーをクリーンアップ
    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  // コンポーネントのレンダリング
  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}

export default DistortedCircle;

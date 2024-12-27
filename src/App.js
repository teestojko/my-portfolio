import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";

function App() {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // シーン、カメラ、レンダラーのセットアップ
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // 背景を白に設定

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10; // 初期位置
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // 3Dキューブの作成
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        metalness: 0.5,
        roughness: 0.2,
      });
      const cube = new THREE.Mesh(geometry, material);

      // ランダムな位置に配置
      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;

      scene.add(cube);
    }

    // ライトの追加
    const light = new THREE.PointLight(0xffffff, 2.0); // 強いポイントライト
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // 明るい環境光
    scene.add(ambientLight);

    // マウス移動イベント
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationX = mouseY * 0.2; // 回転角度を制限
      targetRotationY = mouseX * 0.2; // 回転角度を制限
    };

    window.addEventListener("mousemove", onMouseMove);

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);

      // カメラのスムーズな回転
      camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.1; // 補間でスムーズに
      camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.1; // 補間でスムーズに

      // シーンのレンダリング
      renderer.render(scene, camera);
    };

    animate();

    // クリーンアップ
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh" }} />;
}

export default App;

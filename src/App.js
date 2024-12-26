import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";


function App() {
  const sceneRef = useRef(null);

  useEffect(() => {
    // シーン、カメラ、レンダラーのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // 3Dキューブの作成
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // キューブをシーンに追加
    scene.add(cube);

    // カメラの位置設定
    camera.position.z = 5;

    // マウスの動きに連動するアニメーション
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // カメラの位置をマウスの動きに応じて変更
      camera.position.x = mouseX * 5;
      camera.position.y = -mouseY * 5;

    };

    // マウスムーブイベントリスナーの追加
    window.addEventListener("mousemove", onMouseMove);

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);

      // キューブの回転
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // カメラを再レンダリング
      renderer.render(scene, camera);
    };

    // アニメーション開始
    animate();

    // クリーンアップ
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh", backgroundColor: "#222" }} />;
}

export default App;

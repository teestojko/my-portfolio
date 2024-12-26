import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";


function App() {
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);  // キューブへの参照を保持
  const cameraRef = useRef(null);  // カメラへの参照を保持
  const targetPositionRef = useRef(new THREE.Vector3());  // 目標位置

  useEffect(() => {
    // シーン、カメラ、レンダラーのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;  // カメラの参照を保持
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // 3Dキューブの作成
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;  // キューブの参照を保持

    // キューブをシーンに追加
    scene.add(cube);

    // カメラの位置設定
    camera.position.z = 5;

    // ランダムな位置に移動させるための関数
    const moveCubeRandomly = () => {
      targetPositionRef.current.x = Math.random() * 10 - 5;  // x軸でランダムに位置を変更 (-5から5)
      targetPositionRef.current.y = Math.random() * 10 - 5;  // y軸でランダムに位置を変更
      targetPositionRef.current.z = Math.random() * 10 - 5;  // z軸でランダムに位置を変更
    };

    // 目標位置に向かってスムーズに移動させるための補間
    const smoothMove = () => {
      if (cubeRef.current) {
        // 現在の位置から目標位置に向かってスムーズに移動
        cubeRef.current.position.lerp(targetPositionRef.current, 0.1); // 0.1は補間のスピード
      }
    };

    // 定期的にランダムな位置に移動
    const intervalId = setInterval(moveCubeRandomly, 2000); // 2秒ごとに目標位置を変更

    // マウスムーブイベントリスナーの追加
    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // カメラの位置をマウスの動きに応じて変更
      if (cameraRef.current) {
        cameraRef.current.position.x = mouseX * 5;
        cameraRef.current.position.y = -mouseY * 5;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);

      // キューブの回転
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }

      // キューブをスムーズに移動
      smoothMove();

      // カメラを再レンダリング
      renderer.render(scene, camera);
    };

    animate();

    // クリーンアップ
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(intervalId);  // インターバルのクリーンアップ
    };
  }, []);

  return <div ref={sceneRef} style={{ width: "100%", height: "100vh", backgroundColor: "#222" }} />;
}

export default App;

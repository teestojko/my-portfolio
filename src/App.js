import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";

function App() {
  const sceneRef = useRef(null);
  const cubesRef = useRef([]);  // キューブの参照を保持する配列
  const cameraRef = useRef(null);  // カメラへの参照を保持
  const targetPositionsRef = useRef([]);  // 目標位置を保持する配列

  useEffect(() => {
    // シーン、カメラ、レンダラーのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xf0f0f0)); // 背景色を設定
    sceneRef.current.appendChild(renderer.domElement);

    // 10個のキューブの作成と配置
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
      const cube = new THREE.Mesh(geometry, material);
      cubesRef.current.push(cube); // キューブを配列に追加
      targetPositionsRef.current.push(new THREE.Vector3()); // 目標位置を追加
      scene.add(cube);
      cube.position.x = Math.random() * 10 - 5; // ランダムに配置
      cube.position.y = Math.random() * 10 - 5;
      cube.position.z = Math.random() * 10 - 5;
    }

    // カメラの位置設定
    camera.position.z = 10;

    // ランダムな位置に移動させるための関数
    const moveCubeRandomly = () => {
      for (let i = 0; i < 10; i++) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const maxX = 10 * aspectRatio; // 横幅を画面サイズに応じて設定
        const maxY = 10;               // 縦幅の固定値
        const maxZ = 5;                // 奥行きは固定値

        // ランダムな位置を設定
        targetPositionsRef.current[i].x = Math.random() * 2 * maxX - maxX;
        targetPositionsRef.current[i].y = Math.random() * 2 * maxY - maxY;
        targetPositionsRef.current[i].z = Math.random() * 2 * maxZ - maxZ;
      }
    };

    // 目標位置に向かってスムーズに移動させるための補間
    const smoothMove = () => {
      for (let i = 0; i < 10; i++) {
        if (cubesRef.current[i]) {
          cubesRef.current[i].position.lerp(targetPositionsRef.current[i], 0.01); // 0.1は補間のスピード
        }
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

      // 各キューブの回転
      for (let i = 0; i < 10; i++) {
        if (cubesRef.current[i]) {
          cubesRef.current[i].rotation.x += 0.01;
          cubesRef.current[i].rotation.y += 0.01;
        }
      }

      // 各キューブをスムーズに移動
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

  return <div ref={sceneRef} className="scene-container" />;
}

export default App;

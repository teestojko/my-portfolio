import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import { useTextAnimation } from "./changeText";
import { randomizeLights } from "./lightEffect";

function App() {
  const sceneRef = useRef(null);
  const backgroundRef = useRef(null);

  // カスタムフックでテキストアニメーションを制御
  const animatedText = useTextAnimation("portfolio", "web engineer Tetsuya Kishi", 2000, 100);

  useEffect(() => {
    if (!sceneRef.current) return;

    // シーン、カメラ、レンダラーのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const cubes = [];
    for (let i = 0; i < 200; i++) {
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        metalness: 0.5,
        roughness: 0.2,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      cube.rotationSpeed = {
        x: Math.random() * 0.02 - 0.01,
        y: Math.random() * 0.02 - 0.01,
        z: Math.random() * 0.02 - 0.01,
      };
      cube.movementSpeed = {
        x: Math.random() * 0.1 - 0.05,
        y: Math.random() * 0.1 - 0.05,
        z: Math.random() * 0.1 - 0.05,
      };
      cubes.push(cube);
      scene.add(cube);
    }

    const light = new THREE.PointLight(0xffffff, 2.0);
    light.position.set(50, 50, 50);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach(cube => {
        cube.rotation.x += cube.rotationSpeed.x;
        cube.rotation.y += cube.rotationSpeed.y;
        cube.rotation.z += cube.rotationSpeed.z;
        cube.position.x += cube.movementSpeed.x;
        cube.position.y += cube.movementSpeed.y;
        cube.position.z += cube.movementSpeed.z;
      });
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  useEffect(() => {
    randomizeLights(); // ランダムな光のエフェクトを初期化

    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const background = backgroundRef.current;

      if (scrollPosition > window.innerHeight * 0)//表示までのスクロール幅
      {
        background.style.opacity = 1;
        background.style.transform = "translateY(0)";
      } else {
        background.style.opacity = 0;
        background.style.transform = "translateY(50px)";
      }
    };

    window.addEventListener("scroll", onScroll);

    // 初期化時にも実行
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scene-container">
        <div ref={sceneRef} className="scene" />
        <div className="scene-text">{animatedText}</div>
      </div>
      <div ref={backgroundRef} className="custom-background">
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
        <div className="light-effect"></div>
      </div>
    </>
  );
}

export default App;




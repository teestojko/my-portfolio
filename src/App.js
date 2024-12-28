import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import { useTextAnimation } from "./changeText";

function App() {
  const sceneRef = useRef(null);

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

    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotationX = mouseY * 0.9;
      targetRotationY = mouseX * 0.9;
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      cubes.forEach((cube) => {
        cube.rotation.x += cube.rotationSpeed.x;
        cube.rotation.y += cube.rotationSpeed.y;
        cube.rotation.z += cube.rotationSpeed.z;
        cube.position.x += cube.movementSpeed.x;
        cube.position.y += cube.movementSpeed.y;
        cube.position.z += cube.movementSpeed.z;
        const boundary = 50;
        if (Math.abs(cube.position.x) > boundary) cube.movementSpeed.x *= -1;
        if (Math.abs(cube.position.y) > boundary) cube.movementSpeed.y *= -1;
        if (Math.abs(cube.position.z) > boundary) cube.movementSpeed.z *= -1;
      });

      const rotationSpeed = 0.04;
      const currentRotation = new THREE.Euler(
        camera.rotation.x + (targetRotationX - camera.rotation.x) * rotationSpeed,
        camera.rotation.y + (targetRotationY - camera.rotation.y) * rotationSpeed,
        0
      );
      camera.quaternion.setFromEuler(currentRotation);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="scene-container">
      <div ref={sceneRef} className="scene" />
        <div className="scene-text">
          {animatedText}
        </div>
    </div>
  );
}

export default App;

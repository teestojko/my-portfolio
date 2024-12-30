import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import { useTextAnimation } from "./changeText";
import { randomizeLights } from "./lightEffect";

function App() {
  const sceneRef = useRef(null);
  const backgroundRef = useRef(null);
  const workTitleRef = useRef(null);

  // カスタムフックでテキストアニメーションを制御
  const animatedText = useTextAnimation("portfolio", "web engineer\nTetsuya Kishi", 4000, 100);

  // useEffect(() => {
  //   if (!sceneRef.current) return;

  //   // シーン、カメラ、レンダラーのセットアップ
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   camera.position.z = 15;
  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   sceneRef.current.appendChild(renderer.domElement);

  //   const cubes = [];
  //   for (let i = 0; i < 200; i++) {
  //     const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  //     const material = new THREE.MeshStandardMaterial({
  //       color: Math.random() * 0xffffff,
  //       metalness: 0.5,
  //       roughness: 0.2,
  //     });
  //     const cube = new THREE.Mesh(geometry, material);
  //     cube.position.set(
  //       (Math.random() - 0.5) * 100,
  //       (Math.random() - 0.5) * 100,
  //       (Math.random() - 0.5) * 100
  //     );
  //     cube.rotationSpeed = {
  //       x: Math.random() * 0.02 - 0.01,
  //       y: Math.random() * 0.02 - 0.01,
  //       z: Math.random() * 0.02 - 0.01,
  //     };
  //     cube.movementSpeed = {
  //       x: Math.random() * 0.1 - 0.05,
  //       y: Math.random() * 0.1 - 0.05,
  //       z: Math.random() * 0.1 - 0.05,
  //     };
  //     cubes.push(cube);
  //     scene.add(cube);
  //   }

  //   const light = new THREE.PointLight(0xffffff, 2.0);
  //   light.position.set(50, 50, 50);
  //   scene.add(light);

  //   const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
  //   scene.add(ambientLight);

  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     cubes.forEach(cube => {
  //       cube.rotation.x += cube.rotationSpeed.x;
  //       cube.rotation.y += cube.rotationSpeed.y;
  //       cube.rotation.z += cube.rotationSpeed.z;
  //       cube.position.x += cube.movementSpeed.x;
  //       cube.position.y += cube.movementSpeed.y;
  //       cube.position.z += cube.movementSpeed.z;

  //       // 視界外に出ないように位置をリセット
  //       if (cube.position.x > 50 || cube.position.x < -50) cube.position.x = Math.random() * 100 - 50;
  //       if (cube.position.y > 50 || cube.position.y < -50) cube.position.y = Math.random() * 100 - 50;
  //       if (cube.position.z > 50 || cube.position.z < -50) cube.position.z = Math.random() * 100 - 50;

  //     });
  //     renderer.render(scene, camera);
  //   };

  //   animate();
  // }, []);




  
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
      opacity: 0,  // 初期状態では透明
      transparent: true,
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

    // アニメーションを設定して、1秒間で表示される
    let startTime = Date.now();
    const fadeIn = () => {
      const elapsedTime = Date.now() - startTime;
      const opacity = Math.min(elapsedTime / 1000, 1);  // 1秒で完全に表示される
      cube.material.opacity = opacity;
      const scale = Math.min(elapsedTime / 1000, 1);  // 1秒でサイズが1に
      cube.scale.set(scale, scale, scale);
      
      if (elapsedTime < 1000) {
        requestAnimationFrame(fadeIn);
      }
    };

    fadeIn();  // アニメーション開始
  }

  const light = new THREE.PointLight(0xffffff, 2.0);
  light.position.set(50, 50, 50);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
  scene.add(ambientLight);

  const animate = () => {
    requestAnimationFrame(animate);
    cubes.forEach(cube => {
      // キューブの位置が視界外に出ないようにリセット
      if (cube.position.x > 50 || cube.position.x < -50) {
        cube.position.x = (Math.random() - 0.5) * 100;  // ランダムにリセット
      }
      if (cube.position.y > 50 || cube.position.y < -50) {
        cube.position.y = (Math.random() - 0.5) * 100;  // ランダムにリセット
      }
      if (cube.position.z > 50 || cube.position.z < -50) {
        cube.position.z = (Math.random() - 0.5) * 100;  // ランダムにリセット
      }

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

  useEffect(() => {
  const currentRef = workTitleRef.current; // ローカル変数にコピー

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        currentRef.style.opacity = 1;
        currentRef.style.transform = "translateX(0)";
        currentRef.style.transition = "opacity 1s ease-out, transform 1s ease-out";//スライド時間
      } else {
        currentRef.style.opacity = 0;
        currentRef.style.transform = "translateX(500px)";//スライド距離
      }
    },
    { threshold: 0 }
  );

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      observer.unobserve(currentRef);
    }
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
      <div className="background-work-container">
        <div ref={workTitleRef} className="work-container-inner">
          <h1 className="work-container-title">work</h1>
          <div className="work-container-img-all">
            <img className="work-container-img" src="/images/rese.png" alt="rese" />
            <img className="work-container-img" src="/images/furima.png" alt="furima" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;




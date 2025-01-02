import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const OceanWave = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    if (!waveRef.current) return;

    // シーンの初期化
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    waveRef.current.appendChild(renderer.domElement);

    // 波の作成
    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1e90ff,
      metalness: 0.5,
      roughness: 0.5,
      wireframe: false,
    });

    const wave = new THREE.Mesh(geometry, material);
    wave.rotation.x = -Math.PI / 2;
    scene.add(wave);

    // ライトの設定
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // アニメーション
    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();

      // 波の頂点を動かす
      const position = geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.5;
        position.setZ(i, z);
      }
      position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // クリーンアップ
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={waveRef} />;
};

export default OceanWave;

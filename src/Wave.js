import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Wave = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    if (!waveRef.current) return;

    // 背景グラデーションの設定
    waveRef.current.style.background = "linear-gradient(to bottom, white, #cccccc)";
    waveRef.current.style.position = "relative";
    waveRef.current.style.width = "100%";
    waveRef.current.style.height = "100%";

    // THREE.jsの基本セットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    waveRef.current.appendChild(renderer.domElement);

    // 平面ジオメトリの作成
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    const positionAttribute = waveGeometry.attributes.position;
    const colorAttribute = new THREE.BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
    waveGeometry.setAttribute("color", colorAttribute);

    const waveMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(wave);

    // 初期位置の保存
    const initialPositions = Array.from({ length: positionAttribute.count }, (_, i) => ({
      x: positionAttribute.getX(i),
      y: positionAttribute.getY(i),
    }));
    const randomOffsets = Array.from({ length: positionAttribute.count }, () => Math.random() * Math.PI * 2);

    // アニメーション関数
    const animateWave = () => {
      const time = Date.now() * 0.001;

      let minZ = Infinity;
      let maxZ = -Infinity;

      for (let i = 0; i < positionAttribute.count; i++) {
        const initialX = initialPositions[i].x;
        const initialY = initialPositions[i].y;

        // x軸とy軸の動きを追加
        const x = initialX + Math.sin(time + randomOffsets[i]) * 0.2;
        const y = initialY + Math.cos(time + randomOffsets[i]) * 0.2;
        const z = Math.sin(x * 2 + time + randomOffsets[i]) * Math.cos(y * 2 + time + randomOffsets[i]) * 0.5;

        positionAttribute.setXYZ(i, x, y, z);

        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
      }

      for (let i = 0; i < positionAttribute.count; i++) {
        const z = positionAttribute.getZ(i);
        const color = new THREE.Color();
        const normalizedHeight = (z - minZ) / (maxZ - minZ);
        color.setRGB(1 - normalizedHeight, 1 - normalizedHeight, 1 - normalizedHeight);
        colorAttribute.setXYZ(i, color.r, color.g, color.b);
      }

      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animateWave);
    };

    animateWave();

    // クリーンアップ
    return () => {
      renderer.dispose();
      waveRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={waveRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Wave;

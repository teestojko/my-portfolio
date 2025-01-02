import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Wave = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    // ローカル変数にwaveRef.currentを保存
    const waveElement = waveRef.current;
    if (!waveElement) return;

    waveElement.style.background = "linear-gradient(to bottom, white, #cccccc)";
    waveElement.style.position = "relative";
    waveElement.style.width = "100%";
    waveElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    waveElement.appendChild(renderer.domElement);

    const waveGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    const positionAttribute = waveGeometry.attributes.position;
    const colorAttribute = new THREE.BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
    waveGeometry.setAttribute("color", colorAttribute);

    const waveMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(wave);

    const randomOffsets = Array.from({ length: positionAttribute.count }, () => Math.random() * Math.PI * 2);

    const animateWave = () => {
      const time = Date.now() * 0.001;
      let minZ = Infinity;
      let maxZ = -Infinity;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = Math.sin(x * 2 + time + randomOffsets[i]) * Math.cos(y * 2 + time + randomOffsets[i]) * 0.5;
        positionAttribute.setZ(i, z);
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

    return () => {
      // waveElementを使うことでクリーンアップ関数内の参照を固定
      renderer.dispose();
      if (waveElement) waveElement.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={waveRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Wave;

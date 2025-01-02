import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Wave = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    if (!waveRef.current) return;

    waveRef.current.style.background = "linear-gradient(to bottom, white, #cccccc)";
    waveRef.current.style.position = "relative";
    waveRef.current.style.width = "100%";
    waveRef.current.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    waveRef.current.appendChild(renderer.domElement);

    const waveGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const positionAttribute = waveGeometry.attributes.position;
    const colorAttribute = new THREE.BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
    waveGeometry.setAttribute("color", colorAttribute);

    const waveMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(wave);


    const animateWave = () => {
      const time = Date.now() * 0.001;
      let minZ = Infinity;
      let maxZ = -Infinity;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);

        // 曲線的な動きを追加
        const z = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.5 
                + Math.sin(x + y + time) * 0.3; // 曲線的な変化を追加
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
      renderer.dispose();
    };
  }, []);

  return <div ref={waveRef} />;
};

export default Wave;

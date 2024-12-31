import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Wave = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    if (!waveRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    waveRef.current.appendChild(renderer.domElement);

    const waveGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
      wireframe: true,
    });

    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    scene.add(wave);

    const animateWave = () => {
      const time = Date.now() * 0.001;
      wave.geometry.vertices.forEach((vertex) => {
        vertex.z = Math.sin(vertex.x * 2 + time) * Math.cos(vertex.y * 2 + time) * 0.5;
      });
      wave.geometry.verticesNeedUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animateWave);
    };

    animateWave();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={waveRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />;
};

export default Wave;

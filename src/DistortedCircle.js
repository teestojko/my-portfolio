import * as THREE from 'three';
import { useEffect } from 'react';

function DistortedCircle() {
  useEffect(() => {
    // シーンのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    // 円形のジオメトリを作成
    const circleCurve = new THREE.EllipseCurve(0, 0, 1, 1, 0, 2 * Math.PI, false, 0);
    const points = circleCurve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points.flat()), 3));

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // 形状の変形
    const distortShape = (progress) => {
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const angle = Math.atan2(y, x);
        const radius = 1 + Math.sin(progress + angle) * 0.5; // 半径を変化させる
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = Math.sin(angle) * radius;
      }
      geometry.attributes.position.needsUpdate = true;
    };

    // アニメーションの設定
    let progress = 0;
    const animate = () => {
      progress += 0.02;
      distortShape(progress);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}

export default DistortedCircle;

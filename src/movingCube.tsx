import React, { useRef, useEffect } from "react";
import * as THREE from "three";

// カスタム型を定義
interface Cube extends THREE.Mesh {
    rotationSpeed: { x: number; y: number; z: number };
    movementSpeed: { x: number; y: number; z: number };
}

const MovingCube: React.FC = () => {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // シーン、カメラ、レンダラーのセットアップ
        const currentSceneRef = sceneRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        currentSceneRef.appendChild(renderer.domElement);

        const cubes: Cube[] = [];
        for (let i = 0; i < 200; i++) {
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const material = new THREE.MeshStandardMaterial({
                color: Math.random() * 0xffffff,
                metalness: 0.5,
                roughness: 0.2,
            });

            // `Object.assign()` で拡張
            const cube = Object.assign(new THREE.Mesh(geometry, material), {
                rotationSpeed: {
                    x: Math.random() * 0.02 - 0.01,
                    y: Math.random() * 0.02 - 0.01,
                    z: Math.random() * 0.02 - 0.01,
                },
                movementSpeed: {
                    x: Math.random() * 0.1 - 0.05,
                    y: Math.random() * 0.1 - 0.05,
                    z: Math.random() * 0.1 - 0.05,
                },
            }) as Cube; // `Cube` 型として明示的にキャスト

            cube.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );

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
            cubes.forEach((cube) => {
                cube.rotation.x += cube.rotationSpeed.x;
                cube.rotation.y += cube.rotationSpeed.y;
                cube.rotation.z += cube.rotationSpeed.z;
                cube.position.x += cube.movementSpeed.x;
                cube.position.y += cube.movementSpeed.y;
                cube.position.z += cube.movementSpeed.z;

                // 奥行きが視界外に出ないように位置をリセット
                if (cube.position.x > 60 || cube.position.x < -60) cube.position.x = Math.random() * 100 - 50;
                if (cube.position.y > 60 || cube.position.y < -60) cube.position.y = Math.random() * 100 - 50;
                if (cube.position.z > 50 || cube.position.z < -50) cube.position.z = Math.random() * 100 - 50;
            });
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            currentSceneRef.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={sceneRef} className="scene" />;
};

export default MovingCube;

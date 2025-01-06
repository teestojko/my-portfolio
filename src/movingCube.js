import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const MovingCube = () => {
    const sceneRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!sceneRef.current) return;

        const currentSceneRef = sceneRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        currentSceneRef.appendChild(renderer.domElement);

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

        let targetRotationX = 0; // マウス位置に基づいた目標の回転角度
        let targetRotationY = 0;
        const smoothFactor = 0.05; // 回転がどれくらいのスピードで補間されるか

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
                if (cube.position.x > 50 || cube.position.x < -50) cube.position.x = Math.random() * 100 - 50;
                if (cube.position.y > 50 || cube.position.y < -50) cube.position.y = Math.random() * 100 - 50;
                if (cube.position.z > 50 || cube.position.z < -50) cube.position.z = Math.random() * 100 - 50;
            });

            // マウス位置に基づく目標回転角度を更新
            targetRotationY = mousePosition.x * 0.002;
            targetRotationX = mousePosition.y * 0.002;

            // 徐々に回転させる
            scene.rotation.y += (targetRotationY - scene.rotation.y) * smoothFactor;
            scene.rotation.x += (targetRotationX - scene.rotation.x) * smoothFactor;

            renderer.render(scene, camera);
        };

        animate();

        // マウスの位置を追跡する
        const handleMouseMove = (event) => {
            // ウィンドウの幅と高さに基づいてマウスの位置を正規化
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            setMousePosition({ x, y }); // マウスの位置を状態に保存
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove); // クリーンアップ
            currentSceneRef.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [mousePosition]);

    return <div ref={sceneRef} className="scene" />;
};

export default MovingCube;

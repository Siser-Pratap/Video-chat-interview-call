"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const LogoModel = () => {
    const { scene } = useGLTF("/models/logo.gltf");

    return (
        <primitive object={scene} scale={0.5} />
    );
};

const Logo = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <LogoModel />
            <OrbitControls />
        </Canvas>
    );
};

export default Logo;
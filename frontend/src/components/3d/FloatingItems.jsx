import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Star = (props) => {
    const mesh = useRef();
    useFrame((state, delta) => {
        mesh.current.rotation.y += delta * 0.2;
        mesh.current.rotation.x += delta * 0.1;
    });

    // Simple 5-point star shape
    const shape = new THREE.Shape();
    const outerRadius = 0.5;
    const innerRadius = 0.2;
    const spikes = 5;

    for (let i = 0; i < spikes * 2; i++) {
        const l = i % 2 === 0 ? outerRadius : innerRadius;
        const a = (i / (spikes * 2)) * Math.PI * 2;
        const x = Math.cos(a) * l;
        const y = Math.sin(a) * l;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3 };

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} {...props}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
            </mesh>
        </Float>
    );
};

const Strawberry = (props) => {
    // Determining a low-poly stylized strawberry using a cone
    const mesh = useRef();

    useFrame((state) => {
        mesh.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <group {...props} ref={mesh}>
                {/* Body */}
                <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI]}>
                    <coneGeometry args={[0.4, 0.8, 8]} />
                    <meshStandardMaterial color="#ffb7c5" roughness={0.3} />
                </mesh>
                {/* Leaves */}
                <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0, 0.3, 0.2, 5]} />
                    <meshStandardMaterial color="#90ee90" />
                </mesh>
            </group>
        </Float>
    )
}

const KittenBubble = (props) => {
    // Abstract representation: A soft bubble with ears
    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <group {...props}>
                <mesh>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.8}
                        opacity={0.8}
                        roughness={0}
                        thickness={1}
                    />
                </mesh>
                {/* Ears */}
                <mesh position={[-0.3, 0.4, 0]} rotation={[0, 0, 0.5]}>
                    <coneGeometry args={[0.15, 0.3, 32]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.3, 0.4, 0]} rotation={[0, 0, -0.5]}>
                    <coneGeometry args={[0.15, 0.3, 32]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
            </group>
        </Float>
    )
}

const FloatingItems = () => {
    return (
        <group>
            <Star position={[-3, 2, -2]} />
            <Star position={[3, -1, -3]} scale={0.8} />
            <Star position={[-2, -3, 1]} scale={0.5} />

            <Strawberry position={[2.5, 2.5, -1]} />
            <Strawberry position={[-3.5, -0.5, 0]} scale={1.2} />

            <KittenBubble position={[0, 3, -2]} />
            <KittenBubble position={[3, 0, 1]} scale={0.6} />

            <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#fff0f5" />
        </group>
    );
};

export default FloatingItems;

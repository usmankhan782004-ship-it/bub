import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import VoxelBuilder from './VoxelBuilder';
import { BOY_VOXEL, GIRL_VOXEL, COUPLE_PALETTE } from './CoupleVoxel';
import { HEART_VOXEL } from './VoxelAssets';

const RotatingCouple = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Platform - Heart shape */}
            <group position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[3, 3, 3]}>
                <VoxelBuilder matrix={HEART_VOXEL} colorPalette={[null, '#F472B6', '#EC4899']} size={0.5} />
            </group>

            {/* Boy - Left side, facing right */}
            <group position={[-1.2, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
                <VoxelBuilder matrix={BOY_VOXEL} colorPalette={COUPLE_PALETTE} size={0.3} />
            </group>

            {/* Girl - Right side, facing left, close to boy */}
            <group position={[1.2, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
                <VoxelBuilder matrix={GIRL_VOXEL} colorPalette={COUPLE_PALETTE} size={0.3} />
            </group>

            {/* Floating Heart between them */}
            <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
                <group position={[0, 1.5, 0.5]} scale={[0.5, 0.5, 0.5]}>
                    <VoxelBuilder matrix={HEART_VOXEL} colorPalette={[null, '#EF4444', '#DC2626']} size={0.3} />
                </group>
            </Float>
        </group>
    );
};

const CoupleScene = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [5, 2, 8], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, 5, -10]} intensity={0.5} color="#F472B6" />

                <RotatingCouple />

                <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#F472B6" />
                <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
        </div>
    );
};

export default CoupleScene;

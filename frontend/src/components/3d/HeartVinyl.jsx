import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import VoxelBuilder from './VoxelBuilder';
import { HEART_VOXEL, PALETTES } from './VoxelAssets';
import * as THREE from 'three';

const HeartVinyl = (props) => {
    const group = useRef();

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y -= delta * 0.5; // Spin
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={group} {...props}>
                <VoxelBuilder
                    matrix={HEART_VOXEL}
                    colorPalette={PALETTES.heart}
                    size={0.6} // Block size
                >
                    <meshPhysicalMaterial
                        color="#ff69b4"
                        transmission={0.9}
                        opacity={1}
                        metalness={0}
                        roughness={0}
                        ior={1.5}
                        thickness={2}
                        specularIntensity={1}
                        emissive="#ff1493"
                        emissiveIntensity={0.1}
                    />
                </VoxelBuilder>

                {/* Center Label */}
                <mesh position={[0, 0, 0.4]}>
                    <boxGeometry args={[1, 1, 0.2]} />
                    <meshBasicMaterial color="#fff0f5" />
                </mesh>
            </group>
        </Float>
    );
};

export default HeartVinyl;

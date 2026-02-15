import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import VoxelBuilder from './VoxelBuilder';
import { PLAY_VOXEL, PAUSE_VOXEL, PALETTES } from './VoxelAssets';

const VoxelControls = ({ isPlaying, setIsPlaying, setIsSpotifyMode, position = [0, 0, 0] }) => {
    const group = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (group.current) {
            // Hover animation
            const targetScale = hovered ? 1.2 : 1;
            group.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group
                    ref={group}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                        if (setIsSpotifyMode) setIsSpotifyMode(true);
                    }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
                >
                    {/* Background Circle/Base */}
                    <mesh position={[2, 2, 2]}> {/* Centered relative to voxel grid */}
                        <boxGeometry args={[4, 4, 1]} />
                        <meshStandardMaterial color="#FF4081" transparent opacity={0.8} />
                    </mesh>

                    {/* Icon - Centered on top of the base */}
                    <group position={[2, 2, 2.6]}>
                        <VoxelBuilder
                            matrix={isPlaying ? PAUSE_VOXEL : PLAY_VOXEL}
                            colorPalette={PALETTES.controls}
                            size={0.6}
                        />
                    </group>
                </group>
            </Float>

            {/* Label */}
            <Text
                position={[2, -1.5, 2]}
                fontSize={0.8}
                color="#0288D1"
                anchorX="center"
                anchorY="middle"
            // font prop removed to use default font and avoid loading errors
            >
                {isPlaying ? "PAUSE" : "PLAY"}
            </Text>
        </group>
    );
};

export default VoxelControls;

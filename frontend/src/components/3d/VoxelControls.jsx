import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import VoxelBuilder from './VoxelBuilder';
import { PLAY_VOXEL, PAUSE_VOXEL, PALETTES } from './VoxelAssets';

const VoxelControls = ({ isPlaying, setIsPlaying, position = [0, 0, 0] }) => {
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
                    onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
                >
                    {/* Background Circle/Base */}
                    <mesh position={[2, 2, 2]}> {/* Centered relative to voxel grid */}
                        <boxGeometry args={[4, 4, 1]} />
                        <meshStandardMaterial color="#FF4081" transparent opacity={0.8} />
                    </mesh>

                    {/* Icon */}
                    <group position={[0.5, 0.5, 0.6]}> {/* Offset to center 5x5 grid */}
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
                font="https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8mT-gSK7De23ABF1W9w.woff" // Pixel font if possible, or default
            >
                {isPlaying ? "PAUSE" : "PLAY"}
            </Text>
        </group>
    );
};

export default VoxelControls;

import React from 'react';
import { Float } from '@react-three/drei';

const VoxelConsole = (props) => {
    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
            <group {...props}>
                {/* Main Slab */}
                <mesh position={[0, -3, 0]} receiveShadow>
                    <boxGeometry args={[8, 1, 8]} />
                    <meshStandardMaterial color="#ffb7c5" roughness={0.4} />
                </mesh>

                {/* Detail: Buttons/Knobs */}
                <mesh position={[-2, -2.4, 3]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                <mesh position={[-1, -2.4, 3]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>

                {/* Glow Strip */}
                <mesh position={[0, -3, 4.01]}>
                    <planeGeometry args={[7, 0.2]} />
                    <meshBasicMaterial color="#ff69b4" toneMapped={false} />
                </mesh>
            </group>
        </Float>
    );
};

export default VoxelConsole;

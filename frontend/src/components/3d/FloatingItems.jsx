import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import VoxelBuilder from './VoxelBuilder';
import { STRAWBERRY_VOXEL, STAR_VOXEL, CAT_VOXEL, PALETTES } from './VoxelAssets';

const VoxelItem = ({ matrix, palette, speed = 1, ...props }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * 0.2;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={ref} {...props}>
                <VoxelBuilder matrix={matrix} colorPalette={palette} size={0.3} />
            </group>
        </Float>
    )
}


const FloatingItems = () => {
    // Need to wrap 2D grids in array for 3D builder if they are flat
    const starMatrix = [STAR_VOXEL[0]];

    // Cat is already 3D-ish (layered) in definition, but let's check VoxelAssets.js
    // defined as [ [row], [row] ] for layers. Logic in builder expects [layer][row][col].
    // Let's ensure standard format.

    // Re-verifying structure in VoxelBuilder: matrix.forEach(layer => layer.forEach(row => ...))
    // So input must be [ [ [0,1], [1,0] ], [ [0,0], [0,0] ] ] (Layer -> Row -> Col)

    return (
        <group>
            <VoxelItem matrix={STRAWBERRY_VOXEL} palette={PALETTES.strawberry} position={[3, 2, -2]} speed={2} />
            <VoxelItem matrix={STRAWBERRY_VOXEL} palette={PALETTES.strawberry} position={[-3, -1, 1]} speed={1.5} rotation={[0, 0, 0.5]} />

            {/* Stars need to be 3D array */}
            <VoxelItem matrix={[STAR_VOXEL[0]]} palette={PALETTES.star} position={[-2, 3, -1]} speed={1} />
            <VoxelItem matrix={[STAR_VOXEL[0]]} palette={PALETTES.star} position={[2, -3, -2]} speed={0.8} />

            {/* Cat */}
            <VoxelItem matrix={CAT_VOXEL} palette={PALETTES.cat} position={[0, 3.5, 0]} speed={1.2} />

            <Sparkles count={40} scale={12} size={6} speed={0.4} opacity={0.6} color="#ffd700" />
        </group>
    );
};

export default FloatingItems;

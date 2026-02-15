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
            {/* Strawberry - Sweetness */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick("You are the sweetest part of my life, Josephine."); }}>
                <VoxelItem matrix={STRAWBERRY_VOXEL} palette={PALETTES.strawberry} position={[3, 2, -2]} speed={1} />
            </group>

            <group onClick={(e) => { e.stopPropagation(); onNoteClick("Every moment with you is a treat."); }}>
                <VoxelItem matrix={STRAWBERRY_VOXEL} palette={PALETTES.strawberry} position={[-3, -1, 1]} speed={0.8} rotation={[0, 0, 0.5]} />
            </group>

            {/* Stars - Shining */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick("You shine brighter than any star in my sky."); }}>
                <VoxelItem matrix={[STAR_VOXEL[0]]} palette={PALETTES.star} position={[-2, 3, -1]} speed={0.5} />
            </group>

            <group onClick={(e) => { e.stopPropagation(); onNoteClick("My world revolves around you."); }}>
                <VoxelItem matrix={[STAR_VOXEL[0]]} palette={PALETTES.star} position={[2, -3, -2]} speed={0.4} />
            </group>

            {/* Cat - Purrfect */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick("You're absolutely purr-fect to me!"); }}>
                <VoxelItem matrix={CAT_VOXEL} palette={PALETTES.cat} position={[0, 3.5, 0]} speed={0.6} />
            </group>

            <Sparkles count={40} scale={12} size={6} speed={0.2} opacity={0.6} color="#B3E5FC" />
        </group>
    );
};

export default FloatingItems;

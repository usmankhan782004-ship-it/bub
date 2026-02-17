import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import VoxelBuilder from './VoxelBuilder';
import {
    STRAWBERRY_VOXEL, STAR_VOXEL, CAT_VOXEL,
    BUNNY_VOXEL, FLOWER_VOXEL, MOON_VOXEL,
    PALETTES
} from './VoxelAssets';

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


const FloatingItems = ({ onNoteClick }) => {
    return (
        <group>
            {/* Strawberry — Sweetness */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("You are the sweetest part of my life, Josephine. 🍓"); }}>
                <VoxelItem matrix={STRAWBERRY_VOXEL} palette={PALETTES.strawberry} position={[3, 2, -2]} speed={1} />
            </group>

            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("Every moment with you is a treat."); }}>
                <VoxelItem matrix={STRAWBERRY_VOXEL} palette={PALETTES.strawberry} position={[-3, -1, 1]} speed={0.8} rotation={[0, 0, 0.5]} />
            </group>

            {/* Stars — Shining */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("You shine brighter than any star in my sky. ⭐"); }}>
                <VoxelItem matrix={[STAR_VOXEL[0]]} palette={PALETTES.star} position={[-2, 3, -1]} speed={0.5} />
            </group>

            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("My world revolves around you."); }}>
                <VoxelItem matrix={[STAR_VOXEL[0]]} palette={PALETTES.star} position={[2, -3, -2]} speed={0.4} />
            </group>

            {/* Cat — Purrfect */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("You're absolutely purr-fect to me! 🐱"); }}>
                <VoxelItem matrix={CAT_VOXEL} palette={PALETTES.cat} position={[0, 3.5, 0]} speed={0.6} />
            </group>

            {/* 🐰 Bunny — NEW */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("You make my heart hop! 🐰"); }}>
                <VoxelItem matrix={BUNNY_VOXEL} palette={PALETTES.bunny} position={[-5, 1, 2]} speed={0.7} />
            </group>

            {/* 🌷 Flower — NEW */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("A flower for my flower. 🌷"); }}>
                <VoxelItem matrix={FLOWER_VOXEL} palette={PALETTES.flower} position={[5, 0, -3]} speed={0.4} />
            </group>

            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("You bloom wherever you go. 🌸"); }}>
                <VoxelItem matrix={FLOWER_VOXEL} palette={PALETTES.flower} position={[-4, -2, -3]} speed={0.6} rotation={[0, 0.5, 0]} />
            </group>

            {/* 🌙 Moon — NEW */}
            <group onClick={(e) => { e.stopPropagation(); onNoteClick?.("You are my moon, Josephine. Always there. 🌙"); }}>
                <VoxelItem matrix={MOON_VOXEL} palette={PALETTES.moon} position={[4, 3, 1]} speed={0.3} />
            </group>

            {/* Ambient sparkles (reduced for GPU) */}
            <Sparkles count={20} scale={12} size={5} speed={0.15} opacity={0.4} color="#B3E5FC" />
        </group>
    );
};

export default FloatingItems;

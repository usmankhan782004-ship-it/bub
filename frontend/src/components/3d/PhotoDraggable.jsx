import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';

const PhotoDraggable = ({ position, url, caption, rotation = [0, 0, 0] }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            // Gentle floating
            mesh.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;

            // Hover scale
            const targetScale = hovered ? 1.1 : 1;
            mesh.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
        }
    });

    return (
        <group
            position={position}
            rotation={rotation}
            ref={mesh}
            onPointerOver={() => { document.body.style.cursor = 'grab'; setHovered(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
        >
            {/* Polaroid Frame */}
            <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[3.5, 4.2, 0.1]} />
                <meshStandardMaterial color="#fdfdfd" roughness={0.8} />
            </mesh>

            {/* Photo */}
            <Image
                url={url}
                transparent
                scale={[3, 2.5, 1]}
                position={[0, 0.5, 0.06]}
            />

            {/* Caption */}
            <Text
                position={[0, -1.5, 0.06]}
                fontSize={0.25}
                color="#333"
                anchorX="center"
                anchorY="middle"
                maxWidth={3}
            // Using default font to avoid crash
            >
                {caption}
            </Text>
        </group>
    );
};

export default PhotoDraggable;

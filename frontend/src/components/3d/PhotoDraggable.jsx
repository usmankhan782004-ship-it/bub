import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';

const PhotoDraggable = ({ position, url, caption, rotation = [0, 0, 0] }) => {
    const mesh = useRef();
    const glowRef = useRef();
    const envelopeRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [envelopeOpen, setEnvelopeOpen] = useState(false);

    useFrame((state) => {
        if (mesh.current) {
            const t = state.clock.elapsedTime + position[0];

            // Stable floating around original Y, no drift
            mesh.current.position.y = position[1] + Math.sin(t) * 0.08;

            // Hover scale
            const pulse = 1 + Math.sin(t * 2.1) * 0.015;
            const targetScale = (hovered ? 1.1 : 1) * pulse;
            mesh.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);

            mesh.current.rotation.z = rotation[2] + Math.sin(t * 0.7) * 0.02;
        }

        if (glowRef.current) {
            const glowPulse = 0.25 + Math.sin(state.clock.elapsedTime * 3.2 + position[0]) * 0.08;
            glowRef.current.material.opacity = hovered ? 0.5 : glowPulse;
        }

        if (envelopeRef.current) {
            const targetY = envelopeOpen ? 1.95 : 1.55;
            envelopeRef.current.position.y += (targetY - envelopeRef.current.position.y) * 0.14;
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
            {/* Soft glow behind polaroid */}
            <mesh ref={glowRef} position={[0, 0.1, -0.12]}>
                <planeGeometry args={[4.4, 5, 1]} />
                <meshBasicMaterial color="#ffd166" transparent opacity={0.2} />
            </mesh>

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

            {/* Secret envelope: click to reveal birthday note */}
            <group
                ref={envelopeRef}
                position={[0, 1.55, 0.15]}
                onClick={(e) => {
                    e.stopPropagation();
                    setEnvelopeOpen((prev) => !prev);
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = hovered ? 'grab' : 'auto'; }}
            >
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[1.3, 0.9]} />
                    <meshStandardMaterial color="#fce8d8" roughness={0.7} metalness={0.05} />
                </mesh>
                <mesh position={[0, 0.15, 0.01]} rotation={[0, 0, Math.PI]}>
                    <coneGeometry args={[0.68, 0.45, 3]} />
                    <meshStandardMaterial color="#efc9ae" roughness={0.7} />
                </mesh>
            </group>

            {envelopeOpen && (
                <Text
                    position={[0, 2.4, 0.22]}
                    fontSize={0.17}
                    color="#fff2f2"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={3.4}
                    outlineWidth={0.015}
                    outlineColor="#9b3a3a"
                >
                    Happy Birthday, my love. You are my favorite part of every day.
                </Text>
            )}
        </group>
    );
};

export default PhotoDraggable;

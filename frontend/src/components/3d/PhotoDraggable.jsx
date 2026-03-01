import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';

const PhotoDraggable = ({ position, url, caption, rotation = [0, 0, 0] }) => {
    const { size } = useThree();
    const isMobile = size.width <= 430;

    const mesh = useRef();
    const glowRef = useRef();
    const envelopeRef = useRef();
    const noteGroupRef = useRef();
    const noteBackdropRef = useRef();
    const noteTextRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [envelopeOpen, setEnvelopeOpen] = useState(false);

    useFrame((state, dt) => {
        const t = state.clock.elapsedTime + position[0];

        if (mesh.current) {
            const baseScale = isMobile ? 0.86 : 1;

            // Stable floating around original Y, no drift
            const floatAmount = isMobile ? 0.05 : 0.08;
            mesh.current.position.y = position[1] + Math.sin(t * 0.9) * floatAmount;

            // Smooth hover + pulse, framerate independent
            const pulse = 1 + Math.sin(t * 2.3) * 0.012;
            const targetScale = (hovered ? 1.06 : 1) * pulse * baseScale;
            mesh.current.scale.x = THREE.MathUtils.damp(mesh.current.scale.x, targetScale, 8, dt);
            mesh.current.scale.y = THREE.MathUtils.damp(mesh.current.scale.y, targetScale, 8, dt);
            mesh.current.scale.z = THREE.MathUtils.damp(mesh.current.scale.z, targetScale, 8, dt);

            mesh.current.rotation.z = rotation[2] + Math.sin(t * 0.65) * 0.014;
        }

        if (glowRef.current) {
            const glowPulse = 0.24 + Math.sin(state.clock.elapsedTime * 2.8 + position[0]) * 0.06;
            const targetOpacity = hovered ? 0.45 : glowPulse;
            glowRef.current.material.opacity = THREE.MathUtils.damp(glowRef.current.material.opacity, targetOpacity, 10, dt);
        }

        if (envelopeRef.current) {
            const closedY = isMobile ? 1.38 : 1.55;
            const openY = isMobile ? 1.62 : 1.84;
            const targetY = envelopeOpen ? openY : closedY;
            envelopeRef.current.position.y = THREE.MathUtils.damp(envelopeRef.current.position.y, targetY, 10, dt);
            envelopeRef.current.rotation.z = THREE.MathUtils.damp(
                envelopeRef.current.rotation.z,
                envelopeOpen ? 0.03 : -0.02,
                8,
                dt
            );
        }

        if (noteGroupRef.current) {
            const visible = envelopeOpen ? 1 : 0;
            const targetScale = envelopeOpen ? 1 : 0.65;
            const targetY = isMobile ? 2.22 : 2.48;
            const hiddenY = isMobile ? 1.9 : 2.15;

            noteGroupRef.current.position.y = THREE.MathUtils.damp(
                noteGroupRef.current.position.y,
                envelopeOpen ? targetY : hiddenY,
                10,
                dt
            );
            noteGroupRef.current.scale.x = THREE.MathUtils.damp(noteGroupRef.current.scale.x, targetScale, 10, dt);
            noteGroupRef.current.scale.y = THREE.MathUtils.damp(noteGroupRef.current.scale.y, targetScale, 10, dt);
            noteGroupRef.current.scale.z = THREE.MathUtils.damp(noteGroupRef.current.scale.z, targetScale, 10, dt);
            noteGroupRef.current.visible = envelopeOpen || noteGroupRef.current.scale.x > 0.68;

            if (noteBackdropRef.current) {
                noteBackdropRef.current.material.opacity = THREE.MathUtils.damp(
                    noteBackdropRef.current.material.opacity,
                    visible * 0.96,
                    12,
                    dt
                );
            }
            if (noteTextRef.current) {
                noteTextRef.current.material.opacity = THREE.MathUtils.damp(
                    noteTextRef.current.material.opacity,
                    visible,
                    12,
                    dt
                );
            }
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
                <planeGeometry args={isMobile ? [3.6, 4.2, 1] : [4.4, 5, 1]} />
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
                position={[0, isMobile ? 1.38 : 1.55, 0.15]}
                onClick={(e) => {
                    e.stopPropagation();
                    setEnvelopeOpen((prev) => !prev);
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = hovered ? 'grab' : 'auto'; }}
            >
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={isMobile ? [1.06, 0.75] : [1.3, 0.9]} />
                    <meshStandardMaterial color="#fce8d8" roughness={0.7} metalness={0.05} />
                </mesh>
                <mesh position={[0, isMobile ? 0.13 : 0.15, 0.01]} rotation={[0, 0, Math.PI]}>
                    <coneGeometry args={isMobile ? [0.56, 0.38, 3] : [0.68, 0.45, 3]} />
                    <meshStandardMaterial color="#efc9ae" roughness={0.7} />
                </mesh>
                <Text
                    position={[0, isMobile ? -0.05 : -0.06, 0.02]}
                    fontSize={isMobile ? 0.11 : 0.12}
                    color="#8f5b4e"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={isMobile ? 1 : 1.2}
                >
                    tap to open
                </Text>
            </group>

            {/* Animated note card so reveal is smooth and mobile-safe */}
            <group ref={noteGroupRef} position={[0, isMobile ? 1.9 : 2.15, 0.24]} scale={[0.65, 0.65, 0.65]} visible={false}>
                <mesh ref={noteBackdropRef} position={[0, 0, 0]}>
                    <planeGeometry args={isMobile ? [2.2, 1.35] : [2.8, 1.65]} />
                    <meshStandardMaterial color="#fff7f7" roughness={0.7} metalness={0.02} transparent opacity={0} />
                </mesh>
                <Text
                    ref={noteTextRef}
                    position={[0, 0, 0.02]}
                    fontSize={isMobile ? 0.11 : 0.13}
                    lineHeight={1.3}
                    color="#7c2d2d"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={isMobile ? 1.8 : 2.2}
                    outlineWidth={0.008}
                    outlineColor="#ffe9e9"
                >
                    {"happy birthday, pretty girl.\nlow-key my best decision ever was loving you.\nyou make life feel softer, funnier, and way better.\nmain character always."}
                </Text>
            </group>
        </group>
    );
};

export default PhotoDraggable;

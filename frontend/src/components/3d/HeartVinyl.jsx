import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const HeartShape = (x, y, scale = 1) => {
    const shape = new THREE.Shape();
    shape.moveTo(x + 5 * scale, y + 5 * scale);
    shape.bezierCurveTo(x + 5 * scale, y + 5 * scale, x + 4 * scale, y, x, y);
    shape.bezierCurveTo(x - 6 * scale, y, x - 6 * scale, y + 7 * scale, x - 6 * scale, y + 7 * scale);
    shape.bezierCurveTo(x - 6 * scale, y + 11 * scale, x - 3 * scale, y + 15.4 * scale, x + 5 * scale, y + 19 * scale);
    shape.bezierCurveTo(x + 12 * scale, y + 15.4 * scale, x + 16 * scale, y + 11 * scale, x + 16 * scale, y + 7 * scale);
    shape.bezierCurveTo(x + 16 * scale, y + 7 * scale, x + 16 * scale, y, x + 10 * scale, y);
    shape.bezierCurveTo(x + 7 * scale, y, x + 5 * scale, y + 5 * scale, x + 5 * scale, y + 5 * scale);
    return shape;
};

const HeartVinyl = (props) => {
    const mesh = useRef();

    const shape = useMemo(() => HeartShape(0, 0, 0.25), []); // Scale down significantly

    const extrudeSettings = {
        steps: 2,
        depth: 0.2, // Thickness of the record
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 10,
    };

    useFrame((state, delta) => {
        if (mesh.current) {
            // Slow spin
            mesh.current.rotation.z -= delta * 0.5;
            // Subtle wobble
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            mesh.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            < group {...props}>
                <mesh ref={mesh} position={[0, -2, 0]} rotation={[0, 0, Math.PI]}> {/* Center and flip heart to be upright */}
                    <extrudeGeometry args={[shape, extrudeSettings]} />
                    <meshPhysicalMaterial
                        color="#ff69b4" // Hot pink base
                        emissive="#ff1493"
                        emissiveIntensity={0.2}
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.6} // Glass-like
                        thickness={2}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        reflectivity={1}
                        iridescence={1}
                        iridescenceIOR={1.3}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                {/* Label in the center */}
                <mesh position={[0, 0.3, 0.11]} rotation={[0, 0, 0]}>
                    <circleGeometry args={[1, 32]} />
                    <meshBasicMaterial color="#fff0f5" />
                </mesh>
            </group >
        </Float >
    );
};

export default HeartVinyl;

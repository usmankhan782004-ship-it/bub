import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, OrthographicCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, TiltShift2, Noise, Vignette } from '@react-three/postprocessing';
import HeartVinyl from './3d/HeartVinyl';
import FloatingItems from './3d/FloatingItems';
import VoxelConsole from './3d/VoxelConsole';

const MusicPlayer3D = () => {
    // Isometric settings: Orthographic camera + specific rotation
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#E0F7FA' }}>
            <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                {/* Isometric Camera View */}
                <OrthographicCamera
                    makeDefault
                    position={[20, 20, 20]}
                    zoom={40}
                    near={-50}
                    far={200}
                    onUpdate={c => c.lookAt(0, 0, 0)}
                />

                <ambientLight intensity={0.7} color="#E1F5FE" />
                <directionalLight
                    position={[10, 20, 5]}
                    intensity={1.5}
                    color="#FFFFFF"
                />
                <pointLight position={[-10, 5, -10]} intensity={1} color="#4FC3F7" />

                <Suspense fallback={null}>
                    <group position={[0, 0, 0]}>
                        <HeartVinyl position={[0, 1, 0]} />
                        <VoxelConsole />
                        <FloatingItems />
                    </group>

                    <ContactShadows frames={1} resolution={512} scale={50} blur={2} opacity={0.25} far={10} color="#0288D1" />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    autoRotate
                    autoRotateSpeed={0.3}
                    minZoom={20}
                    maxZoom={100}
                />

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} radius={0.4} />
                    <TiltShift2 blur={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                </EffectComposer>
            </Canvas>

            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: '#d147a3',
                fontFamily: "'Courier New', Courier, monospace",
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                pointerEvents: 'none'
            }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Voxel Love</h1>
                <div style={{ width: '100%', height: '2px', background: '#d147a3', margin: '10px 0', opacity: 0.5 }}></div>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 'bold' }}>Playing: 8-Bit Heartbeat.wav</p>
            </div>
        </div>
    );
};

export default MusicPlayer3D;

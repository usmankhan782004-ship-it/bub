import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, OrthographicCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import HeartVinyl from './3d/HeartVinyl';
import FloatingItems from './3d/FloatingItems';
import VoxelConsole from './3d/VoxelConsole';

const MusicPlayer3D = () => {
    const [zoom, setZoom] = useState(25);

    useEffect(() => {
        const handleResize = () => {
            // iPhone 16 width is approx 393px. 
            // Logic: Low zoom for small screens to fit content.
            if (window.innerWidth < 768) {
                setZoom(18); // Zoom out on mobile
            } else {
                setZoom(35); // Normal for desktop
            }
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#E0F7FA' }}>
            <Canvas dpr={[1, 1.25]} performance={{ min: 0.1 }}> {/* Extremely conservative DPR for smoothness */}
                {/* Isometric Camera View */}
                <OrthographicCamera
                    makeDefault
                    position={[20, 20, 20]}
                    zoom={zoom}
                    near={-50}
                    far={200}
                    onUpdate={c => c.lookAt(0, 0, 0)}
                />

                <ambientLight intensity={0.9} color="#E1F5FE" /> {/* Brightened ambient */}
                <directionalLight
                    position={[10, 20, 5]}
                    intensity={1.2}
                    color="#FFFFFF"
                />
                <pointLight position={[-10, 5, -10]} intensity={0.8} color="#4FC3F7" />

                <Suspense fallback={null}>
                    <group position={[0, -1, 0]}> {/* Shifted down slightly to center on phone */}
                        <HeartVinyl position={[0, 1, 0]} />
                        <VoxelConsole />
                        <FloatingItems />
                    </group>

                    <ContactShadows frames={1} resolution={256} scale={40} blur={2} opacity={0.2} far={10} color="#0288D1" />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={false} // Disable zoom to prevent mess on mobile
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5} // slightly faster than 0.3 to feel "alive" but smooth
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                />

                <EffectComposer disableNormalPass>
                    {/* Removed TiltShift for performance */}
                    <Bloom luminanceThreshold={0.85} mipmapBlur intensity={0.3} radius={0.2} />
                    <Vignette eskil={false} offset={0.1} darkness={0.6} />
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

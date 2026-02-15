import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import HeartVinyl from './3d/HeartVinyl';
import FloatingItems from './3d/FloatingItems';

const MusicPlayer3D = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#ffe4e1' }}>
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                <ambientLight intensity={0.5} color="#ffc0cb" />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff69b4" />

                {/* Soft "Golden Hour" directional light */}
                <directionalLight position={[5, 5, 2]} intensity={2} color="#ffd700" />

                <Suspense fallback={null}>
                    <group position={[0, 0, 0]}>
                        <HeartVinyl />
                        <FloatingItems />
                    </group>

                    <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
                    <Environment preset="sunset" />
                </Suspense>

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <Noise opacity={0.02} />
                </EffectComposer>
            </Canvas>

            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                color: '#ff1493',
                fontFamily: "'Courier New', Courier, monospace",
                textShadow: '0 0 10px rgba(255, 105, 180, 0.5)',
                pointerEvents: 'none'
            }}>
                <h1 style={{ margin: 0, fontSize: '2rem' }}>LOVE TRACKS</h1>
                <p style={{ margin: 0, fontSize: '1rem', opacity: 0.8 }}>Now Playing: Heartbeat.mp3</p>
            </div>
        </div>
    );
};

export default MusicPlayer3D;

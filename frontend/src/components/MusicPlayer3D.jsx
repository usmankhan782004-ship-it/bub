import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, OrthographicCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import HeartVinyl from './3d/HeartVinyl';
import FloatingItems from './3d/FloatingItems';
import VoxelConsole from './3d/VoxelConsole';
import Playlist from './Playlist';

import VoxelControls from './3d/VoxelControls';
import { Sparkles, Text } from '@react-three/drei';
import SecretNote from './SecretNote';

const MusicPlayer3D = () => {
    const [zoom, setZoom] = useState(25);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeNote, setActiveNote] = useState(null);

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
        <div style={{ width: '100vw', height: '100vh', background: '#E0F7FA', position: 'relative' }}>
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
                        <HeartVinyl position={[0, 1, 0]} isPlaying={isPlaying} />
                        <VoxelConsole />
                        {/* Interactive floating items with secret notes */}
                        <FloatingItems onNoteClick={setActiveNote} />

                        {/* 3D Controls - Positioned to the right */}
                        <VoxelControls
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            position={[8, 0, 0]}
                        />

                        {/* Marquee for Josephine */}
                        <Text
                            position={[0, 4, -4]}
                            fontSize={1.5}
                            color="#E91E63"
                            anchorX="center"
                            anchorY="middle"
                            font="https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8mT-gSK7De23ABF1W9w.woff" // Pixel font for header
                            fillOpacity={0.8}
                        >
                            FOR JOSEPHINE
                        </Text>

                        {/* Particle Effects when Playing */}
                        {isPlaying && (
                            <Sparkles
                                count={50}
                                scale={12}
                                size={4}
                                speed={0.4}
                                opacity={0.8}
                                color="#ff69b4"
                                position={[0, 2, 0]}
                            />
                        )}
                    </group>

                    <ContactShadows frames={1} resolution={256} scale={40} blur={2} opacity={0.2} far={10} color="#0288D1" />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={false} // Disable zoom to prevent mess on mobile
                    enablePan={false}
                    autoRotate={isPlaying} // Only rotate when playing? Or always? Let's say always for vibe, or maybe only when playing. User liked smoothness. Let's keep it always rotating slowly.
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                />

                <EffectComposer disableNormalPass>
                    {/* Removed TiltShift for performance */}
                    <Bloom luminanceThreshold={0.85} mipmapBlur intensity={0.3} radius={0.2} />
                    <Vignette eskil={false} offset={0.1} darkness={0.6} />
                </EffectComposer>
            </Canvas>

            {/* Playlist Overlay */}
            <Playlist
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />

            {/* Secret Notes Overlay */}
            <SecretNote note={activeNote} onClose={() => setActiveNote(null)} />
        </div>
    );
};

export default MusicPlayer3D;

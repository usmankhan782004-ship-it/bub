import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, OrthographicCamera, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import HeartVinyl from './3d/HeartVinyl';
import FloatingItems from './3d/FloatingItems';
import VoxelConsole from './3d/VoxelConsole';
import Playlist from './Playlist';

import VoxelControls from './3d/VoxelControls';
import { Sparkles, Text, Float } from '@react-three/drei';
import SecretNote from './SecretNote';
import { BLACK_CAT_VOXEL, PALETTES } from './3d/VoxelAssets';
import VoxelBuilder from './3d/VoxelBuilder';

const ChubbaCat = ({ onClick }) => {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={[9, 1, 0]} onClick={onClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
                <VoxelBuilder matrix={BLACK_CAT_VOXEL} colorPalette={PALETTES.blackCat} size={0.35} />
                <Text position={[0, -0.8, 0]} fontSize={0.2} color="black">Chubba</Text>
            </group>
        </Float>
    );
};

const MusicPlayer3D = () => {
    const [zoom, setZoom] = useState(25);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeNote, setActiveNote] = useState(null);
    const [isSpotifyMode, setIsSpotifyMode] = useState(true);

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
            <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}> {/* Increased quality for retina screens */}
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

                        {/* Chubba the Black Cat */}
                        <ChubbaCat onClick={() => setActiveNote('Meow! I am Chubba, your guardian! 🐾')} />

                        {/* 3D Controls - Positioned to the right */}
                        <VoxelControls
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            setIsSpotifyMode={setIsSpotifyMode}
                            position={[8, 0, 0]}
                        />

                        {/* Marquee for Josephine */}
                        <Text
                            position={[0, 4, -4]}
                            fontSize={1.5}
                            color="#E91E63"
                            anchorX="center"
                            anchorY="middle"
                            // font prop removed to prevent crash
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

            {/* Spotify Toggle - Standalone Floating Button */}
            {!isSpotifyMode && (
                <button
                    onClick={() => setIsSpotifyMode(true)}
                    className="absolute top-6 left-6 z-50 bg-[#1DB954] text-white font-bold py-3 px-6 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-3 border-2 border-white/20"
                    style={{ backdropFilter: 'blur(10px)' }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                    Play Real Music
                </button>
            )}

            {/* Playlist Overlay */}
            <Playlist
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isSpotifyMode={isSpotifyMode}
                setIsSpotifyMode={setIsSpotifyMode}
            />

            {/* Secret Notes Overlay */}
            <SecretNote note={activeNote} onClose={() => setActiveNote(null)} />
        </div>
    );
};

export default MusicPlayer3D;

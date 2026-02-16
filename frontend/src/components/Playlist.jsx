import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Using a copyright-free romantic track from a stable source (Kevin MacLeod or similar)
// Source: "Touching Moments Two - Higher" by Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 4.0 License
const MUSIC_SRC = "https://filmmusic.io/song/4538-touching-moments-two-higher/download";
// Backup: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

const Playlist = ({ currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [canPlay, setCanPlay] = useState(false);

    // Auto-play attempt on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            // Try to play immediately
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                    setCanPlay(true);
                }).catch(error => {
                    console.log("Autoplay prevented:", error);
                    setIsPlaying(false);
                    setCanPlay(true); // User interaction needed
                });
            }
        }
    }, []);

    // Sync state with audio element
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play failed", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    return (
        <motion.div
            className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 rounded-[30px] overflow-hidden shadow-2xl z-50 pointer-events-auto"
            style={{
                background: 'rgba(255, 255, 255, 0.85)', // Use opague background for text readability
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }}
        >
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lo-fi-chill-medium-version-120-bpm-11234.mp3" // Replacing with direct CDN MP3
                loop
                onEnded={() => setIsPlaying(false)}
            />

            {/* Simple Player UI */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Album Art / Visualizer */}
                    <div className={`w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0 relative bg-pink-100 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        <span className="text-xl">🎵</span>
                    </div>

                    <div>
                        <h3 className="text-slate-800 font-bold text-sm">For Josephine</h3>
                        <p className="text-pink-500 text-xs font-medium">Click Play 👉</p>
                    </div>
                </div>

                <button
                    className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors shadow-lg active:scale-95"
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
                </button>
            </div>

            {/* Volume Slider (Optional, small) */}
            {isExpanded && (
                <div className="px-4 pb-4">
                    <p className="text-center text-xs text-slate-400 mb-2">Lo-Fi Love Mix</p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => {
                            setVolume(parseFloat(e.target.value));
                            if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value);
                        }}
                        className="w-full accent-pink-500 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            )}

            <div
                className="w-full bg-gray-100 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <style>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
};

export default Playlist;

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Robust Audio Sources with Fallbacks
const TRACKS = [
    {
        title: "Touching Moments",
        artist: "Kevin MacLeod",
        src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Contemporary_Sampler/Kevin_MacLeod_-_Touching_Moments_Two_-_Higher.mp3",
        color: "bg-pink-100"
    },
    {
        title: "Better Days",
        artist: "LAKEY INSPIRED",
        src: "https://soundcloud.com/lakeyinspired/better-days/download", // Placeholder for a known good link
        // Fallback to a reliable test stream if needed
        backupSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        color: "bg-blue-100"
    },
    {
        title: "Sweet Memories",
        artist: "Bensound",
        src: "https://www.bensound.com/bensound-music/bensound-love.mp3",
        color: "bg-yellow-100"
    }
];

const Playlist = ({ currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [error, setError] = useState(false);

    const currentTrack = TRACKS[currentSongIndex];

    const playTrack = (index) => {
        setError(false);
        setCurrentSongIndex(index);
        setIsPlaying(true);
    };

    const nextTrack = () => {
        playTrack((currentSongIndex + 1) % TRACKS.length);
    };

    const prevTrack = () => {
        playTrack((currentSongIndex - 1 + TRACKS.length) % TRACKS.length);
    };

    const handleError = () => {
        console.error("Audio Error, trying next track or backup...");
        setError(true);
        // Try fallback if available, otherwise skip
        if (currentTrack.backupSrc && audioRef.current.src !== currentTrack.backupSrc) {
            audioRef.current.src = currentTrack.backupSrc;
            audioRef.current.play();
            setError(false);
        } else {
            // Auto-skip on error after 2 seconds
            setTimeout(nextTrack, 2000);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isPlaying && !error) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.error("Playback failed (autoplay policy?):", e);
                        setIsPlaying(false); // UI should reflect paused state
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSongIndex]);

    return (
        <motion.div
            className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 rounded-[30px] overflow-hidden shadow-2xl z-50 pointer-events-auto"
            style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }}
        >
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onEnded={nextTrack}
                onError={handleError}
            />

            {/* Compact Player UI */}
            <div className="p-4 flex items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center gap-4">
                    {/* Visualizer Icon */}
                    <div className={`w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0 relative ${currentTrack.color} flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        <span className="text-xl">🎵</span>
                    </div>

                    <div className="overflow-hidden">
                        <h3 className="text-slate-800 font-bold text-sm truncate w-32">{error ? "Loading..." : currentTrack.title}</h3>
                        <p className="text-pink-500 text-xs font-medium truncate">{error ? "Retrying..." : currentTrack.artist}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="p-2 text-slate-400 hover:text-pink-500 transition-colors"
                        onClick={(e) => { e.stopPropagation(); prevTrack(); }}
                    >
                        <SkipBack size={20} />
                    </button>

                    <button
                        className="w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors shadow-lg active:scale-95"
                        onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                    >
                        {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-1" />}
                    </button>

                    <button
                        className="p-2 text-slate-400 hover:text-pink-500 transition-colors"
                        onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                    >
                        <SkipForward size={20} />
                    </button>
                </div>
            </div>

            {/* Expanded List */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 border-t border-gray-100"
                    >
                        <p className="text-xs text-slate-400 mt-2 mb-2 font-bold uppercase tracking-wider">Up Next</p>
                        <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                            {TRACKS.map((track, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center p-2 rounded-lg cursor-pointer ${i === currentSongIndex ? 'bg-pink-50' : 'hover:bg-gray-50'}`}
                                    onClick={() => playTrack(i)}
                                >
                                    <div className={`w-2 h-2 rounded-full mr-3 ${i === currentSongIndex ? 'bg-pink-500' : 'bg-gray-300'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold ${i === currentSongIndex ? 'text-pink-600' : 'text-gray-700'}`}>{track.title}</p>
                                    </div>
                                    {i === currentSongIndex && <Heart size={12} className="text-pink-500" fill="currentColor" />}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #ddd;
                    border-radius: 4px;
                }
            `}</style>
        </motion.div>
    );
};

export default Playlist;

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TRACKS = [
    {
        title: "Touching Moments",
        artist: "Kevin MacLeod",
        src: "https://filmmusic.io/song/4538-touching-moments-two-higher/download",
        color: "bg-pink-100"
    },
    {
        title: "Cute & Happy",
        artist: "Pixabay",
        src: "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3?filename=relaxing-light-background-116686.mp3",
        color: "bg-blue-100"
    },
    {
        title: "Sweet Memories",
        artist: "Pixabay",
        src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d0.mp3?filename=acoustic-motivation-11290.mp3",
        color: "bg-yellow-100"
    }
];

const Playlist = ({ currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5);

    const currentTrack = TRACKS[currentSongIndex];

    // Handle song change
    const playTrack = (index) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
    };

    const nextTrack = () => {
        playTrack((currentSongIndex + 1) % TRACKS.length);
    };

    const prevTrack = () => {
        playTrack((currentSongIndex - 1 + TRACKS.length) % TRACKS.length);
    };

    // Auto-play / Sync
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play error:", e));
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
            />

            {/* Compact Player UI */}
            <div className="p-4 flex items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center gap-4">
                    {/* Visualizer Icon */}
                    <div className={`w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0 relative ${currentTrack.color} flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                        <span className="text-xl">🎵</span>
                    </div>

                    <div className="overflow-hidden">
                        <h3 className="text-slate-800 font-bold text-sm truncate w-32">{currentTrack.title}</h3>
                        <p className="text-pink-500 text-xs font-medium truncate">{currentTrack.artist}</p>
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

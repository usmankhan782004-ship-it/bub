import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const songs = [
    { title: "Perfect", artist: "Ed Sheeran", duration: "4:23", albumArt: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96" },
    { title: "Lover", artist: "Taylor Swift", duration: "3:41", albumArt: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647" },
    { title: "All of Me", artist: "John Legend", duration: "4:29", albumArt: "https://i.scdn.co/image/ab67616d0000b2736483844627993077e682d334" },
    { title: "Just the Way You Are", artist: "Bruno Mars", duration: "3:40", albumArt: "https://i.scdn.co/image/ab67616d0000b273e659b0234032c57753238804" },
    { title: "Until I Found You", artist: "Stephen Sanchez", duration: "2:57", albumArt: "https://i.scdn.co/image/ab67616d0000b2730c471c36970b940e0cf8164e" },
    { title: "Can't Help Falling in Love", artist: "Elvis Presley", duration: "3:00", albumArt: "https://i.scdn.co/image/ab67616d0000b27320b923a5cfdd24bc5753b827" }
];

const Playlist = ({ currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying, isSpotifyMode, setIsSpotifyMode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    // Local isSpotifyMode state removed

    // Placeholder art fallback
    const currentArt = songs[currentSongIndex].albumArt;

    return (
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 rounded-[30px] overflow-hidden shadow-2xl z-50 pointer-events-auto"
            style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                maxHeight: isExpanded ? '60vh' : 'auto',
                transition: 'max-height 0.3s ease-in-out'
            }}
        >
            {/* Spotify Embed Mode */}
            {isSpotifyMode ? (
                <div className="w-full h-80 relative">
                    <button
                        onClick={() => setIsSpotifyMode(false)}
                        className="absolute top-2 right-2 z-10 bg-white/50 p-1 rounded-full hover:bg-white text-xs font-bold px-2"
                    >
                        Back to Visuals
                    </button>
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            ) : (
                <>
                    {/* Now Playing Bar (Always Visible) */}
                    <div
                        className="p-4 flex items-center gap-4 cursor-pointer relative"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {/* Album Art */}
                        <div className={`w-12 h-12 rounded-md overflow-hidden shadow-md flex-shrink-0 relative ${isPlaying ? 'ring-2 ring-pink-400' : ''}`}>
                            <img src={currentArt} alt="Album Art" className="w-full h-full object-cover" />
                            {isPlaying && <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                            </div>}
                        </div>



                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-wider mb-0.5">Playing for Josephine</p>
                            <h3 className="text-slate-800 font-bold text-sm truncate">{songs[currentSongIndex].title}</h3>
                            <p className="text-slate-600 text-xs truncate">{songs[currentSongIndex].artist}</p>
                        </div>

                        <button
                            className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-colors"
                            onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                        >
                            {isPlaying ? <Pause size={18} className="text-slate-800" /> : <Play size={18} className="text-slate-800 ml-1" />}
                        </button>
                    </div>

                    {/* Expanded Playlist */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-4 pb-4"
                            >
                                {/* Controls */}
                                <div className="flex items-center justify-center gap-6 mb-4 mt-2">
                                    <button className="text-slate-600 hover:text-slate-800 transition-colors" onClick={() => setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length)}>
                                        <SkipBack size={24} />
                                    </button>
                                    <button
                                        className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                    >
                                        {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
                                    </button>
                                    <button className="text-slate-600 hover:text-slate-800 transition-colors" onClick={() => setCurrentSongIndex((prev) => (prev + 1) % songs.length)}>
                                        <SkipForward size={24} />
                                    </button>
                                </div>

                                {/* Progress Bar (Visual Only) */}
                                <div className="w-full h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-pink-400 rounded-full"
                                        initial={{ width: '0%' }}
                                        animate={{ width: isPlaying ? '100%' : '30%' }}
                                        transition={{ duration: isPlaying ? 30 : 0, ease: 'linear', repeat: Infinity }}
                                    />
                                </div>

                                {/* Song List */}
                                <div className="max-h-40 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                                    {songs.map((song, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center p-2 rounded-xl transition-colors cursor-pointer ${index === currentSongIndex ? 'bg-white/40' : 'hover:bg-white/20'}`}
                                            onClick={() => { setCurrentSongIndex(index); setIsPlaying(true); }}
                                        >
                                            <span className="w-6 text-xs text-slate-500 font-mono">{index + 1}</span>
                                            <div className="flex-1">
                                                <p className={`text-xs font-bold ${index === currentSongIndex ? 'text-pink-600' : 'text-slate-700'}`}>{song.title}</p>
                                                <p className="text-[10px] text-slate-500">{song.artist}</p>
                                            </div>
                                            <span className="text-[10px] text-slate-500">{song.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </motion.div>
    );
};

export default Playlist;

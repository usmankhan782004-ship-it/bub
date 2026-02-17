import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Kawaii & Romantic Track List — all verified free CDN sources
const TRACKS = [
    {
        title: "Touching Moments",
        artist: "Kevin MacLeod",
        src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Contemporary_Sampler/Kevin_MacLeod_-_Touching_Moments_Two_-_Higher.mp3",
        emoji: "💕",
        color: "#F9A8D4"
    },
    {
        title: "Sunny Afternoon",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        emoji: "🌸",
        color: "#FCA5A5"
    },
    {
        title: "Cotton Clouds",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        emoji: "☁️",
        color: "#93C5FD"
    },
    {
        title: "Starlit Kiss",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        emoji: "✨",
        color: "#C4B5FD"
    },
    {
        title: "Moonlight Waltz",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        emoji: "🌙",
        color: "#A5B4FC"
    },
    {
        title: "Honey & Lavender",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        emoji: "🍯",
        color: "#FCD34D"
    },
    {
        title: "Dreamy Petals",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        emoji: "🌷",
        color: "#FDA4AF"
    },
    {
        title: "Forever & Always",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        emoji: "💗",
        color: "#F0ABFC"
    }
];

const Playlist = ({ currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);

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
        setError(true);
        setTimeout(nextTrack, 2000);
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    // Audio control
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
            if (isPlaying && !error) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSongIndex, isMuted, volume]);

    // Progress bar
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const update = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };
        audio.addEventListener('timeupdate', update);
        return () => audio.removeEventListener('timeupdate', update);
    }, [currentSongIndex]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                bottom: '16px',
                left: '12px',
                right: '12px',
                maxWidth: '340px',
                zIndex: 100,
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
                pointerEvents: 'auto',
            }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
        >
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onEnded={nextTrack}
                onError={handleError}
            />

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '3px',
                background: 'rgba(0,0,0,0.06)',
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${currentTrack.color}, #F472B6)`,
                        borderRadius: '2px',
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'linear' }}
                />
            </div>

            {/* Compact Player */}
            <div
                style={{
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                    {/* Spinning emoji disc */}
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${currentTrack.color}40, ${currentTrack.color})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0,
                        animation: isPlaying ? 'spin-slow 8s linear infinite' : 'none',
                        boxShadow: isPlaying ? `0 0 12px ${currentTrack.color}60` : 'none',
                        transition: 'box-shadow 0.3s',
                    }}>
                        {currentTrack.emoji}
                    </div>

                    <div style={{ overflow: 'hidden', flex: 1 }}>
                        <p style={{
                            fontWeight: '700',
                            fontSize: '13px',
                            color: '#1E293B',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {error ? "Loading..." : currentTrack.title}
                        </p>
                        <p style={{
                            fontSize: '10px',
                            fontWeight: '600',
                            color: '#F472B6',
                        }}>
                            {error ? "Retrying..." : currentTrack.artist}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <button onClick={(e) => { e.stopPropagation(); prevTrack(); }}
                        style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                        <SkipBack size={16} />
                    </button>

                    <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                        style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #F472B6, #EC4899)',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(244,114,182,0.4)',
                        }}>
                        {isPlaying ? <Pause size={14} color="white" /> : <Play size={14} color="white" style={{ marginLeft: '2px' }} />}
                    </button>

                    <button onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                        style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                        <SkipForward size={16} />
                    </button>

                    <button onClick={toggleMute}
                        style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: isMuted ? '#F472B6' : '#94A3B8' }}>
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>

                    <div style={{ color: '#CBD5E1', marginLeft: '2px' }}>
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    </div>
                </div>
            </div>

            {/* Expanded Track List */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ borderTop: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}
                    >
                        <p style={{
                            fontSize: '9px', fontWeight: '700', color: '#94A3B8',
                            textTransform: 'uppercase', letterSpacing: '0.1em',
                            padding: '8px 14px 4px',
                        }}>
                            Playlist — {TRACKS.length} songs
                        </p>
                        <div style={{ maxHeight: '160px', overflowY: 'auto', padding: '0 8px 8px' }}>
                            {TRACKS.map((track, i) => (
                                <div
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); playTrack(i); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        padding: '8px 6px', borderRadius: '12px', cursor: 'pointer',
                                        background: i === currentSongIndex ? `${track.color}20` : 'transparent',
                                        transition: 'background 0.2s',
                                    }}
                                >
                                    <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>
                                        {track.emoji}
                                    </span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{
                                            fontSize: '12px', fontWeight: '600',
                                            color: i === currentSongIndex ? '#1E293B' : '#64748B',
                                        }}>
                                            {track.title}
                                        </p>
                                    </div>
                                    {i === currentSongIndex && (
                                        <Heart size={12} fill="#F472B6" stroke="none" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
};

export default Playlist;

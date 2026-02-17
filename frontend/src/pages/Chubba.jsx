import { motion } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { useRef, useState } from 'react';

const Chubba = ({ videoSrc, onClose }) => {
    const videoRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    // iOS requires a user gesture to unmute — handle first tap
    const handlePlay = () => {
        if (videoRef.current && !hasInteracted) {
            videoRef.current.muted = false;
            videoRef.current.play().catch(() => { });
            setHasInteracted(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                position: 'relative',
                padding: '16px',
            }}
            onClick={handlePlay}
        >
            {/* Close Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 50,
                    padding: '8px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    transition: 'background 0.2s',
                }}
            >
                <X size={20} />
            </button>

            {/* Title */}
            <motion.h2
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#86EFAC',
                    textShadow: '0 0 12px rgba(50,205,50,0.4)',
                    textAlign: 'center',
                    marginBottom: '12px',
                }}
            >
                Happy Birthday Chubba! 🐛
            </motion.h2>

            {/* Video Container — constrained to fit screen */}
            <div style={{
                width: '80%',
                maxWidth: '280px',
                maxHeight: '55vh',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 0 24px rgba(134,239,172,0.3), 0 8px 32px rgba(0,0,0,0.2)',
                border: '2px solid rgba(134,239,172,0.2)',
                position: 'relative',
                background: 'rgba(0,0,0,0.3)',
            }}>
                <video
                    ref={videoRef}
                    src={videoSrc}
                    style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '55vh',
                        objectFit: 'contain',
                        display: 'block',
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />

                {/* Tap to unmute hint */}
                {!hasInteracted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(8px)',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        <Volume2 size={12} />
                        Tap to unmute
                    </motion.div>
                )}
            </div>

            {/* Caption */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                    marginTop: '12px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    fontStyle: 'italic',
                }}
            >
                The real boss has arrived. 👑
            </motion.p>
        </motion.div>
    );
};

export default Chubba;

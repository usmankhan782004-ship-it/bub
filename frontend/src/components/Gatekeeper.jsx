import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const NO_STAGES = [
    { text: 'No', size: 1, emoji: '' },
    { text: 'Are you sure?', size: 0.85, emoji: '🥺' },
    { text: 'Really sure?', size: 0.7, emoji: '😢' },
    { text: 'Pretty please?', size: 0.55, emoji: '😭' },
    { text: '...fine', size: 0.4, emoji: '💔' },
];

const Gatekeeper = ({ onEnter }) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [stage, setStage] = useState(0);
    const [vanished, setVanished] = useState(false);

    const moveNoButton = () => {
        if (vanished) return;

        const next = stage + 1;

        if (next >= NO_STAGES.length) {
            setVanished(true);
            return;
        }

        setStage(next);
        const randomX = (Math.random() - 0.5) * 280;
        const randomY = (Math.random() - 0.5) * 350;
        setNoBtnPosition({ x: randomX, y: randomY });
    };

    const current = NO_STAGES[Math.min(stage, NO_STAGES.length - 1)];

    return (
        <div className="w-full h-full flex items-center justify-center p-6 relative z-10">
            <motion.div
                style={{
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '50px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    padding: '40px',
                    width: '100%',
                    maxWidth: '420px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '32px',
                    border: '1px solid rgba(255,255,255,0.5)',
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -8, 0],
                }}
                transition={{
                    scale: { type: 'spring', stiffness: 200, damping: 20 },
                    y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                }}
            >
                <h1 style={{ textAlign: 'center' }}>
                    <span style={{
                        display: 'block',
                        fontSize: '40px',
                        fontWeight: '800',
                        color: '#1E3A8A',
                        marginBottom: '8px',
                        textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                    }}>
                        Josephine
                    </span>
                    <span style={{
                        display: 'block',
                        fontSize: '20px',
                        fontWeight: '500',
                        color: '#1E3A8A',
                        opacity: 0.85,
                    }}>
                        will you be my Valentine?
                    </span>
                </h1>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    minHeight: '140px',
                }}>
                    {/* YES — grows as No shrinks */}
                    <motion.button
                        style={{
                            padding: vanished ? '28px 60px' : '20px 44px',
                            fontSize: vanished ? '28px' : '22px',
                            borderRadius: '50px',
                            background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '700',
                            boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                        onClick={onEnter}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        animate={{
                            scale: vanished ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                            scale: vanished ? { repeat: Infinity, duration: 0.8 } : {},
                        }}
                    >
                        {vanished ? 'YES!! 💗' : 'Yes'}
                        <Heart fill="white" stroke="none" size={vanished ? 28 : 22} />
                    </motion.button>

                    {/* NO — shrinks, changes text, eventually vanishes */}
                    <AnimatePresence>
                        {!vanished && (
                            <motion.button
                                style={{
                                    padding: `${16 * current.size}px ${36 * current.size}px`,
                                    fontSize: `${20 * current.size}px`,
                                    borderRadius: '50px',
                                    background: 'white',
                                    color: '#1E3A8A',
                                    border: '2px solid rgba(30,58,138,0.15)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    position: stage > 0 ? 'absolute' : 'relative',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    whiteSpace: 'nowrap',
                                }}
                                animate={{
                                    x: stage > 0 ? noBtnPosition.x : 0,
                                    y: stage > 0 ? noBtnPosition.y : 0,
                                    scale: current.size,
                                    rotate: stage > 2 ? [0, -5, 5, 0] : 0,
                                }}
                                exit={{
                                    scale: 0,
                                    opacity: 0,
                                    rotate: 180,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 15,
                                }}
                                onClick={moveNoButton}
                                onMouseDown={moveNoButton}
                                onTouchStart={moveNoButton}
                                onMouseEnter={moveNoButton}
                            >
                                {current.emoji} {current.text}
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Message after No vanishes */}
                    {vanished && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: '13px',
                                color: 'rgba(30,58,138,0.5)',
                                fontStyle: 'italic',
                                textAlign: 'center',
                            }}
                        >
                            That's what I thought 😏💕
                        </motion.p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Gatekeeper;

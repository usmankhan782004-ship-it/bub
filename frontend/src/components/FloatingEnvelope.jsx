import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const FloatingEnvelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: '20%', left: '15%' });
    const [typedText, setTypedText] = useState('');
    const fullText = "Happy birthday, Bub. I just wanted to say that I genuinely love you so much. You make my life brighter every day. You're the best thing that ever happened to me.\n\nLove, Max";
    // Floating effect along the sides
    useEffect(() => {
        if (isOpen) return;

        const interval = setInterval(() => {
            // Keep it on the sides (left < 20% or right > 80%)
            const isLeft = Math.random() > 0.5;
            const newLeft = isLeft
                ? Math.floor(Math.random() * 15) + 5 + '%'
                : Math.floor(Math.random() * 15) + 80 + '%';

            const newTop = Math.floor(Math.random() * 60) + 15 + '%';
            setPosition({ top: newTop, left: newLeft });
        }, 8000);

        return () => clearInterval(interval);
    }, [isOpen]);

    // Typewriter effect
    useEffect(() => {
        if (!isOpen) return;

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [isOpen]);

    const handleOpen = () => {
        // Play pop sound
        const audio = new Audio('/assets/pop.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));

        setIsOpen(true);
        confetti({
            particleCount: 80,
            spread: 70,
            startVelocity: 25,
            ticks: 90,
            colors: ['#f472b6', '#fb7185', '#f9a8d4', '#93c5fd'],
            zIndex: 90,
        });
    };

    if (isOpen) {
        const isLeft = parseInt(position.left) < 50;

        return (
            <AnimatePresence>
                {/* Overlay to catch clicks outside if needed, optional but good for modals */}

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: isLeft ? -20 : 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: isLeft ? '16px' : 'auto',
                        right: !isLeft ? '16px' : 'auto',
                        zIndex: 60
                    }}
                    className="w-[260px] bg-white rounded-xl shadow-2xl p-5 border-2 border-pink-200"
                >
                    <div className="text-center relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-3 -right-3 p-1.5 bg-pink-100 rounded-full hover:bg-pink-200 text-pink-500 transition-colors"
                        >
                            <Heart size={16} />
                        </button>

                        <div className="flex justify-center mb-3">
                            <Sparkles className="text-pink-400" size={24} />
                        </div>
                        <h3 className="text-base font-bold text-pink-500 mb-2 font-serif">Happy Birthday!</h3>

                        <div className="bg-pink-50 rounded-lg p-3 text-xs text-pink-900 leading-relaxed border border-pink-100 min-h-[100px] text-left font-serif">
                            {typedText.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < typedText.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                            {typedText.length < fullText.length && (
                                <span className="inline-block w-1 h-3 bg-pink-400 animate-pulse ml-0.5 align-middle" />
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <motion.div
            className="fixed z-[60] cursor-pointer flex flex-col items-center gap-1.5"
            animate={{
                top: position.top,
                left: position.left,
                y: [0, -10, 0],
            }}
            transition={{
                top: { type: 'spring', stiffness: 50, damping: 20 },
                left: { type: 'spring', stiffness: 50, damping: 20 },
                y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }}
            onClick={handleOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Speech bubble */}
            <motion.div
                style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(244,114,182,0.4)',
                    boxShadow: '0 4px 12px rgba(244,114,182,0.15)',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#ec4899', // pink-500
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
                Open me
                <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: '8px',
                    height: '8px',
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(244,114,182,0.4)',
                    borderTop: 'none',
                    borderLeft: 'none',
                }} />
            </motion.div>

            {/* Bubble Icon */}
            <div
                style={{
                    padding: '12px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(244,114,182,0.6)',
                    boxShadow: '0 0 16px rgba(244,114,182,0.25), 0 4px 12px rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Gift size={22} color="#ec4899" />
            </div>
        </motion.div>
    );
};

export default FloatingEnvelope;

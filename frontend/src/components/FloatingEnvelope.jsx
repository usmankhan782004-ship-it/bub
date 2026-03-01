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

        confetti({
            particleCount: 80,
            spread: 70,
            startVelocity: 25,
            ticks: 90,
            colors: ['#f472b6', '#fb7185', '#f9a8d4', '#93c5fd'],
            zIndex: 90,
        });
    };

    const isLeft = parseInt(position.left) < 50;

    return (
        <motion.div
            className={`fixed z-[60] flex items-start gap-3 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            animate={{
                top: position.top,
                left: position.left,
                y: isOpen ? 0 : [0, -10, 0],
            }}
            transition={{
                top: { type: 'spring', stiffness: 50, damping: 20 },
                left: { type: 'spring', stiffness: 50, damping: 20 },
                y: isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }}
        >
            {/* The Floating Bubble Icon / Button */}
            <motion.div
                className="cursor-pointer flex flex-col items-center gap-1.5 shrink-0"
                onClick={!isOpen ? handleOpen : undefined}
                whileHover={!isOpen ? { scale: 1.1 } : {}}
                whileTap={!isOpen ? { scale: 0.9 } : {}}
            >
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, rotate: [0, 2, -2, 0] }}
                            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
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
                    )}
                </AnimatePresence>

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

            {/* The Cute Pink Letter Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: isLeft ? -20 : 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: isLeft ? -20 : 20, transition: { duration: 0.2 } }}
                        className="w-[260px] bg-pink-50 rounded-2xl shadow-xl p-5 border-2 border-pink-300 relative"
                        style={{
                            boxShadow: '0 10px 25px -5px rgba(244, 114, 182, 0.4), 0 8px 10px -6px rgba(244, 114, 182, 0.2)'
                        }}
                    >
                        {/* Letter decorative lines */}
                        <div className="absolute top-0 left-0 w-full h-8 overflow-hidden rounded-t-xl opacity-30 pointer-events-none">
                            <div className="w-full h-[3px] bg-pink-400 mb-[4px]" />
                            <div className="w-full h-[1px] bg-pink-300" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-3 -right-3 p-1.5 bg-white rounded-full hover:bg-pink-100 text-pink-500 transition-colors shadow-sm border border-pink-200 z-10"
                        >
                            <Heart size={16} />
                        </button>

                        <div className="flex justify-center mb-3 mt-2">
                            <Sparkles className="text-pink-400" size={24} />
                        </div>

                        <h3 className="text-base font-bold text-pink-600 mb-2 font-serif text-center border-b border-pink-200 pb-2">Happy Birthday!</h3>

                        <div className="text-xs text-pink-900 leading-relaxed font-serif min-h-[100px] text-left">
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
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


export default FloatingEnvelope;

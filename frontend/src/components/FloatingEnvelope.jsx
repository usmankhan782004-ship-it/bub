import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const FloatingEnvelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Anchor strictly to the right side, randomize top position every 5s
    const [topPosition, setTopPosition] = useState('50%');
    const [typedText, setTypedText] = useState('');
    const fullText = "Happy birthday, Bub. I just wanted to say that I genuinely love you so much. You make my life brighter every day. You're the best thing that ever happened to me.\n\nLove, Max";

    useEffect(() => {
        if (isOpen) return;
        const interval = setInterval(() => {
            const newTop = Math.floor(Math.random() * 50) + 25 + '%';
            setTopPosition(newTop);
        }, 5000);
        return () => clearInterval(interval);
    }, [isOpen]);

    // Typewriter effect
    useEffect(() => {
        if (!isOpen) {
            setTypedText('');
            return;
        }

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

    return (
        <motion.div
            className="fixed z-[60] flex flex-col items-center gap-2"
            style={{ position: 'fixed', right: '1.5rem', top: topPosition, transform: 'translateY(-50%)' }}
            animate={{ top: topPosition }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="closed-state"
                        className="cursor-pointer flex flex-col items-center gap-1.5"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            scale: { duration: 0.2 },
                            opacity: { duration: 0.2 },
                            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                        }}
                        onClick={handleOpen}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div
                            style={{
                                padding: '4px 10px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(244,114,182,0.4)',
                                boxShadow: '0 4px 12px rgba(244,114,182,0.2)',
                                fontSize: '10px',
                                fontWeight: '700',
                                color: '#ec4899',
                                whiteSpace: 'nowrap',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                position: 'relative'
                            }}
                            animate={{ rotate: [0, 3, -3, 0] }}
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
                                background: 'rgba(255,255,255,0.95)',
                                border: '1px solid rgba(244,114,182,0.4)',
                                borderTop: 'none',
                                borderLeft: 'none',
                            }} />
                        </motion.div>

                        <div
                            style={{
                                padding: '12px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(12px)',
                                border: '2px solid rgba(244,114,182,0.6)',
                                boxShadow: '0 0 16px rgba(244,114,182,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Gift size={24} color="#ec4899" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="opened-state"
                        initial={{ opacity: 0, scale: 0.5, x: 20, originX: 1, originY: 0.5 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: 20 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className="w-[85vw] max-w-[280px] bg-pink-50 rounded-3xl shadow-2xl p-6 border-4 border-pink-300 relative overflow-hidden"
                        style={{ boxShadow: '0 10px 40px -5px rgba(244, 114, 182, 0.6), 0 0 20px rgba(244, 114, 182, 0.3)' }}
                    >
                        {/* Decorative striped top */}
                        <div className="absolute top-0 left-0 w-full h-10 opacity-40 pointer-events-none flex flex-col">
                            <div className="w-full h-[6px] bg-pink-400 mb-[4px]" />
                            <div className="w-full h-[2px] bg-pink-300 mb-[2px]" />
                            <div className="w-full h-[1px] bg-pink-200" />
                        </div>

                        {/* Integrating the gift icon inside the letter itself seamlessly */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 flex justify-center">
                            <div className="p-3 rounded-full bg-white border-4 border-pink-300 shadow-md">
                                <Gift size={28} className="text-pink-500" />
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 p-1.5 bg-white rounded-full hover:bg-pink-100 text-pink-500 transition-colors shadow-sm border-2 border-pink-200 z-10"
                        >
                            <Heart size={16} />
                        </button>

                        <div className="mt-5 mb-2 flex justify-center">
                            <Sparkles className="text-pink-400" size={22} />
                        </div>

                        <h3 className="text-[17px] font-bold text-pink-600 mb-3 font-serif text-center border-b-2 border-pink-200 pb-2">Happy Birthday!</h3>

                        <div className="text-[14px] text-pink-900 leading-relaxed font-serif min-h-[100px] text-left">
                            {typedText.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < typedText.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                            {typedText.length < fullText.length && (
                                <span className="inline-block w-1.5 h-4 bg-pink-400 animate-pulse ml-0.5 align-middle rounded-sm" />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FloatingEnvelope;

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const FloatingEnvelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [typedText, setTypedText] = useState('');

    // Improved, heartfelt English letter
    const fullText = "Happy Birthday, my sweet Bub.\n\nI just wanted to take a moment to tell you how much I genuinely love you. You are the brightest part of my days, and being yours is the best thing that has ever happened to me.\n\nThank you for everything you are.\n\nForever yours,\nMax";

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
            zIndex: 9999,
        });
    };

    // By rendering into document.body, we are guaranteed to escape ANY centering flexboxes in App.jsx
    return createPortal(
        <AnimatePresence>
            {!isOpen ? (
                <motion.div
                    key="closed-state"
                    className="cursor-pointer flex flex-col items-center gap-1.5"
                    style={{ position: 'fixed', right: '30px', bottom: '130px', zIndex: 9999 }}
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
                        Surprise!
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
                    style={{ position: 'fixed', right: '30px', bottom: '130px', zIndex: 9999, transformOrigin: 'bottom right' }}
                    initial={{ opacity: 0, scale: 0.3, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.3, y: 50, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                >
                    {/* The Kawaii Book Page / Letter Panel */}
                    <div
                        className="w-[260px] h-[340px] bg-[#fffdfa] rounded-r-xl rounded-l-md shadow-2xl relative overflow-hidden flex flex-col"
                        style={{
                            boxShadow: '8px 12px 30px rgba(244, 114, 182, 0.4), inset 4px 0 10px rgba(0,0,0,0.03)',
                            border: '1px solid #fce7f3',
                            borderLeft: '4px solid #f472b6' // Book spine effect
                        }}
                    >
                        {/* Cutout / Book page lines effect background */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{
                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #fbcfe8 27px, #fbcfe8 28px)',
                            backgroundPositionY: '50px'
                        }} />

                        {/* Gift Icon inside the letter at the top left like a stamp */}
                        <div className="absolute top-3 right-3 z-10 flex justify-center opacity-80">
                            <Gift size={20} className="text-pink-400" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center p-1.5 bg-white rounded-full hover:bg-pink-100 text-pink-500 transition-colors shadow-md border border-pink-200 z-20"
                            style={{ margin: '16px' }}
                        >
                            <Heart size={14} />
                        </button>

                        <div className="mt-6 mb-2 flex justify-center z-10">
                            <Sparkles className="text-pink-400" size={18} />
                        </div>

                        <h3 className="text-[16px] font-bold text-pink-500 mt-2 mb-2 font-serif text-center z-10">
                            Just For You
                        </h3>

                        {/* Scrollable letter body */}
                        <div className="flex-1 overflow-y-auto px-5 pb-5 z-10 custom-scrollbar">
                            <div className="text-[13px] text-pink-900 leading-[28px] font-serif text-left">
                                {typedText.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < typedText.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                                {typedText.length < fullText.length && (
                                    <span className="inline-block w-1 h-3.5 bg-pink-400 animate-pulse ml-0.5 align-middle" />
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default FloatingEnvelope;

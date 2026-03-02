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
        setTypedText('');
        const typingInterval = setInterval(() => {
            setTypedText(fullText.substring(0, i + 1));
            i++;
            if (i >= fullText.length) {
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
                    style={{
                        position: 'fixed', right: '30px', bottom: '130px', zIndex: 9999,
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
                    }}
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
                        style={{
                            width: '260px',
                            height: '360px',
                            maxHeight: '60vh',
                            backgroundColor: '#fdf2f8', /* pink-50 */
                            borderTopRightRadius: '12px',
                            borderTopLeftRadius: '6px',
                            borderBottomRightRadius: '12px',
                            borderBottomLeftRadius: '6px',
                            boxShadow: '8px 12px 30px rgba(244, 114, 182, 0.4), inset 4px 0 10px rgba(0,0,0,0.03)',
                            border: '1px solid #fce7f3',
                            borderLeft: '4px solid #f472b6', /* Book spine effect */
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >

                        {/* Gift Icon inside the letter at the top left like a stamp */}
                        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', justifyContent: 'center', opacity: 0.8 }}>
                            <Gift size={20} color="#f472b6" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute', top: '-12px', right: '-12px',
                                width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '6px', backgroundColor: '#ffffff', borderRadius: '50%', color: '#ec4899',
                                cursor: 'pointer', transition: 'background-color 0.2s',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #fbcfe8', zIndex: 20,
                                margin: '16px'
                            }}
                        >
                            <Heart size={14} />
                        </button>

                        <div style={{ marginTop: '24px', marginBottom: '8px', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
                            <Sparkles color="#f472b6" size={18} />
                        </div>

                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ec4899', marginTop: '8px', marginBottom: '8px', fontFamily: '"Dancing Script", cursive', textAlign: 'center', zIndex: 10 }}>
                            Just For You
                        </h3>

                        {/* Scrollable letter body */}
                        <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', zIndex: 10, marginTop: '4px' }}>
                            <div style={{ fontSize: '14px', color: '#831843', lineHeight: '24px', fontFamily: '"Quicksand", sans-serif', textAlign: 'left' }}>
                                {typedText.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < typedText.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                                {typedText.length < fullText.length && (
                                    <span style={{ display: 'inline-block', width: '4px', height: '14px', backgroundColor: '#f472b6', marginLeft: '2px', verticalAlign: 'middle', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
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

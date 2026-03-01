import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const FloatingEnvelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: '20%', left: '15%' });

    // Floating effect
    useEffect(() => {
        if (isOpen) return;

        const interval = setInterval(() => {
            // Pick a random top-half position so it doesn't block the dashboard
            const newTop = Math.floor(Math.random() * 40) + 15 + '%';
            const newLeft = Math.floor(Math.random() * 80) + 10 + '%';
            setPosition({ top: newTop, left: newLeft });
        }, 8000);

        return () => clearInterval(interval);
    }, [isOpen]);

    const handleOpen = () => {
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
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[300px] bg-white rounded-xl shadow-2xl p-6 border-2 border-pink-200"
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
                        <h3 className="text-lg font-bold text-pink-500 mb-2 font-serif">Happy Birthday!</h3>

                        <div className="bg-pink-50 rounded-lg p-3 text-sm text-pink-900 leading-snug border border-pink-100">
                            <p className="mb-2">You are my favorite surprise. 💖</p>
                            <div className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider text-pink-400 mt-2 mb-1">
                                <Gift size={12} /> Love Coupon
                            </div>
                            <p className="text-xs">Good for ONE unforgettable birthday dinner, endless kisses, and a real gift card of your choice!</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <motion.div
            className="fixed z-[60] cursor-pointer"
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
            <div className="relative w-16 h-12 perspective-1000">
                {/* Envelope Back */}
                <div className="absolute inset-0 bg-pink-300 rounded-md shadow-lg" />

                {/* Envelope Flap */}
                <div className="absolute top-0 left-0 w-full h-[60%] bg-pink-200 origin-top transform rotate-x-0"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />

                {/* Wax Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                    <Heart size={8} className="text-white" fill="white" />
                </div>

                <motion.div
                    className="absolute -bottom-6 w-full text-center text-[9px] font-bold text-pink-500 tracking-wider uppercase bg-white/50 backdrop-blur-sm rounded-full py-0.5 pointer-events-none"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    Open me
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FloatingEnvelope;

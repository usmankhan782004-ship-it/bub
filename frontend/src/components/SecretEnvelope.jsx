import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Sparkles, X } from 'lucide-react';

const SecretEnvelope = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCard, setShowCard] = useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => {
                setShowCard(true);
                triggerConfetti();
            }, 800);
        }
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#f472b6', '#fb7185', '#e879f9', '#a78bfa', '#fbbf24']
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#f472b6', '#fb7185', '#e879f9', '#a78bfa', '#fbbf24']
            }));
        }, 250);
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                perspective: '1000px'
            }}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[100]"
            >
                <X size={24} />
            </button>

            {/* Container for 3D Envelope */}
            <div className="relative w-full max-w-md h-[300px] flex items-center justify-center cursor-pointer" onClick={handleOpen}>

                {/* The Envelope Body (Back) */}
                <motion.div
                    className="absolute w-[320px] h-[220px] rounded-xl shadow-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
                        border: '2px solid rgba(255,255,255,0.8)',
                    }}
                    initial={{ y: 50, scale: 0.9 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                >
                    {/* Inner shadowed area to look like inside of envelope */}
                    <div className="absolute inset-0 bg-pink-900/10 shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)]" />

                    {/* The Card that slides out */}
                    <motion.div
                        className="absolute left-[10px] right-[10px] bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-between text-center"
                        style={{ height: '280px', bottom: '10px', zIndex: 10 }}
                        initial={{ y: '100%' }}
                        animate={{ y: showCard ? '-120px' : '0%' }}
                        transition={{ type: 'spring', damping: 15, stiffness: 80, delay: 0.2 }}
                    >
                        <div className="w-full">
                            <h2 className="text-2xl font-bold text-pink-500 mb-2 font-serif">Happy Birthday!</h2>
                            <p className="text-gray-600 text-sm italic mb-4">You are my favorite surprise.</p>

                            {/* The 'Love Coupon' */}
                            <div className="w-full bg-pink-50 border-2 border-dashed border-pink-300 rounded-lg p-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-20">
                                    <Gift size={40} className="text-pink-500" />
                                </div>
                                <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">Love Coupon</h3>
                                <p className="text-pink-900 font-medium text-sm leading-tight">
                                    Good for ONE unforgettable birthday dinner, endless kisses, and a real gift card of your choice! 💖
                                </p>
                            </div>
                        </div>

                        <Sparkles className="text-yellow-400 mt-2" size={20} />
                    </motion.div>

                    {/* Front Flaps to cover card when inside */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[140px] z-20"
                        style={{
                            background: 'linear-gradient(to top, #fbcfe8, #f9a8d4)',
                            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% -20%, 0 0)',
                            boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
                        }}
                    />
                    {/* Side Flaps */}
                    <div
                        className="absolute top-0 bottom-0 left-0 w-[50%] z-20"
                        style={{
                            background: 'linear-gradient(to right, #fbcfe8, #f9a8d4)',
                            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                        }}
                    />
                    <div
                        className="absolute top-0 bottom-0 right-0 w-[50%] z-20"
                        style={{
                            background: 'linear-gradient(to left, #fbcfe8, #f9a8d4)',
                            clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                        }}
                    />
                </motion.div>


                {/* The Top Flap (Opens upwards) */}
                <motion.div
                    className="absolute w-[320px] h-[140px] z-30 pointer-events-none"
                    style={{
                        top: 40, // Base position aligned with envelope top
                        background: 'linear-gradient(to bottom, #fdf2f8, #fce7f3)',
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                        transformOrigin: 'top center',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                    }}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: isOpen ? -180 : 0, zIndex: isOpen ? 5 : 30 }}
                    transition={{ duration: 0.8, type: 'spring', damping: 15 }}
                />

                {/* The Wax Seal */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute z-40 flex items-center justify-center text-white"
                            style={{
                                width: '50px',
                                height: '50px',
                                background: 'radial-gradient(circle at 30% 30%, #ec4899, #be185d)',
                                borderRadius: '50%',
                                top: '50%',
                                left: '50%',
                                x: '-50%',
                                y: '-80%',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.4)'
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <Heart size={20} fill="rgba(255,255,255,0.4)" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Click Instruction */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute -bottom-12 text-pink-200 font-medium tracking-widest text-sm uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            exit={{ opacity: 0 }}
                        >
                            Tap to Open
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    );
};

export default SecretEnvelope;

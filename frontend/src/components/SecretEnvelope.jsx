import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X } from 'lucide-react';

const SecretEnvelope = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [viewport, setViewport] = useState({ width: 390, height: 844 });

    useEffect(() => {
        const sync = () => {
            setIsMobile(window.innerWidth <= 430);
            setViewport({ width: window.innerWidth, height: window.innerHeight });
        };
        sync();
        window.addEventListener('resize', sync);
        return () => window.removeEventListener('resize', sync);
    }, []);

    const layout = useMemo(() => {
        const stageWidth = isMobile ? 320 : 420;
        const stageHeight = isMobile ? 490 : 560;
        const envelopeWidth = stageWidth - 24;
        const envelopeHeight = isMobile ? 196 : 224;
        const paperWidth = envelopeWidth - 18;
        const paperHeight = isMobile ? 330 : 382;
        return { stageWidth, stageHeight, envelopeWidth, envelopeHeight, paperWidth, paperHeight };
    }, [isMobile]);
    const stageScale = Math.min(
        1,
        (viewport.width - 24) / layout.stageWidth,
        (viewport.height - 96) / layout.stageHeight
    );

    const fireConfetti = () => {
        const endAt = Date.now() + 1800;
        const timer = window.setInterval(() => {
            if (Date.now() >= endAt) {
                window.clearInterval(timer);
                return;
            }
            confetti({
                particleCount: 12,
                spread: 56,
                startVelocity: 28,
                ticks: 75,
                scalar: 0.95,
                origin: { x: Math.random() < 0.5 ? 0.2 : 0.8, y: 0.2 },
                colors: ['#f472b6', '#fb7185', '#93c5fd', '#f9a8d4'],
                zIndex: 90,
            });
        }, 140);
    };

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        fireConfetti();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'radial-gradient(circle at 20% 8%, rgba(251,191,219,0.45), rgba(245,243,255,0.9) 34%, rgba(224,231,255,0.95) 100%)',
                backdropFilter: 'blur(6px)',
            }}
        >
            <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 inline-flex items-center gap-2 px-3 py-2 rounded-full text-slate-700"
                style={{
                    background: 'rgba(255,255,255,0.76)',
                    border: '1px solid rgba(148,163,184,0.28)',
                    boxShadow: '0 10px 28px rgba(30,41,59,0.14)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Close surprise"
            >
                <X size={16} />
                <span className="text-xs sm:text-sm font-semibold">Back</span>
            </motion.button>

            <div
                className="relative select-none"
                style={{
                    width: layout.stageWidth,
                    height: layout.stageHeight,
                    transform: `scale(${stageScale})`,
                    transformOrigin: 'center center',
                    perspective: 1200,
                }}
                onClick={handleOpen}
            >
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden"
                    style={{
                        width: layout.paperWidth,
                        height: layout.paperHeight,
                        top: isMobile ? 26 : 30,
                        border: '1px solid rgba(244,114,182,0.28)',
                        background: 'linear-gradient(180deg, #fff8fb 0%, #ffffff 100%)',
                        boxShadow: '0 24px 45px rgba(99,102,241,0.16), inset 0 1px 0 rgba(255,255,255,0.8)',
                    }}
                    initial={false}
                    animate={{
                        y: isOpen ? 0 : layout.paperHeight - 56,
                        opacity: isOpen ? 1 : 0.97,
                        scale: isOpen ? 1 : 0.985,
                    }}
                    transition={{ type: 'spring', stiffness: 135, damping: 20 }}
                >
                    <div className="h-full flex flex-col">
                        <div
                            className="px-5 py-4 text-center"
                            style={{ background: 'linear-gradient(120deg, rgba(251,191,219,0.28), rgba(191,219,254,0.26))' }}
                        >
                            <p className="text-[10px] tracking-[0.24em] uppercase font-semibold text-rose-400">birthday letter</p>
                            <h2 className="text-[20px] sm:text-[22px] leading-tight mt-1 font-bold text-rose-500">happy birthday, pretty girl</h2>
                        </div>

                        <div className="px-5 py-4 flex-1">
                            <div className="w-full h-full rounded-xl border border-rose-200 bg-rose-50/45 p-4 flex flex-col">
                                <p className="text-[14px] leading-6 text-slate-700">
                                    you make normal days feel special and chaotic days feel calm.
                                </p>
                                <p className="text-[14px] leading-6 text-slate-700 mt-3">
                                    low-key still impressed i get to love someone this pretty and this real.
                                </p>
                                <p className="text-[14px] leading-6 text-slate-700 mt-3">
                                    today is all yours. dinner, flowers, and one actual gift card of your choice.
                                </p>
                                <div className="mt-auto pt-4 flex items-center justify-center gap-2 text-rose-500">
                                    <Sparkles size={14} />
                                    <span className="text-[11px] tracking-[0.18em] uppercase font-semibold">for my bub</span>
                                    <Heart size={14} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden"
                    style={{
                        width: layout.envelopeWidth,
                        height: layout.envelopeHeight,
                        bottom: 22,
                        border: '1px solid rgba(251,113,133,0.26)',
                        background: 'linear-gradient(135deg, #fbd0e7 0%, #f9c4df 55%, #f8b9d8 100%)',
                        boxShadow: '0 20px 42px rgba(236,72,153,0.2)',
                    }}
                >
                    <div
                        className="absolute inset-x-0 bottom-0"
                        style={{
                            height: '56%',
                            background: 'linear-gradient(to top, #f4a8cf, #f7b9da)',
                            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% -26%, 0 0)',
                        }}
                    />
                    <div
                        className="absolute inset-y-0 left-0 w-1/2"
                        style={{
                            background: 'linear-gradient(to right, rgba(248,183,216,0.94), rgba(248,183,216,0.5))',
                            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                        }}
                    />
                    <div
                        className="absolute inset-y-0 right-0 w-1/2"
                        style={{
                            background: 'linear-gradient(to left, rgba(248,183,216,0.94), rgba(248,183,216,0.5))',
                            clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                        }}
                    />
                </motion.div>

                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: layout.envelopeWidth,
                        height: Math.round(layout.envelopeHeight * 0.55),
                        bottom: layout.envelopeHeight + 22 - 1,
                        transformOrigin: 'top center',
                        background: 'linear-gradient(to bottom, #fff1f9, #fde2f0)',
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.08))',
                        backfaceVisibility: 'hidden',
                    }}
                    initial={false}
                    animate={{ rotateX: isOpen ? 172 : 0 }}
                    transition={{ type: 'spring', stiffness: 170, damping: 18 }}
                />

                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                            style={{
                                bottom: layout.envelopeHeight + 8,
                                width: isMobile ? 46 : 52,
                                height: isMobile ? 46 : 52,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle at 30% 30%, #ec4899, #be185d)',
                                boxShadow: '0 8px 18px rgba(190,24,93,0.3), inset 0 2px 4px rgba(255,255,255,0.36)',
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Heart size={18} fill="rgba(255,255,255,0.7)" color="white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!isOpen && (
                        <motion.p
                            className="absolute left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] font-semibold text-rose-500/80"
                            style={{ bottom: 0 }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                        >
                            tap to open
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SecretEnvelope;

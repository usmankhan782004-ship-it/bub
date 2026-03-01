import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Sparkles, X } from 'lucide-react';

const SecretEnvelope = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const sync = () => setIsMobile(window.innerWidth <= 430);
        sync();
        window.addEventListener('resize', sync);
        return () => window.removeEventListener('resize', sync);
    }, []);

    const layout = useMemo(() => {
        const width = isMobile ? 304 : 372;
        const height = isMobile ? 206 : 236;
        return {
            envelopeWidth: width,
            envelopeHeight: height,
            flapHeight: Math.round(height * 0.56),
            cardWidth: width - 24,
            cardHeight: isMobile ? 246 : 286,
            cardLift: isMobile ? -94 : -116,
        };
    }, [isMobile]);

    const triggerConfetti = () => {
        const endAt = Date.now() + 2200;
        const base = {
            spread: 64,
            startVelocity: 32,
            ticks: 80,
            zIndex: 80,
            colors: ['#f472b6', '#fb7185', '#fda4af', '#fbcfe8', '#93c5fd'],
        };

        const timer = window.setInterval(() => {
            const left = endAt - Date.now();
            if (left <= 0) {
                window.clearInterval(timer);
                return;
            }

            const pct = left / 2200;
            const count = Math.max(6, Math.floor(26 * pct));
            confetti({ ...base, particleCount: count, origin: { x: 0.15, y: 0.22 } });
            confetti({ ...base, particleCount: count, origin: { x: 0.85, y: 0.2 } });
        }, 200);
    };

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        window.setTimeout(() => {
            setShowCard(true);
            triggerConfetti();
        }, 520);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'radial-gradient(circle at 20% 10%, rgba(244,114,182,0.18), transparent 34%), rgba(15, 23, 42, 0.78)',
                backdropFilter: 'blur(14px)',
            }}
        >
            <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center gap-2 px-3 py-2 rounded-full text-white"
                style={{
                    background: 'rgba(255,255,255,0.14)',
                    border: '1px solid rgba(255,255,255,0.28)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.22)' }}
                whileTap={{ scale: 0.97 }}
                aria-label="Close surprise"
            >
                <X size={16} />
                <span className="text-xs sm:text-sm font-semibold">Back</span>
            </motion.button>

            <div
                className="relative flex items-center justify-center cursor-pointer select-none"
                style={{ width: layout.envelopeWidth + 30, height: layout.cardHeight + layout.envelopeHeight - 36 }}
                onClick={handleOpen}
            >
                <motion.div
                    className="absolute rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                        width: layout.envelopeWidth,
                        height: layout.envelopeHeight,
                        background: 'linear-gradient(135deg, #fde7f3 0%, #fbcfe8 56%, #f9c8de 100%)',
                        border: '1px solid rgba(255,255,255,0.85)',
                    }}
                    initial={{ y: 26, scale: 0.97, rotateX: 8 }}
                    animate={{ y: 0, scale: 1, rotateX: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                >
                    <div className="absolute inset-0 bg-white/10" />

                    <motion.div
                        className="absolute left-3 right-3 rounded-xl overflow-hidden"
                        style={{
                            bottom: 10,
                            height: layout.cardHeight,
                            zIndex: 14,
                            background: 'linear-gradient(180deg, #fff7fb 0%, #ffffff 100%)',
                            border: '1px solid rgba(226, 135, 176, 0.26)',
                            boxShadow: '0 20px 30px rgba(15,23,42,0.14)',
                        }}
                        initial={{ y: '102%' }}
                        animate={{ y: showCard ? layout.cardLift : '102%' }}
                        transition={{ type: 'spring', stiffness: 135, damping: 20 }}
                    >
                        <div className="h-full flex flex-col">
                            <div
                                className="px-5 py-4 text-center"
                                style={{ background: 'linear-gradient(120deg, rgba(244,114,182,0.16), rgba(147,197,253,0.16))' }}
                            >
                                <h2 className="text-[21px] leading-tight font-bold text-rose-500">Happy Birthday</h2>
                                <p className="text-[13px] text-slate-600 mt-1">you are my favorite surprise, always</p>
                            </div>

                            <div className="px-5 py-4 flex-1">
                                <div className="w-full h-full rounded-xl border border-rose-200/80 bg-rose-50/65 p-4 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-rose-400">Love Coupon</span>
                                        <Gift size={16} className="text-rose-400" />
                                    </div>
                                    <p className="text-[13px] leading-relaxed text-rose-900">
                                        One birthday dinner date, endless forehead kisses, and a real gift card of your choice.
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-rose-900 mt-3">
                                        no cap, life is better with you in it.
                                    </p>
                                    <div className="mt-auto pt-4 flex items-center justify-center gap-2 text-rose-500">
                                        <Sparkles size={14} />
                                        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold">for my bub</span>
                                        <Heart size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div
                        className="absolute bottom-0 left-0 right-0 z-20"
                        style={{
                            height: Math.round(layout.envelopeHeight * 0.48),
                            background: 'linear-gradient(to top, #f5b8d6, #f8c5df)',
                            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% -22%, 0 0)',
                        }}
                    />
                </motion.div>

                <motion.div
                    className="absolute z-30 pointer-events-none"
                    style={{
                        top: 2,
                        width: layout.envelopeWidth,
                        height: layout.flapHeight,
                        background: 'linear-gradient(to bottom, #fff4fa, #fde7f3)',
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                        transformOrigin: 'top center',
                        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))',
                    }}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: isOpen ? -178 : 0, zIndex: isOpen ? 8 : 30 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                />

                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute z-40 flex items-center justify-center"
                            style={{
                                width: isMobile ? 46 : 52,
                                height: isMobile ? 46 : 52,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle at 30% 30%, #ec4899, #be185d)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.38)',
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            whileHover={{ scale: 1.07 }}
                        >
                            <Heart size={18} fill="rgba(255,255,255,0.65)" color="white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute -bottom-10 text-rose-100/90 text-xs uppercase tracking-[0.22em] font-semibold"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.35 }}
                        >
                            tap to open
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SecretEnvelope;

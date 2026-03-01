import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X } from 'lucide-react';

const SecretEnvelope = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        confetti({
            particleCount: 80,
            spread: 70,
            startVelocity: 25,
            ticks: 90,
            colors: ['#f472b6', '#fb7185', '#f9a8d4', '#93c5fd'],
            zIndex: 90,
        });
    }, [isOpen]);

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'radial-gradient(circle at 18% 8%, rgba(251,191,219,0.42), rgba(245,243,255,0.9) 36%, rgba(224,231,255,0.95) 100%)',
                backdropFilter: 'blur(6px)',
            }}
        >
            <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 inline-flex items-center gap-2 px-3 py-2 rounded-full text-slate-700"
                style={{
                    background: 'rgba(255,255,255,0.78)',
                    border: '1px solid rgba(148,163,184,0.28)',
                    boxShadow: '0 10px 24px rgba(30,41,59,0.14)',
                }}
                aria-label="Close surprise"
            >
                <X size={16} />
                <span className="text-xs sm:text-sm font-semibold">Back</span>
            </button>

            <div className="relative w-full max-w-[360px] h-[520px] sm:h-[560px] flex items-end justify-center">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute bottom-[170px] sm:bottom-[190px] w-[92%] rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                            style={{
                                background: 'linear-gradient(180deg, #fff9fc 0%, #ffffff 100%)',
                                border: '1px solid rgba(244,114,182,0.28)',
                                boxShadow: '0 22px 42px rgba(99,102,241,0.16)',
                            }}
                        >
                            <div
                                className="px-5 py-4 text-center"
                                style={{ background: 'linear-gradient(120deg, rgba(251,191,219,0.24), rgba(191,219,254,0.22))' }}
                            >
                                <p className="text-[10px] tracking-[0.24em] uppercase font-semibold text-rose-400">birthday note</p>
                                <h2 className="text-[21px] leading-tight mt-1 font-bold text-rose-500">happy birthday, pretty girl</h2>
                            </div>

                            <div className="px-5 py-4">
                                <div className="rounded-xl border border-rose-200 bg-rose-50/45 p-4">
                                    <p className="text-[14px] leading-6 text-slate-700">
                                        you make normal days feel special and chaotic days feel calm.
                                    </p>
                                    <p className="text-[14px] leading-6 text-slate-700 mt-3">
                                        low-key still impressed i get to love someone this pretty and this real.
                                    </p>
                                    <p className="text-[14px] leading-6 text-slate-700 mt-3">
                                        today is all yours. dinner, flowers, and one actual gift card of your choice.
                                    </p>
                                    <div className="pt-4 flex items-center justify-center gap-2 text-rose-500">
                                        <Sparkles size={14} />
                                        <span className="text-[11px] tracking-[0.18em] uppercase font-semibold">for my bub</span>
                                        <Heart size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen((v) => !v)}
                    className="relative w-[240px] h-[150px] sm:w-[270px] sm:h-[165px] rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #fbd0e7 0%, #f9c4df 55%, #f8b9d8 100%)',
                        border: '1px solid rgba(251,113,133,0.28)',
                        boxShadow: '0 16px 34px rgba(236,72,153,0.22)',
                    }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    aria-label={isOpen ? 'Close letter' : 'Open letter'}
                >
                    <motion.div
                        className="absolute left-0 right-0"
                        style={{
                            top: 0,
                            height: '54%',
                            background: 'linear-gradient(to bottom, #fff1f9, #fde2f0)',
                            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                            transformOrigin: 'top center',
                        }}
                        animate={{ rotateX: isOpen ? 160 : 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    />
                    <div
                        className="absolute inset-x-0 bottom-0"
                        style={{
                            height: '56%',
                            background: 'linear-gradient(to top, #f4a8cf, #f7b9da)',
                            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% -24%, 0 0)',
                        }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-[#1e3a8a]">
                        {!isOpen && <Heart size={16} fill="#f472b6" />}
                        <span className="text-[11px] tracking-[0.2em] uppercase font-semibold mt-2">
                            {isOpen ? 'tap to close' : 'tap to open'}
                        </span>
                    </div>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default SecretEnvelope;

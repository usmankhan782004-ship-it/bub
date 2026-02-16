import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Sparkles } from 'lucide-react';

/*
  MemoryOverlay — DOM Hierarchy:
  
  1. FIXED FULL-SCREEN OVERLAY (position: fixed, inset: 0)
     └─ Backdrop (absolute, click-to-close)
     └─ 2. NON-SCROLLING SHELL (the modal frame, flex col)
           └─ Header (shrink-0, sticky top)
           └─ 3. SINGLE SCROLLABLE CONTAINER (flex-1, overflow-y: auto)
                 └─ 4. Content (children — Gallery grid goes here)
*/

const MemoryOverlay = ({ isOpen, onClose, title, children }) => {
    const handleClose = useCallback(() => onClose(), [onClose]);

    // Scroll Lock on body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // ESC key
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, handleClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                /* Layer 1: FIXED FULL-SCREEN OVERLAY */
                <motion.div
                    className="fixed inset-0"
                    style={{ zIndex: 40 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Backdrop — click to close */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={handleClose}
                    />

                    {/* Layer 2: NON-SCROLLING SHELL (the modal card) */}
                    <motion.div
                        className="absolute inset-0 md:inset-4 lg:inset-8 flex flex-col md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                        }}
                        initial={{ y: 40, opacity: 0, scale: 0.97 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 40, opacity: 0, scale: 0.97 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    >
                        {/* Header — shrink-0, never scrolls */}
                        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 shrink-0 border-b border-white/10 bg-black/20">
                            <button
                                onClick={handleClose}
                                className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-full transition-all group active:scale-95"
                            >
                                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium text-sm hidden sm:inline">Back to Memories</span>
                                <span className="font-medium text-sm sm:hidden">Back</span>
                            </button>

                            {title && (
                                <div className="flex items-center gap-2 text-white/40">
                                    <Sparkles size={12} />
                                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{title}</span>
                                </div>
                            )}

                            <button
                                onClick={handleClose}
                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-95"
                                aria-label="Close"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Layer 3: SINGLE SCROLLABLE CONTAINER */}
                        <div
                            className="flex-1 overflow-y-auto overflow-x-hidden"
                            style={{
                                WebkitOverflowScrolling: 'touch',
                                overscrollBehavior: 'contain',
                            }}
                        >
                            {/* Layer 4: Content wrapper with padding */}
                            <div className="p-4 md:p-6 pb-28">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MemoryOverlay;

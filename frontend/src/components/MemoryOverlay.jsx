import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Sparkles } from 'lucide-react';

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

const contentVariants = {
    hidden: { y: '100%', opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: {
        y: '20%',
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 }
    }
};

const MemoryOverlay = ({ isOpen, onClose, title, children }) => {
    // Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[40] flex items-center justify-center pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />

                    {/* Modal Content Sheet */}
                    <motion.div
                        className="relative w-full h-full md:w-[90%] md:h-[90%] bg-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
                        style={{ backdropFilter: 'blur(30px)' }}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header Wrapper */}
                        <div className="flex items-center justify-between p-4 md:p-6 shrink-0 z-50 bg-gradient-to-b from-black/20 to-transparent">
                            {/* Back Button */}
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all group"
                            >
                                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium text-sm">Back to Memories</span>
                            </button>

                            {/* Title / Brand */}
                            {title && (
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/50 pointer-events-none">
                                    <Sparkles size={14} />
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase">{title}</span>
                                </div>
                            )}

                            {/* Close Icon (Optional Redundancy) */}
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden relative w-full custom-scrollbar">
                            <div className="min-h-full w-full relative">
                                {children}
                            </div>
                        </div>

                        {/* Bottom safe area for Dock overlap prevention */}
                        <div className="h-24 shrink-0" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MemoryOverlay;

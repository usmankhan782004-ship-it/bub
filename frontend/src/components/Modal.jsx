import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <GlassCard
                        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8 border-[var(--neon-blue)]/50 box-border"
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <button
                            className="absolute top-4 right-4 text-2xl text-[var(--neon-blue)] hover:text-white"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        {children}
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;

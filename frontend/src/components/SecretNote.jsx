import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

const SecretNote = ({ note, onClose }) => {
    return (
        <AnimatePresence>
            {note && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4"
                >
                    <div className="relative pointer-events-auto bg-[#fff0f5] p-6 rounded-2xl shadow-2xl max-w-sm w-full border-2 border-pink-200" style={{ transform: 'rotate(-2deg)' }}>
                        <button
                            onClick={onClose}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors"
                        >
                            <X size={16} className="text-pink-400" />
                        </button>

                        <div className="text-center">
                            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2 fill-pink-500 animate-pulse" />
                            <h3 className="font-handwriting text-2xl text-pink-600 mb-2">For Josephine</h3>
                            <p className="font-serif text-slate-700 text-lg leading-relaxed italic">
                                "{note}"
                            </p>
                            <p className="text-right text-xs text-pink-400 mt-4 font-bold flex items-center justify-end gap-1">
                                WITH LOVE <Heart size={10} fill="currentColor" />
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SecretNote;

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Polaroid = ({ item, index, style, onClick }) => {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
            whileHover={{ scale: 1.1, zIndex: 100 }}
            whileTap={{ scale: 1.05, cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: style.rotate
            }}
            transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200
            }}
            className="absolute bg-white p-3 pb-8 shadow-xl cursor-grab group"
            style={{
                top: style.top,
                left: style.left,
                width: '220px',
                transformOrigin: 'center center',
                zIndex: index
            }}
            onClick={onClick}
        >
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 rotate-[2deg] backdrop-blur-sm shadow-sm z-10" />

            {/* Image */}
            <div className="w-full aspect-[4/5] bg-gray-100 mb-3 overflow-hidden border border-gray-100">
                <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    draggable={false}
                />
            </div>

            {/* Handwritten Caption */}
            <div className="font-handwritten text-center text-slate-700 text-lg rotate-[-1deg]">
                {item.alt}
            </div>
        </motion.div>
    );
};

const Gallery = ({ items = [] }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);

    // Generate random positions for the "scatter" effect
    // In a real app we might want to ensure they don't overlap too much, 
    // but random scatter adds to the charm.
    const positions = items.map((_, i) => ({
        rotate: Math.random() * 20 - 10, // -10 to 10 degrees
        top: `${Math.random() * 40 + 10}%`, // 10% to 50% down
        left: `${Math.random() * 60 + 10}%` // 10% to 70% across
    }));

    return (
        <div className="w-full h-full relative perspective-1000" ref={containerRef}>
            {/* Header */}
            <motion.div
                className="absolute top-0 w-full text-center z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h3 className="text-[#1E3A8A] text-xl font-bold tracking-wide mt-4">
                    Our Memory Table
                </h3>
                <p className="text-xs text-[#1E3A8A]/60 italic">Drag them around!</p>
            </motion.div>

            {/* Polaroids */}
            <div className="w-full h-full flex items-center justify-center relative z-10">
                {items.map((item, index) => (
                    <Polaroid
                        key={index}
                        item={item}
                        index={index}
                        style={positions[index]}
                        onClick={() => setSelectedImage(item)}
                    />
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-2xl w-full bg-white p-4 rounded-lg shadow-2xl"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute -top-10 right-0 text-white hover:text-pink-400 transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={32} />
                            </button>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full max-h-[80vh] object-contain rounded-md"
                            />
                            <p className="text-center font-handwritten text-2xl mt-4 text-slate-800">
                                {selectedImage.alt}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;

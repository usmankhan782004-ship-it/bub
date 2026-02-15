import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            {/* Header */}
            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="text-[#1E3A8A] text-2xl font-bold tracking-wide">
                    Moments with You
                </h3>
                <p className="text-xs text-[#1E3A8A]/60 italic mt-1">Swipe to see more</p>
            </motion.div>

            {/* Premium Scroll Container */}
            <div
                className="w-full max-w-4xl flex gap-6 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 snap-center relative group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            width: '280px',
                            height: '380px',
                            perspective: '1000px'
                        }}
                    >
                        {/* Polaroid Card */}
                        <div className="w-full h-full bg-white p-3 pb-10 shadow-lg rounded-sm transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-1">
                            {/* Image Container */}
                            <div className="w-full h-full bg-gray-100 overflow-hidden relative border border-gray-100">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* Gloss Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-2 left-0 w-full text-center">
                                <p className="font-handwritten text-gray-600 text-lg rotate-[-1deg]">
                                    {item.alt}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Padding to focus last item */}
                <div className="w-4 flex-shrink-0" />
            </div>
        </div>
    );
};

export default Gallery;

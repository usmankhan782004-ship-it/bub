import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h3 className="text-[#1E3A8A] text-2xl font-bold drop-shadow-sm mb-2">
                    Our Collection
                </h3>
                <p className="text-[#1E3A8A]/60 text-sm">
                    A collection of our favorite moments
                </p>
            </div>

            {/* 
               GALLERY V8: Bento Masonry Grid
               - CSS Columns for Masonry layout (columns-2 md:columns-3)
               - break-inside-avoid to prevent image splitting
               - Gap-4 for Bento spacing
            */}
            <div className="columns-2 md:columns-3 gap-4 space-y-4 px-2 md:px-0 pb-20">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100"
                    >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                            <span className="text-white font-medium text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                View
                            </span>
                        </div>

                        <img
                            src={item.src}
                            alt={item.alt || `Memory ${index + 1}`}
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            style={{ display: 'block' }} // Remove inline gap
                        />

                        {/* Optional Info Tag if needed in Bento style */}
                        {/* <div className="p-3 bg-white">
                            <p className="text-xs font-bold text-gray-800">{item.alt}</p>
                        </div> */}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;

import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full min-h-full flex flex-col">
            <div className="text-center mb-8 shrink-0">
                <h3 className="text-[#1E3A8A] text-2xl font-bold drop-shadow-sm mb-2">
                    Our Collection
                </h3>
                <p className="text-[#1E3A8A]/60 text-sm">
                    A collection of our favorite moments
                </p>
            </div>

            {/* 
               GALLERY V8.1: Refined Bento Masonry
               - Added 'mb-auto' to push footer down
            */}
            <div className="flex-1 w-full columns-1 md:columns-3 gap-6 space-y-6">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="break-inside-avoid relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl bg-white border border-white/50 transition-shadow duration-300"
                    >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="text-white font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/30 px-4 py-2 rounded-full backdrop-blur-md bg-white/10">
                                View Memory
                            </span>
                        </div>

                        <img
                            src={item.src}
                            alt={item.alt || `Memory ${index + 1}`}
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            style={{ display: 'block' }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Static Footer inside standard flow */}
            <footer className="w-full text-center py-12 shrink-0">
                <p className="text-[10px] font-medium text-[#1E3A8A] opacity-30 uppercase tracking-widest">
                    © 2026 Developed with 💙 by Max for his Bub
                </p>
            </footer>
        </div>
    );
};

export default Gallery;

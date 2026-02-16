import React from 'react';
import { motion } from 'framer-motion';

/*
  Gallery — Instagram-style responsive CSS Grid.
  
  WHY CSS Grid instead of CSS Columns:
  - CSS `columns` (masonry) doesn't report intrinsic height to the parent.
    Inside a flex-col + overflow-y-auto chain, the parent can't calculate
    how tall the content is, so scrolling breaks and items visually overlap.
  - CSS Grid with `auto-rows` gives each cell an explicit height,
    allowing the scroll container to measure total content height correctly.
*/

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-6">
                <h3 className="text-white text-2xl font-bold drop-shadow-sm mb-1">
                    Our Memories
                </h3>
                <p className="text-white/50 text-sm">
                    A collection of our favorite moments
                </p>
            </div>

            {/* 
               CSS Grid — responsive columns, explicit row heights.
               - grid-cols-1 on mobile (single column, full-width images)
               - grid-cols-2 on md+ (two columns)
               - grid-cols-3 on lg+ (three columns)
               - gap-3 for consistent spacing
               - Each image gets aspect-square for uniform cells
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                        className="relative group rounded-2xl overflow-hidden bg-white/10 border border-white/10 aspect-[4/5]"
                    >
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-10 flex items-end justify-center pb-4">
                            <span className="text-white font-medium text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
                                {item.alt || `Memory ${index + 1}`}
                            </span>
                        </div>

                        {/* Image — object-cover fills the aspect-ratio box */}
                        <img
                            src={item.src}
                            alt={item.alt || `Memory ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            draggable={false}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <footer className="w-full text-center py-8 mt-6">
                <p className="text-[10px] font-medium text-white/25 uppercase tracking-widest">
                    © 2026 Developed with 💙 by Max for his Bub
                </p>
            </footer>
        </div>
    );
};

export default Gallery;

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/*
  Gallery — Strict Horizontal Scroll Strip
  - Images sit in a single row inside a fixed-height frame
  - Scroll left/right via touch swipe OR arrow buttons
  - Each card is a fixed 260x360px — never grows or shrinks
  - No vertical overflow, no grid, no masonry
*/

const Gallery = ({ items = [] }) => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        const amount = 280;
        scrollRef.current.scrollBy({
            left: dir === 'left' ? -amount : amount,
            behavior: 'smooth'
        });
    };

    return (
        <div className="w-full flex flex-col items-center justify-center h-full">
            {/* Title */}
            <h3 className="text-white text-xl font-bold mb-4 tracking-wide">
                Our Memories
            </h3>

            {/* Frame: fixed height container, horizontally scrollable */}
            <div className="relative w-full max-w-[90vw] group">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Horizontal Scroll Strip */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto overflow-y-hidden py-2 px-2 snap-x snap-mandatory"
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-black/30 relative group/card"
                            style={{ width: '260px', height: '360px' }}
                        >
                            <img
                                src={item.src}
                                alt={item.alt || `Memory ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                loading="lazy"
                                draggable={false}
                            />
                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                <p className="text-white text-xs font-medium tracking-wide">
                                    {item.alt || `Memory ${index + 1}`}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Swipe hint (mobile) */}
            <p className="text-white/30 text-xs mt-3 md:hidden animate-pulse">
                ← Swipe to explore →
            </p>

            {/* Hide scrollbar */}
            <style>{`
                div::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};

export default Gallery;

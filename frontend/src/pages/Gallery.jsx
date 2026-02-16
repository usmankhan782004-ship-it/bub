import React, { useRef } from 'react';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-4 drop-shadow-sm">
                Our Memories
            </h3>

            {/* 
               PHONE STYLE CAROUSEL
               - Fixed container size (300px wide, phone-like)
               - Horizontal Snap Layout
               - One image at a time
            */}
            <div
                className="relative bg-black rounded-3xl border-[8px] border-gray-800 shadow-2xl overflow-hidden"
                style={{
                    width: '300px',
                    height: '550px', // Phone aspect ratio
                    maxHeight: '70vh'
                }}
            >
                {/* Screen Glare (Subtle) */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-20 rounded-2xl" />

                {/* Scroll Container */}
                <div
                    className="w-full h-full overflow-x-auto flex snap-x snap-mandatory scroll-smooth"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="w-full h-full flex-shrink-0 snap-center flex flex-col items-center justify-center bg-black relative"
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                            />

                            {/* Overlay Caption (Fade in on hover or always visible?) */}
                            <div className="absolute bottom-8 left-0 w-full text-center p-2">
                                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-md border border-white/20">
                                    {index + 1} / {items.length}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Home Button / Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-20 opacity-50"></div>
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-6 animate-pulse">
                Swipe left & right like on a phone 📱
            </p>
        </div>
    );
};

export default Gallery;

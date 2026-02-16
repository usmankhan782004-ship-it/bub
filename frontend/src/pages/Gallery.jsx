import React, { useRef } from 'react';

const Gallery = ({ items = [] }) => {
    return (
        // Wrapper: Centered, no size imposition
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-4 drop-shadow-sm">
                Our Memories
            </h3>

            {/* 
               ULTRA-COMPACT PHONE FRAME
               - Fixed 280px width (Safe for small screens)
               - Fixed 450px height
               - Snap Carousel
            */}
            <div
                className="relative bg-black rounded-[30px] border-[10px] border-gray-800 shadow-xl overflow-hidden"
                style={{
                    width: '280px',
                    height: '450px',
                    margin: '0 auto', // Center explicitly
                    flexShrink: 0
                }}
            >
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
                            style={{ width: '100%' }} // Force width
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                                loading="lazy"
                            />

                            {/* Counter */}
                            <div className="absolute bottom-4 left-0 w-full text-center">
                                <span className="bg-white/20 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                                    {index + 1} / {items.length}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-4 animate-pulse">
                ← Slide →
            </p>
        </div>
    );
};

export default Gallery;

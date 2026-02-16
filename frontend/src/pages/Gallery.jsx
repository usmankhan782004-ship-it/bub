import React, { useRef } from 'react';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-2 drop-shadow-sm">
                Our Memories
            </h3>

            {/* Polaroid Frame Container */}
            {/* Strictly Sized Box simulating a phone screen or frame */}
            <div
                className="relative bg-white p-4 shadow-2xl rounded-xl border border-gray-100"
                style={{
                    width: '320px',
                    height: '480px',
                    maxWidth: '90vw',
                    maxHeight: '60vh'
                }}
            >
                {/* Inner Scroll Area */}
                <div
                    className="w-full h-full overflow-x-auto flex items-center gap-4 snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-2"
                        >
                            <div className="w-full h-full flex flex-col items-center bg-gray-50 rounded-lg shadow-inner p-2 border border-gray-100">
                                <div className="flex-1 w-full overflow-hidden rounded-md bg-white flex items-center justify-center">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="max-w-full max-h-full object-contain pointer-events-none"
                                        loading="lazy"
                                    />
                                </div>
                                <p className="mt-2 text-center text-xs font-handwriting text-gray-600">
                                    {item.alt || `Memory ${index + 1}`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-200 w-16 h-4 opacity-50 rounded-sm rotate-1"></div>
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-4 animate-pulse">
                ← Swipe to browse →
            </p>
        </div>
    );
};

export default Gallery;

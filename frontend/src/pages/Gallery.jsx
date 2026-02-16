import React from 'react';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-4 drop-shadow-sm">
                Our Memories
            </h3>

            {/* Strict Horizontal Scroll Container */}
            {/* max-w-full ensures it doesn't overflow parent width */}
            {/* overflow-x-auto enables side scrolling */}
            <div
                className="w-full max-w-5xl flex items-center gap-4 overflow-x-auto pb-6 px-4"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 relative group"
                        style={{ height: '300px', width: '220px' }} // Fixed dimensions for consistency
                    >
                        <div className="w-full h-full bg-white p-2 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-rotate-2">
                            <div className="w-full h-full overflow-hidden rounded-md bg-gray-100">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    draggable={false}
                                />
                            </div>

                            {/* Simple Caption Overlay */}
                            <div className="absolute bottom-4 left-0 w-full text-center">
                                <span className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] text-slate-700 font-bold shadow-sm">
                                    {item.alt || `Memory ${index + 1}`}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* End spacer */}
                <div className="w-4 flex-shrink-0" />
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-2 animate-pulse">
                ← Swipe to see more →
            </p>
        </div>
    );
};

export default Gallery;

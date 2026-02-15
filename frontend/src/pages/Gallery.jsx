import React from 'react';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-4">
                Moments with You
            </h3>

            {/* Simple Horizontal Scroll */}
            <div
                className="w-full max-w-4xl flex gap-4 overflow-x-auto pb-4"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-64 h-80 bg-white p-2 shadow-md rounded-md"
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover rounded-sm"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-2">← Swipe to scroll →</p>
        </div>
    );
};

export default Gallery;

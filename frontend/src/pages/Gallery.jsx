import React, { useRef } from 'react';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-6 drop-shadow-sm">
                Our Memories
            </h3>

            {/* 
               GALLERY V6: Horizontal Scrolling Strip (Netflix Style)
               - No restrictive phone frame
               - Full width (max-w-4xl)
               - Standard overflow-x-auto for native touch scrolling
               - 'Row wise' arrangement
            */}
            <div
                className="w-full max-w-5xl overflow-x-auto px-8 pb-8 custom-scrollbar relative z-50 pointer-events-auto"
                style={{
                    WebkitOverflowScrolling: 'touch', // Essential for smooth iOS scroll
                    scrollbarWidth: 'auto', // Allow scrollbar to be seen if needed
                    display: 'flex',
                    gap: '20px',
                    scrollSnapType: 'x mandatory', // Optional snap, but usually feels good
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 relative group snap-center"
                        style={{
                            width: '260px',
                            height: '380px'
                        }}
                    >
                        <div className="w-full h-full bg-white p-3 shadow-lg rounded-2xl transform transition-transform duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col">
                            <div className="flex-1 w-full overflow-hidden rounded-xl bg-gray-50">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    draggable={false}
                                />
                            </div>

                            <div className="mt-3 text-center">
                                <span className="text-gray-500 font-medium text-xs font-handwriting">
                                    {item.alt || `Memory ${index + 1}`}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* End spacer */}
                <div className="w-8 flex-shrink-0" />
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-2 animate-pulse">
                Scroll horizontally using mouse or touch →
            </p>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(30, 58, 138, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(30, 58, 138, 0.4);
                }
                /* Ensure font-handwriting exists or fallback */
                .font-handwriting {
                    font-family: 'Courier New', Courier, monospace; 
                }
            `}</style>
        </div>
    );
};

export default Gallery;

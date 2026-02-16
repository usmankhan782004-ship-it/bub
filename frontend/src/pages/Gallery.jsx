import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = ({ items = [] }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300; // Approx card width
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative group">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-4 drop-shadow-sm">
                Our Memories
            </h3>

            {/* Navigation Buttons (Desktop) */}
            <button
                className="absolute left-2 md:-left-8 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg z-50 hover:bg-white transition-colors hidden md:flex"
                onClick={() => scroll('left')}
            >
                <ChevronLeft size={24} className="text-[#1E3A8A]" />
            </button>

            <button
                className="absolute right-2 md:-right-8 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg z-50 hover:bg-white transition-colors hidden md:flex"
                onClick={() => scroll('right')}
            >
                <ChevronRight size={24} className="text-[#1E3A8A]" />
            </button>

            {/* 
               GALLERY V7: Standard Carousel
               - Explicit Ref for button control
               - Snap scrolling
               - Max Width constrained but generous
            */}
            <div
                ref={scrollRef}
                className="w-full max-w-4xl overflow-x-auto px-4 pb-8 custom-scrollbar flex items-center gap-6 snap-x snap-mandatory"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth'
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 relative group snap-center"
                        style={{
                            width: '280px',
                            height: '400px'
                        }}
                    >
                        <div className="w-full h-full bg-white p-3 shadow-xl rounded-2xl transform transition-transform duration-300 hover:scale-105 border border-gray-100 flex flex-col">
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
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-2 animate-pulse md:hidden">
                Swipe left & right
            </p>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(30, 58, 138, 0.2);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default Gallery;

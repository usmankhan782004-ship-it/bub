import React, { useRef } from 'react';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-4 drop-shadow-sm">
                Our Memories
            </h3>

            {/* 
               FINAL ATTEMPT: "Small Card Frame" 
               A fixed container that looks like a photo album.
            */}
            <div
                className="bg-white p-4 shadow-2xl rounded-xl border border-gray-200 flex flex-col items-center relative"
                style={{
                    width: '320px',
                    height: '500px',
                    maxWidth: '90vw',
                    maxHeight: '70vh'
                }}
            >
                {/* Scroll Area */}
                <div
                    className="w-full h-full overflow-y-auto flex flex-col gap-4 p-2 custom-scrollbar"
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="w-full flex-shrink-0 bg-gray-50 p-2 rounded-lg shadow-sm border border-gray-100"
                        >
                            <div className="w-full aspect-[4/3] overflow-hidden rounded-md bg-white mb-2">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-center text-xs font-handwriting text-gray-500">
                                {item.alt || `Memory ${index + 1}`}
                            </p>
                        </div>
                    ))}

                    <div className="text-center text-xs text-gray-300 mt-4 pb-2">
                        End of Memory Lane ❤️
                    </div>
                </div>

                {/* Decorative Pin */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-sm border-2 border-white"></div>
            </div>

            <p className="text-[#1E3A8A]/50 text-xs mt-4 animate-pulse">
                Scroll down to see more ↓
            </p>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #CBD5E1;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default Gallery;

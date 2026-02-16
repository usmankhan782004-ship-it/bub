import React from 'react';

const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full h-full overflow-y-auto p-4 flex flex-col items-center">
            <h3 className="text-[#1E3A8A] text-2xl font-bold mb-6 mt-4 drop-shadow-sm">
                Our Memories
            </h3>

            {/* Robust CSS Grid - 2 cols mobile, 3 cols tablet, 4 cols desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl pb-20">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="aspect-[3/4] bg-white p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                    >
                        <div className="w-full h-full overflow-hidden rounded-md bg-gray-100">
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                        {/* Optional Caption */}
                        {item.alt && (
                            <p className="text-center text-[10px] text-gray-500 mt-1 font-mono truncate">
                                {item.alt}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;

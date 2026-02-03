
const Gallery = ({ items = [] }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            {/* Header */}
            <h3 className="text-[#1E3A8A] text-xl font-bold mb-4 tracking-wide text-center">
                Moments with You
            </h3>

            {/* Strict Horizontal Swipe Container */}
            <div
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    gap: '20px',
                    padding: '20px',
                    width: '100%',
                    maxWidth: '100vw',
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none',  /* IE 10+ */
                    boxSizing: 'border-box'
                }}
            >
                <style>
                    {`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}
                </style>

                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flex: '0 0 280px',
                            height: '380px',
                            scrollSnapAlign: 'center',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                pointerEvents: 'none'
                            }}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/*
  Gallery — Viewport-Locked Horizontal Strip
  
  CRITICAL: Uses ONLY inline styles with viewport units (vh/vw).
  No Tailwind height classes, no h-full, no flex-1.
  This guarantees the gallery fits on screen regardless of parent chain.
*/

const Gallery = ({ items = [] }) => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === 'left' ? -300 : 300,
            behavior: 'smooth'
        });
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
        }}>
            {/* Title */}
            <h3 style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px',
                textAlign: 'center',
            }}>
                Our Memories
            </h3>

            {/* Frame + Arrows wrapper */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '95vw',
                display: 'flex',
                alignItems: 'center',
            }}>
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    style={{
                        position: 'absolute',
                        left: '-4px',
                        zIndex: 20,
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    style={{
                        position: 'absolute',
                        right: '-4px',
                        zIndex: 20,
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <ChevronRight size={18} />
                </button>

                {/* THE SCROLL STRIP — uses calc(100vh - 200px) for card height */}
                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex',
                        gap: '12px',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        width: '100%',
                        padding: '8px 40px',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                flexShrink: 0,
                                width: 'calc((100vh - 220px) * 0.65)', /* Width based on viewport height */
                                height: 'calc(100vh - 220px)',         /* Height locked to viewport */
                                maxHeight: '400px',
                                maxWidth: '260px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '2px solid rgba(255,255,255,0.15)',
                                scrollSnapAlign: 'center',
                                position: 'relative',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                            }}
                        >
                            <img
                                src={item.src}
                                alt={item.alt || `Memory ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                                loading="lazy"
                                draggable={false}
                            />
                            {/* Label gradient */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '12px',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                            }}>
                                <p style={{
                                    color: 'white',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    margin: 0,
                                }}>
                                    {item.alt || `Memory ${index + 1}`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Swipe hint */}
            <p style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '11px',
                marginTop: '12px',
            }}>
                ← Swipe to explore →
            </p>
        </div>
    );
};

export default Gallery;

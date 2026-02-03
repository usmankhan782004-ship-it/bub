import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

/*
  Stable Swipe Gallery
  - Framer Motion Drag
  - Auto-Centering Snap
  - Active Scale 1.1, Inactive 0.9/Transparent
*/

const CARD_WIDTH = 280;
const CARD_GAP = 20;
const DRAG_BUFFER = 50;

const ITEMS = [
    { src: '/api/placeholder/280/400', alt: 'Moment 1' },
    { src: '/api/placeholder/280/400', alt: 'Moment 2' },
    { src: '/api/placeholder/280/400', alt: 'Moment 3' },
    { src: '/api/placeholder/280/400', alt: 'Moment 4' },
    { src: '/api/placeholder/280/400', alt: 'Moment 5' },
];

const SwipeGallery = ({ items = [] }) => {
    const [index, setIndex] = useState(0);
    const x = useMotionValue(0);
    const containerRef = useRef(null);

    const calculateX = (idx) => {
        // Center the active item
        // Viewport Center - Item Center
        // Since we map centered, let's just use strict offsets.
        // If container is centered flex, then index 0 is at center.
        // index 1 is at -(WIDTH + GAP)
        return -idx * (CARD_WIDTH + CARD_GAP);
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        let newIndex = index;

        if (offset < -DRAG_BUFFER || velocity < -500) {
            newIndex = Math.min(index + 1, items.length - 1);
        } else if (offset > DRAG_BUFFER || velocity > 500) {
            newIndex = Math.max(index - 1, 0);
        }

        setIndex(newIndex);
    };

    // Animate to new index whenever it changes
    useEffect(() => {
        const targetX = calculateX(index);
        animate(x, targetX, {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
    }, [index, x]);

    return (
        <div className="w-full h-[500px] flex items-center justify-center overflow-hidden relative touch-pan-y">
            <motion.div
                ref={containerRef}
                style={{ x, display: 'flex', gap: `${CARD_GAP}px`, cursor: 'grab', touchAction: 'pan-y' }}
                drag="x"
                dragConstraints={{ left: calculateX(items.length - 1), right: calculateX(0) }}
                // We handle snap in onDragEnd for "Page" like feel
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: 'grabbing' }}
                className="items-center py-10"
            >
                {items.map((item, i) => (
                    <GalleryCard key={i} item={item} isActive={i === index} />
                ))}
            </motion.div>
        </div>
    );
};

const GalleryCard = ({ item, isActive }) => {
    return (
        <motion.div
            className="relative shrink-0 overflow-hidden bg-white shadow-2xl"
            style={{
                width: `${CARD_WIDTH}px`,
                height: '400px', // Total Card Height
                borderRadius: '8px', // Polaroid corners are usually slightly rounded or sharp
                padding: '16px 16px 60px 16px', // Extra bottom padding for Polaroid caption area
                boxSizing: 'border-box'
            }}
            animate={{
                scale: isActive ? 1.1 : 0.9,
                opacity: isActive ? 1 : 0.6,
                rotate: isActive ? 0 : Math.random() * 4 - 2, // Slight tilt for realism
                filter: isActive ? 'blur(0px)' : 'blur(1px)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="w-full h-full bg-gray-100 overflow-hidden relative border border-gray-200">
                <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover pointer-events-none"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x600/f3f4f6/9ca3af?text=${item.alt}`;
                    }}
                />
            </div>

            {/* Mirror Effect Overlay - Subtle */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
        </motion.div>
    );
};

export default SwipeGallery;

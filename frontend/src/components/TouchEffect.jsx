import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';

/*
  Global Touch Trail - Kawaii Edition
  - Spawns Stars, Sparkles, and Hearts
  - Animation: Scale 0 -> 1.5, Fade Out, Drift Up
*/

const ICONS = [Star, Sparkles, Heart];
const COLORS = ['#60A5FA', '#F472B6', '#A78BFA', '#FBBF24']; // Blue, Pink, Purple, Gold

const TouchEffect = () => {
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        const handleInteraction = (e) => {
            const id = Date.now() + Math.random();
            let x, y;

            if (e.touches) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }

            const randomIconIndex = Math.floor(Math.random() * ICONS.length);
            const randomColorIndex = Math.floor(Math.random() * COLORS.length);

            setClicks(prev => [...prev, {
                id, x, y,
                Icon: ICONS[randomIconIndex],
                color: COLORS[randomColorIndex]
            }]);

            setTimeout(() => {
                setClicks(prev => prev.filter(click => click.id !== id));
            }, 1000);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {clicks.map(({ id, x, y, Icon, color }) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 1.5, y: y - 50 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'fixed',
                            left: x,
                            top: y,
                            pointerEvents: 'none',
                            zIndex: 99999, // Super high to float over everything
                            transform: 'translate(-50%, -50%)' // Center exactly on touch
                        }}
                    >
                        <Icon size={20} fill={color} stroke="none" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TouchEffect;

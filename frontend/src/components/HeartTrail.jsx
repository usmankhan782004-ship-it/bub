import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeartTrail = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newHeart = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };
            setHearts((prev) => [...prev, newHeart].slice(-20)); // Keep last 20 hearts
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 1.5, y: -20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            position: 'absolute',
                            left: heart.x,
                            top: heart.y,
                            color: '#00d2ff',
                            textShadow: '0 0 5px #00d2ff',
                            fontSize: '12px',
                            pointerEvents: 'none',
                        }}
                    >
                        ♥
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default HeartTrail;

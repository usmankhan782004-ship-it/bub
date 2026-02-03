import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/*
  Lumina Starfield Parallax
  - 2 Layers: Foreground (Fast), Background (Slow)
  - Parallax linked to Mouse/Touch
  - Continuous Floating Animation
*/

const STAR_COUNT = 80;

const normalize = (value, min, max) => (value - min) / (max - min);

const Starfield = () => {
    const [stars, setStars] = useState([]);

    // Mouse/Touch Position
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    // Sprung values for smooth parallax
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Parallax Transforms
    // Foreground moves more (-20px to 20px)
    const xFg = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);
    const yFg = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [20, -20]);

    // Background moves less (-10px to 10px)
    const xBg = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [10, -10]);
    const yBg = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]);

    useEffect(() => {
        // Generate Stars
        const generatedStars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 2 + 1, // 1px - 3px
            opacity: Math.random() * 0.5 + 0.3, // 0.3 - 0.8
            layer: Math.random() > 0.6 ? 'foreground' : 'background', // 40% FG usually
            duration: Math.random() * 5 + 5, // 5s - 10s float duration
        }));
        setStars(generatedStars);

        const handleMove = (e) => {
            let x, y;
            if (e.touches) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove); // Note: might conflict with swipes if prevention isn't handled, but typically okay for parallax read only

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Background Layer */}
            <motion.div style={{ x: xBg, y: yBg, width: '100%', height: '100%', position: 'absolute' }}>
                {stars.filter(s => s.layer === 'background').map(star => (
                    <Star key={star.id} star={star} />
                ))}
            </motion.div>

            {/* Foreground Layer */}
            <motion.div style={{ x: xFg, y: yFg, width: '100%', height: '100%', position: 'absolute' }}>
                {stars.filter(s => s.layer === 'foreground').map(star => (
                    <Star key={star.id} star={star} />
                ))}
            </motion.div>
        </div>
    );
};

const Star = ({ star }) => {
    return (
        <motion.div
            className="absolute bg-white rounded-full"
            style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
            }}
            animate={{
                y: [0, -10, 0], // Continuous float
                opacity: [star.opacity, star.opacity * 0.5, star.opacity] // Twinkle
            }}
            transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

export default Starfield;

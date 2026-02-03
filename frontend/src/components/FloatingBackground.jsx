import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EMOTICONS = [">.<", ":3", "(◡‿◡✿)", "UwU", "☁️", "✨", "💙"];

const FloatingItem = ({ text }) => {
    const [randoms] = useState(() => ({
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        duration: Math.random() * 20 + 20, // 20-40s
        delay: Math.random() * 5,
        scale: Math.random() * 0.5 + 0.8 // 0.8-1.3
    }));

    return (
        <motion.div
            className="absolute text-[#1E3A8A] opacity-10 font-bold select-none pointer-events-none"
            style={{
                fontSize: '2rem',
                top: `${randoms.y}%`,
                left: `${randoms.x}%`,
                zIndex: 0 // Explicitly low
            }}
            animate={{
                y: [0, -100, 0, 100, 0], // Float around
                x: [0, 50, 0, -50, 0],
                rotate: [0, 20, -20, 0]
            }}
            transition={{
                duration: randoms.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "linear",
                delay: randoms.delay
            }}
        >
            {text}
        </motion.div>
    );
};

const FloatingBackground = () => {
    const items = Array.from({ length: 15 }).map((_, i) => (
        <FloatingItem key={i} text={EMOTICONS[i % EMOTICONS.length]} />
    ));

    return (
        <div className="fixed inset-0 overflow-hidden w-full h-[100dvh] pointer-events-none" style={{ zIndex: 0 }}>
            {items}
        </div>
    );
};

export default FloatingBackground;

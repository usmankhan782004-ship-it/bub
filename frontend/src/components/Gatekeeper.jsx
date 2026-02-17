import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Gatekeeper = ({ onEnter }) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [hasJumped, setHasJumped] = useState(false);

    const moveNoButton = () => {
        const randomX = (Math.random() - 0.5) * 300;
        const randomY = (Math.random() - 0.5) * 400;
        setNoBtnPosition({ x: randomX, y: randomY });
        setHasJumped(true);
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-6 relative z-10">
            <motion.div
                className="bg-white/60 backdrop-blur-md rounded-[50px] shadow-2xl p-10 w-full max-w-lg flex flex-col items-center gap-10 border border-white/50"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -10, 0]
                }}
                transition={{
                    scale: { type: "spring", stiffness: 200, damping: 20 },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
            >
                <h1 className="text-center">
                    <span className="block text-5xl font-bold text-[#1E3A8A] mb-4 drop-shadow-sm">Josephine</span>
                    <span className="block text-2xl font-medium text-[#1E3A8A] opacity-90">will you be my Valentine?</span>
                </h1>

                <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center relative min-h-[140px]">
                    {/* YES */}
                    <motion.button
                        className="font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
                        style={{
                            padding: '24px 48px',
                            fontSize: '24px',
                            borderRadius: '50px',
                            background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={onEnter}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        Yes <Heart fill="white" stroke="none" size={24} />
                    </motion.button>

                    {/* NO */}
                    <motion.button
                        className="font-bold shadow-md bg-white text-[#1E3A8A]"
                        style={{
                            padding: '24px 48px',
                            fontSize: '24px',
                            borderRadius: '50px',
                            border: '2px solid white',
                            position: hasJumped ? 'absolute' : 'relative',
                            x: hasJumped ? noBtnPosition.x : 0,
                            y: hasJumped ? noBtnPosition.y : 0,
                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                        }}
                        onClick={moveNoButton} // Fixed: was lowercase 'onclick'
                        onMouseDown={moveNoButton}
                        onTouchStart={moveNoButton} // Critical for Mobile
                        onMouseEnter={moveNoButton} // Desktop
                        whileTap={{ scale: 0.92 }}
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Gatekeeper;

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Chubba = ({ videoSrc, onClose }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-white relative p-4">

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                <X size={24} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-[#32CD32] drop-shadow-lg text-center animate-pulse">
                Happy Birthday Chubba! 🐛
            </h2>

            {/* Video Container (Strict 9/16 Portrait) */}
            <div
                style={{
                    width: '90%',
                    maxWidth: '350px',
                    margin: '0 auto',
                    aspectRatio: '9/16',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 0 20px rgba(50, 205, 50, 0.5)', // Neon Glow
                    background: '#000'
                }}
            >
                <video
                    src={videoSrc}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline /* CRITICAL for iPhone */
                />
            </div>

            <p className="mt-4 text-center text-sm opacity-80 max-w-[80%]">
                The real boss has arrived.
            </p>
        </div>
    );
};

export default Chubba;

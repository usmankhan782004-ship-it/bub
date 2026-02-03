import { motion } from 'framer-motion';
import { useMemo } from 'react';

const ScrapbookSticker = ({ image, alt, className, style }) => {
    // Random rotation between -5 and 5 degrees
    const rotation = useMemo(() => Math.random() * 10 - 5, []);

    return (
        <motion.div
            className={`inline-block p-2 bg-white shadow-md border-4 border-white ${className}`}
            style={{
                ...style,
                rotate: rotation,
            }}
            whileHover={{ scale: 1.1, rotate: 0, transition: { type: "spring", stiffness: 300 } }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <img src={image} alt={alt} className="max-w-full h-auto block" />
        </motion.div>
    );
};

export default ScrapbookSticker;

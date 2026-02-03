import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", ...props }) => {
    return (
        <motion.div
            className={`relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] shadow-2xl ${className}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;

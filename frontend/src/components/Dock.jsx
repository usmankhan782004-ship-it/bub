import { motion } from 'framer-motion';

const DockItem = ({ icon, isActive, onClick, color }) => {
    return (
        <motion.button
            className="relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300"
            onClick={onClick}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1, y: -4 }}
            style={{
                background: isActive ? 'rgba(30, 58, 138, 0.1)' : 'transparent', // Navy tint
            }}
        >
            <span
                className="text-3xl"
                style={{
                    color: isActive ? color : '#94A3B8', // Active Color vs Muted Grey
                    filter: isActive ? 'none' : 'grayscale(100%)'
                }}
            >
                {icon}
            </span>
        </motion.button>
    );
};

const Dock = ({ activePage, setPage }) => {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
            <DockItem
                icon="🪐"
                isActive={activePage === 'home'}
                onClick={() => setPage('home')}
                color="#F472B6" // Pinkish for Love
            />
            <DockItem
                icon="📸"
                isActive={activePage === 'gallery'}
                onClick={() => setPage('gallery')}
                color="#60A5FA" // Sky Blue
            />
            <DockItem
                icon="💌"
                isActive={activePage === 'letter'}
                onClick={() => setPage('letter')}
                color="#FBBF24" // Warm Gold
            />
        </motion.div>
    );
};

export default Dock;

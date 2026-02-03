import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-12">
            <motion.h1
                className="text-5xl md:text-7xl mb-12 font-bold text-white tracking-tight"
                style={{ textShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                Happy Valentine's Day, Bub!
            </motion.h1>

            <GlassCard className="p-8 md:p-12 max-w-2xl mx-4">
                <h2 className="text-3xl font-semibold mb-6 text-pink-300 drop-shadow-sm">Coming Soon...</h2>
                <p className="text-lg mb-4 text-gray-100 leading-relaxed">
                    This is a special digital space curated just for you, Josephine.
                </p>
                <p className="text-base text-gray-300 font-medium">
                    (Made with all my love)
                </p>
            </GlassCard>
        </div>
    );
};

export default Home;

import { motion } from 'framer-motion';
import { Sparkles, Camera, Mail, Map, Music } from 'lucide-react';

/* 
  Persistent Dock - Final 4-Icon Setup
*/

const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring', stiffness: 200, damping: 20,
            staggerChildren: 0.1
        }
    }
};

const tileVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
};

const DashboardTile = ({ icon, label, onClick, isActive, color }) => {
    return (
        <motion.button
            variants={tileVariants}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, translateY: -5 }}
            animate={isActive ? {
                scale: [1, 1.05, 1],
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)"
            } : { scale: 1, boxShadow: "none" }}
            transition={isActive ? {
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 2,
                ease: "easeInOut"
            } : { type: 'spring', stiffness: 300, damping: 20 }}

            onClick={onClick}
            className="flex flex-col items-center justify-center border transition-colors duration-300"
            style={{
                width: '60px', /* Slightly smaller for cleaner look */
                height: '60px',
                borderRadius: '18px',
                cursor: 'pointer',
                background: isActive ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
        >
            <div style={{
                color: color,
                filter: 'drop-shadow(0 0 8px rgba(0, 210, 255, 0.5))'
            }}>
                {icon}
            </div>
        </motion.button>
    );
};

const Dashboard = ({ setActiveModule, activeModule }) => {
    return (
        <motion.nav
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center pointer-events-none"
            style={{ zIndex: 50 }} // As requested
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div
                className="flex gap-3 p-3 rounded-[30px] pointer-events-auto shadow-2xl justify-center items-center bg-white/10 backdrop-blur-xl border border-white/40"
            >
                <DashboardTile
                    icon={<Sparkles size={24} />}
                    label="Home"
                    color="#60A5FA"
                    isActive={activeModule === 'about'}
                    onClick={() => setActiveModule('about')}
                />
                <DashboardTile
                    icon={<Camera size={24} />}
                    label="Gallery"
                    color="#0EA5E9"
                    isActive={activeModule === 'gallery'}
                    onClick={() => setActiveModule('gallery')}
                />
                <DashboardTile
                    icon={<Mail size={24} />}
                    label="Letter"
                    color="#F472B6"
                    isActive={activeModule === 'letter'}
                    onClick={() => setActiveModule('letter')}
                />
                <DashboardTile
                    icon={<Map size={24} />}
                    label="Bridge"
                    color="#A78BFA"
                    isActive={activeModule === 'connection'}
                    onClick={() => setActiveModule('connection')}
                />
                <DashboardTile
                    icon={<Music size={24} />}
                    label="Music"
                    color="#FF69B4"
                    isActive={activeModule === 'music'}
                    onClick={() => setActiveModule('music')}
                />
            </div>
        </motion.nav>
    );
};

export default Dashboard;

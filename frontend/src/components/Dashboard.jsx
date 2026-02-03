import { motion } from 'framer-motion';
import { Sparkles, Camera, Mail, Map } from 'lucide-react';

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
                width: '70px',
                height: '70px',
                borderRadius: '20px',
                cursor: 'pointer',
                background: isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid white',
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
            className="fixed left-0 right-0 flex justify-center items-center pointer-events-none pb-[20px]"
            style={{ zIndex: 9999, bottom: '40px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div
                className="flex gap-2 p-4 rounded-[30px] pointer-events-auto shadow-2xl justify-between min-w-[320px]"
                style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                }}
            >
                <DashboardTile
                    icon={<Sparkles size={28} />}
                    label="Home"
                    color="#60A5FA"
                    isActive={activeModule === 'about'}
                    onClick={() => setActiveModule('about')}
                />
                <DashboardTile
                    icon={<Camera size={28} />}
                    label="Gallery"
                    color="#0EA5E9"
                    isActive={activeModule === 'gallery'}
                    onClick={() => setActiveModule('gallery')}
                />
                <DashboardTile
                    icon={<Mail size={28} />}
                    label="Letter"
                    color="#F472B6"
                    isActive={activeModule === 'letter'}
                    onClick={() => setActiveModule('letter')}
                />
                <DashboardTile
                    icon={<Map size={28} />}
                    label="Bridge"
                    color="#A78BFA"
                    isActive={activeModule === 'connection'}
                    onClick={() => setActiveModule('connection')}
                />
            </div>
        </motion.nav>
    );
};

export default Dashboard;

import { motion } from 'framer-motion';
import { Sparkles, Camera, Mail, Map, Music } from 'lucide-react';

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
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-1 transition-colors duration-300 relative"
            style={{
                width: '56px',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                padding: 0,
            }}
        >
            {/* Icon Circle */}
            <div
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(15px)',
                    border: isActive ? `1.5px solid ${color}` : '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: isActive ? `0 0 12px ${color}50` : '0 2px 6px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                }}
            >
                <div style={{
                    color: isActive ? color : 'rgba(30, 58, 138, 0.7)',
                    filter: isActive ? `drop-shadow(0 0 6px ${color})` : 'none',
                    transition: 'all 0.3s ease',
                }}>
                    {icon}
                </div>
            </div>

            {/* Label */}
            <span style={{
                fontSize: '9px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? color : 'rgba(30, 58, 138, 0.5)',
                letterSpacing: '0.03em',
                lineHeight: 1,
                transition: 'all 0.3s ease',
                textShadow: isActive ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
            }}>
                {label}
            </span>

            {/* Active Indicator Dot */}
            {
                isActive && (
                    <motion.div
                        layoutId="activeDot"
                        style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: color,
                            boxShadow: `0 0 6px ${color}`,
                            position: 'absolute',
                            bottom: '-6px',
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    />
                )
            }
        </motion.button >
    );
};

const Dashboard = ({ setActiveModule, activeModule }) => {
    // Toggle: clicking active module closes it
    const handleClick = (moduleName) => {
        if (activeModule === moduleName) {
            setActiveModule(null);
        } else {
            setActiveModule(moduleName);
        }
    };

    return (
        <motion.nav
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none"
            style={{ zIndex: 50 }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div
                className="flex gap-2 px-4 py-3 rounded-[28px] pointer-events-auto shadow-2xl items-end"
                style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
            >
                <DashboardTile
                    icon={<Sparkles size={22} />}
                    label="Home"
                    color="#60A5FA"
                    isActive={activeModule === 'about'}
                    onClick={() => handleClick('about')}
                />
                <DashboardTile
                    icon={<Camera size={22} />}
                    label="Gallery"
                    color="#0EA5E9"
                    isActive={activeModule === 'gallery'}
                    onClick={() => handleClick('gallery')}
                />
                <DashboardTile
                    icon={<Mail size={22} />}
                    label="Letter"
                    color="#F472B6"
                    isActive={activeModule === 'letter'}
                    onClick={() => handleClick('letter')}
                />
                <DashboardTile
                    icon={<Map size={22} />}
                    label="Bridge"
                    color="#A78BFA"
                    isActive={activeModule === 'connection'}
                    onClick={() => handleClick('connection')}
                />
                <DashboardTile
                    icon={<Music size={22} />}
                    label="Music"
                    color="#FF69B4"
                    isActive={activeModule === 'music'}
                    onClick={() => handleClick('music')}
                />
            </div>
        </motion.nav>
    );
};

export default Dashboard;

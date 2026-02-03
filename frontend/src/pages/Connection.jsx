import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

/*
  Connection Page (The Bridge)
  - Max: Jordan (Asia/Amman)
  - Bub: Wisconsin (America/Chicago)
*/

const TimeCard = ({ label, timezone, color }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            setTime(formatter.format(now));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return (
        <motion.div
            className="flex flex-col items-center justify-center p-6 rounded-3xl backdrop-blur-md border shadow-lg w-40 h-48 sm:w-48 sm:h-56 relative overflow-hidden group"
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                boxShadow: `0 0 20px ${color}40, inset 0 0 10px ${color}20`
            }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="absolute top-2 right-2 opacity-50">
                <Clock size={16} color={color} />
            </div>

            <MapPin size={32} color={color} className="mb-4 drop-shadow-md" />

            <h3 className="text-white text-lg font-bold mb-1 tracking-wide">{label}</h3>
            <p className="text-white/70 text-xs font-mono uppercase tracking-widest mb-4">
                {timezone.split('/')[1].replace('_', ' ')}
            </p>

            <div className="bg-black/20 px-4 py-2 rounded-xl border border-white/10 w-full text-center">
                <span className="text-2xl font-bold text-white tabular-nums drop-shadow-sm">
                    {time}
                </span>
            </div>
        </motion.div>
    );
};

const Connection = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h2 className="text-3xl font-bold text-[#60A5FA] drop-shadow-md">Our Connection</h2>
                <p className="text-white/80 text-sm mt-2 italic shadow-black drop-shadow-md">Miles apart, but always in sync.</p>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-6">
                <TimeCard
                    label="Max"
                    timezone="Asia/Amman"
                    color="#60A5FA" // Baby Blue
                />
                <TimeCard
                    label="Bub"
                    timezone="America/Chicago"
                    color="#F472B6" // Pink
                />
            </div>

            {/* Connecting Line (Visual Flair) */}
            <motion.div
                className="w-32 h-[1px] bg-gradient-to-r from-[#60A5FA] to-[#F472B6] opacity-50"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
        </div>
    );
};

export default Connection;

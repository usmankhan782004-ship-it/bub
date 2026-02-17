import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';

/*
  Connection Page — "The Red String of Fate"
  Max: Jordan (Asia/Amman)  |  Bub: Wisconsin (America/Chicago)
  Compact layout that fits mobile viewport without scrolling.
*/

const getActivity = (hour) => {
    if (hour >= 0 && hour < 6) return '😴 Sleeping';
    if (hour >= 6 && hour < 8) return '🌅 Waking up';
    if (hour >= 8 && hour < 12) return '☕ Morning';
    if (hour >= 12 && hour < 14) return '🍽️ Lunch';
    if (hour >= 14 && hour < 17) return '💻 Afternoon';
    if (hour >= 17 && hour < 20) return '🌇 Evening';
    if (hour >= 20 && hour < 22) return '🛋️ Relaxing';
    return '😴 Sleeping';
};

const TimeCard = ({ label, timezone, color }) => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState(12);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour: 'numeric', minute: '2-digit', hour12: true }).format(now));
            setDate(new Intl.DateTimeFormat('en-US', { timeZone: timezone, month: 'short', day: 'numeric' }).format(now));
            setDay(new Intl.DateTimeFormat('en-US', { timeZone: timezone, weekday: 'short' }).format(now));
            setHour(parseInt(new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour: 'numeric', hour12: false }).format(now)));
        };
        update();
        const iv = setInterval(update, 1000);
        return () => clearInterval(iv);
    }, [timezone]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '14px 12px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: `0 4px 16px rgba(0,0,0,0.06), 0 0 16px ${color}15`,
            width: '130px',
            position: 'relative',
        }}>
            {/* Pin */}
            <MapPin size={20} color={color} style={{ marginBottom: '6px', filter: `drop-shadow(0 0 3px ${color})` }} />

            {/* Name */}
            <h3 style={{ color: '#1E3A8A', fontSize: '16px', fontWeight: '800', marginBottom: '1px' }}>{label}</h3>
            <p style={{ color: 'rgba(30,58,138,0.4)', fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                {timezone.split('/')[1].replace('_', ' ')}
            </p>

            {/* Time */}
            <div style={{
                background: 'rgba(30,58,138,0.08)',
                padding: '5px 10px',
                borderRadius: '12px',
                width: '100%',
                textAlign: 'center',
                marginBottom: '6px',
            }}>
                <span style={{ fontSize: '17px', fontWeight: '700', color: '#1E3A8A', fontVariantNumeric: 'tabular-nums' }}>
                    {time}
                </span>
            </div>

            {/* Date */}
            <span style={{ fontSize: '10px', color: 'rgba(30,58,138,0.5)', fontWeight: '600' }}>
                {day}, {date}
            </span>

            {/* Activity */}
            <span style={{
                fontSize: '9px',
                color: 'rgba(30,58,138,0.4)',
                marginTop: '4px',
                padding: '2px 8px',
                borderRadius: '10px',
                background: `${color}12`,
            }}>
                {getActivity(hour)}
            </span>
        </div>
    );
};

const Connection = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxHeight: 'calc(100vh - 200px)',
            padding: '12px',
            gap: '4px',
        }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4px' }}
            >
                <h2 style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#1E3A8A',
                    textShadow: '0 1px 3px rgba(255,255,255,0.8)',
                    marginBottom: '2px',
                }}>
                    The Red String of Fate
                </h2>
                <p style={{ fontSize: '11px', color: 'rgba(30,58,138,0.5)', fontStyle: 'italic' }}>
                    An invisible thread connects those destined to meet
                </p>
            </motion.div>

            {/* Cards with Red String between them */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0px',
                position: 'relative',
            }}>
                {/* Max's card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    <TimeCard label="Max" timezone="Asia/Amman" color="#60A5FA" />
                </motion.div>

                {/* Red String - connects the two cards */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    position: 'relative',
                }}>
                    <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
                        {/* Main red string curving between cards */}
                        <motion.path
                            d="M0 25 C15 25, 15 50, 30 50 C45 50, 45 75, 60 75"
                            stroke="#EF4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
                        />
                        {/* Glow */}
                        <motion.path
                            d="M0 25 C15 25, 15 50, 30 50 C45 50, 45 75, 60 75"
                            stroke="#EF4444"
                            strokeWidth="6"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.12"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
                        />
                        {/* Knot dots on each end */}
                        <motion.circle cx="2" cy="25" r="3" fill="#EF4444"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                        <motion.circle cx="58" cy="75" r="3" fill="#EF4444"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.3 }} />
                    </svg>

                    {/* Heart at center */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                        >
                            <Heart size={18} fill="#EF4444" stroke="none" style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.5))' }} />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bub's card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                >
                    <TimeCard label="Bub" timezone="America/Chicago" color="#F472B6" />
                </motion.div>
            </div>

            {/* Distance footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '6px',
                    padding: '5px 14px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(239,68,68,0.15)',
                }}
            >
                <Heart size={10} fill="#EF4444" stroke="none" />
                <span style={{ fontSize: '10px', color: 'rgba(30,58,138,0.5)', fontWeight: '600' }}>
                    6,432 miles apart — but always connected
                </span>
            </motion.div>
        </div>
    );
};

export default Connection;

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Heart, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

/*
  Connection Page — "The Red String of Fate"
  Max: Jordan (Asia/Amman)
  Bub: Wisconsin (America/Chicago)
*/

// Activity hints based on hour
const getActivity = (hour) => {
    if (hour >= 0 && hour < 6) return { icon: '😴', text: 'Sleeping', emoji: '🌙' };
    if (hour >= 6 && hour < 8) return { icon: '🌅', text: 'Waking up', emoji: '☀️' };
    if (hour >= 8 && hour < 12) return { icon: '☕', text: 'Morning time', emoji: '🌞' };
    if (hour >= 12 && hour < 14) return { icon: '🍽️', text: 'Lunch time', emoji: '🍜' };
    if (hour >= 14 && hour < 17) return { icon: '💻', text: 'Afternoon', emoji: '🌤️' };
    if (hour >= 17 && hour < 20) return { icon: '🌇', text: 'Evening', emoji: '🌆' };
    if (hour >= 20 && hour < 22) return { icon: '🛋️', text: 'Relaxing', emoji: '✨' };
    return { icon: '😴', text: 'Sleeping', emoji: '🌙' };
};

// Get time-of-day icon
const getTimeIcon = (hour) => {
    if (hour >= 6 && hour < 8) return <Sunrise size={14} />;
    if (hour >= 8 && hour < 18) return <Sun size={14} />;
    if (hour >= 18 && hour < 20) return <Sunset size={14} />;
    return <Moon size={14} />;
};

const TimeCard = ({ label, timezone, color, side }) => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState(12);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });

            const dateFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            const dayFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'long'
            });

            const hourFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                hour12: false
            });

            setTime(timeFormatter.format(now));
            setDate(dateFormatter.format(now));
            setDay(dayFormatter.format(now));
            setHour(parseInt(hourFormatter.format(now)));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    const activity = getActivity(hour);

    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 16px',
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${color}30`,
                boxShadow: `0 0 24px ${color}15, inset 0 0 12px ${color}08`,
                width: '150px',
                position: 'relative',
                overflow: 'hidden',
            }}
            whileHover={{ scale: 1.04, boxShadow: `0 0 32px ${color}30` }}
        >
            {/* Glow accent */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '40px',
                background: `radial-gradient(ellipse, ${color}30, transparent)`,
                borderRadius: '50%',
            }} />

            {/* Pin icon */}
            <MapPin size={24} color={color} style={{ marginBottom: '8px', filter: `drop-shadow(0 0 4px ${color})` }} />

            {/* Name */}
            <h3 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '800',
                marginBottom: '2px',
                letterSpacing: '0.05em',
            }}>{label}</h3>

            {/* Location */}
            <p style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '9px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '12px',
            }}>
                {timezone.split('/')[1].replace('_', ' ')}
            </p>

            {/* Time */}
            <div style={{
                background: 'rgba(0,0,0,0.25)',
                padding: '8px 14px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.08)',
                width: '100%',
                textAlign: 'center',
                marginBottom: '8px',
            }}>
                <span style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'white',
                    fontVariantNumeric: 'tabular-nums',
                }}>
                    {time}
                </span>
            </div>

            {/* Date + Day */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                marginBottom: '8px',
            }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>
                    {day}
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                    {date}
                </span>
            </div>

            {/* Activity hint */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: `${color}15`,
                border: `1px solid ${color}20`,
            }}>
                <span style={{ fontSize: '12px' }}>{activity.icon}</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                    {activity.text}
                </span>
            </div>
        </motion.div>
    );
};

// Red String SVG
const RedString = () => {
    return (
        <svg
            width="60"
            height="120"
            viewBox="0 0 60 120"
            fill="none"
            style={{ position: 'absolute', zIndex: 5 }}
        >
            {/* Main string */}
            <motion.path
                d="M30 0 Q10 30, 30 60 Q50 90, 30 120"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
            />
            {/* Glow layer */}
            <motion.path
                d="M30 0 Q10 30, 30 60 Q50 90, 30 120"
                stroke="#EF4444"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
            />
            {/* Heartbeat pulse dot */}
            <motion.circle
                cx="30"
                cy="60"
                r="4"
                fill="#EF4444"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 0.8, 1.2, 0.8], opacity: [0, 1, 0.6, 1, 0.6] }}
                transition={{ duration: 1.5, delay: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
            />
            {/* Heart at center */}
            <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.8, type: 'spring', stiffness: 200 }}
            >
                <text
                    x="30"
                    y="64"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#EF4444"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.5))' }}
                >
                    ❤️
                </text>
            </motion.g>
        </svg>
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
            padding: '16px',
            gap: '8px',
        }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '8px' }}
            >
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: 'white',
                    textShadow: '0 0 20px rgba(96,165,250,0.3)',
                    marginBottom: '4px',
                }}>
                    The Red String of Fate
                </h2>
                <p style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    fontStyle: 'italic',
                }}>
                    An invisible thread connects those destined to meet
                </p>
            </motion.div>

            {/* Cards + Red String */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                gap: '0px',
            }}>
                <TimeCard
                    label="Max"
                    timezone="Asia/Amman"
                    color="#60A5FA"
                    side="left"
                />

                {/* Red String between cards */}
                <RedString />

                <TimeCard
                    label="Bub"
                    timezone="America/Chicago"
                    color="#F472B6"
                    side="right"
                />
            </div>

            {/* Distance footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.15)',
                }}
            >
                <Heart size={12} fill="#EF4444" stroke="none" />
                <span style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: '600',
                }}>
                    6,432 miles apart — but always connected
                </span>
            </motion.div>
        </div>
    );
};

export default Connection;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Sparkles } from 'lucide-react';

/*
  About Page — "Welcome Home" with live relationship counter.
  
  IMPORTANT: Update START_DATE to Max & Josephine's actual anniversary.
  Format: new Date('YYYY-MM-DDT00:00:00')
*/
const START_DATE = new Date('2025-12-25T00:00:00'); // Late December 2025

const useRelationshipTimer = (startDate) => {
    const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const diff = now.getTime() - startDate.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setElapsed({ days, hours, minutes, seconds });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [startDate]);

    return elapsed;
};

const CounterUnit = ({ value, label }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '60px',
    }}>
        <span style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#1E3A8A',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}>
            {String(value).padStart(label === 'days' ? 1 : 2, '0')}
        </span>
        <span style={{
            fontSize: '9px',
            fontWeight: '600',
            color: '#1E3A8A',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginTop: '4px',
        }}>
            {label}
        </span>
    </div>
);

const Separator = () => (
    <span style={{
        fontSize: '20px',
        fontWeight: '300',
        color: 'rgba(30,58,138,0.3)',
        alignSelf: 'flex-start',
        marginTop: '4px',
    }}>:</span>
);

const About = () => {
    const { days, hours, minutes, seconds } = useRelationshipTimer(START_DATE);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '8px',
            maxWidth: '420px',
            margin: '0 auto',
        }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
            >
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#1E3A8A',
                    marginBottom: '4px',
                    textShadow: '0 1px 3px rgba(255,255,255,0.8)',
                }}>
                    Welcome Home 🏡
                </h1>
                <p style={{
                    fontSize: '13px',
                    color: 'rgba(30,58,138,0.7)',
                }}>
                    A little corner of the internet, just for us
                </p>
            </motion.div>

            {/* Relationship Counter Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    background: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '24px',
                    padding: '24px 16px',
                    border: '1px solid rgba(255,255,255,0.6)',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '16px',
                }}>
                    <Clock size={14} color="rgba(255,255,255,0.4)" />
                    <span style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: 'rgba(30,58,138,0.6)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                    }}>
                        Together for
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}>
                    <CounterUnit value={days} label="days" />
                    <Separator />
                    <CounterUnit value={hours} label="hours" />
                    <Separator />
                    <CounterUnit value={minutes} label="mins" />
                    <Separator />
                    <CounterUnit value={seconds} label="secs" />
                </div>

                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    style={{ marginTop: '16px' }}
                >
                    <Heart size={20} fill="#F472B6" stroke="none" />
                </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <p style={{
                    color: '#1E3A8A',
                    fontSize: '15px',
                    lineHeight: '1.7',
                }}>
                    This is a little corner of the internet I built just for you.
                    A place where we can always be close, no matter how many miles are in between.
                </p>
                <p style={{
                    color: 'rgba(30,58,138,0.8)',
                    fontSize: '14px',
                    lineHeight: '1.7',
                }}>
                    Explore our photos, read my letter, listen to our songs, and see how our time aligns on the Bridge.
                </p>
            </motion.div>

            {/* Quote */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                    padding: '16px 20px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.45)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(244, 114, 182, 0.25)',
                    textAlign: 'center',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
            >
                <Sparkles size={14} color="#F472B6" style={{ margin: '0 auto 8px' }} />
                <p style={{
                    fontSize: '13px',
                    color: 'rgba(30,58,138,0.7)',
                    fontStyle: 'italic',
                    lineHeight: '1.6',
                }}>
                    "Distance means so little when someone means so much."
                </p>
            </motion.div>
        </div>
    );
};

export default About;

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, Heart, Smile, Sparkles, Mail } from 'lucide-react';

const Message = () => {
    const cardRef = useRef(null);
    const [downloading, setDownloading] = useState(false);
    const [opened, setOpened] = useState(false);

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 2,
                logging: false,
                useCORS: true
            });
            const link = document.createElement('a');
            link.download = 'For-My-Bub.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("Download failed:", err);
            alert("Oops! Could not download the letter. 😢");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '16px',
        }}>
            <AnimatePresence mode="wait">
                {/* Sealed Envelope */}
                {!opened && (
                    <motion.div
                        key="envelope"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0, rotateX: 90 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        onClick={() => setOpened(true)}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        {/* Envelope body */}
                        <motion.div
                            style={{
                                width: '240px',
                                height: '160px',
                                background: 'linear-gradient(135deg, #FDF2F8, #FCE7F3)',
                                borderRadius: '16px',
                                border: '2px solid rgba(244,114,182,0.25)',
                                boxShadow: '0 8px 32px rgba(244,114,182,0.15), 0 2px 8px rgba(0,0,0,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        >
                            {/* Envelope flap (triangle) */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '0',
                                borderLeft: '120px solid transparent',
                                borderRight: '120px solid transparent',
                                borderTop: '60px solid rgba(244,114,182,0.15)',
                            }} />

                            {/* Heart seal */}
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                            >
                                <Heart size={36} fill="#F472B6" stroke="none" style={{ filter: 'drop-shadow(0 0 8px rgba(244,114,182,0.4))' }} />
                            </motion.div>

                            {/* Sparkle accents */}
                            <motion.div
                                style={{ position: 'absolute', top: '12px', right: '16px' }}
                                animate={{ rotate: [0, 15, -15, 0], opacity: [0.3, 0.7, 0.3] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            >
                                <Sparkles size={16} color="#F472B6" />
                            </motion.div>
                        </motion.div>

                        {/* Tap hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '13px',
                                color: '#1E3A8A',
                                fontWeight: '600',
                            }}
                        >
                            <Mail size={14} />
                            Tap to open
                        </motion.div>
                    </motion.div>
                )}

                {/* Letter Content — unfolds after envelope opens */}
                {opened && (
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0, scale: 0.6, rotateX: -30 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.15 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        {/* The Capture Area */}
                        <div
                            ref={cardRef}
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '360px',
                                borderRadius: '30px',
                                padding: '36px',
                                border: '1px solid rgba(255,255,255,0.6)',
                                background: 'rgba(255, 255, 255, 0.4)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                                color: '#1E3A8A',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            {/* Decorations */}
                            <motion.div
                                style={{ position: 'absolute', top: '14px', left: '14px', opacity: 0.5 }}
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Sparkles size={22} color="#F472B6" />
                            </motion.div>
                            <motion.div
                                style={{ position: 'absolute', top: '14px', right: '14px', opacity: 0.5 }}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <Smile size={22} color="#60A5FA" />
                            </motion.div>

                            {/* Letter text */}
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{
                                    fontSize: '22px',
                                    fontWeight: '800',
                                    marginBottom: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}>
                                    To My Josephine <Heart size={18} fill="#F472B6" stroke="none" />
                                </h2>
                                <p style={{
                                    fontSize: '15px',
                                    lineHeight: 1.7,
                                    fontWeight: '500',
                                    opacity: 0.9,
                                }}>
                                    Happy Valentine's Day! <br /><br />
                                    You are the light of my life and my favorite person in the universe.
                                    Every moment with you is a treasure I cherish. <br /><br />
                                    Here's to many more memories, laughs, and quiet moments together.
                                </p>
                            </div>

                            {/* Signature */}
                            <div style={{ textAlign: 'right', marginTop: '4px' }}>
                                <p style={{ fontFamily: 'cursive', fontSize: '28px', color: '#1E3A8A' }}>Forever yours,</p>
                                <p style={{ fontFamily: 'cursive', fontSize: '36px', fontWeight: '800', color: '#F472B6', marginTop: '4px' }}>Max</p>
                            </div>

                            {/* Footer watermark */}
                            <div style={{
                                position: 'absolute',
                                bottom: '12px',
                                left: 0,
                                right: 0,
                                textAlign: 'center',
                                fontSize: '9px',
                                opacity: 0.25,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                color: '#1E3A8A',
                            }}>
                                Valentine 2026
                            </div>
                        </div>

                        {/* Download button */}
                        <motion.button
                            style={{
                                marginTop: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 28px',
                                borderRadius: '50px',
                                background: 'rgba(224,242,254,0.8)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.6)',
                                color: '#1E3A8A',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                            }}
                            onClick={handleDownload}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            disabled={downloading}
                        >
                            {downloading ? 'Capturing...' : (
                                <>
                                    <Download size={18} />
                                    Download My Heart
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Message;

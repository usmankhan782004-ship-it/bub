import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, Heart, Smile, Sparkles } from 'lucide-react';

const Message = () => {
    const cardRef = useRef(null);
    const [downloading, setDownloading] = useState(false);

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
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
            {/* The Capture Area */}
            <motion.div
                ref={cardRef}
                className="relative w-full max-w-sm rounded-[30px] p-10 shadow-xl border border-white/60 text-[#1E3A8A] flex flex-col gap-6"
                style={{
                    background: 'rgba(255, 255, 255, 0.4)', // More transparent
                    backdropFilter: 'blur(20px)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <motion.div
                    className="absolute top-4 left-4 opacity-50"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Sparkles size={24} color="#F472B6" />
                </motion.div>
                <motion.div
                    className="absolute top-4 right-4 opacity-50"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <Smile size={24} color="#60A5FA" />
                </motion.div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                        To My Josephine <Heart size={20} fill="#F472B6" stroke="none" />
                    </h2>
                    <p className="text-lg leading-relaxed font-medium opacity-90">
                        Happy Valentine's Day! <br /><br />
                        You are the light of my life and my favorite person in the universe.
                        Every moment with you is a treasure I cherish. <br /><br />
                        Here's to many more memories, laughs, and quiet moments together.
                    </p>
                </div>

                <div className="text-right mt-2">
                    <p className="font-handwritten text-4xl text-[#1E3A8A]">Forever yours,</p>
                    <p className="font-handwritten text-5xl font-bold text-[#F472B6] mt-2">Max</p>
                </div>

                <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] opacity-30 uppercase tracking-widest">
                    Valentine 2026
                </div>
            </motion.div>

            <motion.button
                className="mt-8 flex items-center gap-2 px-8 py-4 rounded-full bg-[#E0F2FE]/80 text-[#1E3A8A] font-bold shadow-lg border border-white hover:bg-[#b0e0ff] transition-colors backdrop-blur-md"
                onClick={handleDownload}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                disabled={downloading}
            >
                {downloading ? 'Capturing...' : (
                    <>
                        <Download size={20} />
                        Download My Heart
                    </>
                )}
            </motion.button>
        </div>
    );
};

export default Message;

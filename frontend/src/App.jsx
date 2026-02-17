import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MousePointerClick, Cat } from 'lucide-react';

// Modules (Case-Sensitive Imports)
import TouchEffect from './components/TouchEffect';
import Starfield from './components/Starfield';
import Iridescence from './components/Iridescence';
import Gatekeeper from './components/Gatekeeper';
import Dashboard from './components/Dashboard'; // Z-50
import MemoryOverlay from './components/MemoryOverlay'; // Z-40

import Gallery from './pages/Gallery';
import About from './pages/About';
import Message from './pages/Message';
import Connection from './pages/Connection';
import Chubba from './pages/Chubba';
import MusicPlayer3D from './components/MusicPlayer3D';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [entered, setEntered] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [showChubbaPeek, setShowChubbaPeek] = useState(false);
  const [chubbaPos, setChubbaPos] = useState({ top: 'auto', bottom: '110px', left: 'auto', right: '20px' });
  const [chubbaMsg, setChubbaMsg] = useState('');

  const CHUBBA_MESSAGES = [
    "Oop! Chubba is here! >.< ",
    "Feed me! 🍕",
    "I missed you! 💕",
    "Pat my head! 🐾",
    "Meow~ you're cute! 😻",
    "*purrs loudly* 🐱",
    "Where's my treat?! 🍬",
    "I love you both! 💗",
    "*boop* 👉🐽",
    "Chubba wants snuggles!",
  ];

  // Chubba peek: appears after 3s, then re-positions every 8s
  useEffect(() => {
    if (!entered) return;

    const randomize = () => {
      const positions = [
        { bottom: '110px', right: '20px', top: 'auto', left: 'auto' },
        { bottom: '110px', left: '20px', top: 'auto', right: 'auto' },
        { top: '80px', right: '20px', bottom: 'auto', left: 'auto' },
        { top: '80px', left: '20px', bottom: 'auto', right: 'auto' },
        { top: '50%', right: '16px', bottom: 'auto', left: 'auto' },
        { top: '50%', left: '16px', bottom: 'auto', right: 'auto' },
      ];
      setChubbaPos(positions[Math.floor(Math.random() * positions.length)]);
      setChubbaMsg(CHUBBA_MESSAGES[Math.floor(Math.random() * CHUBBA_MESSAGES.length)]);
    };

    const showTimer = setTimeout(() => {
      randomize();
      setShowChubbaPeek(true);
    }, 3000);

    const moveInterval = setInterval(() => {
      setShowChubbaPeek(false);
      setTimeout(() => {
        randomize();
        setShowChubbaPeek(true);
      }, 600);
    }, 8000);

    return () => { clearTimeout(showTimer); clearInterval(moveInterval); };
  }, [entered]);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Assets
  const assets = {
    chubbaVideo: '/assets/vid.mp4',
    gallery: [
      { src: '/assets/image1.jpg', alt: 'Memory 1' },
      { src: '/assets/image2.jpg', alt: 'Memory 2' },
      { src: '/assets/image3.jpg', alt: 'Memory 3' },
      { src: '/assets/image4.jpg', alt: 'Memory 4' },
      { src: '/assets/image5.jpg', alt: 'Memory 5' },
    ]
  };

  return (
    <div
      className="main-container transform-gpu will-change-transform"
      style={{
        height: '100dvh',
        width: '100vw',
        overflow: 'hidden',
        background: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Background Layering: Forced Z-Index -100 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -100, pointerEvents: 'none' }}>
        <Iridescence
          color={[0.6, 0.8, 0.9]}
          amplitude={0.05}
          speed={0.5}
          mouseReact={false}
          dpr={1}
        />
        <Starfield />
      </div>

      <TouchEffect />

      <AnimatePresence mode="wait">
        {/* Heartbeat Loading Screen */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #FDF2F8, #EBF4FF, #FDF2F8)',
              zIndex: 9999,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '48px', filter: 'drop-shadow(0 0 16px rgba(244,114,182,0.4))' }}
            >
              💗
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                marginTop: '16px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#1E3A8A',
                letterSpacing: '0.15em',
                textTransform: 'lowercase',
              }}
            >
              loading love...
            </motion.p>
            <div style={{ display: 'flex', gap: '6px', marginTop: '20px' }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F472B6' }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gatekeeper */}
      {!isLoading && !entered && (
        <AnimatePresence mode="wait">
          <Gatekeeper key="gatekeeper" onEnter={() => setEntered(true)} />
        </AnimatePresence>
      )}

      {/* Main Hub */}
      {!isLoading && entered && (
        <>
          {/* 
               PERSISTENT HOME "HUB" (Z-0 to Z-10) 
               - Always visible in background
               - Softens/Blurs when Overlay is active (handled by Overlay backdrop)
            */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-auto">
            <motion.div
              className="w-full flex flex-col items-center justify-center shrink-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-wider text-[#1E3A8A] drop-shadow-sm uppercase">For my Bub</h2>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="mt-2"
              >
                <Heart size={30} fill="#F472B6" stroke="#1E3A8A" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            <div className="mt-8 flex flex-col items-center text-[#1E3A8A] opacity-60">
              <p className="text-lg">Select a memory below</p>
              <motion.div
                className="mt-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <MousePointerClick size={32} />
              </motion.div>
            </div>

            {/* Footer — sits just above the dashboard dock */}
            <div className="fixed bottom-20 left-0 right-0 text-center pointer-events-none opacity-40 z-[5]">
              <p className="text-[10px] font-medium text-[#1E3A8A]">
                © 2026 Developed with 💙 by Max for his Bub
              </p>
            </div>
          </div>

          {/* Chubba Peek-a-boo — pops up at random spots */}
          <AnimatePresence>
            {showChubbaPeek && !activeModule && (
              <motion.div
                key={chubbaMsg}
                style={{
                  position: 'fixed',
                  ...chubbaPos,
                  zIndex: 45,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                onClick={() => setActiveModule('chubba')}
              >
                {/* Speech bubble */}
                <motion.div
                  style={{
                    padding: '6px 12px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#1E3A8A',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                  }}
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  {chubbaMsg}
                  <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: '10px',
                    height: '10px',
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    borderTop: 'none',
                    borderLeft: 'none',
                  }} />
                </motion.div>

                {/* Cat icon */}
                <motion.div
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.85 }}
                  style={{
                    padding: '10px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(134,239,172,0.4)',
                    boxShadow: '0 0 12px rgba(50,205,50,0.2), 0 4px 12px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Cat size={24} color="#1F2937" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 
             MEMORY OVERLAYS (Z-40) 
             - Renders the active module inside a modal sheet
          */}
          <MemoryOverlay
            isOpen={!!activeModule && activeModule !== 'music'}
            onClose={() => setActiveModule(null)}
            title={activeModule}
          >
            {activeModule === 'about' && (
              <div className="p-4 md:p-8 w-full max-w-2xl mx-auto backdrop-blur-md rounded-3xl">
                <About onEasterEgg={() => setActiveModule('chubba')} />
              </div>
            )}

            {activeModule === 'gallery' && (
              <div style={{ flex: 1, width: '100%' }}>
                <Gallery items={assets.gallery} />
              </div>
            )}

            {activeModule === 'letter' && (
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Message />
              </div>
            )}

            {activeModule === 'connection' && (
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Connection />
              </div>
            )}


            {activeModule === 'chubba' && (
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)' }}>
                <Chubba videoSrc={assets.chubbaVideo} onClose={() => setActiveModule(null)} />
              </div>
            )}

          </MemoryOverlay>

          {/* FULL-SCREEN MUSIC PLAYER (Z-30) — Bypasses overlay for immersive experience */}
          <AnimatePresence>
            {activeModule === 'music' && (
              <motion.div
                key="music-fullscreen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 30,
                }}
              >
                <MusicPlayer3D />
                {/* Back Button */}
                <button
                  onClick={() => setActiveModule(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    zIndex: 110,
                    padding: '8px 16px',
                    borderRadius: '50px',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                    color: '#1E3A8A',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ← Back to Memories
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DASHBOARD (Z-50) - Hidden during music for immersive experience */}
          {activeModule !== 'music' && (
            <Dashboard setActiveModule={setActiveModule} activeModule={activeModule} />
          )}
        </>
      )}
    </div>
  );
}

export default App;

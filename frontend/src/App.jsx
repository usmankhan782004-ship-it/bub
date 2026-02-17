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
  const [entered, setEntered] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [showChubbaPeek, setShowChubbaPeek] = useState(false);

  // Peek Logic: 3 Second Delay
  useEffect(() => {
    if (entered) {
      const timer = setTimeout(() => {
        setShowChubbaPeek(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [entered]);

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

      {!entered ? (
        <AnimatePresence mode="wait">
          <Gatekeeper key="gatekeeper" onEnter={() => setEntered(true)} />
        </AnimatePresence>
      ) : (
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

          {/* Chubba Peek (Z-50) */}
          <AnimatePresence>
            {showChubbaPeek && !activeModule && (
              <motion.div
                className="fixed bottom-[110px] right-[20px] z-[50] flex flex-col items-end gap-2 cursor-pointer"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={() => setActiveModule('chubba')}
              >
                <motion.div
                  className="bg-[#1E3A8A] text-white text-xs font-bold py-2 px-3 rounded-t-xl rounded-bl-xl shadow-lg relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
                  transition={{ delay: 0.2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <span className="whitespace-nowrap">Oh? Chubba is here! {'>'}.{'<'}</span>
                  <div className="absolute -bottom-1 right-2 w-3 h-3 bg-[#1E3A8A] rotate-45"></div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, translateY: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-3 rounded-full shadow-md border border-[#32CD32] flex items-center justify-center"
                  style={{ boxShadow: '0 0 10px #32CD32', position: 'relative', zIndex: 99999 }}
                >
                  <Cat size={28} color="#1F2937" />
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
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}>
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

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MousePointerClick, Cat } from 'lucide-react';

// Modules (Case-Sensitive Imports)
import TouchEffect from './components/TouchEffect';
import Starfield from './components/Starfield';
import Iridescence from './components/Iridescence';
import Gatekeeper from './components/Gatekeeper';
import Dashboard from './components/Dashboard';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Message from './pages/Message';
import Connection from './pages/Connection';
import Chubba from './pages/Chubba';
import MusicPlayer3D from './components/MusicPlayer3D';

/* 
  -------------------------------------------------------------
  ASSET CONFIGURATION (VERCEL / PUBLIC FOLDER)
  -------------------------------------------------------------
  Standard Public Folder Serving.
  Files must be in /public/assets/.
*/

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

  // Assets State (Standard Public Paths - Absolute)
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

  const contentVariants = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
    exit: { y: -50, opacity: 0, transition: { duration: 0.3 } }
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
        <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Header */}
          <motion.div
            className="w-full flex flex-col items-center justify-center shrink-0 pt-10"
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

          {/* Chubba Peek */}
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
                {/* Speech Bubble */}
                <motion.div
                  className="bg-[#1E3A8A] text-white text-xs font-bold py-2 px-3 rounded-t-xl rounded-bl-xl shadow-lg relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
                  transition={{ delay: 0.2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <span className="whitespace-nowrap">Oh? Chubba is here! {'>'}.{'<'}</span>
                  <div className="absolute -bottom-1 right-2 w-3 h-3 bg-[#1E3A8A] rotate-45"></div>
                </motion.div>

                {/* Cat Icon - Forced High Z-Index */}
                <motion.div
                  whileHover={{ scale: 1.2, translateY: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-3 rounded-full shadow-md border border-[#32CD32] flex items-center justify-center"
                  style={{
                    boxShadow: '0 0 10px #32CD32',
                    position: 'relative',
                    zIndex: 99999
                  }}
                >
                  <Cat size={28} color="#1F2937" />
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area - Scrollable Container */}
          <div className="flex-1 w-full overflow-hidden relative">
            <AnimatePresence mode="wait">
              {!activeModule ? (
                <motion.div
                  key="default-prompt"
                  className="w-full h-full flex flex-col items-center justify-center text-[#1E3A8A] opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-lg">Select a memory below</p>
                  <motion.div
                    className="mt-4"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <MousePointerClick size={32} />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeModule}
                  className="w-full h-full"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* 
                     SCROLLABLE WRAPPER
                     - overflow-y-auto: Allows vertical scrolling
                     - pb-48: HUGE bottom padding so content clears the Dock (which is fixed at bottom)
                  */}
                  <div className={`w-full h-full relative ${activeModule === 'gallery' ? 'max-w-7xl mx-auto overflow-y-auto pt-4 pb-48 px-4 scrollbar-hide' : 'flex items-center justify-center max-w-xl mx-auto'}`}>

                    {activeModule === 'about' && (
                      <div
                        className="p-8 rounded-[40px] shadow-sm border border-white/50 w-full max-h-[70vh] overflow-y-auto"
                        style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}
                      >
                        <About onEasterEgg={() => setActiveModule('chubba')} />
                      </div>
                    )}

                    {activeModule === 'gallery' && (
                      <Gallery items={assets.gallery} />
                    )}

                    {activeModule === 'letter' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Message />
                      </div>
                    )}

                    {activeModule === 'connection' && (
                      <div
                        className="rounded-[40px] flex items-center justify-center w-full h-full"
                        style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}
                      >
                        <Connection />
                      </div>
                    )}

                    {activeModule === 'chubba' && (
                      <div
                        className="rounded-[40px] flex items-center justify-center w-full h-full"
                        style={{
                          background: 'rgba(10, 20, 50, 0.85)',
                          backdropFilter: 'blur(30px)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <Chubba
                          videoSrc={assets.chubbaVideo}
                          onClose={() => setActiveModule(null)}
                        />
                      </div>
                    )}

                    {activeModule === 'music' && (
                      <div className="w-full h-full flex items-center justify-center fade-in">
                        <MusicPlayer3D />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Dashboard setActiveModule={setActiveModule} activeModule={activeModule} />

          {/* Footer - Only visible when NO active module, or integrated into scrolling? 
              Ref: User asked to "Move ... into a proper footer tag"
              We will disable this fixed footer when modules are active to prevent conflict, 
              or let the module handle its own footer. 
              Let's keep it simply fixed at bottom but very low z-index so dock covers it if needed?
              No, user said "never touches the dock".
              Let's make it static.
          */}
          {!activeModule && (
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-[10]">
              <p className="text-[10px] font-medium text-[#1E3A8A] opacity-40">
                © 2026 Developed with 💙 by Max for his Bub
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

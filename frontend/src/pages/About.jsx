import { useRef } from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="flex flex-col gap-6 relative">
            <h1 className="text-3xl font-bold text-[#1E3A8A] border-b border-[#1E3A8A]/10 pb-4">
                Welcome Home 🏡
            </h1>

            <p className="text-[#1E3A8A] text-lg leading-relaxed opacity-90">
                This is a little corner of the internet I built just for you.
                A place where we can always be close, no matter how many miles are in between.
            </p>

            <p className="text-[#1E3A8A] text-lg leading-relaxed opacity-90">
                Explore our photos, read my letter, and see how our time aligns on the Bridge.
            </p>

            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p className="text-sm text-[#1E3A8A] italic text-center">
                    "Distance means so little when someone means so much."
                </p>
            </div>

            {/* Secret Easter Egg Removed (Moved to Global Top-Right) */}
        </div>
    );
};

export default About;

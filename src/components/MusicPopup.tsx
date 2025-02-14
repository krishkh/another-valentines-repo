import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MusicPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    const lowercaseName = name.toLowerCase();
    if (!lowercaseName) {
      setError("Please enter a name");
      return;
    }

    if (!lowercaseName.includes(process.env.NEXT_PUBLIC_NAME!)) {
      setError("Sorry, you're not the one I'm looking for");
      return;
    }

    if (audioRef.current) {
      audioRef.current.play();
      setShowPopup(false);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio("/music1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  if (!showPopup) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-[#2d1b0e] to-[#1a3d1c] flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="bg-[#2a2a2a]/80 p-12 rounded-3xl text-center max-w-3xl w-full mx-4 border-4 border-[#f8b4c4] shadow-2xl backdrop-blur-sm"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
      >
        <h2 className="text-5xl mb-8 font-['Segoe_UI'] italic text-white drop-shadow-[0_2px_8px_rgba(248,180,196,0.5)]">
          Can I ask you a question?
        </h2>
        <p className="mb-12 text-[#f8b4c4] text-2xl leading-relaxed font-['Segoe_UI'] italic">
          I really wanna know... please...
        </p>
        <div className="mb-10">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Who are you? ♥"
            className="w-full max-w-md px-8 py-5 rounded-full bg-white/10 border-2 border-[#f8b4c4] 
              text-white text-xl focus:outline-none focus:border-[#ff9eb5] focus:ring-2 focus:ring-[#f8b4c4]/50 
              transition-all placeholder:text-[#f8b4c4]/70"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#ff9eb5] mt-3 text-lg"
            >
              {error}
            </motion.p>
          )}
        </div>
        <button
          onClick={handleStart}
          className="bg-[#f8b4c4] text-[#2a2a2a] px-12 py-5 rounded-full 
            hover:scale-105 hover:shadow-lg hover:shadow-[#f8b4c4]/30 transition-all duration-300 
            text-2xl font-medium border-2 border-white/20"
        >
          Yes! 😊
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MusicPopup;

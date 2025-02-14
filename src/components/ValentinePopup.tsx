import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import DateSelectionPopup from "./DateSelectionPopup";

const Firework = () => {
  const particles = Array.from({ length: 12 });
  return (
    <motion.div
      className="absolute"
      initial={{
        top: "100%",
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        top: `${20 + Math.random() * 40}%`,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.cos(i * 30 * (Math.PI / 180)) * 100],
            y: [0, Math.sin(i * 30 * (Math.PI / 180)) * 100],
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.8,
          }}
        />
      ))}
    </motion.div>
  );
};

interface ValentinePopupProps {
  onClose: () => void;
}

const ValentinePopup = ({ onClose }: ValentinePopupProps) => {
  const [fireworks, setFireworks] = useState<number[]>([]);
  const [yesPressed, setYesPressed] = useState(false);
  const [showDateSelection, setShowDateSelection] = useState(false);

  useEffect(() => {
    // Add new fireworks periodically
    const fireworkInterval = setInterval(() => {
      setFireworks((prev) => [...prev, Date.now()]);
    }, 1000);

    return () => clearInterval(fireworkInterval);
  }, []);

  // Remove old fireworks
  useEffect(() => {
    if (fireworks.length > 5) {
      setFireworks((prev) => prev.slice(1));
    }
  }, [fireworks]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-[#2d0e1b]/90 to-[#3d1c1a]/90 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      {fireworks.map((key) => (
        <Firework key={key} />
      ))}

      <motion.div
        className="bg-[#2a2a2a]/80 p-12 rounded-3xl text-center max-w-3xl w-full mx-4 
                  border-4 border-[#f8b4c4] shadow-2xl backdrop-blur-sm"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Image
            src="/heart.png"
            alt="Heart"
            width={140}
            height={140}
            className="animate-pulse drop-shadow-[0_2px_8px_rgba(248,180,196,0.5)]"
          />
        </motion.div>

        <h2 className="text-5xl mb-8 font-['Segoe_UI'] italic text-white drop-shadow-[0_2px_8px_rgba(248,180,196,0.5)]">
          Will you be my Valentine?
        </h2>

        <p className="mb-12 text-[#f8b4c4] text-2xl leading-relaxed font-['Segoe_UI'] italic">
          I've been wanting to ask you this for a while...
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block ml-2"
          >
            💝
          </motion.span>
        </p>

        {!yesPressed ? (
          <motion.button
            onClick={() => {
              setYesPressed(true);
              setTimeout(() => setShowDateSelection(true), 1500);
            }}
            className="bg-[#f8b4c4] text-[#2a2a2a] px-12 py-5 rounded-full 
                     hover:scale-105 hover:shadow-lg hover:shadow-[#f8b4c4]/30 transition-all duration-300 
                     text-2xl font-medium border-2 border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes, I'd love to! 💖
          </motion.button>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h3 className="text-4xl font-['Segoe_UI'] italic text-[#f8b4c4] mb-4">
                You just made my day! 🎉
              </h3>
              <p className="text-2xl text-white/90">
                Time to plan our special date! 💝
              </p>
            </motion.div>
            {showDateSelection && (
              <DateSelectionPopup
                onClose={() => setShowDateSelection(false)}
                onSelect={(date) => {
                  console.log("Selected date:", date);
                  // Handle date selection here
                }}
              />
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ValentinePopup;

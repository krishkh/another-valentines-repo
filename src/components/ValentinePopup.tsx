import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      {fireworks.map((key) => (
        <Firework key={key} />
      ))}

      <motion.div
        className="bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 p-12 rounded-[2rem] 
                  shadow-2xl border-2 border-purple-300/50 max-w-2xl mx-4 relative overflow-hidden
                  backdrop-blur-sm bg-opacity-90"
        initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-transparent to-pink-200/20" />
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-transparent rounded-full blur-xl" />

        <div className="relative z-10 space-y-8">
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Image
              src="/heart.png"
              alt="Heart"
              width={120}
              height={120}
              className="animate-pulse drop-shadow-xl"
            />
          </motion.div>

          <motion.h2
            className="text-5xl font-serif text-purple-900 text-center mb-6
                       drop-shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Can you be my valentine..?
          </motion.h2>

          <motion.p
            className="text-3xl text-purple-700 text-center italic font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            pretty please{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block"
            >
              ❤️
            </motion.span>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ValentinePopup;

import { motion } from "framer-motion";

interface ValentineButtonsProps {
  onYesClick: () => void;
  onNoHover?: (isHovering: boolean) => void;
}

export const YesButton = ({ onYesClick }: ValentineButtonsProps) => (
  <motion.button
    onClick={onYesClick}
    className="text-2xl font-medium bg-[#E95C7B] 
               text-white px-8 py-3 rounded-full"
    whileHover={{
      scale: 1.1,
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
    whileTap={{ scale: 0.95 }}
  >
    Yes! 😊
  </motion.button>
);

export const NoButton = ({ onYesClick, onNoHover }: ValentineButtonsProps) => (
  <motion.button
    onClick={onYesClick}
    className="text-2xl font-medium bg-[#6B7280] 
               text-white px-8 py-3 rounded-full"
    onHoverStart={() => onNoHover && onNoHover(true)}
    onHoverEnd={() => onNoHover && onNoHover(false)}
    whileHover={{
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotate: Math.random() * 360,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.7,
      },
    }}
    whileTap={{ scale: 0.95 }}
  >
    No ×
  </motion.button>
);

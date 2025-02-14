import { motion } from "framer-motion";
import Image from "next/image";

interface DateOption {
  title: string;
  description: string;
  image: string;
}

interface DateSelectionPopupProps {
  onClose: () => void;
  onSelect: (date: string) => void;
}

const dateOptions: DateOption[] = [
  {
    title: "Movie Date 🎬",
    description:
      "Let's watch a romantic movie together and share some popcorn!",
    image: "/movie-date.png",
  },
  {
    title: "Ramen Date 🍜",
    description:
      "Warm our hearts with some delicious ramen and good conversation!",
    image: "/ramen-date.png",
  },
  {
    title: "Home Date 🏠",
    description:
      "Cozy time at my place with movies, snacks, and lots of cuddles!",
    image: "/home-date.png",
  },
];

const DateSelectionPopup = ({ onClose, onSelect }: DateSelectionPopupProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-[#2d0e1b]/95 to-[#3d1c1a]/95 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#2a2a2a]/95 p-8 rounded-3xl text-center max-w-5xl w-full mx-4 
                  border-4 border-[#f8b4c4] shadow-2xl backdrop-blur-sm"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-4xl mb-8 font-['Segoe_UI'] italic text-white drop-shadow-[0_2px_8px_rgba(248,180,196,0.5)]">
          Choose Our First Date! 💕
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {dateOptions.map((date, index) => (
            <motion.div
              key={date.title}
              className="bg-[#3a3a3a]/90 rounded-xl p-6 cursor-pointer hover:bg-[#4a4a4a]/90 
                        transition-colors border-2 border-[#f8b4c4]/30 hover:border-[#f8b4c4]
                        flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => onSelect(date.title)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={date.image}
                  alt={date.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-['Segoe_UI'] italic text-[#f8b4c4] mb-2">
                {date.title}
              </h3>
              <p className="text-white/90 text-base">{date.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DateSelectionPopup;

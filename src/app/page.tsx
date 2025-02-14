"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import MovingChara from "@/components/MovingChara";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/background.png")' }}
    >
      <div className="flex w-full justify-between bg-black/75">
        <div>
          <Image
            src="/cat-17977_256.gif"
            alt="Animated cat"
            width={256}
            height={256}
          />
        </div>
        <motion.div
          className="text-7xl text-white h-fit p-10 font-serif italic tracking-wide relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Split text into individual characters for typing animation */}
          {[
            "C",
            "a",
            "n",
            " ",
            "I",
            " ",
            "a",
            "s",
            "k",
            " ",
            "y",
            "o",
            "u",
            " ",
            "a",
            " ",
            "q",
            "u",
            "e",
            "s",
            "t",
            "i",
            "o",
            "n",
            "?",
          ].map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.1,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <MovingChara direction="front" character="frisk" isMoving={true} />
    </div>
  );
}

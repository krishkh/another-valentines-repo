"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import MovingChara from "@/components/MovingChara";
import { useState, useEffect, useRef } from "react";
import ValentinePopup from "@/components/ValentinePopup";
import { YesButton, NoButton } from "@/components/ValentineButtons";
import MusicPopup from "@/components/MusicPopup";
export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNoHover = (isHovering: boolean) => {
    if (isHovering) {
      setShowWarning(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setShowWarning(false);
      }, 3000);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          {[
            [
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
            ],
            [
              "I",
              " ",
              "r",
              "e",
              "a",
              "l",
              "l",
              "y",
              " ",
              "w",
              "a",
              "n",
              "n",
              "a",
              " ",
              "k",
              "n",
              "o",
              "w",
              ".",
              ".",
              ".",
              " ",
              "p",
              "l",
              "e",
              "a",
              "s",
              "e",
              ".",
              ".",
              ".",
            ],
          ].map((sentence, sentenceIndex) =>
            sentence.map((char, charIndex) => (
              <motion.span
                key={`${sentenceIndex}-${charIndex}`}
                className={sentenceIndex === 0 ? "text-white" : "text-red-300"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay:
                    sentenceIndex * (5 + sentence.length * 0.1) +
                    charIndex * 0.1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 20 + sentence.length * 0.1,
                }}
              >
                {char}
              </motion.span>
            ))
          )}
        </motion.div>
      </div>
      <div className="fixed bottom-1/3 left-1/2 -translate-x-1/2 flex gap-20 justify-center items-center">
        <YesButton onYesClick={() => setShowPopup(true)} onNoHover={() => {}} />
        <NoButton onYesClick={() => {}} onNoHover={handleNoHover} />
      </div>

      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-8 p-4 text-4xl font-['Determination_Mono'] text-white bg-black border-4 border-white flex flex-col gap-2 max-w-[600px]"
        >
          <div className="flex items-start gap-4">
            <Image
              src="/sans.png"
              alt="Sans"
              width={48}
              height={48}
              className="mt-1"
            />
            <div>
              <p>* don't you dare touch</p>
              <p>* that button.</p>
            </div>
          </div>
        </motion.div>
      )}

      {showPopup && <ValentinePopup onClose={() => setShowPopup(false)} />}

      <MovingChara />
      <MusicPopup />
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

const MovingChara: React.FC = () => {
  const [movingRight, setMovingRight] = useState(true);
  const controls = useAnimationControls();
  const [initialX, setInitialX] = useState(0);

  useEffect(() => {
    // Set initial position after component mounts
    setInitialX(window.innerWidth * 0.2);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (typeof window !== "undefined") {
        const screenWidth = window.innerWidth;
        const rightBoundary = screenWidth * 0.4; // 80% of screen width
        const leftBoundary = screenWidth * -0.3; // 20% of screen width

        controls.start({
          x: movingRight ? rightBoundary : leftBoundary,
          transition: {
            duration: 5,
            ease: "linear",
          },
        });
      }
    };

    updatePosition();

    // Add window resize listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updatePosition);
      }
    };
  }, [movingRight, controls]);

  const handleAnimationComplete = () => {
    setMovingRight(!movingRight);
  };

  return (
    <motion.div
      className="character"
      initial={{ x: initialX }}
      animate={controls}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-white/80 text-black px-2 py-1 rounded-lg">
          how to tell her that i love her..
        </div>
        <Image
          src={movingRight ? "/frisk-right.gif" : "/frisk-left.gif"}
          alt="Character"
          width={64}
          height={64}
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>
    </motion.div>
  );
};

export default MovingChara;

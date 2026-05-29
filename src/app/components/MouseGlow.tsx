import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[40vw] h-[40vw] rounded-full mix-blend-screen opacity-30 blur-[100px] bg-gradient-to-r from-emerald-400 to-teal-400 z-0 hidden md:block"
      animate={{
        x: mousePosition.x - window.innerWidth * 0.2,
        y: mousePosition.y - window.innerWidth * 0.2,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 1 }}
    />
  );
}

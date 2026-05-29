import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function FloatingLeaves() {
  const [elements, setElements] = useState<Array<{ id: number; type: 'leaf' | 'orb'; left: number; duration: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.6 ? 'orb' : 'leaf' as const,
      left: Math.random() * 100, 
      duration: 20 + Math.random() * 30, 
      delay: Math.random() * 15,
      size: 10 + Math.random() * 25, 
    }));
    setElements(newElements as any);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-screen dark:mix-blend-lighten" aria-hidden="true">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute top-[-10%] ${el.type === 'leaf' ? 'text-emerald-500/20 dark:text-emerald-400/10' : 'bg-emerald-400/20 dark:bg-emerald-300/10 rounded-full blur-[2px]'}`}
          style={{ 
            width: el.type === 'orb' ? el.size : 'auto',
            height: el.type === 'orb' ? el.size : 'auto',
          }}
          initial={{ 
            y: "-10vh", 
            x: `${el.left}vw`, 
            rotate: 0, 
            opacity: 0
          }}
          animate={{ 
            y: "120vh", 
            x: `${el.left + (Math.random() > 0.5 ? 15 : -15)}vw`,
            rotate: el.type === 'leaf' ? 360 : 0,
            opacity: [0, 0.4, 0.7, 0.4, 0]
          }}
          transition={{ 
            duration: el.duration, 
            repeat: Infinity, 
            delay: el.delay,
            ease: "linear"
          }}
        >
          {el.type === 'leaf' && (
            <svg width={el.size} height={el.size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C12 22 20 16 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 16 12 22 12 22ZM12 4.5C13.5 4.5 15.5 6 15.5 9" opacity="0.8"/>
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

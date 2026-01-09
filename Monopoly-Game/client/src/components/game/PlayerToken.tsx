import { motion } from "framer-motion";
import { getTileCoordinates } from "@/lib/game-data";

interface PlayerTokenProps {
  playerIndex: number;
  position: number; // tile index 0-39
  color: string;
  isCurrentTurn: boolean;
}

export function PlayerToken({ playerIndex, position, color, isCurrentTurn }: PlayerTokenProps) {
  const { x, y } = getTileCoordinates(position);
  
  // Calculate specific offset within the cell to prevent total overlap
  const offsets = [
    { x: -14, y: -14 },
    { x: 14, y: -14 },
    { x: 0, y: 14 },
  ];
  const offset = offsets[playerIndex % 3];

  return (
    <motion.div
      className="absolute z-50 w-6 h-6 rounded-full border-2 border-white shadow-[0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
      initial={false}
      style={{
        left: `calc(${(x / 11) * 100}% + 4.5%)`,
        top: `calc(${(y / 11) * 100}% + 4.5%)`,
      }}
      animate={{
        backgroundColor: color,
        x: offset.x,
        y: offset.y,
        scale: isCurrentTurn ? 1.15 : 1,
        zIndex: isCurrentTurn ? 100 : 50,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 18,
        mass: 1,
        duration: 0.4
      }}
    >
      <div className="w-4 h-4 rounded-full border border-black/20 bg-white/30" />
      {isCurrentTurn && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.div>
  );
}

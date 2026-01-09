import { TileData, PropertyState } from "@shared/schema";
import { cn } from "@/lib/utils";
import { getTileCoordinates } from "@/lib/game-data";
import { motion } from "framer-motion";
import { Home, Building2 } from "lucide-react";

interface TileProps {
  index: number;
  data: TileData;
  propertyState?: PropertyState;
  playersOnTile: string[]; // Colors of players here
}

export function Tile({ index, data, propertyState, playersOnTile }: TileProps) {
  const { x, y } = getTileCoordinates(index);
  
  // Grid positioning (1-based for CSS Grid)
  const gridStyle = {
    gridColumn: x + 1,
    gridRow: y + 1,
  };

  const isCorner = index % 10 === 0;
  const isBottom = index > 0 && index < 10;
  const isLeft = index > 10 && index < 20;
  const isTop = index > 20 && index < 30;
  const isRight = index > 30;

  // determine orientation class for text rotation
  let orientationClass = "flex-col justify-end pb-1"; // Bottom default
  if (isLeft) orientationClass = "flex-row-reverse justify-end pr-1 items-center";
  if (isTop) orientationClass = "flex-col-reverse justify-end pt-1";
  if (isRight) orientationClass = "flex-row justify-end pl-1 items-center";
  if (isCorner) orientationClass = "flex-col justify-center items-center";

  // Color bar style
  const barStyle = data.c ? { backgroundColor: data.c } : {};
  let barClass = "absolute z-0";
  if (isBottom) barClass += " top-0 left-0 right-0 h-1/4 border-b-2 border-black";
  if (isLeft) barClass += " top-0 bottom-0 right-0 w-1/4 border-l-2 border-black";
  if (isTop) barClass += " bottom-0 left-0 right-0 h-1/4 border-t-2 border-black";
  if (isRight) barClass += " top-0 bottom-0 left-0 w-1/4 border-r-2 border-black";

  return (
    <div
      className={cn(
        "relative border border-black/80 bg-[#E8F1F2] text-[0.55rem] font-bold uppercase tracking-tighter leading-tight select-none flex overflow-hidden",
        orientationClass,
        isCorner ? "bg-[#d4eec9]" : "" // Slightly different color for corners
      )}
      style={gridStyle}
    >
      {/* Property Color Bar */}
      {data.c && <div className={barClass} style={barStyle} />}

      {/* House/Hotel Indicators */}
      {propertyState && propertyState.houses > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-0.5 pointer-events-none">
          {propertyState.houses === 5 ? (
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-red-600 p-1 rounded shadow-sm border border-black">
               <Building2 className="w-3 h-3 text-white" />
             </motion.div>
          ) : (
             Array.from({ length: propertyState.houses }).map((_, i) => (
               <motion.div 
                 key={i} 
                 initial={{ y: -5, opacity: 0 }} 
                 animate={{ y: 0, opacity: 1 }} 
                 transition={{ delay: i * 0.1 }}
                 className="bg-green-600 p-0.5 rounded-sm shadow-sm border border-black/50"
               >
                 <Home className="w-2 h-2 text-white" />
               </motion.div>
             ))
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn("z-10 relative flex flex-col items-center justify-center w-full h-full p-0.5", 
        isLeft || isRight ? "h-full w-3/4" : "w-full h-3/4",
        isCorner && "w-full h-full p-2 text-center"
      )}>
        <span className="text-center font-serif text-[0.65rem] font-black text-black">{data.n}</span>
        {data.price && (
           <span className="font-normal mt-0.5 opacity-80 font-sans text-[0.5rem] text-black">${data.price}</span>
        )}
        
        {/* Owner Indicator (small dot if owned) */}
        {propertyState?.owner !== null && propertyState?.owner !== undefined && (
          <div 
            className="w-2 h-2 rounded-full absolute bottom-1 right-1 border border-black/50 shadow-sm"
            style={{ 
              backgroundColor: propertyState.owner === 0 ? 'red' : propertyState.owner === 1 ? 'blue' : 'green' 
            }}
          />
        )}
      </div>

      {/* Player Tokens are rendered by parent to be on top, but we could put indicators here if needed */}
    </div>
  );
}

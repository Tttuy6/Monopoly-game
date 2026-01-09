import { TileData } from "@shared/schema";

// Standard Monopoly Board Data (UK/US Hybrid for simplicity)
export const BOARD_TILES: TileData[] = [
  { n: "GO", type: "corner" },
  { n: "Old Kent Rd", c: "#8B4513", price: 60, rent: [2, 10, 30, 90, 160, 250], type: "property" },
  { n: "Community Chest", type: "chest" },
  { n: "Whitechapel", c: "#8B4513", price: 60, rent: [4, 20, 60, 180, 320, 450], type: "property" },
  { n: "Income Tax", price: 200, type: "tax" },
  { n: "Kings Cross", type: "station", price: 200, rent: [25, 50, 100, 200] },
  { n: "Angel Islington", c: "#87CEEB", price: 100, rent: [6, 30, 90, 270, 400, 550], type: "property" },
  { n: "Chance", type: "chance" },
  { n: "Euston Rd", c: "#87CEEB", price: 100, rent: [6, 30, 90, 270, 400, 550], type: "property" },
  { n: "Pentonville Rd", c: "#87CEEB", price: 120, rent: [8, 40, 100, 300, 450, 600], type: "property" },
  { n: "Jail", type: "corner" }, // 10
  { n: "Pall Mall", c: "#FF0080", price: 140, rent: [10, 50, 150, 450, 625, 750], type: "property" },
  { n: "Electric Co", type: "utility", price: 150 },
  { n: "Whitehall", c: "#FF0080", price: 140, rent: [10, 50, 150, 450, 625, 750], type: "property" },
  { n: "Northumberl'd", c: "#FF0080", price: 160, rent: [12, 60, 180, 500, 700, 900], type: "property" },
  { n: "Marylebone", type: "station", price: 200, rent: [25, 50, 100, 200] },
  { n: "Bow St", c: "#FFA500", price: 180, rent: [14, 70, 200, 550, 750, 950], type: "property" },
  { n: "Community Chest", type: "chest" },
  { n: "Marlborough St", c: "#FFA500", price: 180, rent: [14, 70, 200, 550, 750, 950], type: "property" },
  { n: "Vine St", c: "#FFA500", price: 200, rent: [16, 80, 220, 600, 800, 1000], type: "property" },
  { n: "Free Parking", type: "corner" }, // 20
  { n: "Strand", c: "#FF0000", price: 220, rent: [18, 90, 250, 700, 875, 1050], type: "property" },
  { n: "Chance", type: "chance" },
  { n: "Fleet St", c: "#FF0000", price: 220, rent: [18, 90, 250, 700, 875, 1050], type: "property" },
  { n: "Trafalgar Sq", c: "#FF0000", price: 240, rent: [20, 100, 300, 750, 925, 1100], type: "property" },
  { n: "Fenchurch St", type: "station", price: 200, rent: [25, 50, 100, 200] },
  { n: "Leicester Sq", c: "#FFFF00", price: 260, rent: [22, 110, 330, 800, 975, 1150], type: "property" },
  { n: "Coventry St", c: "#FFFF00", price: 260, rent: [22, 110, 330, 800, 975, 1150], type: "property" },
  { n: "Water Works", type: "utility", price: 150 },
  { n: "Piccadilly", c: "#FFFF00", price: 280, rent: [24, 120, 360, 850, 1025, 1200], type: "property" },
  { n: "Go To Jail", type: "corner" }, // 30
  { n: "Regent St", c: "#008000", price: 300, rent: [26, 130, 390, 900, 1100, 1275], type: "property" },
  { n: "Oxford St", c: "#008000", price: 300, rent: [26, 130, 390, 900, 1100, 1275], type: "property" },
  { n: "Community Chest", type: "chest" },
  { n: "Bond St", c: "#008000", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], type: "property" },
  { n: "Liverpool St", type: "station", price: 200, rent: [25, 50, 100, 200] },
  { n: "Chance", type: "chance" },
  { n: "Park Lane", c: "#000080", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], type: "property" },
  { n: "Super Tax", price: 100, type: "tax" },
  { n: "Mayfair", c: "#000080", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], type: "property" },
];

export const INITIAL_MONEY = 1500;

// Helper to calculate grid position (0-10, 0-10) for any tile index 0-39
export function getTileCoordinates(index: number) {
  // Bottom row: 0-10 (Right to Left) -> Wait, usually it goes CCW from Bottom-Right?
  // Standard monopoly: GO is bottom-right (11,11 in grid terms if 1-based, or 10,10 in 0-based)
  // Let's assume standard layout:
  // Bottom Row (0-10): (10,10) -> (0,10)
  // Left Row (11-20): (0,10) -> (0,0)  -- Note: 10 is shared (Jail)
  // Top Row (21-30): (0,0) -> (10,0)
  // Right Row (31-39): (10,0) -> (10,10)

  // Wait, standard array usually starts at GO.
  // Let's map indices to x,y on a 11x11 grid (0..10).
  // 0 (GO) = 10, 10
  // 1-9 = Bottom row
  // 10 (Jail) = 0, 10
  // 11-19 = Left col
  // 20 (Parking) = 0, 0
  // 21-29 = Top row
  // 30 (Go To Jail) = 10, 0
  // 31-39 = Right col

  if (index >= 0 && index <= 10) return { x: 10 - index, y: 10 }; // 0 to 10
  if (index >= 11 && index <= 20) return { x: 0, y: 10 - (index - 10) }; // 11 to 20
  if (index >= 21 && index <= 30) return { x: index - 20, y: 0 }; // 21 to 30
  if (index >= 31 && index <= 39) return { x: 10, y: index - 30 }; // 31 to 39
  return { x: 10, y: 10 };
}

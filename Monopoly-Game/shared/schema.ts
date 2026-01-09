import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  state: jsonb("state").notNull(), // Store full game state as JSON
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const insertGameSchema = createInsertSchema(games).omit({ id: true, createdAt: true });

export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;

// Game specific types for the frontend to use
export type Player = {
  id: number;
  name: string;
  money: number;
  pos: number;
  color: string;
  isAi: boolean;
};

export type PropertyState = {
  owner: number | null; // Player index
  houses: number;
  mortgaged: boolean;
};

export type TileData = {
  n: string; // name
  c?: string; // color group
  price?: number;
  rent?: number[]; // rent array
  type?: 'property' | 'tax' | 'station' | 'utility' | 'chance' | 'chest' | 'corner';
};

export type GameState = {
  players: Player[];
  properties: PropertyState[];
  turn: number;
  waitingForAction: 'roll' | 'property' | 'house' | 'animating';
  currentProperty: number | null; // index
  dice: [number, number];
  lastRoll: number;
};

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type GameState, type InsertGame, type Game } from "@shared/schema";

export function useSaveGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (gameState: GameState) => {
      // Wrap the state in the expected InsertGame format
      const payload: InsertGame = { state: gameState };
      
      const res = await fetch(api.games.save.path, {
        method: api.games.save.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error('Failed to save game');
      return api.games.save.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate queries if we had a list view, for now just success hook
    },
  });
}

export function useLoadGame(id: number | null) {
  return useQuery({
    queryKey: [api.games.load.path, id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("No ID");
      const url = buildUrl(api.games.load.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to load game');
      return api.games.load.responses[200].parse(await res.json());
    },
  });
}

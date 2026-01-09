import { GameState } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dices, User, Bot, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  gameState: GameState;
  onRoll: () => void;
  onEndTurn?: () => void;
}

export function ControlPanel({ gameState, onRoll, onEndTurn }: ControlPanelProps) {
  const currentPlayer = gameState.players[gameState.turn];
  const isHumanTurn = gameState.turn === 0;
  const canRoll = gameState.waitingForAction === 'roll' && isHumanTurn;

  return (
    <Card className="p-6 bg-card border-2 border-border shadow-xl flex flex-col gap-6 max-w-sm w-full h-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Current Turn</h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          {currentPlayer.isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
          <span className="text-lg font-medium" style={{ color: currentPlayer.color }}>
            {currentPlayer.name}
          </span>
        </div>
      </div>

      {/* Dice Display */}
      <div className="flex justify-center gap-4 py-4 bg-muted/20 rounded-xl inner-shadow">
        <Dice value={gameState.dice[0]} />
        <Dice value={gameState.dice[1]} />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button 
          size="lg" 
          onClick={onRoll} 
          disabled={!canRoll}
          className={cn(
            "w-full text-xl font-display uppercase tracking-widest py-8 transition-all",
            canRoll ? "animate-pulse shadow-lg shadow-primary/25" : "opacity-50"
          )}
        >
          {gameState.waitingForAction === 'roll' ? (
            <>
              <Dices className="mr-3 w-6 h-6" /> Roll Dice
            </>
          ) : (
            <span className="text-sm normal-case text-muted-foreground">Waiting for move...</span>
          )}
        </Button>
      </div>

      {/* Player List */}
      <div className="flex-1 space-y-3 mt-4">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-2">Players</h3>
        {gameState.players.map((p, i) => (
          <div 
            key={i} 
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border transition-colors",
              gameState.turn === i ? "bg-accent/10 border-accent/50" : "bg-background border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <div className="flex flex-col">
                <span className="font-bold leading-none">{p.name}</span>
                <span className="text-xs text-muted-foreground mt-0.5">${p.money}</span>
              </div>
            </div>
            {gameState.turn === i && (
              <span className="text-xs font-bold text-accent animate-pulse">TURN</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function Dice({ value }: { value: number }) {
  return (
    <div className="w-16 h-16 bg-white rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.15)] border-2 border-gray-200 flex items-center justify-center text-3xl font-bold text-gray-800">
      {value}
    </div>
  );
}

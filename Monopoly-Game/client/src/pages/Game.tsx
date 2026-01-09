import { useState, useEffect, useReducer } from "react";
import { Tile } from "@/components/game/Tile";
import { PlayerToken } from "@/components/game/PlayerToken";
import { ControlPanel } from "@/components/game/ControlPanel";
import { ActionModal } from "@/components/game/ActionModal";
import { BOARD_TILES, INITIAL_MONEY } from "@/lib/game-data";
import { GameState, Player, PropertyState } from "@shared/schema";
import { useSaveGame } from "@/hooks/use-game-api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Initial State Setup
const initialPlayers: Player[] = [
  { id: 0, name: "Player 1", money: INITIAL_MONEY, pos: 0, color: "red", isAi: false },
  { id: 1, name: "Bot 1", money: INITIAL_MONEY, pos: 0, color: "blue", isAi: true },
  { id: 2, name: "Bot 2", money: INITIAL_MONEY, pos: 0, color: "green", isAi: true },
];

const initialProperties: PropertyState[] = Array(40).fill(null).map(() => ({
  owner: null,
  houses: 0,
  mortgaged: false,
}));

const initialState: GameState = {
  players: initialPlayers,
  properties: initialProperties,
  turn: 0,
  waitingForAction: 'roll',
  currentProperty: null,
  dice: [1, 1],
  lastRoll: 0,
};

// Reducer for Game Logic
type Action = 
  | { type: 'ROLL_DICE'; dice: [number, number] }
  | { type: 'MOVE_PLAYER'; playerId: number; newPos: number }
  | { type: 'SET_WAITING'; status: GameState['waitingForAction']; propertyIdx?: number | null }
  | { type: 'BUY_PROPERTY'; propertyIdx: number; price: number }
  | { type: 'PAY_RENT'; fromPlayer: number; toPlayer: number; amount: number }
  | { type: 'NEXT_TURN' };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'ROLL_DICE':
      return { 
        ...state, 
        dice: action.dice, 
        lastRoll: action.dice[0] + action.dice[1] 
      };
    case 'MOVE_PLAYER': {
      const players = [...state.players];
      players[action.playerId] = { ...players[action.playerId], pos: action.newPos };
      return { ...state, players };
    }
    case 'SET_WAITING':
      return { 
        ...state, 
        waitingForAction: action.status,
        currentProperty: action.propertyIdx ?? state.currentProperty
      };
    case 'BUY_PROPERTY': {
      const players = [...state.players];
      const properties = [...state.properties];
      const player = players[state.turn];
      
      if (player.money >= action.price) {
        player.money -= action.price;
        properties[action.propertyIdx] = { ...properties[action.propertyIdx], owner: player.id };
      }
      return { ...state, players, properties, waitingForAction: 'roll', currentProperty: null };
    }
    case 'PAY_RENT': {
      const players = [...state.players];
      const sender = players[action.fromPlayer];
      const receiver = players[action.toPlayer];
      
      sender.money -= action.amount;
      receiver.money += action.amount;
      
      return { ...state, players };
    }
    case 'NEXT_TURN':
      return { 
        ...state, 
        turn: (state.turn + 1) % state.players.length,
        waitingForAction: 'roll',
        currentProperty: null
      };
    default:
      return state;
  }
}

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const saveGameMutation = useSaveGame();

  const currentPlayer = state.players[state.turn];

  // Helper: Move player step by step
  const movePlayer = async (steps: number) => {
    dispatch({ type: 'SET_WAITING', status: 'animating' });
    
    let currentPos = currentPlayer.pos;
    for (let i = 0; i < steps; i++) {
      await new Promise(r => setTimeout(r, 300)); // Slightly slower for better visual tracking
      currentPos = (currentPos + 1) % 40;
      
      // Pass GO
      if (currentPos === 0) {
        dispatch({ type: 'PAY_RENT', fromPlayer: 0, toPlayer: currentPlayer.id, amount: 200 }); // Collect from bank
        toast({ 
          title: "Passed GO!", 
          description: "Collect $200 salary",
          className: "bg-green-100 border-green-500"
        });
      }
      
      dispatch({ type: 'MOVE_PLAYER', playerId: currentPlayer.id, newPos: currentPos });
    }

    setTimeout(() => handleTileArrival(currentPos), 400); // Wait for last hop animation to finish
  };

  const handleTileArrival = (pos: number) => {
    const tile = BOARD_TILES[pos];
    const property = state.properties[pos];

    // Property Logic
    if (tile.type === 'property' || tile.type === 'station' || tile.type === 'utility') {
      if (property.owner === null) {
        // Unowned -> Buy?
        if (currentPlayer.isAi) {
          // AI Logic: Buy if has money > price * 1.5
          const price = tile.price || 0;
          if (currentPlayer.money > price * 1.5) {
            setTimeout(() => {
              dispatch({ type: 'BUY_PROPERTY', propertyIdx: pos, price });
              toast({ title: `${currentPlayer.name} bought ${tile.n}` });
              endTurn();
            }, 1000);
          } else {
            setTimeout(endTurn, 1000);
          }
        } else {
          // Human -> Show Modal
          dispatch({ type: 'SET_WAITING', status: 'property', propertyIdx: pos });
          setShowModal(true);
        }
      } else if (property.owner !== currentPlayer.id) {
        // Owned by other -> Pay Rent
        let rent = 0;
        if (tile.type === 'property' && tile.rent) {
          rent = tile.rent[property.houses];
        } else if (tile.type === 'station') {
          // Simplified station rent: count owned stations
          const ownerStations = state.properties.filter((p, i) => BOARD_TILES[i].type === 'station' && p.owner === property.owner).length;
          rent = 25 * Math.pow(2, ownerStations - 1);
        } else if (tile.type === 'utility') {
          // Simplified utility rent: 4x or 10x roll
          const ownerUtilities = state.properties.filter((p, i) => BOARD_TILES[i].type === 'utility' && p.owner === property.owner).length;
          rent = (ownerUtilities === 2 ? 10 : 4) * state.lastRoll;
        }

        if (rent > 0) {
          dispatch({ type: 'PAY_RENT', fromPlayer: currentPlayer.id, toPlayer: property.owner, amount: rent });
          toast({ 
            title: "Transaction Successful", 
            description: (
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-destructive">Rent Paid</span>
                  <span className="text-lg font-bold text-destructive">-$${rent}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  To: ${state.players[property.owner].name} for ${tile.n}
                </div>
              </div>
            ),
            variant: "destructive" 
          });
        }
        setTimeout(endTurn, 1500);
      } else {
        // Owned by self -> Nothing (or manage)
        setTimeout(endTurn, 1000);
      }
    } else {
      // Non-property tile (Tax, Chance, etc)
      if (tile.type === 'tax' && tile.price) {
        dispatch({ type: 'PAY_RENT', fromPlayer: currentPlayer.id, toPlayer: 0, amount: tile.price }); // Pay to bank
        toast({ 
          title: "Transaction Successful", 
          description: (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-destructive">Tax Payment</span>
                <span className="text-lg font-bold text-destructive">-$${tile.price}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Type: ${tile.n}
              </div>
            </div>
          ),
          variant: "destructive" 
        });
      }
      setTimeout(endTurn, 1000);
    }
  };

  const rollDice = () => {
    if (state.waitingForAction !== 'roll') return;
    
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    
    dispatch({ type: 'ROLL_DICE', dice: [d1, d2] });
    movePlayer(d1 + d2);
  };

  const endTurn = () => {
    dispatch({ type: 'NEXT_TURN' });
  };

  // AI Turn Handler
  useEffect(() => {
    if (currentPlayer.isAi && state.waitingForAction === 'roll') {
      const timer = setTimeout(() => {
        rollDice();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.turn, state.waitingForAction]);

  // Handle Buy
  const handleBuy = () => {
    if (state.currentProperty === null) return;
    const tile = BOARD_TILES[state.currentProperty];
    const price = tile.price || 0;
    dispatch({ type: 'BUY_PROPERTY', propertyIdx: state.currentProperty, price });
    toast({ 
      title: "Transaction Successful", 
      description: (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-green-600">Property Bought</span>
            <span className="text-lg font-bold text-green-600">-$${price}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Asset: ${tile.n}
          </div>
        </div>
      ),
    });
    setShowModal(false);
    endTurn();
  };

  const handleSkip = () => {
    setShowModal(false);
    endTurn();
  };

  return (
    <div className="min-h-screen bg-[#0f5132] p-4 lg:p-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center overflow-hidden">
      
      {/* LEFT: Game Board */}
      <div className="flex-1 w-full max-w-[900px] aspect-square relative perspective-1000">
        <div className="board-grid relative">
          
          {/* Center Logo Area */}
          <div 
            className="absolute inset-0 m-[12%] bg-[#d4eec9] flex flex-col items-center justify-center transform rotate-[-45deg] opacity-20 pointer-events-none"
            style={{ gridColumn: '2 / span 9', gridRow: '2 / span 9', zIndex: 0 }}
          >
             <h1 className="text-9xl font-display font-bold tracking-tighter text-[#0f5132]">MONOPOLY</h1>
          </div>

          {/* Tiles */}
          {BOARD_TILES.map((tile, i) => (
            <Tile 
              key={i} 
              index={i} 
              data={tile} 
              propertyState={state.properties[i]}
              playersOnTile={state.players.filter(p => p.pos === i).map(p => p.color)}
            />
          ))}

          {/* Player Tokens */}
          {state.players.map((player, i) => (
            <PlayerToken 
              key={i}
              playerIndex={i}
              position={player.pos}
              color={player.color}
              isCurrentTurn={state.turn === i}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-4">
        <ControlPanel 
          gameState={state} 
          onRoll={rollDice} 
        />
        
        <div className="bg-white/10 rounded-lg p-4 text-white/50 text-xs text-center font-mono">
          Game ID: Local Session
          <br/>
          Dev Mode: Pre-Alpha Build
        </div>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={showModal}
        type="buy"
        tileData={state.currentProperty !== null ? BOARD_TILES[state.currentProperty] : null}
        price={state.currentProperty !== null ? (BOARD_TILES[state.currentProperty].price || 0) : 0}
        playerMoney={currentPlayer.money}
        onConfirm={handleBuy}
        onCancel={handleSkip}
      />
    </div>
  );
}

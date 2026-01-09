import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TileData } from "@shared/schema";

interface ActionModalProps {
  isOpen: boolean;
  type: 'buy' | 'manage' | null;
  tileData: TileData | null;
  price: number;
  playerMoney: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActionModal({ isOpen, type, tileData, price, playerMoney, onConfirm, onCancel }: ActionModalProps) {
  if (!tileData) return null;

  const canAfford = playerMoney >= price;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display uppercase text-center">
            {type === 'buy' ? 'Property Available' : 'Manage Property'}
          </DialogTitle>
          <DialogDescription className="text-center font-body text-lg text-foreground/80">
            You landed on <span className="font-bold text-foreground">{tileData.n}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6 gap-4">
          <div className="w-32 h-40 border-2 border-black rounded-lg shadow-md bg-white flex flex-col items-center overflow-hidden">
             {tileData.c && <div className="h-8 w-full border-b-2 border-black" style={{ backgroundColor: tileData.c }} />}
             <div className="flex-1 flex items-center justify-center p-2 text-center font-bold font-display leading-tight text-xl">
               {tileData.n}
             </div>
             <div className="pb-2 font-bold text-muted-foreground">${price}</div>
          </div>
          
          <div className="text-center space-y-1">
             <p className="text-sm text-muted-foreground">Price</p>
             <p className="text-2xl font-bold text-primary-foreground bg-primary px-4 py-1 rounded-full shadow-inner">
               ${price}
             </p>
          </div>

          {!canAfford && (
            <p className="text-destructive font-bold animate-pulse">Insufficient Funds!</p>
          )}
        </div>

        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={onCancel} className="w-full">
            {type === 'buy' ? 'Pass' : 'Close'}
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={!canAfford}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            {type === 'buy' ? 'Buy Property' : 'Upgrade (-$50)'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

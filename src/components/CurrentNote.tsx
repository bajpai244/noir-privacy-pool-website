import React from 'react';
import { Card } from '@/components/ui/card';
import { Eye, Hash, Lock, Database } from 'lucide-react';

export type Note = {
  value: number;
  secret: number;
  nullifier: number;
  // hash of [value, secret]
  commitment: bigint;
  // hash of [commitment, nullifier]
  nullifierHash: bigint;
};

interface CurrentNoteProps {
  note?: Note;
  stateSize?: number;
  stateRoot?: string;
}

const CurrentNote: React.FC<CurrentNoteProps> = ({ 
  note,
  stateSize = 0,
  stateRoot = "0x0000000000000000000000000000000000000000000000000000000000000000"
}) => {
  const formatBigInt = (value: bigint) => {
    const hex = value.toString(16);
    return `0x${hex.slice(0, 8)}...${hex.slice(-8)}`;
  };

  return (
    <Card className="retro-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="terminal-text text-xl font-bold text-primary">CURRENT NOTE</h2>
        <Eye className="text-accent" size={24} />
      </div>

      {note ? (
        <div className="space-y-4">
          {/* Note Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="terminal-text text-xs font-bold text-primary block mb-1">
                  VALUE
                </label>
                <div className="terminal-text text-lg text-accent font-mono">
                  {note.value}
                </div>
              </div>
              
              <div>
                <label className="terminal-text text-xs font-bold text-primary block mb-1">
                  SECRET
                </label>
                <div className="terminal-text text-lg text-accent font-mono">
                  {note.secret}
                </div>
              </div>
              
              <div>
                <label className="terminal-text text-xs font-bold text-primary block mb-1">
                  NULLIFIER
                </label>
                <div className="terminal-text text-lg text-accent font-mono">
                  {note.nullifier}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="terminal-text text-xs font-bold text-primary block mb-1 flex items-center gap-1">
                  <Hash size={12} />
                  COMMITMENT
                </label>
                <div className="terminal-text text-sm text-accent font-mono break-all">
                  {formatBigInt(note.commitment)}
                </div>
              </div>
              
              <div>
                <label className="terminal-text text-xs font-bold text-primary block mb-1 flex items-center gap-1">
                  <Hash size={12} />
                  NULLIFIER HASH
                </label>
                <div className="terminal-text text-sm text-accent font-mono break-all">
                  {formatBigInt(note.nullifierHash)}
                </div>
              </div>
            </div>
          </div>

          {/* State Information */}
          <div className="border-t border-border pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="terminal-text text-xs font-bold text-primary block mb-1 flex items-center gap-1">
                  <Database size={12} />
                  STATE SIZE
                </label>
                <div className="terminal-text text-lg text-accent font-mono">
                  {stateSize.toLocaleString()}
                </div>
              </div>
              
              <div>
                <label className="terminal-text text-xs font-bold text-primary block mb-1 flex items-center gap-1">
                  <Lock size={12} />
                  STATE ROOT
                </label>
                <div className="terminal-text text-sm text-accent font-mono break-all">
                  {stateRoot.slice(0, 10)}...{stateRoot.slice(-10)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="terminal-text text-muted-foreground text-center py-8">
          NO CURRENT NOTE LOADED
        </div>
      )}
    </Card>
  );
};

export default CurrentNote;
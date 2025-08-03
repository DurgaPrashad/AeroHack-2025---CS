import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shuffle, RotateCcw, Play, HelpCircle, Pause, SkipForward, SkipBack } from 'lucide-react';

interface CubeControlsProps {
  cubeSize: number;
  onCubeSizeChange: (size: number) => void;
  onScramble: () => void;
  onReset: () => void;
  onExecuteMoves: (moves: string) => void;
  beginnerMode: boolean;
  onBeginnerModeChange: (enabled: boolean) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  currentMoves: string[];
}

const CubeControls = ({
  cubeSize,
  onCubeSizeChange,
  onScramble,
  onReset,
  onExecuteMoves,
  beginnerMode,
  onBeginnerModeChange,
  isPlaying,
  onPlayPause,
  onStepForward,
  onStepBack,
  currentMoves,
}: CubeControlsProps) => {
  const [moveSequence, setMoveSequence] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecuteMoves = async () => {
    if (!moveSequence.trim()) return;
    
    setIsExecuting(true);
    onExecuteMoves(moveSequence);
    
    // Simulate execution time
    setTimeout(() => {
      setIsExecuting(false);
    }, 1000);
  };

  const exampleMoves = [
    "R U R' U'",
    "F R U' R' F'",
    "R U R' F' R F R'",
    "M' U M U2 M' U M"
  ];

  return (
    <Card className="glass p-6 space-y-6">
      {/* Cube Size Selector */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <div className="w-3 h-3 bg-cube-blue rounded-full"></div>
          Cube Configuration
        </h3>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Size:</label>
          <Select
            value={cubeSize.toString()}
            onValueChange={(value) => onCubeSizeChange(parseInt(value))}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2×2</SelectItem>
              <SelectItem value="3">3×3</SelectItem>
              <SelectItem value="4">4×4</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="ml-auto">
            {cubeSize === 2 ? 'Pocket' : cubeSize === 3 ? 'Classic' : 'Revenge'} Cube
          </Badge>
        </div>
      </div>

      {/* Move Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-3 h-3 bg-cube-green rounded-full"></div>
            Move Sequence
          </h3>
          <div className="flex items-center gap-2">
            <Label htmlFor="beginner-mode" className="text-sm">Beginner Mode</Label>
            <Switch
              id="beginner-mode"
              checked={beginnerMode}
              onCheckedChange={onBeginnerModeChange}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter moves (e.g., R U R' U')"
            value={moveSequence}
            onChange={(e) => setMoveSequence(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleExecuteMoves}
            disabled={!moveSequence.trim() || isExecuting}
            variant="default"
            size="icon"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>

        {/* Playback Controls */}
        {currentMoves.length > 0 && (
          <div className="flex justify-center gap-2">
            <Button
              onClick={onStepBack}
              variant="outline"
              size="sm"
              disabled={isPlaying}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              onClick={onPlayPause}
              variant="secondary"
              size="sm"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              onClick={onStepForward}
              variant="outline"
              size="sm"
              disabled={isPlaying}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Example moves */}
        <div className="flex flex-wrap gap-2">
          {exampleMoves.map((moves, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setMoveSequence(moves)}
              className="text-xs"
            >
              {moves}
            </Button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onScramble}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Shuffle className="h-4 w-4" />
          Scramble
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Move Notation Help */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Move Notation
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div><Badge variant="outline">R</Badge> Right clockwise</div>
            <div><Badge variant="outline">L</Badge> Left clockwise</div>
            <div><Badge variant="outline">U</Badge> Up clockwise</div>
          </div>
          <div className="space-y-1">
            <div><Badge variant="outline">R'</Badge> Right counter-clockwise</div>
            <div><Badge variant="outline">F2</Badge> Front 180°</div>
            <div><Badge variant="outline">D</Badge> Down clockwise</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CubeControls;
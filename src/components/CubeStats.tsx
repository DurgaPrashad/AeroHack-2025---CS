import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Move, Target, TrendingUp } from 'lucide-react';

interface CubeStatsProps {
  moveCount: number;
  timeElapsed: number;
  isTimerRunning: boolean;
  bestTime?: number;
  averageTime?: number;
}

const CubeStats = ({
  moveCount,
  timeElapsed,
  isTimerRunning,
  bestTime,
  averageTime,
}: CubeStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return `${mins}:${secs.padStart(5, '0')}`;
  };

  return (
    <Card className="glass p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <div className="w-3 h-3 bg-cube-yellow rounded-full"></div>
        Session Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Current Timer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            Current Time
          </div>
          <div className={`text-2xl font-mono font-bold ${
            isTimerRunning ? 'text-cube-blue animate-pulse' : 'text-foreground'
          }`}>
            {formatTime(timeElapsed)}
          </div>
        </div>

        {/* Move Count */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Move className="h-4 w-4" />
            Moves
          </div>
          <div className="text-2xl font-bold">
            {moveCount}
          </div>
        </div>

        {/* Best Time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="h-4 w-4" />
            Best Time
          </div>
          <div className="text-lg font-mono">
            {bestTime ? formatTime(bestTime) : '--:--'}
          </div>
        </div>

        {/* Average Time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Average
          </div>
          <div className="text-lg font-mono">
            {averageTime ? formatTime(averageTime) : '--:--'}
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Performance</span>
          <Badge 
            variant={moveCount < 30 ? 'default' : moveCount < 60 ? 'secondary' : 'outline'}
            className="text-xs"
          >
            {moveCount < 30 ? 'Excellent' : moveCount < 60 ? 'Good' : 'Practice More'}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default CubeStats;
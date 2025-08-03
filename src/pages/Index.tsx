import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import RubiksCubeScene from '@/components/RubiksCube';
import CubeControls from '@/components/CubeControls';
import CubeStats from '@/components/CubeStats';
import MoveExplanator from '@/components/MoveExplanator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [cubeSize, setCubeSize] = useState(3);
  const [moveCount, setMoveCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [beginnerMode, setBeginnerMode] = useState(true);
  const [currentMoves, setCurrentMoves] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const { toast } = useToast();

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 0.01);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleCubeSizeChange = (size: number) => {
    setCubeSize(size);
    toast({
      title: "Cube Size Changed",
      description: `Switched to ${size}×${size} cube`,
    });
  };

  const handleScramble = () => {
    setIsTimerRunning(false);
    setTimeElapsed(0);
    setMoveCount(0);
    toast({
      title: "Cube Scrambled",
      description: "Get ready to solve!",
    });
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setTimeElapsed(0);
    setMoveCount(0);
    toast({
      title: "Cube Reset",
      description: "Back to solved state",
    });
  };

  const handleExecuteMoves = (moves: string) => {
    const moveArray = moves.split(' ').filter(move => move.trim());
    setCurrentMoves(moveArray);
    setCurrentStep(0);
    setMoveCount(prev => prev + moveArray.length);
    
    if (!isTimerRunning && moveArray.length > 0) {
      setIsTimerRunning(true);
    }

    toast({
      title: "Moves Executed",
      description: `Loaded ${moveArray.length} moves: ${moves}`,
    });
  };

  const handlePlayPause = () => {
    setIsPlayingSequence(!isPlayingSequence);
  };

  const handleStepForward = () => {
    if (currentStep < currentMoves.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <header className="border-b border-border glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Box className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Interactive Cube Visualizer
                </h1>
                <p className="text-sm text-muted-foreground">
                  Learn • Practice • Perfect
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRotate(!autoRotate)}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {autoRotate ? 'Stop' : 'Auto'} Rotate
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Cube Display - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <Card className="glass p-6 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-cube-red rounded-full"></div>
                  {cubeSize}×{cubeSize} Rubik's Cube
                </h2>
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-cube-red rounded-sm"></div>
                  <div className="w-4 h-4 bg-cube-orange rounded-sm"></div>
                  <div className="w-4 h-4 bg-cube-yellow rounded-sm"></div>
                  <div className="w-4 h-4 bg-cube-green rounded-sm"></div>
                  <div className="w-4 h-4 bg-cube-blue rounded-sm"></div>
                  <div className="w-4 h-4 bg-cube-white rounded-sm border border-border"></div>
                </div>
              </div>
              
              <Suspense 
                fallback={
                  <div className="w-full h-[500px] bg-muted rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="animate-cube-rotate w-16 h-16 bg-gradient-to-r from-cube-red to-cube-blue rounded-lg mx-auto"></div>
                      <p className="text-muted-foreground">Loading 3D Cube...</p>
                    </div>
                  </div>
                }
              >
                <RubiksCubeScene 
                  size={cubeSize} 
                  autoRotate={autoRotate}
                />
              </Suspense>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Click and drag to rotate • Scroll to zoom • Use controls to interact
              </div>
            </Card>
          </div>

          {/* Controls and Stats Sidebar */}
          <div className="space-y-6">
            <CubeControls
              cubeSize={cubeSize}
              onCubeSizeChange={handleCubeSizeChange}
              onScramble={handleScramble}
              onReset={handleReset}
              onExecuteMoves={handleExecuteMoves}
              beginnerMode={beginnerMode}
              onBeginnerModeChange={setBeginnerMode}
              isPlaying={isPlayingSequence}
              onPlayPause={handlePlayPause}
              onStepForward={handleStepForward}
              onStepBack={handleStepBack}
              currentMoves={currentMoves}
            />
            
            <CubeStats
              moveCount={moveCount}
              timeElapsed={timeElapsed}
              isTimerRunning={isTimerRunning}
            />
          </div>
        </div>

        {/* Move Explanation Section */}
        {currentMoves.length > 0 && (
          <div className="mt-8">
            <MoveExplanator
              moves={currentMoves}
              currentStep={currentStep}
              isPlaying={isPlayingSequence}
              onStepChange={handleStepChange}
              beginnerMode={beginnerMode}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

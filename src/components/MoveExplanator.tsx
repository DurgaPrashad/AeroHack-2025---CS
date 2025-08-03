import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Lightbulb, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MoveExplanation {
  move: string;
  description: string;
  face: string;
  direction: string;
  angle: string;
  tip?: string;
}

interface MoveExplanatorProps {
  moves: string[];
  currentStep: number;
  isPlaying: boolean;
  onStepChange: (step: number) => void;
  beginnerMode: boolean;
}

const MoveExplanator = ({
  moves,
  currentStep,
  isPlaying,
  onStepChange,
  beginnerMode
}: MoveExplanatorProps) => {
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { toast } = useToast();

  // Move notation explanations
  const moveExplanations: Record<string, MoveExplanation> = {
    'R': { move: 'R', description: 'Right face clockwise', face: 'Right', direction: 'Clockwise', angle: '90°', tip: 'Hold the cube with white on top, yellow on bottom' },
    "R'": { move: "R'", description: 'Right face counterclockwise', face: 'Right', direction: 'Counterclockwise', angle: '90°' },
    'R2': { move: 'R2', description: 'Right face 180°', face: 'Right', direction: 'Half turn', angle: '180°' },
    'L': { move: 'L', description: 'Left face clockwise', face: 'Left', direction: 'Clockwise', angle: '90°' },
    "L'": { move: "L'", description: 'Left face counterclockwise', face: 'Left', direction: 'Counterclockwise', angle: '90°' },
    'L2': { move: 'L2', description: 'Left face 180°', face: 'Left', direction: 'Half turn', angle: '180°' },
    'U': { move: 'U', description: 'Up face clockwise', face: 'Top', direction: 'Clockwise', angle: '90°', tip: 'Looking down at the top face' },
    "U'": { move: "U'", description: 'Up face counterclockwise', face: 'Top', direction: 'Counterclockwise', angle: '90°' },
    'U2': { move: 'U2', description: 'Up face 180°', face: 'Top', direction: 'Half turn', angle: '180°' },
    'D': { move: 'D', description: 'Down face clockwise', face: 'Bottom', direction: 'Clockwise', angle: '90°' },
    "D'": { move: "D'", description: 'Down face counterclockwise', face: 'Bottom', direction: 'Counterclockwise', angle: '90°' },
    'D2': { move: 'D2', description: 'Down face 180°', face: 'Bottom', direction: 'Half turn', angle: '180°' },
    'F': { move: 'F', description: 'Front face clockwise', face: 'Front', direction: 'Clockwise', angle: '90°' },
    "F'": { move: "F'", description: 'Front face counterclockwise', face: 'Front', direction: 'Counterclockwise', angle: '90°' },
    'F2': { move: 'F2', description: 'Front face 180°', face: 'Front', direction: 'Half turn', angle: '180°' },
    'B': { move: 'B', description: 'Back face clockwise', face: 'Back', direction: 'Clockwise', angle: '90°' },
    "B'": { move: "B'", description: 'Back face counterclockwise', face: 'Back', direction: 'Counterclockwise', angle: '90°' },
    'B2': { move: 'B2', description: 'Back face 180°', face: 'Back', direction: 'Half turn', angle: '180°' },
  };

  const getFaceColor = (face: string) => {
    const colors = {
      'Right': 'bg-cube-red',
      'Left': 'bg-cube-orange', 
      'Top': 'bg-cube-white border border-border',
      'Bottom': 'bg-cube-yellow',
      'Front': 'bg-cube-blue',
      'Back': 'bg-cube-green'
    };
    return colors[face as keyof typeof colors] || 'bg-muted';
  };

  const getAISolvingTip = async () => {
    if (!moves.length) return;

    setIsLoadingAI(true);
    const apiKey = "AIzaSyCKxef2OEUNjIeH3XMD5nXbMJ-cUVYE_PI";
    
    try {
      const prompt = `Analyze this Rubik's cube move sequence: "${moves.join(' ')}"
      
      Please provide:
      1. What this sequence accomplishes
      2. Which solving method/algorithm this might be from
      3. A beginner-friendly tip for executing these moves
      4. Any pattern recognition advice
      
      Keep the response concise and educational.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to analyze the sequence.';
      setAiSuggestion(aiResponse);
      
      toast({
        title: "AI Analysis Complete",
        description: "Got solving insights for your move sequence!",
      });
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast({
        title: "AI Analysis Failed",
        description: "Unable to get AI insights. Try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <Card className="glass p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <div className="w-3 h-3 bg-cube-yellow rounded-full"></div>
          Move Explanation
        </h3>
        <Button
          onClick={getAISolvingTip}
          disabled={isLoadingAI || !moves.length}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Brain className="h-4 w-4" />
          {isLoadingAI ? 'Analyzing...' : 'AI Analysis'}
        </Button>
      </div>

      {/* Current Move Display */}
      {moves.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Step {currentStep + 1} of {moves.length}
            </Badge>
            {!isPlaying && (
              <div className="flex gap-1">
                {moves.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onStepChange(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep 
                        ? 'bg-primary' 
                        : index < currentStep 
                          ? 'bg-cube-green' 
                          : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {moves[currentStep] && moveExplanations[moves[currentStep]] && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-mono font-bold bg-primary text-primary-foreground rounded-lg px-3 py-1">
                  {moveExplanations[moves[currentStep]].move}
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <div className="text-lg">
                  {moveExplanations[moves[currentStep]].description}
                </div>
              </div>

              {beginnerMode && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded ${getFaceColor(moveExplanations[moves[currentStep]].face)}`}></div>
                    <span className="text-sm"><strong>Face:</strong> {moveExplanations[moves[currentStep]].face}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm"><strong>Direction:</strong> {moveExplanations[moves[currentStep]].direction}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm"><strong>Angle:</strong> {moveExplanations[moves[currentStep]].angle}</span>
                  </div>
                </div>
              )}

              {beginnerMode && moveExplanations[moves[currentStep]].tip && (
                <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg">
                  <Lightbulb className="h-4 w-4 text-accent-foreground mt-0.5" />
                  <div className="text-sm">
                    <strong>Tip:</strong> {moveExplanations[moves[currentStep]].tip}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full Sequence Overview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Full Sequence:</h4>
            <div className="flex flex-wrap gap-2">
              {moves.map((move, index) => (
                <Badge
                  key={index}
                  variant={index === currentStep ? 'default' : index < currentStep ? 'secondary' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => onStepChange(index)}
                >
                  {move}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestion */}
      {aiSuggestion && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">AI Analysis</span>
          </div>
          <div className="text-sm text-foreground whitespace-pre-line">
            {aiSuggestion}
          </div>
        </div>
      )}

      {moves.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Enter a move sequence to see step-by-step explanations</p>
          <p className="text-sm mt-1">Try: R U R' U' or F R U' R' F'</p>
        </div>
      )}
    </Card>
  );
};

export default MoveExplanator;
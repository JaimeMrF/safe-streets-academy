import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Trophy, Timer } from "lucide-react";

// Símbolos por tema y dificultad
const symbolsByTheme: Record<string, string[]> = {
  "traffic-lights": ['🚦', '🔴', '🟢', '🟡', '⛔', '🚸', '🚥', '🛑'],
  "road-signs": ['🚸', '⚠️', '🛑', '⛔', '🚫', '🚷', '🚳', '🚭', '📵', '🔞'],
  "cycling-signs": ['🚴', '🚴‍♀️', '⚠️', '🛑', '🚸', '🚦', '⛔', '🚳', '🏁', '🎯'],
  "vehicles": ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚛', '🚚'],
};

const MemoryGame = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    loadRoute();
  }, [routeId]);

  useEffect(() => {
    if (gameStarted && matched.length < cards.length) {
      const interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, matched, cards]);

  const loadRoute = async () => {
    const { data: route } = await supabase
      .from("routes")
      .select("game_config")
      .eq("id", routeId)
      .single();

    if (route && route.game_config) {
      const config = route.game_config as any;
      const pairs = config.pairs || 6;
      const theme = config.theme || "traffic-lights";
      const diff = config.difficulty || "easy";
      setDifficulty(diff);
      initGame(pairs, theme);
    } else {
      initGame(6, "traffic-lights");
    }
  };

  const initGame = (pairs: number, theme: string) => {
    const availableSymbols = symbolsByTheme[theme] || symbolsByTheme["traffic-lights"];
    const selectedSymbols = availableSymbols.slice(0, pairs);
    const gameCards = [...selectedSymbols, ...selectedSymbols].sort(() => Math.random() - 0.5);
    setCards(gameCards.map((symbol, i) => ({ id: i, symbol })));
    setGameStarted(true);
  };

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]].symbol === cards[newFlipped[1]].symbol) {
        const newMatched = [...matched, ...newFlipped];
        setMatched(newMatched);
        
        // Bonus por rapidez
        const timeBonus = Math.max(0, 50 - timer);
        const movesPenalty = Math.max(0, 20 - moves);
        setScore(score + 10 + timeBonus + movesPenalty);
        setFlipped([]);
        
        // Check if game completed
        if (newMatched.length === cards.length) {
          saveProgress(newMatched.length);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const saveProgress = async (matchedCount: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const accuracy = Math.round((matchedCount / cards.length) * 100);
    const finalScore = Math.min(100, Math.round(score + (accuracy * 0.5)));
    const avgTime = timer / moves;

    const { data: existing } = await supabase
      .from("student_progress")
      .select("*")
      .eq("student_id", user.id)
      .eq("route_id", routeId)
      .single();

    await supabase.from("student_progress").upsert({
      student_id: user.id,
      route_id: routeId,
      completed: true,
      score: finalScore,
      completion_status: 'completed',
      best_accuracy_percentage: Math.max(accuracy, existing?.best_accuracy_percentage || 0),
      last_accuracy_percentage: accuracy,
      avg_response_time: avgTime,
      attempts: (existing?.attempts || 0) + 1,
      last_attempt_date: new Date().toISOString(),
      completion_date: new Date().toISOString(),
    });

    toast.success(`¡Completado! Puntuación: ${finalScore}`);
    setTimeout(() => navigate(-1), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGridCols = () => {
    if (cards.length <= 12) return "grid-cols-3 md:grid-cols-4";
    if (cards.length <= 16) return "grid-cols-4 md:grid-cols-4";
    return "grid-cols-4 md:grid-cols-5";
  };

  const getDifficultyColor = () => {
    switch(difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-primary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-3 md:gap-6">
            <div className="text-center bg-card p-3 rounded-lg border-2 border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-4 w-4 text-primary" />
                <p className="text-xs md:text-sm text-muted-foreground">Puntuación</p>
              </div>
              <p className="text-xl md:text-2xl font-bold text-primary">{score}</p>
            </div>
            <div className="text-center bg-card p-3 rounded-lg border-2 border-accent/20">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Movimientos</p>
              <p className="text-xl md:text-2xl font-bold text-accent">{moves}</p>
            </div>
            <div className="text-center bg-card p-3 rounded-lg border-2 border-secondary/20">
              <div className="flex items-center gap-2 mb-1">
                <Timer className="h-4 w-4 text-secondary" />
                <p className="text-xs md:text-sm text-muted-foreground">Tiempo</p>
              </div>
              <p className="text-xl md:text-2xl font-bold text-secondary">{formatTime(timer)}</p>
            </div>
            <div className="text-center bg-card p-3 rounded-lg">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Dificultad</p>
              <Badge className={`${getDifficultyColor()} text-white uppercase`}>{difficulty}</Badge>
            </div>
          </div>
          <Button onClick={() => navigate(-1)} variant="outline" className="w-full md:w-auto">
            Volver
          </Button>
        </div>

        <div className="mb-4">
          <Progress value={(matched.length / cards.length) * 100} className="h-3" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {matched.length / 2} de {cards.length / 2} pares encontrados
          </p>
        </div>

        <div className={`grid ${getGridCols()} gap-2 md:gap-3`}>
          {cards.map((card, i) => (
            <Card 
              key={i}
              className={`aspect-square flex items-center justify-center text-3xl md:text-4xl lg:text-5xl cursor-pointer transition-all duration-300 ${
                flipped.includes(i) || matched.includes(i) 
                  ? "bg-primary/20 scale-105 shadow-lg" 
                  : "bg-card hover:bg-muted hover:scale-105 shadow-md"
              } ${matched.includes(i) ? "opacity-70" : ""}`}
              onClick={() => handleClick(i)}
            >
              {flipped.includes(i) || matched.includes(i) ? card.symbol : '❓'}
            </Card>
          ))}
        </div>

        {matched.length === cards.length && cards.length > 0 && (
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border-2 border-primary">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">¡Excelente! 🎉</h2>
            <p className="text-muted-foreground mb-4">
              Completaste el juego en {moves} movimientos y {formatTime(timer)}
            </p>
            <div className="text-4xl font-bold text-primary mb-4">
              Puntuación: {score}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
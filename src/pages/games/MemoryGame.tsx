import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const MemoryGame = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const symbols = ['🚦', '🚸', '🛑', '⚠️', '🚗', '🚴'];
    const gameCards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setCards(gameCards.map((symbol, i) => ({ id: i, symbol })));
  };

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]].symbol === cards[newFlipped[1]].symbol) {
        setMatched([...matched, ...newFlipped]);
        setScore(score + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const saveProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("student_progress").upsert({
      student_id: user.id,
      route_id: routeId,
      completed: true,
      score,
      completion_status: 'completed',
      best_accuracy_percentage: Math.round((matched.length / cards.length) * 100),
    });

    toast.success("¡Progreso guardado!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{score}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Puntuación</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{moves}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Movimientos</p>
            </div>
          </div>
          <Button onClick={() => navigate(-1)} variant="outline" className="w-full md:w-auto">
            Volver
          </Button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {cards.map((card, i) => (
            <Card 
              key={i}
              className="aspect-square flex items-center justify-center text-3xl md:text-4xl cursor-pointer hover:bg-muted hover:scale-105 transition-all duration-200"
              onClick={() => handleClick(i)}
            >
              {flipped.includes(i) || matched.includes(i) ? card.symbol : '?'}
            </Card>
          ))}
        </div>

        {matched.length === cards.length && (
          <div className="text-center mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">¡Completado! 🎉</h2>
            <Button onClick={saveProgress} size="lg" className="w-full md:w-auto">
              Guardar y Continuar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
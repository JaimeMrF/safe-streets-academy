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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <div>
            <p>Puntuación: {score}</p>
            <p>Movimientos: {moves}</p>
          </div>
          <Button onClick={() => navigate(-1)} variant="outline">Volver</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <Card 
              key={i}
              className="aspect-square flex items-center justify-center text-4xl cursor-pointer hover:bg-muted transition-colors"
              onClick={() => handleClick(i)}
            >
              {flipped.includes(i) || matched.includes(i) ? card.symbol : '?'}
            </Card>
          ))}
        </div>

        {matched.length === cards.length && (
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">¡Completado!</h2>
            <Button onClick={saveProgress}>Guardar y Continuar</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
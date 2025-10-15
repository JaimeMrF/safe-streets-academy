import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

// Señales de tráfico para el juego de memoria
const trafficSigns = [
  { id: 1, name: "STOP", emoji: "🛑" },
  { id: 2, name: "Ceda el paso", emoji: "⚠️" },
  { id: 3, name: "Semáforo", emoji: "🚦" },
  { id: 4, name: "Cruce peatonal", emoji: "🚸" },
  { id: 5, name: "Prohibido", emoji: "🚫" },
  { id: 6, name: "Velocidad", emoji: "⏱️" },
  { id: 7, name: "Curva", emoji: "↩️" },
  { id: 8, name: "Estacionamiento", emoji: "🅿️" },
];

interface CardType {
  id: number;
  signId: number;
  name: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const Memoria4x4 = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && matchedPairs < 8) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, matchedPairs]);

  const initializeGame = () => {
    // Crear pares de cartas
    const gameCards: CardType[] = [];
    trafficSigns.forEach((sign, index) => {
      gameCards.push({
        id: index * 2,
        signId: sign.id,
        name: sign.name,
        emoji: sign.emoji,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: index * 2 + 1,
        signId: sign.id,
        name: sign.name,
        emoji: sign.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });
    
    // Barajar cartas
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTimeElapsed(0);
    setGameStarted(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) setGameStarted(true);
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped || flippedCards.length >= 2) {
      return;
    }

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlipped;
      const firstCard = newCards.find(c => c.id === first);
      const secondCard = newCards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.signId === secondCard.signId) {
        // Match!
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === first || c.id === second
              ? { ...c, isMatched: true }
              : c
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          toast.success("¡Pareja encontrada! 🎉");
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === first || c.id === second
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/student/course/2")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-primary">Memoria Vial 4x4</h1>
          <Button variant="outline" onClick={initializeGame} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{moves}</div>
            <div className="text-sm text-muted-foreground">Movimientos</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{matchedPairs}/8</div>
            <div className="text-sm text-muted-foreground">Parejas</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{formatTime(timeElapsed)}</div>
            <div className="text-sm text-muted-foreground">Tiempo</div>
          </Card>
        </div>

        {matchedPairs === 8 && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-green-400 to-blue-400 text-white text-center">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h2 className="text-2xl font-bold mb-2">¡Felicitaciones!</h2>
            <p>Completaste el juego en {moves} movimientos y {formatTime(timeElapsed)}</p>
          </Card>
        )}

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <Card
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square flex items-center justify-center cursor-pointer
                transition-all duration-300 hover:scale-105
                ${card.isFlipped || card.isMatched ? 'bg-white' : 'bg-gradient-to-br from-primary to-secondary'}
                ${card.isMatched ? 'opacity-50' : ''}
              `}
            >
              {(card.isFlipped || card.isMatched) ? (
                <div className="text-center">
                  <div className="text-4xl mb-1">{card.emoji}</div>
                  <div className="text-xs font-semibold">{card.name}</div>
                </div>
              ) : (
                <div className="text-4xl text-white">❓</div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memoria4x4;

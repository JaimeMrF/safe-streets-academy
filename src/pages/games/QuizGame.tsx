import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const QuizGame = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  
  const questions = [
    { q: "¿Qué significa la luz verde del semáforo?", a: ["Parar", "Avanzar", "Precaución"], correct: 1 },
    { q: "¿Qué debes hacer antes de cruzar la calle?", a: ["Correr", "Mirar a ambos lados", "Cerrar los ojos"], correct: 1 },
    { q: "¿De qué color es la señal de ALTO?", a: ["Verde", "Amarillo", "Rojo"], correct: 2 },
  ];

  const handleAnswer = async (index: number) => {
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
      toast.success("¡Correcto!");
    } else {
      toast.error("Incorrecto");
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const finalScore = Math.round(((score + (index === questions[currentQ].correct ? 1 : 0)) / questions.length) * 100);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("student_progress").upsert({
          student_id: user.id,
          route_id: routeId,
          completed: true,
          score: finalScore,
          completion_status: 'completed',
          best_accuracy_percentage: finalScore,
        });
      }
      
      toast.success(`¡Completado! Puntuación: ${finalScore}%`);
      setTimeout(() => navigate(-1), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Pregunta {currentQ + 1} de {questions.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl mb-6">{questions[currentQ].q}</h2>
          <div className="space-y-3">
            {questions[currentQ].a.map((answer, i) => (
              <Button key={i} variant="outline" className="w-full" onClick={() => handleAnswer(i)}>
                {answer}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;
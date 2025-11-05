import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

// Preguntas por nivel educativo y tema
const questionsByTheme: Record<string, Array<{ q: string; a: string[]; correct: number }>> = {
  // PREESCOLAR - Básico
  "basic-signs-easy": [
    { q: "¿Qué significa la luz verde del semáforo?", a: ["Parar", "Avanzar", "Precaución"], correct: 1 },
    { q: "¿De qué color es la señal de ALTO?", a: ["Verde", "Amarillo", "Rojo"], correct: 2 },
    { q: "¿Qué debes hacer antes de cruzar la calle?", a: ["Correr", "Mirar a ambos lados", "Cerrar los ojos"], correct: 1 },
    { q: "¿Cuál es el color del semáforo que significa 'Precaución'?", a: ["Verde", "Amarillo", "Rojo"], correct: 1 },
    { q: "¿Dónde es seguro cruzar la calle?", a: ["En cualquier lugar", "En el paso peatonal", "Entre autos"], correct: 1 },
  ],
  
  // PRIMARIA - Intermedio
  "traffic-rules-medium": [
    { q: "¿Qué indica una señal triangular con borde rojo?", a: ["Prohibición", "Advertencia", "Información"], correct: 1 },
    { q: "¿Por dónde deben caminar los peatones en una carretera sin banqueta?", a: ["Por el lado derecho", "Por el centro", "Por el lado izquierdo"], correct: 2 },
    { q: "¿Qué significa una línea amarilla continua en el pavimento?", a: ["Puedes estacionar", "No rebasar", "Zona escolar"], correct: 1 },
    { q: "¿A qué distancia mínima de una esquina puedes estacionarte?", a: ["2 metros", "5 metros", "10 metros"], correct: 1 },
    { q: "¿Qué debe usar un ciclista por la noche?", a: ["Ropa oscura", "Luces y reflectores", "Nada especial"], correct: 1 },
    { q: "¿Qué indica una señal redonda con fondo azul?", a: ["Prohibición", "Obligación", "Advertencia"], correct: 1 },
    { q: "¿Cuándo debe encenderse las luces del vehículo?", a: ["Solo de noche", "En lluvia y niebla también", "Nunca"], correct: 1 },
    { q: "¿Qué significa un semáforo intermitente en amarillo?", a: ["Alto total", "Avanzar con precaución", "Vía libre"], correct: 1 },
    { q: "¿Dónde NO debes cruzar la calle?", a: ["En el paso peatonal", "Entre vehículos estacionados", "En el semáforo"], correct: 1 },
    { q: "¿Qué deben hacer los peatones en un semáforo en rojo?", a: ["Cruzar corriendo", "Esperar en la acera", "Cruzar despacio"], correct: 1 },
  ],
  
  // SECUNDARIA - Avanzado
  "cycling-signs-hard": [
    { q: "¿Cuál es la distancia mínima de seguridad entre un auto y un ciclista?", a: ["50 cm", "1 metro", "1.5 metros"], correct: 2 },
    { q: "¿Qué equipamiento es obligatorio para un ciclista urbano?", a: ["Solo casco", "Casco, luces y reflectores", "Solo luces"], correct: 1 },
    { q: "¿Por dónde debe circular un ciclista en una calle sin ciclovía?", a: ["En la acera", "Por el centro del carril", "Por el lado derecho"], correct: 2 },
    { q: "¿Qué señal manual indica un giro a la izquierda en bicicleta?", a: ["Brazo derecho extendido", "Brazo izquierdo extendido", "Ambos brazos"], correct: 1 },
    { q: "¿Está permitido usar audífonos mientras se conduce una bicicleta?", a: ["Sí, siempre", "No, nunca", "Solo con bajo volumen"], correct: 1 },
    { q: "¿Qué debe hacer un ciclista al aproximarse a un cruce sin señalización?", a: ["Acelerar", "Ceder el paso", "Hacer sonar la bocina"], correct: 1 },
    { q: "¿Cuántos ciclistas pueden ir en fila en una vía urbana?", a: ["Solo uno", "Máximo dos", "Los que quepan"], correct: 1 },
    { q: "¿Qué indica una señal de ciclovía compartida?", a: ["Solo bicicletas", "Peatones y ciclistas", "Autos y bicicletas"], correct: 1 },
    { q: "¿A qué velocidad máxima debe circular una bicicleta en zona urbana?", a: ["20 km/h", "30 km/h", "40 km/h"], correct: 1 },
    { q: "¿Qué debe hacer un ciclista antes de cambiar de carril?", a: ["Solo voltear", "Señalizar y verificar", "Cambiar rápido"], correct: 1 },
  ],
  
  // BACHILLERATO - Experto
  "traffic-laws-expert": [
    { q: "¿Cuál es el límite de alcohol en sangre permitido para conductores en México?", a: ["0.08%", "0.04%", "0.00%"], correct: 0 },
    { q: "¿Qué documento NO es obligatorio portar al conducir?", a: ["Licencia", "Tarjeta de circulación", "Acta de nacimiento"], correct: 2 },
    { q: "¿Cuántos puntos de la licencia se pierden por conducir en estado de ebriedad?", a: ["4 puntos", "6 puntos", "8 puntos"], correct: 2 },
    { q: "¿Qué indica una línea blanca discontinua?", a: ["No rebasar", "Cambio de carril permitido", "Carril exclusivo"], correct: 1 },
    { q: "¿Cuál es la distancia mínima para estacionarse de una boca de incendio?", a: ["3 metros", "5 metros", "10 metros"], correct: 1 },
    { q: "¿Qué es el 'punto ciego' de un vehículo?", a: ["Zona sin espejos", "Área no visible en retrovisores", "Cristal trasero"], correct: 1 },
    { q: "¿Cada cuánto tiempo debe renovarse la licencia tipo A?", a: ["2 años", "3 años", "5 años"], correct: 1 },
    { q: "¿Qué significa ABS en un vehículo?", a: ["Sistema de frenos antibloqueo", "Airbag", "Control de tracción"], correct: 0 },
    { q: "¿Cuál es la velocidad máxima en zona escolar?", a: ["20 km/h", "30 km/h", "40 km/h"], correct: 0 },
    { q: "¿Qué debe hacer al ver una ambulancia con sirena?", a: ["Acelerar", "Orillarse a la derecha", "Continuar normal"], correct: 1 },
    { q: "¿Qué es el aquaplaning?", a: ["Perder tracción por agua", "Patinar en hielo", "Frenar bruscamente"], correct: 0 },
    { q: "¿Cuándo es obligatorio el uso de cinturón en asientos traseros?", a: ["Nunca", "Solo en carretera", "Siempre"], correct: 2 },
    { q: "¿Qué indica una señal SR-6?", a: ["Ceda el paso", "Alto", "No circular"], correct: 0 },
    { q: "¿Cuál es la distancia de seguimiento segura en carretera?", a: ["2 segundos", "3 segundos", "5 segundos"], correct: 1 },
    { q: "¿Qué es el ESP en un vehículo?", a: ["Control de estabilidad", "Sistema eléctrico", "Aire acondicionado"], correct: 0 },
  ],
  
  "emergency-expert": [
    { q: "¿Qué hacer en caso de reventón de llanta a alta velocidad?", a: ["Frenar fuerte", "Soltar acelerador gradualmente", "Girar el volante"], correct: 1 },
    { q: "¿Cuál es el orden de atención en un accidente (Protocolo PAS)?", a: ["Avisar, Proteger, Socorrer", "Proteger, Avisar, Socorrer", "Socorrer, Proteger, Avisar"], correct: 1 },
    { q: "¿Qué es el triángulo de seguridad?", a: ["Señal preventiva", "Símbolo de emergencia", "Advertencia de peligro"], correct: 0 },
    { q: "¿A qué distancia se coloca el triángulo en carretera?", a: ["30 metros", "50 metros", "100 metros"], correct: 2 },
    { q: "¿Qué hacer si se enciende la luz de aceite del motor?", a: ["Continuar hasta taller", "Detenerse inmediatamente", "Acelerar"], correct: 1 },
    { q: "¿Cuál es el primer paso al presenciar un accidente?", a: ["Tomar fotos", "Asegurar la zona", "Llamar a la aseguradora"], correct: 1 },
    { q: "¿Qué es el shock por accidente?", a: ["Estado de confusión", "Circulación insuficiente", "Dolor extremo"], correct: 1 },
    { q: "¿Cómo actuar ante un incendio del motor?", a: ["Abrir el cofre", "Usar extintor ABC", "Echar agua"], correct: 1 },
    { q: "¿Qué hacer si tu vehículo cae al agua?", a: ["Abrir ventanas inmediatamente", "Esperar a que se llene", "Llamar por teléfono"], correct: 1 },
    { q: "¿Cuál es el número de emergencias en México?", a: ["066", "911", "089"], correct: 1 },
  ]
};

const QuizGame = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Array<{ q: string; a: string[]; correct: number }>>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoute();
  }, [routeId]);

  const loadRoute = async () => {
    const { data: route } = await supabase
      .from("routes")
      .select("*, courses(education_level)")
      .eq("id", routeId)
      .single();

    if (route && route.game_config) {
      const theme = (route.game_config as any).theme || "basic-signs-easy";
      const availableQuestions = questionsByTheme[theme] || questionsByTheme["basic-signs-easy"];
      const numQuestions = Math.min((route.game_config as any).questions || 5, availableQuestions.length);
      
      // Seleccionar preguntas aleatorias
      const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, numQuestions));
    }
    setLoading(false);
  };

  const handleAnswer = async (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === questions[currentQ].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(async () => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100);
        const timeSpent = (Date.now() - startTime) / 1000;
        const avgTime = timeSpent / questions.length;
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
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
            best_accuracy_percentage: Math.max(finalScore, existing?.best_accuracy_percentage || 0),
            last_accuracy_percentage: finalScore,
            avg_response_time: avgTime,
            attempts: (existing?.attempts || 0) + 1,
            last_attempt_date: new Date().toISOString(),
            completion_date: new Date().toISOString(),
          });
        }
        
        toast.success(`¡Completado! Puntuación: ${finalScore}%`);
        setTimeout(() => navigate(-1), 2000);
      }
    }, 1500);
  };

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Cargando quiz...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-6 flex items-center justify-center">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <CardTitle className="text-2xl md:text-3xl">Quiz de Seguridad Vial</CardTitle>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {currentQ + 1} / {questions.length}
            </Badge>
          </div>
          <Progress value={((currentQ + 1) / questions.length) * 100} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Aciertos: {score}</span>
            <span>Precisión: {Math.round((score / (currentQ + 1)) * 100)}%</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">{questions[currentQ].q}</h2>
          </div>
          
          <div className="space-y-3">
            {questions[currentQ].a.map((answer, i) => {
              const isCorrect = i === questions[currentQ].correct;
              const isSelected = i === selectedAnswer;
              
              return (
                <Button
                  key={i}
                  variant={showFeedback ? (isCorrect ? "default" : isSelected ? "destructive" : "outline") : "outline"}
                  className={`w-full text-left justify-start h-auto py-4 px-6 text-base md:text-lg relative transition-all ${
                    !showFeedback ? "hover:scale-[1.02]" : ""
                  }`}
                  onClick={() => handleAnswer(i)}
                  disabled={showFeedback}
                >
                  <span className="flex-1">{answer}</span>
                  {showFeedback && isCorrect && (
                    <CheckCircle className="h-6 w-6 ml-2 text-primary-foreground" />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <XCircle className="h-6 w-6 ml-2" />
                  )}
                </Button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === questions[currentQ].correct
                ? "bg-primary/10 border-primary"
                : "bg-destructive/10 border-destructive"
            }`}>
              <p className="font-semibold text-center">
                {selectedAnswer === questions[currentQ].correct
                  ? "¡Excelente! Respuesta correcta 🎉"
                  : `La respuesta correcta es: ${questions[currentQ].a[questions[currentQ].correct]}`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, XCircle, Trophy, Target, TrendingUp, 
  Award, Play, RotateCcw, ArrowRight, BookOpen,
  Clock, Brain, AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
// Preguntas ampliadas para bachillerato (50 preguntas)
const bachilleratoQuestions = [
  // Sección: Alcohol y Sustancias
  { q: "¿Cuál es el límite de alcohol en sangre permitido para conductores?", a: ["0.08%", "0.04%", "0.00%"], correct: 0, category: "alcohol" },
  { q: "¿Cuántos puntos de la licencia se pierden por conducir en estado de ebriedad?", a: ["4 puntos", "6 puntos", "8 puntos"], correct: 2, category: "alcohol" },

  // Sección: Documentación
  { q: "¿Qué documento NO es obligatorio portar al conducir?", a: ["Licencia", "Tarjeta de circulación", "Acta de nacimiento"], correct: 2, category: "documentos" },
  { q: "¿Cada cuánto tiempo debe renovarse la licencia tipo A?", a: ["2 años", "3 años", "5 años"], correct: 1, category: "documentos" },

  // Sección: Señalización
  { q: "¿Qué indica una línea blanca discontinua?", a: ["No rebasar", "Cambio de carril permitido", "Carril exclusivo"], correct: 1, category: "señales" },
  { q: "¿Qué indica una señal SR-6?", a: ["Ceda el paso", "Alto", "No circular"], correct: 0, category: "señales" },

  // Sección: Estacionamiento
  { q: "¿Cuál es la distancia mínima para estacionarse de una boca de incendio?", a: ["3 metros", "5 metros", "10 metros"], correct: 1, category: "estacionamiento" },
  { q: "¿A qué distancia de una esquina no se puede estacionar?", a: ["3 metros", "5 metros", "7 metros"], correct: 1, category: "estacionamiento" },

  // Sección: Velocidad
  { q: "¿Cuál es la velocidad máxima en zona escolar?", a: ["20 km/h", "30 km/h", "40 km/h"], correct: 0, category: "velocidad" },
  { q: "¿Cuál es la velocidad máxima en zona residencial?", a: ["30 km/h", "40 km/h", "50 km/h"], correct: 1, category: "velocidad" },

  // Sección: Seguridad
  { q: "¿Qué es el 'punto ciego' de un vehículo?", a: ["Zona sin espejos", "Área no visible en retrovisores", "Cristal trasero"], correct: 1, category: "seguridad" },
  { q: "¿Cuándo es obligatorio el uso de cinturón en asientos traseros?", a: ["Nunca", "Solo en carretera", "Siempre"], correct: 2, category: "seguridad" },

  // Sección: Tecnología del Vehículo
  { q: "¿Qué significa ABS en un vehículo?", a: ["Sistema de frenos antibloqueo", "Airbag", "Control de tracción"], correct: 0, category: "tecnologia" },
  { q: "¿Qué es el ESP en un vehículo?", a: ["Control de estabilidad", "Sistema eléctrico", "Aire acondicionado"], correct: 0, category: "tecnologia" },

  // Sección: Emergencias
  { q: "¿Qué debe hacer al ver una ambulancia con sirena?", a: ["Acelerar", "Orillarse a la derecha", "Continuar normal"], correct: 1, category: "emergencias" },
  { q: "¿Qué es el aquaplaning?", a: ["Perder tracción por agua", "Patinar en hielo", "Frenar bruscamente"], correct: 0, category: "emergencias" },

  // Sección: Primeros Auxilios
  { q: "¿Cuál es el orden de atención en un accidente (Protocolo PAS)?", a: ["Avisar, Proteger, Socorrer", "Proteger, Avisar, Socorrer", "Socorrer, Proteger, Avisar"], correct: 1, category: "auxilios" },
  { q: "¿Cuál es el primer paso al presenciar un accidente?", a: ["Tomar fotos", "Asegurar la zona", "Llamar a la aseguradora"], correct: 1, category: "auxilios" },

  // Sección: Distancias y Maniobras
  { q: "¿Cuál es la distancia de seguimiento segura en carretera?", a: ["2 segundos", "3 segundos", "5 segundos"], correct: 1, category: "distancias" },
  { q: "¿A qué distancia se deben usar las luces altas?", a: ["100 metros", "150 metros", "200 metros"], correct: 2, category: "distancias" },
];

const QuizBachillerato = () => {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  
  // Estados del juego
  const [gameState, setGameState] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const initializeQuiz = async () => {
      try {

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          console.error('Error de autenticación:', authError);
          navigate('/auth');
          return;
        }
        setStudentId(user.id);


      

        if (routeId) {

          const { data: routeData, error: routeError } = await supabase
            .from('routes')
            .select('course_id')
            .eq('id', routeId)
            .single();
          
          if (routeError) {
            console.error('Error obteniendo ruta:', routeError);
            return;
          }
          
          if (routeData) {
            setCourseId(routeData.course_id);
          }
  
       
       
        }
      } catch (error) {
        console.error("Error al inicializar:", error);
      }
    };

    initializeQuiz();
  }, [routeId, navigate]);

  const handleAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === bachilleratoQuestions[currentQ].correct;
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      if (currentQ < bachilleratoQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGameState("result");
      }
    }, 2000);
  };

  const calculateAccuracy = () => {
    return Math.round((correctAnswers / bachilleratoQuestions.length) * 100);
  };

  const getPerformanceLevel = () => {
    const accuracy = calculateAccuracy();
    if (accuracy >= 90) return { level: "Excelente", color: "text-green-600", bg: "bg-green-50", emoji: "🏆" };
    if (accuracy >= 75) return { level: "Muy Bien", color: "text-blue-600", bg: "bg-blue-50", emoji: "🎯" };
    if (accuracy >= 60) return { level: "Bien", color: "text-yellow-600", bg: "bg-yellow-50", emoji: "👍" };
    return { level: "Necesita Práctica", color: "text-orange-600", bg: "bg-orange-50", emoji: "📚" };
  };
  const handleComplete = async () => {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 70;

    if (!passed) {
      alert("Necesitas al menos 70% de precisión para aprobar");
      setTimeout(() => restartQuiz(), 1500);
      return;
    }

    try {
      const timeSpent = (Date.now() - startTime) / 1000;
      const avgTime = timeSpent / bachilleratoQuestions.length;

      // Obtener progreso existente de forma segura
      const { data: existing, error: getError } = await supabase
        .from("student_progress")
        .select("*")
        .eq("student_id", studentId)
        .eq("route_id", routeId)
        .maybeSingle(); // No falla si no existe

      if (getError) console.error("Error al obtener progreso existente:", getError);

      // Preparar datos a guardar
      const progressData = {
        student_id: studentId,
        route_id: routeId,
        completed: true,
        score: score,
        best_accuracy_percentage: existing?.best_accuracy_percentage
          ? Math.max(accuracy, existing.best_accuracy_percentage)
          : accuracy,

      };

      // Guardar progreso con upsert
      const { data, error: upsertError } = await supabase
        .from("student_progress")
        .upsert(progressData, {
          onConflict: ['student_id', 'route_id'], // array, no string
        });

      if (upsertError) {
        console.error("Error guardando progreso:", upsertError);
        alert("Hubo un error guardando tu progreso. Intenta de nuevo.");
        return;
      }

      console.log("Progreso guardado:", data);

    } catch (error) {
      console.error("Error inesperado:", error);
      alert("Ocurrió un error inesperado. Intenta de nuevo.");
    }
  };
  const startQuiz = () => {
    setGameState("playing");
  };

  const restartQuiz = () => {
    setGameState("intro");
    setCurrentQ(0);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const currentQuestion = bachilleratoQuestions[currentQ];
  const progress = ((currentQ + 1) / bachilleratoQuestions.length) * 100;
  const accuracy = calculateAccuracy();
  const passed = accuracy >= 70;


  if (gameState === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12 rounded-t-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <BookOpen className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                Examen de Bachillerato
              </h1>
              <p className="text-xl text-center text-blue-100">
                Evaluación Completa de Conocimientos Viales
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  📋 Información del Examen
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <Target className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Preguntas Totales</h3>
                      <p className="text-sm text-gray-600">{bachilleratoQuestions.length} preguntas de opción múltiple</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Puntaje Mínimo</h3>
                      <p className="text-sm text-gray-600">70% de precisión para aprobar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <Brain className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Temas Cubiertos</h3>
                      <p className="text-sm text-gray-600">Señalización, seguridad, emergencias y más</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <Clock className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Tiempo Promedio</h3>
                      <p className="text-sm text-gray-600">2 segundos por pregunta recomendados</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Instrucciones Importantes
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Lee cada pregunta cuidadosamente antes de responder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Una vez seleccionada, tu respuesta no se puede cambiar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Verás la respuesta correcta después de cada pregunta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Tu progreso se guardará al completar el examen con 70% o más</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={startQuiz}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
              >
                <Play className="w-6 h-6 mr-2" />
                Comenzar Examen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de juego
  if (gameState === "playing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                <Target className="w-5 h-5 mr-2" />
                Pregunta {currentQ + 1}/{bachilleratoQuestions.length}
              </Badge>
              <div className="flex gap-3">
                <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                  {correctAnswers} correctas
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {Math.round((correctAnswers / (currentQ + 1)) * 100)}%
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Pregunta */}
          <Card className="mb-6 shadow-xl">
            <CardContent className="p-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <Badge className="mb-4" variant="secondary">
                  {currentQuestion.category}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {currentQuestion.q}
                </h2>
              </div>

              {/* Opciones */}
              <div className="space-y-4">
                {currentQuestion.a.map((answer, i) => {
                  const isCorrect = i === currentQuestion.correct;
                  const isSelected = i === selectedAnswer;
                  
                  let buttonClass = "outline";
                  if (showFeedback) {
                    if (isCorrect) buttonClass = "default";
                    else if (isSelected) buttonClass = "destructive";
                  }

                  return (
                    <Button
                      key={i}
                      variant={buttonClass as any}
                      className="w-full text-left justify-start py-6 px-6 text-lg h-auto"
                      onClick={() => handleAnswer(i)}
                      disabled={showFeedback}
                    >
                      <span className="flex-1">{answer}</span>
                      {showFeedback && isCorrect && (
                        <CheckCircle className="ml-2 h-6 w-6 text-white flex-shrink-0" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="ml-2 h-6 w-6 flex-shrink-0" />
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`p-6 rounded-xl border-3 mt-6 ${
                  selectedAnswer === currentQuestion.correct 
                    ? "bg-green-50 border-green-500" 
                    : "bg-red-50 border-red-500"
                }`}>
                  <div className="flex items-center gap-3">
                    {selectedAnswer === currentQuestion.correct ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-xl font-bold text-green-800">¡Correcto! 🎉</p>
                          <p className="text-green-700">Excelente conocimiento</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                        <div>
                          <p className="text-xl font-bold text-red-800">Incorrecto</p>
                          <p className="text-red-700">
                            La respuesta correcta es: <span className="font-semibold">{currentQuestion.a[currentQuestion.correct]}</span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (gameState === "result") {
    const performance = getPerformanceLevel();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className={`${
              passed 
                ? "bg-gradient-to-r from-green-600 to-emerald-700" 
                : "bg-gradient-to-r from-orange-500 to-red-600"
            } text-white p-8 md:p-12 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-7xl mb-4">
                  {passed ? "🎓" : "📚"}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {passed ? "¡Aprobado!" : "No Aprobado"}
                </h1>
                <p className="text-xl text-white/90">
                  {passed 
                    ? "Has demostrado excelente conocimiento vial" 
                    : "Repasa los temas y vuelve a intentarlo"}
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
                  <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-blue-600 mb-1">{score}</div>
                  <div className="text-sm text-gray-600">Respuestas Correctas</div>
                  <div className="text-xs text-gray-500 mt-1">de {bachilleratoQuestions.length}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-green-600 mb-1">{accuracy}%</div>
                  <div className="text-sm text-gray-600">Precisión</div>
                  <div className="text-xs text-gray-500 mt-1">mínimo 70%</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
                  <Clock className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-purple-600 mb-1">
                    {Math.round((Date.now() - startTime) / 1000 / 60)}
                  </div>
                  <div className="text-sm text-gray-600">Minutos</div>
                  <div className="text-xs text-gray-500 mt-1">tiempo total</div>
                </div>
              </div>

              <div className={`${performance.bg} border-3 rounded-xl p-6 mb-8 shadow-lg`}>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{performance.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      Desempeño: {performance.level}
                    </h3>
                    <p className="text-gray-600">
                      {passed 
                        ? "¡Felicidades! Estás listo para obtener tu licencia de conducir. Tus conocimientos sobre seguridad vial son sólidos." 
                        : "Te recomendamos repasar los temas donde tuviste dificultades. La seguridad vial es fundamental para todos."}
                    </p>
                  </div>
                </div>
              </div>

              {!passed && (
                <div className="mb-6 p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Áreas de Mejora
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Revisa especialmente los temas de señalización, emergencias y primeros auxilios. 
                    Estos son fundamentales para tu seguridad y la de los demás.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={restartQuiz}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reintentar Examen
                </Button>
                {passed && (
                  <Button 
                    onClick={handleComplete}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Guardar y Continuar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>

              {passed && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-center text-sm text-gray-700">
                    ✅ Tu progreso será guardado automáticamente al continuar
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default QuizBachillerato;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  UserRound, Car, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Trophy, Target, TrendingUp, Award, AlertTriangle, Play, Info 
} from 'lucide-react';

const TrafficSignsAplicacion = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');

  // Situaciones de cruce de calle
  const crossingSituations = [
    {
      id: 1,
      title: 'Semáforo Peatonal en Verde',
      scenario: 'Estás en la esquina esperando para cruzar. El semáforo peatonal muestra la luz verde.',
      trafficLight: 'green',
      carsComing: false,
      zebraCrossing: true,
      correctAction: 'cross',
      explanation: 'Cuando el semáforo peatonal está en verde Y no vienen autos, es seguro cruzar. Siempre verifica que los autos se hayan detenido antes de cruzar.',
      safetyTip: 'Mira a ambos lados incluso con luz verde'
    },
    {
      id: 2,
      title: 'Semáforo Peatonal en Rojo',
      scenario: 'Llegas a la esquina y el semáforo peatonal muestra la luz roja.',
      trafficLight: 'red',
      carsComing: true,
      zebraCrossing: true,
      correctAction: 'wait',
      explanation: 'Con el semáforo en rojo, NUNCA debes cruzar. Los autos tienen el paso y es muy peligroso.',
      safetyTip: 'Rojo significa ALTO - espera pacientemente'
    },
    {
      id: 3,
      title: 'Sin Semáforo pero con Paso de Cebra',
      scenario: 'Estás frente a un paso de cebra pero no hay semáforo. No ves autos cerca.',
      trafficLight: 'none',
      carsComing: false,
      zebraCrossing: true,
      correctAction: 'cross',
      explanation: 'En un paso de cebra sin semáforo, cuando NO vienen autos, puedes cruzar con cuidado. Los peatones tienen prioridad en el paso de cebra.',
      safetyTip: 'Levanta la mano para ser más visible'
    },
    {
      id: 4,
      title: 'Autos Acercándose',
      scenario: 'El semáforo peatonal está en verde, pero ves autos que vienen rápido y no parecen estar frenando.',
      trafficLight: 'green',
      carsComing: true,
      zebraCrossing: true,
      correctAction: 'wait',
      explanation: 'Aunque tengas luz verde, si los autos no se detienen, ESPERA. Tu seguridad es lo primero. Espera a que los conductores te vean y frenen completamente.',
      safetyTip: 'Contacto visual con el conductor es importante'
    },
    {
      id: 5,
      title: 'Semáforo Peatonal Parpadeando',
      scenario: 'Estás a punto de cruzar y el semáforo peatonal comienza a parpadear.',
      trafficLight: 'yellow',
      carsComing: false,
      zebraCrossing: true,
      correctAction: 'wait',
      explanation: 'Cuando el semáforo parpadea, significa que va a cambiar a rojo pronto. NO inicies el cruce. Si ya estás cruzando, camina rápido pero sin correr.',
      safetyTip: 'Parpadeando = No inicies el cruce'
    },
    {
      id: 6,
      title: 'Calle sin Paso de Cebra',
      scenario: 'Necesitas cruzar una calle pero no hay paso de cebra ni semáforo en esta área.',
      trafficLight: 'none',
      carsComing: false,
      zebraCrossing: false,
      correctAction: 'wait',
      explanation: 'SIN paso de cebra, es peligroso cruzar. Debes buscar el paso de cebra más cercano o una esquina con semáforo. Nunca cruces por lugares no autorizados.',
      safetyTip: 'Siempre busca el paso de cebra designado'
    },
    {
      id: 7,
      title: 'Luz Verde pero Lloviendo',
      scenario: 'El semáforo está en verde, no vienen autos, pero está lloviendo y el piso está mojado.',
      trafficLight: 'green',
      carsComing: false,
      zebraCrossing: true,
      correctAction: 'cross',
      explanation: 'Puedes cruzar, pero con EXTRA cuidado. Con lluvia, los autos tardan más en frenar y tu visibilidad es menor. Cruza atento y sin correr para no resbalar.',
      safetyTip: 'Con lluvia, camina más lento y cuidadoso'
    },
    {
      id: 8,
      title: 'Multitud Cruzando',
      scenario: 'El semáforo está en verde y hay mucha gente cruzando la calle al mismo tiempo.',
      trafficLight: 'green',
      carsComing: false,
      zebraCrossing: true,
      correctAction: 'cross',
      explanation: 'Es seguro cruzar con el grupo, pero mantén tu atención. No te distraigas con tu celular o hablando. Mantente alerta hasta llegar al otro lado.',
      safetyTip: 'En grupo, no te distraigas - sigue atento'
    }
  ];

  const [currentSituation, setCurrentSituation] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('intro');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          toast.error('Debes iniciar sesión');
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
            toast.error('Error al cargar la información del curso');
            return;
          }

          if (routeData) {
            setCourseId(routeData.course_id);
          }
        }
      } catch (error) {
        console.error('Error en inicialización:', error);
        toast.error('Error al inicializar el juego');
        navigate('/courses');
      }
    };

    initializeGame();
  }, [navigate, routeId]);

  const handleAction = (action: 'cross' | 'wait') => {
    const situation = crossingSituations[currentSituation];
    setSelectedAction(action);

    if (action === situation.correctAction) {
      const points = Math.floor(100 / crossingSituations.length);
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
      setFeedback({ type: 'correct', message: '¡Decisión Correcta!' });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: action === 'cross' ? '¡Peligro! No era seguro cruzar' : 'Era seguro cruzar en esta situación'
      });
    }

    setShowExplanation(true);
  };

  const nextSituation = () => {
    if (currentSituation < crossingSituations.length - 1) {
      setCurrentSituation(currentSituation + 1);
      setSelectedAction(null);
      setFeedback(null);
      setShowExplanation(false);
    } else {
      setGameState('result');
    }
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentSituation(0);
    setScore(0);
    setSelectedAction(null);
    setFeedback(null);
    setCorrectAnswers(0);
    setShowExplanation(false);
  };

  const restartGame = () => {
    setGameState('intro');
    setCurrentSituation(0);
    setScore(0);
    setSelectedAction(null);
    setFeedback(null);
    setCorrectAnswers(0);
    setShowExplanation(false);
  };

  const calculateAccuracy = () => {
    return crossingSituations.length > 0 ? Math.round((correctAnswers / crossingSituations.length) * 100) : 0;
  };

  const getPerformanceLevel = () => {
    const accuracy = calculateAccuracy();
    if (accuracy >= 90) return { level: 'Excelente', color: 'text-green-600', bg: 'bg-green-50' };
    if (accuracy >= 75) return { level: 'Muy Bien', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (accuracy >= 60) return { level: 'Bien', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Necesita Práctica', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const handleComplete = async () => {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 70;

    if (!passed) {
      toast.warning('Necesitas al menos 70% de precisión para aprobar');
      setTimeout(() => restartGame(), 1500);
      return;
    }

    try {
      const { error } = await supabase
        .from('student_progress')
        .upsert({
          student_id: studentId,
          route_id: routeId,
          score: score,
          completed: true,
          best_accuracy_percentage: accuracy,
          completion_date: new Date().toISOString()
        }, {
          onConflict: 'student_id,route_id'
        });
      
      if (error) throw error;
      
      toast.success('¡Progreso guardado exitosamente!');
      
      if (courseId) {
        navigate(`/student/course/${courseId}`);
      } else {
        navigate('/courses');
      }
    } catch (error) {
      console.error('Error guardando progreso:', error);
      toast.error('Error al guardar el progreso');
    }
  };

  const accuracy = calculateAccuracy();
  const passed = accuracy >= 70;

  const getTrafficLightColor = (light: string) => {
    switch (light) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500 animate-pulse';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  // Pantalla de introducción
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 md:p-12 rounded-t-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <UserRound className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                Práctica de Cruce Seguro
              </h1>
              <p className="text-xl text-center text-purple-100">
                Nivel: Aplicación
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ¿Qué aprenderás?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Cuándo Cruzar</h3>
                      <p className="text-sm text-gray-600">Identificar el momento seguro para cruzar la calle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Cuándo Esperar</h3>
                      <p className="text-sm text-gray-600">Reconocer situaciones peligrosas y esperar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Leer Semáforos</h3>
                      <p className="text-sm text-gray-600">Entender las luces del semáforo peatonal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Estar Alerta</h3>
                      <p className="text-sm text-gray-600">Identificar peligros y tomar decisiones seguras</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Instrucciones
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Observa cada situación cuidadosamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Decide si es seguro CRUZAR o debes ESPERAR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Aprende de cada explicación para mejorar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Necesitas 70% de decisiones correctas para aprobar</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={startGame}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
              >
                <Play className="w-6 h-6 mr-2" />
                Comenzar Práctica
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de juego
  if (gameState === 'playing') {
    const situation = crossingSituations[currentSituation];
    const progress = ((currentSituation + 1) / crossingSituations.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                  <UserRound className="w-5 h-5 mr-2" />
                  Situación {currentSituation + 1}/{crossingSituations.length}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                  {score} puntos
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Situación */}
          <Card className="mb-6 shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{situation.title}</h2>
                
                {/* Visualización de la situación */}
                <div className="bg-gradient-to-b from-sky-200 to-gray-300 rounded-2xl p-8 mb-6 relative overflow-hidden">
                  {/* Calle */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-700">
                    {/* Líneas de la calle */}
                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-around">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-16 h-2 bg-yellow-400"></div>
                      ))}
                    </div>
                  </div>

                  {/* Paso de cebra */}
                  {situation.zebraCrossing && (
                    <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-center justify-center">
                      <div className="w-32 h-full flex">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Semáforo */}
                  {situation.trafficLight !== 'none' && (
                    <div className="absolute left-8 top-8 bg-gray-800 rounded-lg p-3 shadow-xl">
                      <div className={`w-8 h-8 rounded-full mb-2 ${situation.trafficLight === 'red' ? getTrafficLightColor('red') : 'bg-gray-600'}`}></div>
                      <div className={`w-8 h-8 rounded-full mb-2 ${situation.trafficLight === 'yellow' ? getTrafficLightColor('yellow') : 'bg-gray-600'}`}></div>
                      <div className={`w-8 h-8 rounded-full ${situation.trafficLight === 'green' ? getTrafficLightColor('green') : 'bg-gray-600'}`}></div>
                    </div>
                  )}

                  {/* Peatón */}
                  <div className="absolute left-1/4 bottom-1/2 transform translate-y-1/2">
                    <div className="text-6xl">🧍</div>
                  </div>

                  {/* Autos */}
                  {situation.carsComing && (
                    <>
                      <div className="absolute right-1/4 bottom-1/4 text-5xl animate-pulse">
                        🚗
                      </div>
                      <div className="absolute right-1/3 bottom-1/3 text-4xl animate-pulse delay-100">
                        🚙
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
                  <p className="text-xl text-gray-800 font-medium">{situation.scenario}</p>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  ¿Qué debes hacer?
                </h3>
              </div>

              {/* Acciones */}
              {!feedback && (
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleAction('cross')}
                    className="p-8 rounded-xl border-3 bg-gradient-to-br from-green-50 to-emerald-100 border-green-500 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-green-500 rounded-full p-6">
                        <UserRound className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">CRUZAR</h3>
                      <p className="text-gray-600">Es seguro cruzar ahora</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAction('wait')}
                    className="p-8 rounded-xl border-3 bg-gradient-to-br from-red-50 to-orange-100 border-red-500 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-red-500 rounded-full p-6">
                        <AlertTriangle className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">ESPERAR</h3>
                      <p className="text-gray-600">Debo esperar por seguridad</p>
                    </div>
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feedback y Explicación */}
          {feedback && showExplanation && (
            <Card className={`mb-6 shadow-xl ${feedback.type === 'correct' ? 'border-4 border-green-500' : 'border-4 border-red-500'}`}>
              <CardContent className="p-8">
                <div className={`flex items-start gap-4 mb-6 ${feedback.type === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                  {feedback.type === 'correct' ? (
                    <CheckCircle2 className="w-16 h-16 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-16 h-16 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{feedback.message}</h3>
                    {feedback.type === 'incorrect' && (
                      <p className="text-xl">La decisión correcta era: <span className="font-bold">{situation.correctAction === 'cross' ? 'CRUZAR' : 'ESPERAR'}</span></p>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-4">
                  <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-600" />
                    ¿Por qué?
                  </h4>
                  <p className="text-lg text-gray-700 mb-4">
                    {situation.explanation}
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4">
                  <h5 className="font-bold text-gray-800 mb-2">💡 Consejo de Seguridad:</h5>
                  <p className="text-gray-700">{situation.safetyTip}</p>
                </div>

                <Button
                  onClick={nextSituation}
                  size="lg"
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  {currentSituation < crossingSituations.length - 1 ? 'Siguiente Situación' : 'Ver Resultados'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (gameState === 'result') {
    const performance = getPerformanceLevel();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className={`${passed ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white p-8 md:p-12 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-7xl mb-4">{passed ? '🎉' : '⚠️'}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {passed ? '¡Excelente Trabajo!' : '¡Sigue Aprendiendo!'}
                </h1>
                <p className="text-xl text-white/90">
                  {passed ? 'Sabes cuándo es seguro cruzar la calle' : 'Repasa las situaciones y practica más'}
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-blue-600 mb-1">{score}</div>
                  <div className="text-sm text-gray-600">Puntuación</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-green-600 mb-1">{accuracy}%</div>
                  <div className="text-sm text-gray-600">Precisión</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-purple-600 mb-1">{correctAnswers}/{crossingSituations.length}</div>
                  <div className="text-sm text-gray-600">Decisiones Correctas</div>
                </div>
              </div>

              <div className={`${performance.bg} border-2 rounded-xl p-6 mb-8`}>
                <div className="flex items-center gap-4">
                  <Award className={`w-12 h-12 ${performance.color}`} />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      Desempeño: {performance.level}
                    </h3>
                    <p className="text-gray-600">
                      {passed 
                        ? '¡Sabes cuándo es seguro cruzar la calle! Has demostrado responsabilidad peatonal.' 
                        : 'Necesitas repasar las reglas de cruce seguro. La práctica te ayudará a mejorar.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={restartGame}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Intentar de Nuevo
                </Button>
                {passed && (
                  <Button 
                    onClick={handleComplete}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default TrafficSignsAplicacion;
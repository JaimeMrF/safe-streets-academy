import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Info, Hand, Home } from 'lucide-react';

const CrossingStreetGame = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: string; message: string } | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: '¿Qué color es?',
      description: 'El semáforo tiene tres colores. ¿Cuál significa que puedes cruzar?',
      context: '¡Mira el semáforo! Tiene luces de colores que nos dicen cuándo cruzar.',
      image: '🚦',
      correctAnswer: {
        name: '🟢 Verde',
        emoji: '🟢',
        explanation: '¡Muy bien! El verde significa que puedes cruzar. Pero siempre mira a los lados primero.',
        tips: ['Verde = Camina', 'Rojo = Para', 'Amarillo = Espera']
      },
      options: [
        { name: '🔴 Rojo', emoji: '🔴', isCorrect: false },
        { name: '🟢 Verde', emoji: '🟢', isCorrect: true },
        { name: '🟡 Amarillo', emoji: '🟡', isCorrect: false }
      ]
    },
    {
      id: 2,
      title: 'Primer paso',
      description: '¿Qué debes hacer PRIMERO antes de cruzar la calle?',
      context: 'Llegaste a la calle. ¿Qué haces primero?',
      image: '🛑',
      correctAnswer: {
        name: '🛑 PARAR',
        emoji: '🛑',
        explanation: '¡Correcto! Primero debes PARAR antes de la acera. Nunca corras hacia la calle.',
        tips: ['Para en la acera', 'No corras', 'Quédate quieto']
      },
      options: [
        { name: '🏃 Correr', emoji: '🏃', isCorrect: false },
        { name: '🛑 PARAR', emoji: '🛑', isCorrect: true },
        { name: '👀 Cerrar los ojos', emoji: '👁️', isCorrect: false }
      ]
    },
    {
      id: 3,
      title: 'Las rayas blancas',
      description: '¿Por dónde debes cruzar la calle?',
      context: 'Ves unas rayas blancas en el piso que parecen una cebra.',
      image: '🦓',
      correctAnswer: {
        name: '🦓 Paso de Cebra',
        emoji: '🦓',
        explanation: '¡Excelente! El paso de cebra son rayas blancas donde es seguro cruzar.',
        tips: ['Busca las rayas blancas', 'Es el lugar más seguro', 'Los carros te ven mejor']
      },
      options: [
        { name: '🚗 Entre los carros', emoji: '🚗', isCorrect: false },
        { name: '🦓 Paso de Cebra', emoji: '🦓', isCorrect: true },
        { name: '🏃 Por cualquier lugar', emoji: '🏃', isCorrect: false }
      ]
    },
    {
      id: 4,
      title: '¿Con quién cruzo?',
      description: '¿Con quién SIEMPRE debes cruzar la calle?',
      context: 'Quieres cruzar la calle. ¿Quién debe ir contigo?',
      image: '👨‍👩‍👧',
      correctAnswer: {
        name: '👨‍👩‍👧 Con un adulto',
        emoji: '👨‍👩‍👧',
        explanation: '¡Perfecto! NUNCA cruces solo. Siempre toma la mano de mamá, papá u otro adulto.',
        tips: ['Nunca cruces solo', 'Toma la mano del adulto', 'Los adultos te protegen']
      },
      options: [
        { name: '🧒 Solo', emoji: '🧒', isCorrect: false },
        { name: '👨‍👩‍👧 Con un adulto', emoji: '👨‍👩‍👧', isCorrect: true },
        { name: '🐕 Con mi mascota', emoji: '🐕', isCorrect: false }
      ]
    },
    {
      id: 5,
      title: 'Antes de cruzar',
      description: 'Después de PARAR, ¿qué debes hacer?',
      context: 'Ya paraste. Ahora, ¿qué sigue?',
      image: '👀',
      correctAnswer: {
        name: '👀 MIRAR',
        emoji: '👀',
        explanation: '¡Bien hecho! Después de parar, debes MIRAR a la izquierda, derecha e izquierda otra vez.',
        tips: ['Mira a la izquierda', 'Mira a la derecha', 'Mira de nuevo']
      },
      options: [
        { name: '🏃 Correr rápido', emoji: '🏃', isCorrect: false },
        { name: '👀 MIRAR', emoji: '👀', isCorrect: true },
        { name: '📱 Ver el celular', emoji: '📱', isCorrect: false }
      ]
    }
  ];

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          toast.error('Debe iniciar sesión para continuar');
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
            console.error('Error obteniendo información de ruta:', routeError);
            toast.error('Error al cargar información del curso');
            return;
          }

          if (routeData) {
            setCourseId(routeData.course_id);
          }
        }
      } catch (error) {
        console.error('Error en inicialización:', error);
        toast.error('Error al inicializar juego');
        navigate('/courses');
      }
    };

    initializeGame();
  }, [navigate, routeId]);

  const handleAnswer = (option: { name: string; emoji: string; isCorrect: boolean }) => {
    const scenario = scenarios[currentScenario];
    setSelectedAnswer(option.name);

    if (option.isCorrect) {
      const points = Math.floor(100 / scenarios.length);
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
      setFeedback({ type: 'correct', message: '¡Muy bien! 🎉' });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: `Oops, intenta otra vez. La respuesta correcta es: ${scenario.correctAnswer.name}` 
      });
    }

    setShowExplanation(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setFeedback(null);
      setShowExplanation(false);
    } else {
      setGameState('result');
    }
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setCorrectAnswers(0);
    setShowExplanation(false);
  };

  const restartGame = () => {
    setGameState('intro');
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setCorrectAnswers(0);
    setShowExplanation(false);
  };

  const calculateAccuracy = () => {
    return scenarios.length > 0 ? Math.round((correctAnswers / scenarios.length) * 100) : 0;
  };

  const getPerformanceLevel = () => {
    const accuracy = calculateAccuracy();
    if (accuracy >= 90) return { level: '¡Eres un Experto!', color: 'text-green-600', bg: 'bg-green-50', emoji: '⭐' };
    if (accuracy >= 70) return { level: '¡Muy Bien!', color: 'text-blue-600', bg: 'bg-blue-50', emoji: '👍' };
    if (accuracy >= 50) return { level: '¡Sigue Practicando!', color: 'text-yellow-600', bg: 'bg-yellow-50', emoji: '💪' };
    return { level: 'Inténtalo de Nuevo', color: 'text-orange-600', bg: 'bg-orange-50', emoji: '📚' };
  };

  const handleComplete = async () => {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 60;

    try {
      const { error: progressError } = await supabase
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
      
      if (progressError) throw progressError;
      
      toast.success(passed ? '¡Nivel completado!' : '¡Buen trabajo!');
      
      if (courseId) {
        navigate(`/student/course/${courseId}`);
      } else {
        navigate('/courses');
      }
    } catch (error) {
      console.error('Error al registrar progreso:', error);
      toast.error('Error al guardar progreso');
    }
  };

  const goToCourses = () => {
    if (courseId) {
      navigate(`/student/course/${courseId}`);
    } else {
      navigate('/courses');
    }
  };

  const accuracy = calculateAccuracy();
  const passed = accuracy >= 60;

  // Pantalla de introducción
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 md:p-12 rounded-t-lg relative">
              <button
                onClick={goToCourses}
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Volver</span>
              </button>

              <div className="text-center">
                <div className="text-8xl mb-4">🚦</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  ¡Aprende a Cruzar la Calle!
                </h1>
                <p className="text-xl text-blue-100">
                  Preescolar
                </p>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  ¿Qué vas a aprender?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="text-5xl">🚦</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Los Colores del Semáforo</h3>
                      <p className="text-sm text-gray-600">Rojo, amarillo y verde</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <div className="text-5xl">🛑</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">PARA, MIRA, ESCUCHA</h3>
                      <p className="text-sm text-gray-600">Los tres pasos mágicos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                    <div className="text-5xl">🦓</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">El Paso de Cebra</h3>
                      <p className="text-sm text-gray-600">Las rayas blancas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <div className="text-5xl">👨‍👩‍👧</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Siempre con Adultos</h3>
                      <p className="text-sm text-gray-600">Nunca cruces solo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                  <Info className="w-6 h-6 text-yellow-600" />
                  ¿Cómo jugar?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">1️⃣</span>
                    <span className="text-lg">Lee cada pregunta con atención</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">2️⃣</span>
                    <span className="text-lg">Elige la respuesta que crees correcta</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">3️⃣</span>
                    <span className="text-lg">Aprende consejos de seguridad</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={startGame}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xl py-8 text-white"
              >
                <Hand className="w-8 h-8 mr-3" />
                ¡Empezar a Jugar!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de juego
  if (gameState === 'playing') {
    const scenario = scenarios[currentScenario];
    const progress = ((currentScenario + 1) / scenarios.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <Badge variant="outline" className="px-6 py-3 text-xl bg-white border-2">
                Pregunta {currentScenario + 1} de {scenarios.length}
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-xl bg-white border-2">
                <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
                {score} puntos
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Escenario */}
          <Card className="mb-6 shadow-xl border-4 border-purple-200">
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <div className="text-9xl mb-6">{scenario.image}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{scenario.title}</h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                  <p className="text-xl text-gray-700 italic">"{scenario.context}"</p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800">
                  {scenario.description}
                </h3>
              </div>

              {/* Opciones */}
              <div className="grid md:grid-cols-3 gap-6">
                {scenario.options.map((option, index) => {
                  const isSelected = selectedAnswer === option.name;
                  const isCorrect = option.isCorrect && isSelected;
                  const isWrong = !option.isCorrect && isSelected;

                  return (
                    <button
                      key={index}
                      onClick={() => !feedback && handleAnswer(option)}
                      disabled={!!feedback}
                      className={`
                        p-8 rounded-3xl border-4 transition-all transform hover:scale-105
                        ${!feedback ? 'bg-white hover:border-blue-500 hover:shadow-2xl' : ''}
                        ${isCorrect ? 'bg-green-100 border-green-500 shadow-2xl scale-105' : ''}
                        ${isWrong ? 'bg-red-100 border-red-500' : ''}
                        ${!isSelected && feedback ? 'opacity-50' : ''}
                      `}
                    >
                      <div className="text-8xl mb-4">{option.emoji}</div>
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="font-bold text-2xl text-gray-800">{option.name}</h3>
                        {isCorrect && <CheckCircle2 className="w-10 h-10 text-green-600" />}
                        {isWrong && <XCircle className="w-10 h-10 text-red-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Feedback y Explicación */}
          {feedback && (
            <Card className={`mb-6 shadow-xl border-4 ${feedback.type === 'correct' ? 'border-green-400' : 'border-orange-400'}`}>
              <CardContent className="p-8">
                <div className={`flex items-center gap-4 mb-6 justify-center ${feedback.type === 'correct' ? 'text-green-800' : 'text-orange-800'}`}>
                  <div className="text-7xl">
                    {feedback.type === 'correct' ? '✅' : '💡'}
                  </div>
                  <h3 className="text-3xl font-bold">{feedback.message}</h3>
                </div>

                {showExplanation && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200">
                    <div className="flex flex-col items-center gap-6 mb-6">
                      <div className="text-9xl">{scenario.correctAnswer.emoji}</div>
                      <div className="text-center">
                        <h4 className="text-3xl font-bold text-gray-800 mb-4">
                          {scenario.correctAnswer.name}
                        </h4>
                        <p className="text-xl text-gray-700 mb-6">
                          {scenario.correctAnswer.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border-2 border-purple-200">
                      <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-xl justify-center">
                        <Info className="w-6 h-6 text-blue-600" />
                        Recuerda:
                      </h5>
                      <ul className="space-y-3">
                        {scenario.correctAnswer.tips.map((tip, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-700 text-lg justify-center">
                            <span className="text-3xl">✓</span>
                            <span className="font-semibold">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <Button
                  onClick={nextScenario}
                  size="lg"
                  className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-xl py-8"
                >
                  {currentScenario < scenarios.length - 1 ? '¡Siguiente Pregunta!' : '¡Ver mis Resultados!'}
                  <ArrowRight className="w-6 h-6 ml-2" />
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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className={`${passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-400 to-red-500'} text-white p-8 md:p-12 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-9xl mb-6">{passed ? '🎉' : '🌟'}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {passed ? '¡Felicitaciones!' : '¡Buen Intento!'}
                </h1>
                <p className="text-2xl text-white/90">
                  {passed ? '¡Sabes cruzar la calle de forma segura!' : '¡Sigue aprendiendo y lo lograrás!'}
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl border-4 border-yellow-200">
                  <div className="text-6xl mb-3">🏆</div>
                  <div className="text-5xl font-bold text-yellow-600 mb-2">{score}</div>
                  <div className="text-lg text-gray-600 font-semibold">Puntos</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-4 border-green-200">
                  <div className="text-6xl mb-3">🎯</div>
                  <div className="text-5xl font-bold text-green-600 mb-2">{accuracy}%</div>
                  <div className="text-lg text-gray-600 font-semibold">Correctas</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border-4 border-purple-200">
                  <div className="text-6xl mb-3">{performance.emoji}</div>
                  <div className="text-5xl font-bold text-purple-600 mb-2">{correctAnswers}/{scenarios.length}</div>
                  <div className="text-lg text-gray-600 font-semibold">Respuestas</div>
                </div>
              </div>

              <div className={`${performance.bg} border-4 rounded-3xl p-8 mb-8`}>
                <div className="text-center">
                  <div className="text-7xl mb-4">{performance.emoji}</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">
                    {performance.level}
                  </h3>
                  <p className="text-xl text-gray-600">
                    {passed 
                      ? '¡Ya sabes los pasos para cruzar la calle!' 
                      : '¡Practica más y serás un experto!'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={restartGame}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-xl py-8"
                >
                  <RotateCcw className="w-6 h-6 mr-2" />
                  ¡Jugar de Nuevo!
                </Button>
                
                <Button 
                  onClick={handleComplete}
                  size="lg"
                  variant="outline"
                  className="w-full text-xl py-8 border-2"
                >
                  <Home className="w-6 h-6 mr-2" />
                  Volver a Cursos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default CrossingStreetGame;
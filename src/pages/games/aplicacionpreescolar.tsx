import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Info, Hand, Home, AlertCircle } from 'lucide-react';

const CrossingPracticeGame = () => {
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
      title: 'Simulación: Cruzando con Semáforo',
      description: 'El semáforo está en ROJO. ¿Qué haces?',
      context: 'Estás en la acera esperando para cruzar. El semáforo muestra luz roja.',
      image: '🔴',
      situation: 'Semáforo en ROJO',
      correctAnswer: {
        name: '🛑 Me quedo esperando',
        emoji: '🛑',
        explanation: '¡Perfecto! Cuando el semáforo está en ROJO, debes quedarte en la acera esperando. Rojo significa PARA.',
        tips: ['Rojo = PARA', 'Espera en la acera', 'Nunca cruces con rojo']
      },
      options: [
        { name: '🛑 Me quedo esperando', emoji: '🛑', isCorrect: true },
        { name: '🏃 Corro rápido', emoji: '🏃', isCorrect: false },
        { name: '👀 Miro y cruzo', emoji: '👀', isCorrect: false }
      ]
    },
    {
      id: 2,
      title: 'Simulación: Semáforo en Verde',
      description: 'El semáforo cambió a VERDE. ¿Qué debes hacer ANTES de cruzar?',
      context: 'El semáforo ahora muestra luz verde. Es tu turno para cruzar.',
      image: '🟢',
      situation: 'Semáforo en VERDE',
      correctAnswer: {
        name: '👀 Miro a ambos lados',
        emoji: '👀',
        explanation: '¡Excelente! Aunque el semáforo esté en verde, SIEMPRE debes mirar a la izquierda, derecha e izquierda otra vez antes de cruzar.',
        tips: ['Verde no significa correr', 'Mira izquierda-derecha-izquierda', 'Asegúrate que los carros paren']
      },
      options: [
        { name: '🏃 Corro sin mirar', emoji: '🏃', isCorrect: false },
        { name: '👀 Miro a ambos lados', emoji: '👀', isCorrect: true },
        { name: '📱 Saco mi celular', emoji: '📱', isCorrect: false }
      ]
    },
    {
      id: 3,
      title: 'Simulación: Buscando el Lugar Seguro',
      description: 'Necesitas cruzar pero no hay semáforo. ¿Qué buscas?',
      context: 'Estás en una calle sin semáforo. Debes encontrar el lugar más seguro para cruzar.',
      image: '🦓',
      situation: 'Calle sin semáforo',
      correctAnswer: {
        name: '🦓 El paso de cebra',
        emoji: '🦓',
        explanation: '¡Muy bien! El paso de cebra (rayas blancas) es el lugar más seguro para cruzar cuando no hay semáforo.',
        tips: ['Busca las rayas blancas', 'Los carros deben parar ahí', 'Es el lugar más visible']
      },
      options: [
        { name: '🚗 Entre los carros', emoji: '🚗', isCorrect: false },
        { name: '🦓 El paso de cebra', emoji: '🦓', isCorrect: true },
        { name: '🏃 Cualquier lugar', emoji: '🏃', isCorrect: false }
      ]
    },
    {
      id: 4,
      title: 'Simulación: Práctica del PARA-MIRA-ESCUCHA',
      description: 'Vas a practicar cruzar. ¿Cuál es el orden correcto de los pasos?',
      context: 'Un adulto te va a ayudar a cruzar. Debes recordar los tres pasos mágicos.',
      image: '🚸',
      situation: 'Momento de cruzar',
      correctAnswer: {
        name: '1️⃣2️⃣3️⃣ PARA-MIRA-ESCUCHA',
        emoji: '✅',
        explanation: '¡Correcto! Los tres pasos en orden son: 1) PARA en la acera, 2) MIRA a izquierda-derecha-izquierda, 3) ESCUCHA si vienen carros.',
        tips: ['Siempre en ese orden', 'No te saltes ningún paso', 'Repite si tienes dudas']
      },
      options: [
        { name: '1️⃣2️⃣3️⃣ PARA-MIRA-ESCUCHA', emoji: '✅', isCorrect: true },
        { name: '🏃 CORRE-MIRA-PARA', emoji: '🏃', isCorrect: false },
        { name: '📱 MIRA EL CELULAR primero', emoji: '📱', isCorrect: false }
      ]
    },
    {
      id: 5,
      title: 'Simulación: Cruzando con Adulto',
      description: 'Ya está todo seguro para cruzar con el adulto. ¿Qué haces?',
      context: 'El semáforo está en verde, miraste a ambos lados, no vienen carros. Tu mamá te da la mano.',
      image: '👨‍👩‍👧',
      situation: 'Listo para cruzar',
      correctAnswer: {
        name: '🤝 Tomo su mano y cruzo caminando',
        emoji: '🤝',
        explanation: '¡Perfecto! Siempre debes tomar la mano del adulto y cruzar CAMINANDO, nunca corriendo.',
        tips: ['Toma la mano del adulto', 'Camina, no corras', 'Mantén la vista al frente']
      },
      options: [
        { name: '🤝 Tomo su mano y cruzo caminando', emoji: '🤝', isCorrect: true },
        { name: '🏃 Me suelto y corro', emoji: '🏃', isCorrect: false },
        { name: '🎮 Juego mientras cruzo', emoji: '🎮', isCorrect: false }
      ]
    },
    {
      id: 6,
      title: 'Simulación: Peligro - Pelota en la Calle',
      description: 'Tu pelota rodó hacia la calle. ¿Qué haces?',
      context: 'Estabas jugando y tu pelota favorita se fue rodando a la calle.',
      image: '⚽',
      situation: 'Emergencia con juguete',
      correctAnswer: {
        name: '👨‍👩‍👧 Le digo a un adulto',
        emoji: '👨‍👩‍👧',
        explanation: '¡Excelente decisión! NUNCA vayas a la calle solo, ni siquiera por tu juguete favorito. Siempre pide ayuda a un adulto.',
        tips: ['NUNCA vayas solo a la calle', 'Los juguetes se pueden reemplazar', 'Tu seguridad es lo más importante']
      },
      options: [
        { name: '🏃 Corro a buscarla', emoji: '🏃', isCorrect: false },
        { name: '👨‍👩‍👧 Le digo a un adulto', emoji: '👨‍👩‍👧', isCorrect: true },
        { name: '😢 Lloro en la acera', emoji: '😢', isCorrect: false }
      ]
    },
    {
      id: 7,
      title: 'Simulación: Clima Lluvioso',
      description: 'Está lloviendo y necesitas cruzar. ¿Qué haces diferente?',
      context: 'Llueve y las calles están mojadas. Los carros pasan más despacio.',
      image: '🌧️',
      situation: 'Día lluvioso',
      correctAnswer: {
        name: '👀 Miro con más cuidado',
        emoji: '👀',
        explanation: '¡Correcto! Cuando llueve, debes tener EXTRA cuidado: mirar más veces, esperar más tiempo y asegurarte que los carros te vean.',
        tips: ['Lluvia = más cuidado', 'Los carros tardan más en frenar', 'Usa ropa con colores brillantes']
      },
      options: [
        { name: '🏃 Cruzo más rápido', emoji: '🏃', isCorrect: false },
        { name: '👀 Miro con más cuidado', emoji: '👀', isCorrect: true },
        { name: '☔ Juego con los charcos', emoji: '☔', isCorrect: false }
      ]
    },
    {
      id: 8,
      title: 'Simulación: Práctica Final',
      description: '¿Qué es lo MÁS importante que aprendiste sobre cruzar la calle?',
      context: 'Ahora sabes mucho sobre seguridad vial. ¿Qué es lo más importante de todo?',
      image: '🎓',
      situation: 'Repaso final',
      correctAnswer: {
        name: '👨‍👩‍👧 Nunca cruzar solo',
        emoji: '👨‍👩‍👧',
        explanation: '¡Perfecto! Lo MÁS importante es que NUNCA cruces solo. Siempre debes ir con un adulto que te cuide y te ayude.',
        tips: ['Siempre con adultos', 'Ellos te protegen', 'Tu seguridad es primero']
      },
      options: [
        { name: '🏃 Cruzar rápido', emoji: '🏃', isCorrect: false },
        { name: '👨‍👩‍👧 Nunca cruzar solo', emoji: '👨‍👩‍👧', isCorrect: true },
        { name: '🎮 Ver el celular', emoji: '🎮', isCorrect: false }
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
    if (accuracy >= 90) return { level: '¡Eres un Experto en Seguridad!', color: 'text-green-600', bg: 'bg-green-50', emoji: '⭐' };
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
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 md:p-12 rounded-t-lg relative">
              <button
                onClick={goToCourses}
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Volver</span>
              </button>

              <div className="text-center">
                <div className="text-8xl mb-4">🚸</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  ¡Práctica de Cruce!
                </h1>
                <p className="text-xl text-blue-100">
                  Simulaciones y Situaciones Reales - Preescolar
                </p>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  ¿Qué vas a practicar?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="text-5xl">🚦</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Simulaciones con Semáforo</h3>
                      <p className="text-sm text-gray-600">Practica cuándo cruzar</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <div className="text-5xl">🦓</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Usando el Paso de Cebra</h3>
                      <p className="text-sm text-gray-600">El lugar más seguro</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                    <div className="text-5xl">⚠️</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Situaciones de Peligro</h3>
                      <p className="text-sm text-gray-600">Qué hacer en emergencias</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <div className="text-5xl">🌧️</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Diferentes Climas</h3>
                      <p className="text-sm text-gray-600">Lluvia y otras condiciones</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  ¡Importante!
                </h3>
                <p className="text-gray-700 text-lg mb-3">
                  Vas a practicar situaciones como si estuvieras en la calle real. 
                  Piensa bien cada respuesta porque te ayudará a estar seguro.
                </p>
                <p className="text-gray-700 text-lg font-semibold">
                  Recuerda: ¡Siempre con un adulto en la vida real!
                </p>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                  <Info className="w-6 h-6 text-blue-600" />
                  ¿Cómo funciona?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">1️⃣</span>
                    <span className="text-lg">Lee cada situación con atención</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">2️⃣</span>
                    <span className="text-lg">Piensa qué harías en esa situación</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">3️⃣</span>
                    <span className="text-lg">Elige la opción más segura</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-3xl">4️⃣</span>
                    <span className="text-lg">Aprende de cada situación</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={startGame}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-xl py-8 text-white"
              >
                <Hand className="w-8 h-8 mr-3" />
                ¡Comenzar la Práctica!
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
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <Badge variant="outline" className="px-6 py-3 text-xl bg-white border-2">
                Situación {currentScenario + 1} de {scenarios.length}
              </Badge>
              <Badge variant="outline" className="px-6 py-3 text-xl bg-white border-2">
                <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
                {score} puntos
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Escenario */}
          <Card className="mb-6 shadow-xl border-4 border-blue-200">
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="text-center mb-6">
                  <div className="text-9xl mb-4">{scenario.image}</div>
                  <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500">
                    {scenario.situation}
                  </Badge>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                  {scenario.title}
                </h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                  <p className="text-xl text-gray-700 italic text-center">
                    "{scenario.context}"
                  </p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 text-center">
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
                        ${!feedback ? 'bg-white hover:border-green-500 hover:shadow-2xl' : ''}
                        ${isCorrect ? 'bg-green-100 border-green-500 shadow-2xl scale-105' : ''}
                        ${isWrong ? 'bg-red-100 border-red-500' : ''}
                        ${!isSelected && feedback ? 'opacity-50' : ''}
                      `}
                    >
                      <div className="text-8xl mb-4">{option.emoji}</div>
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="font-bold text-2xl text-gray-800 text-center">{option.name}</h3>
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
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border-2 border-green-200">
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

                    <div className="bg-white rounded-2xl p-6 border-2 border-blue-200">
                      <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-xl justify-center">
                        <Info className="w-6 h-6 text-green-600" />
                        Consejos de Seguridad:
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
                  className="w-full mt-8 bg-gradient-to-r from-green-500 to-blue-600 text-xl py-8"
                >
                  {currentScenario < scenarios.length - 1 ? '¡Siguiente Situación!' : '¡Ver mis Resultados!'}
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
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className={`${passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-400 to-red-500'} text-white p-8 md:p-12 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-9xl mb-6">{passed ? '🎉' : '🌟'}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {passed ? '¡Felicitaciones!' : '¡Buen Intento!'}
                </h1>
                <p className="text-2xl text-white/90">
                  {passed ? '¡Estás listo para practicar con un adulto!' : '¡Sigue aprendiendo y lo lograrás!'}
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
                  <div className="text-lg text-gray-600 font-semibold">Situaciones</div>
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
                      ? '¡Has practicado muy bien! Ahora pídele a un adulto que te ayude a practicar en la calle real.' 
                      : '¡Sigue practicando! Cada vez lo harás mejor.'}
                  </p>
                </div>
              </div>

              {passed && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 rounded-r-lg">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ¡Recuerda siempre!
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-2xl">🛑</span>
                      <span className="text-lg">PARA antes de la acera</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-2xl">👀</span>
                      <span className="text-lg">MIRA a ambos lados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-2xl">👂</span>
                      <span className="text-lg">ESCUCHA si vienen carros</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-2xl">👨‍👩‍👧</span>
                      <span className="text-lg">Siempre con un ADULTO</span>
                    </li>
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={restartGame}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-xl py-8"
                >
                  <RotateCcw className="w-6 h-6 mr-2" />
                  ¡Practicar de Nuevo!
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

export default CrossingPracticeGame;
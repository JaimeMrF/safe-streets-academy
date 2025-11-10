import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import PARE from '../../assets/JUEGO1/PARE.webp';
import CEDA from '../../assets/JUEGO1/CEDA.webp';
import NINO from '../../assets/JUEGO1/NINO.webp';
import PEATON from '../../assets/JUEGO1/PEATON.webp';
import REBASAR from '../../assets/JUEGO1/REBASAR.webp';
import VELOCIDAD from '../../assets/JUEGO1/VELOCIDAD.webp';
import { AlertCircle, Award, Clock, Target, TrendingUp, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

const TrafficSignsIntro = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');

  // Datos profesionales de señales de tránsito reales
  const trafficSigns = [
    {
      id: 1,
      name: 'PARE',
      description: 'Detención obligatoria del vehículo',
      category: 'Reglamentaria',
      image: PARE,
      color: 'from-red-500 to-red-700',
      facts: ['Forma octagonal única', 'Color rojo con letras blancas', 'Detención completa obligatoria']
    },
    {
      id: 2,
      name: 'Ceda el Paso',
      description: 'Debe ceder el paso a otros vehículos',
      category: 'Reglamentaria',
      image: CEDA,
      color: 'from-yellow-500 to-yellow-600',
      facts: ['Forma triangular invertida', 'Ceder prioridad', 'Reduce velocidad']
    },
    {
      id: 3,
      name: 'Prohibido Adelantar',
      description: 'No se permite rebasar otros vehículos',
      category: 'Preventiva',
      image: REBASAR,
      color: 'from-red-600 to-red-800',
      facts: ['Círculo con línea diagonal', 'Zona de no rebasar', 'Mayor seguridad vial']
    },
    {
      id: 4,
      name: 'Zona Escolar',
      description: 'Precaución: área con presencia de niños',
      category: 'Preventiva',
      image: NINO,
      color: 'from-yellow-400 to-orange-500',
      facts: ['Velocidad reducida', 'Alta precaución', 'Horario escolar']
    },
    {
      id: 5,
      name: 'Cruce Peatonal',
      description: 'Zona designada para cruce de peatones',
      category: 'Informativa',
      image: PEATON,
      color: 'from-blue-500 to-blue-700',
      facts: ['Prioridad al peatón', 'Cebra en el pavimento', 'Zona protegida']
    },
    {
      id: 6,
      name: 'Velocidad Máxima',
      description: 'Límite de velocidad permitido',
      category: 'Reglamentaria',
      image: VELOCIDAD,
      color: 'from-blue-600 to-indigo-700',
      facts: ['Círculo con número', 'Límite obligatorio', 'Seguridad vial']
    }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameState, setGameState] = useState('intro'); // intro, learning, playing, result
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Obtener usuario autenticado y datos de la ruta
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

        // Obtener información de la ruta para el courseId
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

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      generateOptions();
    }
  }, [currentLevel, gameState]);

  const generateOptions = () => {
    const correct = trafficSigns[currentLevel];
    const incorrect = trafficSigns
      .filter(s => s.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correct, ...incorrect].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleTimeout = () => {
    setFeedback({ type: 'timeout', message: 'Se acabó el tiempo' });
    setStreak(0);
    setTotalAttempts(totalAttempts + 1);
    setTimeout(() => {
      nextLevel();
    }, 2000);
  };

  const handleAnswer = (selectedSign: any) => {
  const correct = trafficSigns[currentLevel];
  setSelectedAnswer(selectedSign.id);
  setTotalAttempts(totalAttempts + 1);

  if (selectedSign.id === correct.id) {
    // Puntos base por pregunta correcta (16.67 puntos por pregunta para llegar a 100)
    const basePoints = Math.floor(100 / trafficSigns.length);
    
    setScore(score + basePoints);
    setStreak(streak + 1);
    setCorrectAnswers(correctAnswers + 1);
    setFeedback({ 
      type: 'correct', 
      message: '¡Excelente!',
      points: basePoints
    });
  } else {
    setStreak(0);
    setFeedback({ 
      type: 'incorrect', 
      message: `Incorrecto. La respuesta era: ${correct.name}`,
      correctId: correct.id
    });
  }

  setTimeout(() => {
    nextLevel();
  }, 2500);
};

  const nextLevel = () => {
    if (currentLevel < trafficSigns.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setTimeLeft(20);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setGameState('result');
    }
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setFeedback(null);
    setTotalAttempts(0);
    setCorrectAnswers(0);
  };

  const restartGame = () => {
    setGameState('intro');
    setCurrentLevel(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setFeedback(null);
    setTotalAttempts(0);
    setCorrectAnswers(0);
  };

  const calculateAccuracy = () => {
    return totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;
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
      
      // Navegar de vuelta al curso
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

  // Pantalla de introducción
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 rounded-t-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <AlertCircle className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                Señales de Tránsito
              </h1>
              <p className="text-xl text-center text-blue-100">
                Nivel: Introducción
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Objetivos de Aprendizaje
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Identificar Señales</h3>
                      <p className="text-sm text-gray-600">Reconocer las principales señales de tránsito</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Target className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Comprender Significados</h3>
                      <p className="text-sm text-gray-600">Entender qué indica cada señal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <Trophy className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Clasificar por Tipo</h3>
                      <p className="text-sm text-gray-600">Diferenciar categorías de señales</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Aplicar Conocimiento</h3>
                      <p className="text-sm text-gray-600">Usar las señales en contexto real</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  Instrucciones
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Tendrás 20 segundos para responder cada pregunta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Gana puntos extra por velocidad y rachas correctas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Lee cuidadosamente la descripción de cada señal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Necesitas al menos 70% de precisión para aprobar</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={startGame}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg py-6"
              >
                <Award className="w-6 h-6 mr-2" />
                Comenzar Evaluación
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de juego
  if (gameState === 'playing') {
    const currentSign = trafficSigns[currentLevel];
    const progress = ((currentLevel + 1) / trafficSigns.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-lg shadow px-4 py-2">
                  <div className="text-sm text-gray-600">Pregunta</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {currentLevel + 1}/{trafficSigns.length}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow px-4 py-2">
                  <div className="text-sm text-gray-600">Puntuación</div>
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                </div>
                {streak > 0 && (
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg shadow px-4 py-2">
                    <div className="text-sm">Racha</div>
                    <div className="text-2xl font-bold">🔥 {streak}</div>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
                <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
                <div className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-800'}`}>
                  {timeLeft}s
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Pregunta */}
          <Card className="mb-6 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  {currentSign.category}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  ¿Cuál es esta señal?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {currentSign.description}
                </p>
                
                <div className={`inline-block bg-gradient-to-br ${currentSign.color} rounded-2xl p-8 shadow-2xl`}>
                <img 
                    src={currentSign.image} 
                    alt={currentSign.name}
                    className="w-64 h-64 object-contain"
                />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opciones */}
          <div className="grid md:grid-cols-2 gap-4">
            {options.map((sign) => {
              const isSelected = selectedAnswer === sign.id;
              const isCorrect = feedback?.correctId === sign.id;
              const isWrong = isSelected && feedback?.type === 'incorrect';
              
              return (
                <button
                  key={sign.id}
                  onClick={() => !feedback && handleAnswer(sign)}
                  disabled={!!feedback}
                  className={`
                    p-6 rounded-xl border-2 text-left transition-all transform hover:scale-105
                    ${!feedback ? 'bg-white hover:border-blue-500 hover:shadow-lg' : ''}
                    ${isSelected && feedback?.type === 'correct' ? 'bg-green-50 border-green-500 shadow-lg' : ''}
                    ${isWrong ? 'bg-red-50 border-red-500' : ''}
                    ${isCorrect && feedback ? 'bg-green-50 border-green-500 shadow-lg' : ''}
                    ${!isSelected && !isCorrect && feedback ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{sign.name}</h3>
                    {isSelected && feedback?.type === 'correct' && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                    {isWrong && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    {isCorrect && feedback && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-600">{sign.description}</p>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`
              mt-6 p-6 rounded-xl shadow-xl animate-in slide-in-from-bottom
              ${feedback.type === 'correct' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500' : ''}
              ${feedback.type === 'incorrect' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-500' : ''}
              ${feedback.type === 'timeout' ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-500' : ''}
            `}>
              <div className="flex items-center gap-4">
                {feedback.type === 'correct' && (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-green-800 mb-1">{feedback.message}</h3>
                      <p className="text-green-700">+{feedback.points} puntos</p>
                    </div>
                  </>
                )}
                {feedback.type === 'incorrect' && (
                  <>
                    <XCircle className="w-12 h-12 text-red-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-red-800">{feedback.message}</h3>
                    </div>
                  </>
                )}
                {feedback.type === 'timeout' && (
                  <>
                    <Clock className="w-12 h-12 text-orange-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-orange-800">{feedback.message}</h3>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (gameState === 'result') {
    const performance = getPerformanceLevel();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className={`${passed ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white p-8 md:p-12 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-7xl mb-4">{passed ? '🎉' : '📚'}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {passed ? '¡Felicitaciones!' : '¡Sigue Practicando!'}
                </h1>
                <p className="text-xl text-white/90">
                  {passed ? 'Has aprobado el nivel' : 'Necesitas mejorar tu puntuación'}
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Estadísticas principales */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-blue-600 mb-1">{score}</div>
                  <div className="text-sm text-gray-600">Puntuación Total</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-green-600 mb-1">{accuracy}%</div>
                  <div className="text-sm text-gray-600">Precisión</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-purple-600 mb-1">{correctAnswers}/{totalAttempts}</div>
                  <div className="text-sm text-gray-600">Respuestas Correctas</div>
                </div>
              </div>

              {/* Nivel de desempeño */}
              <div className={`${performance.bg} border-2 rounded-xl p-6 mb-8`}>
                <div className="flex items-center gap-4">
                  <Award className={`w-12 h-12 ${performance.color}`} />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      Desempeño: {performance.level}
                    </h3>
                    <p className="text-gray-600">
                      {passed 
                        ? 'Has demostrado un buen entendimiento de las señales de tránsito.' 
                        : 'Te recomendamos revisar el material y volver a intentarlo.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Acciones */}
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
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700"
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

export default TrafficSignsIntro;
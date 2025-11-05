import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { School, MapPin, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Target, TrendingUp, Award, Clock, Info } from 'lucide-react';

// Importa las imágenes que necesites
import CEBRA from '../../assets/JUEGO1/CEBRA.jpg';
import ESCUELA from '../../assets/JUEGO1/COLEGIO.jpg';
import SEMAFORO from '../../assets/JUEGO1/SEMAFORO.png'; // Asegúrate de tener esta imagen

const TrafficSignsDesarrollo = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');

  // Escenarios del camino a la escuela
  const scenarios = [
    {
      id: 1,
      title: 'Cruzando la Calle',
      description: '¿Qué señal te indica dónde debes cruzar la calle de forma segura?',
      context: 'Vas caminando a la escuela y necesitas cruzar la calle. Ves varias señales.',
      correctSign: {
        name: 'Paso de Cebra',
        image: CEBRA,
        explanation: 'El paso de cebra es el lugar designado para que los peatones crucen la calle de manera segura.',
        tips: ['Mira a ambos lados antes de cruzar', 'Espera que los autos se detengan', 'Cruza caminando, no corriendo']
      },
      options: [
        { name: 'Paso de Cebra', image: CEBRA, isCorrect: true },
        { name: 'Zona Escolar', image: ESCUELA, isCorrect: false },
        { name: 'Semáforo', image: SEMAFORO, isCorrect: false }
      ]
    },
    {
      id: 2,
      title: 'Cerca de la Escuela',
      description: '¿Cuál señal advierte a los conductores que hay una escuela cercana?',
      context: 'Estás llegando a tu escuela. Los conductores deben tener cuidado especial en esta zona.',
      correctSign: {
        name: 'Zona Escolar',
        image: ESCUELA,
        explanation: 'Esta señal advierte a los conductores que deben reducir la velocidad porque hay niños cerca.',
        tips: ['Los autos deben ir más despacio', 'Hay muchos niños caminando', 'Horario escolar de mayor cuidado']
      },
      options: [
        { name: 'Zona Escolar', image: ESCUELA, isCorrect: true },
        { name: 'Paso de Cebra', image: CEBRA, isCorrect: false },
        { name: 'Semáforo', image: SEMAFORO, isCorrect: false }
      ]
    },
    {
      id: 3,
      title: 'En la Esquina',
      description: '¿Qué señal regula el tráfico con luces de colores?',
      context: 'Llegas a una esquina concurrida. Una señal te indica cuándo puedes cruzar.',
      correctSign: {
        name: 'Semáforo',
        image: SEMAFORO,
        explanation: 'El semáforo usa luces de colores para indicar cuándo parar y cuándo avanzar.',
        tips: ['Rojo = Alto', 'Amarillo = Precaución', 'Verde = Avanzar (verificando que sea seguro)']
      },
      options: [
        { name: 'Semáforo', image: SEMAFORO, isCorrect: true },
        { name: 'Paso de Cebra', image: CEBRA, isCorrect: false },
        { name: 'Zona Escolar', image: ESCUELA, isCorrect: false }
      ]
    },
    {
      id: 4,
      title: 'Situación Real',
      description: 'Ves una familia cruzando la calle. ¿Qué señal están usando?',
      context: 'Observas a una familia con niños pequeños cruzando la calle de forma ordenada.',
      correctSign: {
        name: 'Paso de Cebra',
        image: CEBRA,
        explanation: 'Las familias usan el paso de cebra para cruzar de manera segura y visible para los conductores.',
        tips: ['Siempre cruza en grupo', 'Los más pequeños en el centro', 'Mantén contacto visual con los conductores']
      },
      options: [
        { name: 'Paso de Cebra', image: CEBRA, isCorrect: true },
        { name: 'Semáforo', image: SEMAFORO, isCorrect: false },
        { name: 'Zona Escolar', image: ESCUELA, isCorrect: false }
      ]
    },
    {
      id: 5,
      title: 'Hora de Salida',
      description: '¿Qué señal protege a los estudiantes cuando salen de la escuela?',
      context: 'Es la hora de salida. Muchos niños están saliendo al mismo tiempo.',
      correctSign: {
        name: 'Zona Escolar',
        image: ESCUELA,
        explanation: 'Durante la entrada y salida de la escuela, esta señal es especialmente importante.',
        tips: ['Mayor cuidado en horarios escolares', 'Conductores muy atentos', 'Velocidad reducida obligatoria']
      },
      options: [
        { name: 'Zona Escolar', image: ESCUELA, isCorrect: true },
        { name: 'Semáforo', image: SEMAFORO, isCorrect: false },
        { name: 'Paso de Cebra', image: CEBRA, isCorrect: false }
      ]
    }
  ];

  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
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

  const handleAnswer = (option: any) => {
    const scenario = scenarios[currentScenario];
    setSelectedAnswer(option.name);

    if (option.isCorrect) {
      const points = Math.floor(100 / scenarios.length);
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
      setFeedback({ type: 'correct', message: '¡Correcto!' });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: `Incorrecto. La respuesta correcta era: ${scenario.correctSign.name}` 
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

  // Pantalla de introducción
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 md:p-12 rounded-t-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <School className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                Camino a la Escuela
              </h1>
              <p className="text-xl text-center text-emerald-100">
                Nivel: Desarrollo
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Aprenderás sobre:
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-3 p-6 bg-blue-50 rounded-xl text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <MapPin className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">Paso de Cebra</h3>
                    <p className="text-sm text-gray-600">Cruza la calle de forma segura</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-6 bg-yellow-50 rounded-xl text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <School className="w-10 h-10 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">Zona Escolar</h3>
                    <p className="text-sm text-gray-600">Área especial de protección</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-6 bg-red-50 rounded-xl text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <div className="text-3xl">🚦</div>
                    </div>
                    <h3 className="font-bold text-gray-800">Semáforo</h3>
                    <p className="text-sm text-gray-600">Luces que regulan el tráfico</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Instrucciones
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Vivirás situaciones del camino a la escuela</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Identifica qué señal corresponde a cada situación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Aprenderás consejos de seguridad vial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Necesitas 70% de precisión para aprobar</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={startGame}
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-lg py-6"
              >
                <School className="w-6 h-6 mr-2" />
                Comenzar Recorrido
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                  <MapPin className="w-5 h-5 mr-2" />
                  Situación {currentScenario + 1}/{scenarios.length}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                  {score} puntos
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Escenario */}
          <Card className="mb-6 shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 rounded-full p-3">
                    <School className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">{scenario.title}</h2>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 mb-6">
                  <p className="text-lg text-gray-700 italic">"{scenario.context}"</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {scenario.description}
                </h3>
              </div>

              {/* Opciones */}
              <div className="grid md:grid-cols-3 gap-4">
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
                        p-4 rounded-xl border-2 transition-all transform hover:scale-105
                        ${!feedback ? 'bg-white hover:border-emerald-500 hover:shadow-lg' : ''}
                        ${isCorrect ? 'bg-green-50 border-green-500 shadow-lg' : ''}
                        ${isWrong ? 'bg-red-50 border-red-500' : ''}
                        ${!isSelected && feedback ? 'opacity-50' : ''}
                      `}
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <img 
                          src={option.image} 
                          alt={option.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">{option.name}</h3>
                        {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                        {isWrong && <XCircle className="w-6 h-6 text-red-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Feedback y Explicación */}
          {feedback && (
            <Card className={`mb-6 shadow-xl ${feedback.type === 'correct' ? 'border-2 border-green-500' : 'border-2 border-red-500'}`}>
              <CardContent className="p-8">
                <div className={`flex items-start gap-4 mb-6 ${feedback.type === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                  {feedback.type === 'correct' ? (
                    <CheckCircle2 className="w-12 h-12 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-12 h-12 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{feedback.message}</h3>
                  </div>
                </div>

                {showExplanation && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={scenario.correctSign.image}
                        alt={scenario.correctSign.name}
                        className="w-24 h-24 object-contain bg-white rounded-lg p-2"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                          {scenario.correctSign.name}
                        </h4>
                        <p className="text-gray-700 mb-4">
                          {scenario.correctSign.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Consejos de Seguridad:
                      </h5>
                      <ul className="space-y-2">
                        {scenario.correctSign.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-blue-600 font-bold">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <Button
                  onClick={nextScenario}
                  size="lg"
                  className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-700"
                >
                  {currentScenario < scenarios.length - 1 ? 'Siguiente Situación' : 'Ver Resultados'}
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className={`${passed ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white p-8 md:p-12 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-7xl mb-4">{passed ? '🎉' : '📚'}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {passed ? '¡Excelente Trabajo!' : '¡Sigue Practicando!'}
                </h1>
                <p className="text-xl text-white/90">
                  {passed ? 'Conoces bien las señales del camino a la escuela' : 'Repasa las señales y vuelve a intentarlo'}
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
                  <div className="text-4xl font-bold text-purple-600 mb-1">{correctAnswers}/{scenarios.length}</div>
                  <div className="text-sm text-gray-600">Correctas</div>
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
                        ? '¡Conoces bien las señales que ves camino a la escuela!' 
                        : 'Te recomendamos repasar las señales de seguridad escolar.'}
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
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-700"
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

export default TrafficSignsDesarrollo;
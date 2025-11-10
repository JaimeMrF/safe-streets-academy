import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Award, Clock, CheckCircle2, XCircle, Trophy, Medal, Star, 
  Shield, BookOpen, Target, TrendingUp, ArrowRight, RotateCcw,
  GraduationCap, FileCheck
} from 'lucide-react';

// Importar imágenes
import pareImg from '../../assets/JUEGO1/PARE.webp';
import cedaImg from '../../assets/JUEGO1/CEDA.webp';
import ninoImg from '../../assets/JUEGO1/NINO.webp';
import peatonImg from '../../assets/JUEGO1/PEATON.webp';
import rebasarImg from '../../assets/JUEGO1/REBASAR.webp';
import velocidadImg from '../../assets/JUEGO1/VELOCIDAD.webp';
import semaforoImg from '../../assets/JUEGO1/SEMAFORO.webp';

interface Question {
  id: number;
  type: 'identification' | 'context' | 'multiple';
  question: string;
  image?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    type: 'identification',
    question: 'Identifique la señal de tránsito presentada en la imagen.',
    image: pareImg,
    options: ['Señal de PARE', 'Ceda el Paso', 'Zona Escolar', 'Prohibido Pasar'],
    correctAnswer: 'Señal de PARE',
    explanation: 'La señal de PARE es de forma octagonal con fondo rojo y letras blancas. Es la única señal con esta forma geométrica, lo que permite su reconocimiento inmediato incluso desde la distancia.'
  },
  {
    id: 2,
    type: 'context',
    question: 'Usted se desplaza en bicicleta y observa esta señal en proximidad a una institución educativa. ¿Cuál es el protocolo correcto?',
    image: ninoImg,
    options: ['Acelerar para atravesar rápidamente la zona', 'Reducir la velocidad y mantener máxima precaución', 'Activar dispositivo sonoro de manera continua', 'Mantener la velocidad constante'],
    correctAnswer: 'Reducir la velocidad y mantener máxima precaución',
    explanation: 'La señal de Zona Escolar requiere reducción obligatoria de velocidad y atención incrementada debido a la presencia de menores que pueden cruzar inesperadamente.'
  },
  {
    id: 3,
    type: 'identification',
    question: 'Determine la nomenclatura oficial de esta señalización vial.',
    image: peatonImg,
    options: ['Zona de Recreación Infantil', 'Cruce Peatonal', 'Área de Parque Público', 'Sendero Seguro'],
    correctAnswer: 'Cruce Peatonal',
    explanation: 'Esta señal indica un paso de cebra o cruce peatonal, donde los peatones tienen prioridad absoluta de paso sobre los vehículos.'
  },
  {
    id: 4,
    type: 'multiple',
    question: '¿Cuál es la característica geométrica distintiva de la señal de PARE?',
    options: ['Forma circular', 'Forma triangular', 'Forma octagonal con ocho lados', 'Forma cuadrada'],
    correctAnswer: 'Forma octagonal con ocho lados',
    explanation: 'La señal de PARE es la única señal de tránsito a nivel internacional que utiliza la forma octagonal, permitiendo su identificación incluso cuando está cubierta de nieve o deteriorada.'
  },
  {
    id: 5,
    type: 'context',
    question: 'Al cruzar un paso peatonal, el semáforo cambia de verde a amarillo. ¿Cuál es el procedimiento correcto?',
    image: semaforoImg,
    options: ['Acelerar el paso significativamente', 'Detenerse en el centro de la calzada', 'Continuar el cruce con precaución constante', 'Retroceder al punto de origen'],
    correctAnswer: 'Continuar el cruce con precaución constante',
    explanation: 'Una vez iniciado el cruce, debe completarse de forma prudente. La luz amarilla advierte a los conductores del cambio inminente, no al peatón que ya está cruzando.'
  },
  {
    id: 6,
    type: 'identification',
    question: 'Especifique el significado preciso de esta señalización.',
    image: cedaImg,
    options: ['Detención completa obligatoria', 'Ceder el paso a vehículos con prioridad', 'Prohibición total de circulación', 'Advertencia de curva peligrosa'],
    correctAnswer: 'Ceder el paso a vehículos con prioridad',
    explanation: 'La señal de Ceda el Paso indica que debe disminuir la velocidad y permitir el paso prioritario a otros vehículos o peatones antes de continuar.'
  },
  {
    id: 7,
    type: 'multiple',
    question: '¿Cuál es la coloración reglamentaria del fondo en las señales de Zona Escolar?',
    options: ['Rojo con contorno blanco', 'Azul con símbolos blancos', 'Amarillo con contorno negro', 'Verde con elementos blancos'],
    correctAnswer: 'Amarillo con contorno negro',
    explanation: 'Las señales preventivas, incluyendo Zona Escolar, utilizan fondo amarillo fluorescente con bordes y símbolos negros para máxima visibilidad y advertencia.'
  },
  {
    id: 8,
    type: 'context',
    question: 'Al identificar esta señal como peatón, ¿dónde debe realizar el cruce de vía de forma segura?',
    image: peatonImg,
    options: ['En cualquier punto de la calzada', 'Exclusivamente por el paso peatonal demarcado', 'Entre vehículos estacionados', 'Mediante desplazamiento acelerado'],
    correctAnswer: 'Exclusivamente por el paso peatonal demarcado',
    explanation: 'Los cruces peatonales están diseñados específicamente para garantizar la seguridad. Siempre debe utilizarse el paso de cebra señalizado, donde los conductores esperan encontrar peatones.'
  },
  {
    id: 9,
    type: 'identification',
    question: '¿Qué indica esta señalización vial?',
    image: rebasarImg,
    options: ['Adelantamiento permitido', 'Prohibido adelantar', 'Doble circulación', 'Finalización de vía'],
    correctAnswer: 'Prohibido adelantar',
    explanation: 'Esta señal prohíbe la maniobra de adelantamiento a otros vehículos debido a condiciones de riesgo en ese segmento vial.'
  },
  {
    id: 10,
    type: 'context',
    question: 'Situación práctica final: Se aproxima a pie hacia su institución educativa, observa la señal de PARE y ausencia de semáforo. ¿Cuál es la primera acción de seguridad?',
    image: pareImg,
    options: ['Cruzar con desplazamiento rápido', 'Verificar tránsito en ambas direcciones', 'Esperar ausencia total de vehículos', 'Cruzar con ojos cerrados'],
    correctAnswer: 'Verificar tránsito en ambas direcciones',
    explanation: 'La verificación visual bidireccional es el protocolo fundamental de seguridad peatonal. Debe observar izquierda, derecha e izquierda nuevamente antes de iniciar el cruce.'
  }
];

const TrafficSignsCertificacion = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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
        toast.error('Error al inicializar evaluación');
        navigate('/courses');
      }
    };

    initializeGame();
  }, [navigate, routeId]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleTimeout();
    }
  }, [timeLeft, gameState, showExplanation]);

  const handleTimeout = () => {
    setShowExplanation(true);
    setIsCorrect(false);
    toast.error('Tiempo agotado');
  };

  const handleAnswer = (answer: string) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    
    if (correct) {
      const points = Math.max(5, Math.floor((timeLeft / 15) * 10));
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setSelectedAnswer('');
      setShowExplanation(false);
      setIsCorrect(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameState('result');
  };

  const calculateAccuracy = () => {
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const getCertificationLevel = () => {
    const accuracy = calculateAccuracy();
    if (accuracy >= 90) return { 
      level: 'Experto en Seguridad Vial', 
      stars: 3, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      icon: Trophy 
    };
    if (accuracy >= 80) return { 
      level: 'Certificado con Honores', 
      stars: 2, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      icon: Medal 
    };
    if (accuracy >= 70) return { 
      level: 'Certificado Aprobado', 
      stars: 1, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      icon: Award 
    };
    return { 
      level: 'Requiere Refuerzo', 
      stars: 0, 
      color: 'text-gray-600', 
      bg: 'bg-gray-50',
      icon: XCircle 
    };
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedAnswer('');
    setShowExplanation(false);
    setCorrectAnswers(0);
  };

  const restartGame = () => {
    setGameState('intro');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedAnswer('');
    setShowExplanation(false);
    setCorrectAnswers(0);
  };

  const handleComplete = async () => {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 70;

    if (!passed) {
      toast.warning('Se requiere mínimo 70% de precisión para aprobar');
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
      
      toast.success('Progreso registrado exitosamente');
      
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

  const accuracy = calculateAccuracy();
  const passed = accuracy >= 70;

  // Pantalla de Introducción
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-xl border-t-4 border-indigo-600">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
                  <Shield className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
                Evaluación de Certificación
              </h1>
              <p className="text-xl text-center text-indigo-100">
                Señales de Tránsito - Nivel Certificación
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileCheck className="w-7 h-7 text-indigo-600" />
                  Parámetros de Evaluación
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-5 bg-white rounded-lg border-2 border-slate-200 shadow-sm">
                    <div className="bg-indigo-100 rounded-full p-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Preguntas</h3>
                      <p className="text-sm text-gray-600">10 preguntas de evaluación integral</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-5 bg-white rounded-lg border-2 border-slate-200 shadow-sm">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Tiempo Límite</h3>
                      <p className="text-sm text-gray-600">15 segundos por pregunta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-5 bg-white rounded-lg border-2 border-slate-200 shadow-sm">
                    <div className="bg-green-100 rounded-full p-2">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Puntuación</h3>
                      <p className="text-sm text-gray-600">Máximo 100 puntos totales</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-5 bg-white rounded-lg border-2 border-slate-200 shadow-sm">
                    <div className="bg-yellow-100 rounded-full p-2">
                      <GraduationCap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Aprobación</h3>
                      <p className="text-sm text-gray-600">Mínimo 70% requerido</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-indigo-600 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Niveles de Certificación</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span><strong>90% o superior:</strong> Experto en Seguridad Vial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Medal className="w-5 h-5 text-blue-600" />
                    <span><strong>80% - 89%:</strong> Certificado con Honores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span><strong>70% - 79%:</strong> Certificado Aprobado</span>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Instrucciones Importantes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>Lea cuidadosamente cada pregunta antes de responder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>Administre su tiempo de manera eficiente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>Revise las explicaciones para reforzar el aprendizaje</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={startGame}
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-lg py-6"
              >
                Iniciar Evaluación
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de Evaluación
  if (gameState === 'playing') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="px-4 py-2 text-base bg-white font-semibold">
                  Pregunta {currentQuestion + 1}/{questions.length}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-base bg-white">
                  <Trophy className="w-4 h-4 mr-2 text-indigo-600" />
                  {score} puntos
                </Badge>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft <= 5 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-white text-gray-700'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="text-xl font-bold">{timeLeft}s</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6 shadow-lg border-t-4 border-indigo-500">
            <CardContent className="p-8">
              <div className="mb-6">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                  {question.type === 'identification' ? 'Identificación' : 
                   question.type === 'context' ? 'Situación Práctica' : 'Conocimiento Teórico'}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {question.question}
                </h2>
              </div>

              {question.image && (
                <div className="flex justify-center mb-8 bg-slate-50 rounded-lg p-4">
                  <img 
                    src={question.image} 
                    alt="Señal de tránsito"
                    className="max-w-md w-full h-64 object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 mb-6">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === question.correctAnswer;
                  
                  let buttonClass = 'bg-white hover:bg-slate-50 border-2 border-slate-200';
                  if (showExplanation) {
                    if (isCorrectAnswer) {
                      buttonClass = 'bg-green-50 border-2 border-green-500';
                    } else if (isSelected && !isCorrect) {
                      buttonClass = 'bg-red-50 border-2 border-red-500';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={showExplanation}
                      className={`${buttonClass} p-4 rounded-lg text-left font-medium transition-all disabled:cursor-not-allowed hover:shadow-md`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{option}</span>
                        {showExplanation && isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                        {showExplanation && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className={`${isCorrect ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'} border-2 rounded-lg p-6 mb-6`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
                        {isCorrect ? 'Respuesta Correcta' : 'Explicación'}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              {showExplanation && (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                >
                  {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de Resultados
  if (gameState === 'result') {
    const certification = getCertificationLevel();
    const CertIcon = certification.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-xl border-t-4 border-indigo-600">
          <CardContent className="p-0">
            <div className={`${passed ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-slate-600 to-gray-700'} text-white p-8 md:p-12`}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CertIcon className="w-20 h-20" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  {passed ? 'Evaluación Completada' : 'Evaluación Finalizada'}
                </h1>
                <p className="text-xl text-white/90">
                  {passed ? 'Ha demostrado conocimiento en seguridad vial' : 'Se recomienda reforzar los conceptos'}
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                  <Trophy className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-indigo-600 mb-1">{score}</div>
                  <div className="text-sm text-gray-600 font-medium">Puntuación Total</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-green-600 mb-1">{accuracy}%</div>
                  <div className="text-sm text-gray-600 font-medium">Precisión</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-blue-600 mb-1">{correctAnswers}/{questions.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Respuestas Correctas</div>
                </div>
              </div>

              <div className={`${certification.bg} border-2 rounded-xl p-6 mb-8`}>
                <div className="flex items-center gap-4">
                  <div className={`${certification.bg} rounded-full p-4`}>
                    <CertIcon className={`w-12 h-12 ${certification.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {certification.level}
                      </h3>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < certification.stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {passed 
                        ? 'Ha completado satisfactoriamente la evaluación de certificación en señales de tránsito.' 
                        : 'Se recomienda revisar el material del curso y realizar nuevamente la evaluación.'}
                    </p>
                  </div>
                </div>
              </div>

              {passed && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">Certificación Obtenida</h4>
                      <p className="text-sm text-gray-700">
                        Su progreso ha sido registrado exitosamente. Puede continuar con los siguientes módulos del programa.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!passed && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 mb-1">Refuerzo Recomendado</h4>
                      <p className="text-sm text-gray-700">
                        Para aprobar se requiere un mínimo de 70% de precisión. Revise los conceptos y realice nuevamente la evaluación.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={restartGame}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reintentar Evaluación
                </Button>
                {passed && (
                  <Button 
                    onClick={handleComplete}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                  >
                    Finalizar y Continuar
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

export default TrafficSignsCertificacion;
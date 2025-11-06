import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Shield, Clock, Award, AlertCircle } from 'lucide-react';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: '¿Qué significa la luz roja del semáforo?',
    options: ['Que puedes correr rápido.', 'Que debes detenerte.', 'Que puedes cruzar la calle.'],
    correctAnswer: 'Que debes detenerte.',
    explanation: 'La luz roja indica detención: los peatones y vehículos deben parar hasta que cambie la señal.'
  },
  {
    id: 2,
    question: '¿Qué debes hacer cuando la luz del semáforo está en verde para los peatones?',
    options: ['Cruzar mirando a ambos lados.', 'Cerrar los ojos y correr.', 'Esperar a que cambie a rojo.'],
    correctAnswer: 'Cruzar mirando a ambos lados.',
    explanation: 'Aunque el semáforo esté en verde, siempre debes mirar izquierda, derecha y otra vez a la izquierda al cruzar.'
  },
  {
    id: 3,
    question: '¿Cuál es la luz del semáforo que indica "¡Prepárate!"?',
    options: ['Roja.', 'Amarilla.', 'Verde.'],
    correctAnswer: 'Amarilla.',
    explanation: 'La luz amarilla avisa que la señal cambiará pronto: reduce velocidad y prepárate a detenerte.'
  },
  {
    id: 4,
    question: 'Si no hay semáforo, ¿qué debes hacer antes de cruzar la calle?',
    options: [
      'Cruzar sin mirar.',
      'Esperar a que los carros se detengan y mirar a ambos lados.',
      'Gritar y correr.'
    ],
    correctAnswer: 'Esperar a que los carros se detengan y mirar a ambos lados.',
    explanation: 'Cuando no hay semáforo, la seguridad depende de ti: detente, mira a ambos lados y cruza por el paso peatonal.'
  },
  {
    id: 5,
    question: '¿Dónde es más seguro cruzar la calle?',
    options: ['En la mitad de la vía.', 'En la esquina o por el paso peatonal.', 'En cualquier parte, si no vienen carros.'],
    correctAnswer: 'En la esquina o por el paso peatonal.',
    explanation: 'Los cruces señalizados están diseñados para la seguridad de peatones; úsalos siempre que puedas.'
  },
  {
    id: 6,
    question: '¿Qué debes hacer si ves a un amigo cruzando por un lugar peligroso?',
    options: [
      'Reírte.',
      'Ignorarlo.',
      'Avisarle que es peligroso y que debe usar el paso peatonal.'
    ],
    correctAnswer: 'Avisarle que es peligroso y que debe usar el paso peatonal.',
    explanation: 'Ayudar a otros a mantenerse seguros es parte de ser un buen peatón y amigo.'
  },
  {
    id: 7,
    question: '¿Cuál de estas acciones muestra que eres un peatón responsable?',
    options: ['Caminar por el andén.', 'Jugar en la calle.', 'Correr entre los carros.'],
    correctAnswer: 'Caminar por el andén.',
    explanation: 'El andén es el lugar seguro para peatones; jugar en la calle es peligroso.'
  },
  {
    id: 8,
    question: 'Cuando caminas con un adulto, ¿qué es importante hacer?',
    options: [
      'Ir siempre delante del adulto y correr.',
      'Tomar la mano del adulto y cruzar juntos con precaución.',
      'Separarse y cruzar en diferentes lugares.'
    ],
    correctAnswer: 'Tomar la mano del adulto y cruzar juntos con precaución.',
    explanation: 'Tomar la mano ayuda a mantener a los niños seguros y a cruzar de manera ordenada.'
  }
];

const PedestrianIntroQuiz = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          toast.info('Puedes realizar el quiz sin iniciar sesión');
          setStudentId(null);
        } else {
          setStudentId(user.id);
        }

        if (routeId) {
          const { data: routeData, error: routeError } = await supabase
            .from('routes')
            .select('course_id')
            .eq('id', routeId)
            .single();

          if (!routeError && routeData) setCourseId(routeData.course_id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [routeId]);

  useEffect(() => {
    if (!finished) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, finished]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-lg">Cargando quiz...</div>
      </div>
    );
  }

  const question = QUESTIONS[current];
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (opt: string) => {
    if (showExplanation) return;
    setSelected(opt);
    const isCorrect = opt === question.correctAnswer;
    setShowExplanation(true);
    if (isCorrect) {
      setScore(prev => prev + 100 / QUESTIONS.length);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelected(null);
    if (current < QUESTIONS.length - 1) {
      setCurrent(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleCompleteLevel = async () => {
    if (!studentId || !routeId) {
      if (courseId) {
        navigate(`/student/course/${courseId}`);
      } else {
        navigate('/courses');
      }
      return;
    }

    try {
      const accuracy = Math.round((correctCount / QUESTIONS.length) * 100);
      const finalScore = Math.round(score); // Convertir a entero
      
      const { error } = await supabase
        .from('student_progress')
        .upsert(
          {
            student_id: studentId,
            route_id: routeId,
            score: finalScore,
            completed: true,
            best_accuracy_percentage: accuracy,
            completion_date: new Date().toISOString(),
          },
          { onConflict: 'student_id,route_id' }
        );

      if (error) throw error;

      toast.success('Nivel completado exitosamente');
      
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

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setCorrectCount(0);
    setFinished(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

  if (finished) {
    const accuracy = Math.round((correctCount / QUESTIONS.length) * 100);
    const passed = accuracy >= 70;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className={`p-8 text-white ${passed ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-amber-600 to-orange-600'}`}>
              <div className="flex items-center justify-center mb-4">
                {passed ? (
                  <Award className="w-20 h-20" />
                ) : (
                  <AlertCircle className="w-20 h-20" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {passed ? 'Evaluación Aprobada' : 'Evaluación No Superada'}
              </h1>
              <p className="text-center text-white/90">
                {passed 
                  ? 'Has demostrado un conocimiento adecuado sobre seguridad vial peatonal'
                  : 'Es necesario reforzar los conceptos de seguridad vial'}
              </p>
            </div>

            {/* Stats */}
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{accuracy}%</div>
                  <div className="text-sm text-slate-600">Precisión</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{correctCount}/{QUESTIONS.length}</div>
                  <div className="text-sm text-slate-600">Correctas</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-slate-600">Tiempo</div>
                </div>
              </div>

              {/* Score bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Puntuación Final</span>
                  <span className="text-sm font-bold text-slate-900">{score.toFixed(1)}/100</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${passed ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={restart}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reintentar
                </button>
                <button
                  onClick={handleCompleteLevel}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Seguridad Vial</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{score.toFixed(0)}</div>
            <div className="text-xs text-white/70">puntos</div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Progress */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/90 font-medium">
                Pregunta {current + 1} de {QUESTIONS.length}
              </span>
              <span className="text-white font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((opt, idx) => {
                const isSelected = selected === opt;
                const isCorrect = opt === question.correctAnswer;
                
                let className = 'w-full p-5 rounded-xl text-left transition-all border-2 font-medium ';
                
                if (showExplanation) {
                  if (isCorrect) {
                    className += 'bg-emerald-50 border-emerald-500 text-emerald-900';
                  } else if (isSelected && !isCorrect) {
                    className += 'bg-red-50 border-red-500 text-red-900';
                  } else {
                    className += 'bg-slate-50 border-slate-200 text-slate-400';
                  }
                } else {
                  className += isSelected 
                    ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-md' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300 hover:shadow-md cursor-pointer';
                }

                return (
                  <button
                    key={idx}
                    className={className}
                    onClick={() => handleSelect(opt)}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                          showExplanation && isCorrect ? 'bg-emerald-500 text-white' :
                          showExplanation && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                          isSelected ? 'bg-blue-500 text-white' :
                          'bg-slate-200 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-slate-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Explicación</div>
                    <p className="text-slate-700 leading-relaxed">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {showExplanation ? (
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {current < QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 px-6 py-4 bg-slate-100 text-slate-400 font-semibold rounded-xl cursor-not-allowed"
                >
                  Selecciona una respuesta
                </button>
              )}
              <button
                onClick={restart}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedestrianIntroQuiz;
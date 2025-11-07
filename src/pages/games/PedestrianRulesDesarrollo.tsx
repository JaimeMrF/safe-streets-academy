import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  CheckCircle, XCircle, ArrowRight, Play, BookOpen, 
  Trophy, AlertTriangle, MapPin, Eye, Brain, Lightbulb, RotateCcw
} from 'lucide-react';

type InteractiveScenario = {
  id: number;
  title: string;
  context: string;
  description: string;
  visualElements: {
    trafficLight?: 'red' | 'yellow' | 'green' | 'none';
    vehicles: number;
    pedestrians: number;
    weather: 'clear' | 'rain' | 'fog';
    timeOfDay: 'day' | 'night';
  };
  challenges: {
    question: string;
    type: 'multiple-choice' | 'true-false' | 'sequence';
    options: string[];
    correctAnswer: string | string[];
    explanation: string;
    safetyTip: string;
  }[];
};

const SCENARIOS: InteractiveScenario[] = [
  {
    id: 1,
    title: 'Cruce escolar en hora pico',
    context: 'Son las 7:30 AM. Te diriges a tu institución educativa y debes cruzar una avenida principal con alto flujo vehicular.',
    description: 'La zona cuenta con señalización completa: semáforo peatonal, paso de cebra y señal de zona escolar. Observas varios estudiantes esperando para cruzar.',
    visualElements: {
      trafficLight: 'red',
      vehicles: 4,
      pedestrians: 5,
      weather: 'clear',
      timeOfDay: 'day'
    },
    challenges: [
      {
        question: 'El semáforo peatonal está en rojo. Un grupo de estudiantes comienza a cruzar porque "no vienen carros". ¿Cuál es la acción correcta?',
        type: 'multiple-choice',
        options: [
          'Seguir al grupo para no quedarme solo',
          'Esperar la luz verde independientemente de lo que hagan otros',
          'Cruzar rápido para alcanzar al grupo',
          'Gritarles que regresen'
        ],
        correctAnswer: 'Esperar la luz verde independientemente de lo que hagan otros',
        explanation: 'El comportamiento seguro no depende de las acciones de otros. Cruzar con luz roja, aunque no se vean vehículos, es una infracción que pone en riesgo tu vida. Los vehículos pueden aparecer súbitamente a alta velocidad.',
        safetyTip: 'Sé un líder de seguridad: tu ejemplo puede prevenir que otros tomen riesgos innecesarios.'
      },
      {
        question: 'El semáforo cambia a verde para peatones. Antes de cruzar, debes verificar tres elementos críticos. ¿Cuáles son?',
        type: 'multiple-choice',
        options: [
          'Que haya otros peatones, que no llueva, que sea de día',
          'Que los vehículos se hayan detenido, contacto visual con conductores, que no vengan vehículos girando',
          'Que el semáforo funcione, que haya policía, que no haya ambulancias',
          'Que todos crucen al mismo tiempo, que haya paso de cebra, que no haya bicicletas'
        ],
        correctAnswer: 'Que los vehículos se hayan detenido, contacto visual con conductores, que no vengan vehículos girando',
        explanation: 'La luz verde es una autorización, no una garantía de seguridad absoluta. Debes verificar que los vehículos efectivamente se detuvieron, establecer contacto visual para confirmar que los conductores te vieron, y revisar que no haya vehículos realizando giros que podrían interceptar tu paso.',
        safetyTip: 'El principio de "ver y ser visto" es fundamental: asegúrate de que los conductores te hayan identificado antes de cruzar.'
      }
    ]
  },
  {
    id: 2,
    title: 'Condiciones de visibilidad reducida',
    context: 'Es una tarde lluviosa (18:00 hrs). La visibilidad está comprometida por la lluvia y la luz natural disminuida.',
    description: 'Necesitas cruzar para tomar el transporte público. Usas ropa oscura y no llevas elementos reflectantes. Los vehículos tienen las luces encendidas.',
    visualElements: {
      trafficLight: 'green',
      vehicles: 3,
      pedestrians: 2,
      weather: 'rain',
      timeOfDay: 'night'
    },
    challenges: [
      {
        question: 'Bajo condiciones de lluvia y poca luz, ¿qué afirmación sobre visibilidad es CORRECTA?',
        type: 'true-false',
        options: [
          'VERDADERO: Los conductores pueden verme igual que en condiciones normales porque tienen luces',
          'FALSO: Mi visibilidad se reduce hasta un 70% para los conductores bajo estas condiciones'
        ],
        correctAnswer: 'FALSO: Mi visibilidad se reduce hasta un 70% para los conductores bajo estas condiciones',
        explanation: 'La combinación de lluvia, poca luz y ropa oscura reduce dramáticamente tu visibilidad. Los parabrisas mojados distorsionan la visión, las gotas reflejan las luces creando deslumbramiento, y el tiempo de reacción de los conductores aumenta significativamente.',
        safetyTip: 'Usa ropa de colores claros o elementos reflectantes cuando las condiciones de luz sean deficientes.'
      },
      {
        question: 'En orden correcto, ¿cuál es la secuencia de acciones para cruzar de forma segura bajo lluvia?',
        type: 'sequence',
        options: [
          '1) Buscar contacto visual intensificado, 2) Verificar que vehículos reduzcan velocidad, 3) Cruzar con paso firme sin correr, 4) Mantener atención hasta completar el cruce',
          '1) Esperar que pare de llover, 2) Cruzar rápido, 3) No mirar a los conductores, 4) Correr',
          '1) Cruzar inmediatamente, 2) Ver el celular, 3) Correr, 4) No verificar tráfico',
          '1) Esperar otros peatones, 2) Seguir al grupo, 3) Confiar en el semáforo, 4) Caminar normal'
        ],
        correctAnswer: '1) Buscar contacto visual intensificado, 2) Verificar que vehículos reduzcan velocidad, 3) Cruzar con paso firme sin correr, 4) Mantener atención hasta completar el cruce',
        explanation: 'Bajo condiciones adversas, cada paso del protocolo de seguridad debe intensificarse. El contacto visual es más crítico, debes asegurarte de que los conductores redujeron velocidad (no solo se detuvieron), cruzar sin correr para evitar caídas en piso mojado, y mantener la atención completa porque las condiciones pueden cambiar durante el cruce.',
        safetyTip: 'En superficies mojadas, correr aumenta 8 veces el riesgo de caídas. Camina con pasos firmes y deliberados.'
      }
    ]
  },
  {
    id: 3,
    title: 'Tecnología y distracción peatonal',
    context: 'Caminas por una zona urbana transitada usando audífonos mientras revisas tu teléfono móvil.',
    description: 'La música en tus audífonos está a volumen alto. Estás respondiendo mensajes mientras caminas. Te aproximas a un cruce vehicular.',
    visualElements: {
      trafficLight: 'yellow',
      vehicles: 2,
      pedestrians: 3,
      weather: 'clear',
      timeOfDay: 'day'
    },
    challenges: [
      {
        question: 'Estudios neurológicos demuestran que usar el teléfono mientras caminas reduce tu atención al entorno en:',
        type: 'multiple-choice',
        options: [
          'Aproximadamente 10-15%',
          'Aproximadamente 25-30%',
          'Aproximadamente 40-50%',
          'Aproximadamente 60-70%'
        ],
        correctAnswer: 'Aproximadamente 40-50%',
        explanation: 'La investigación en neurociencia cognitiva demuestra que el uso de teléfonos móviles genera "ceguera por falta de atención": tu cerebro procesa las imágenes visuales pero no las interpreta porque está concentrado en la tarea del teléfono. Esto reduce tu campo visual efectivo y tu tiempo de reacción ante peligros.',
        safetyTip: 'El concepto de "multitarea" es un mito neurológico: tu cerebro alterna rápidamente entre tareas, no las procesa simultáneamente.'
      },
      {
        question: '¿Cuál es el protocolo correcto respecto al uso de dispositivos móviles en zonas de tráfico?',
        type: 'multiple-choice',
        options: [
          'Reducir el volumen de los audífonos a la mitad',
          'Mirar el teléfono solo cuando el semáforo está en verde',
          'Guardar el dispositivo completamente y quitar los audífonos antes de zonas de cruce',
          'Usar solo un audífono para mantener un oído libre'
        ],
        correctAnswer: 'Guardar el dispositivo completamente y quitar los audífonos antes de zonas de cruce',
        explanation: 'Los cruces vehiculares son "zonas de máxima atención requerida". Ningún nivel de uso de dispositivos es seguro en estas áreas. Los audífonos bloquean señales auditivas críticas (bocinas, sirenas, motores acercándose). La única práctica segura es la desconexión total de dispositivos.',
        safetyTip: 'Trata los cruces vehiculares como "zonas libres de tecnología": 30 segundos de atención completa pueden salvar tu vida.'
      }
    ]
  },
  {
    id: 4,
    title: 'Evaluación de riesgo en intersecciones complejas',
    context: 'Intersección de cuatro vías con semáforo vehicular y peatonal. Múltiples carriles en cada dirección.',
    description: 'Observas vehículos en diferentes carriles: algunos van directo, otros giran. Hay ciclistas y motociclistas mezclados con el tráfico.',
    visualElements: {
      trafficLight: 'green',
      vehicles: 6,
      pedestrians: 4,
      weather: 'clear',
      timeOfDay: 'day'
    },
    challenges: [
      {
        question: 'En intersecciones complejas, ¿qué elemento representa el MAYOR riesgo para peatones?',
        type: 'multiple-choice',
        options: [
          'Vehículos que van en línea recta con luz verde',
          'Vehículos que realizan giros (especialmente giros a la derecha)',
          'Peatones que cruzan en dirección contraria',
          'Semáforos que cambian de color'
        ],
        correctAnswer: 'Vehículos que realizan giros (especialmente giros a la derecha)',
        explanation: 'Las estadísticas de accidentalidad muestran que el 43% de atropellos en intersecciones ocurren con vehículos girando. Los conductores están concentrados en el tráfico vehicular, no en peatones. Los giros a la derecha son especialmente peligrosos porque el conductor mira hacia la izquierda (tráfico que viene) mientras gira hacia donde estás cruzando.',
        safetyTip: 'Nunca asumas que un conductor que gira te ha visto. Espera confirmación visual antes de continuar.'
      },
      {
        question: 'Tienes luz verde peatonal. Un vehículo en el carril derecho tiene su señal de giro activada. ¿Cuál es la secuencia correcta?',
        type: 'sequence',
        options: [
          '1) Establecer contacto visual con el conductor, 2) Verificar que el vehículo se detuvo completamente, 3) Cruzar manteniendo vigilancia del vehículo, 4) No asumir que otros peatones fueron vistos',
          '1) Cruzar inmediatamente porque tengo luz verde, 2) Ignorar el vehículo, 3) Caminar rápido, 4) Ver el celular',
          '1) Esperar que el vehículo termine de girar, 2) Seguir esperando, 3) Perder mi turno, 4) Esperar el siguiente ciclo',
          '1) Gritarle al conductor, 2) Cruzar enojado, 3) No prestar atención, 4) Culpar al conductor'
        ],
        correctAnswer: '1) Establecer contacto visual con el conductor, 2) Verificar que el vehículo se detuvo completamente, 3) Cruzar manteniendo vigilancia del vehículo, 4) No asumir que otros peatones fueron vistos',
        explanation: 'Este protocolo equilibra tu derecho de paso con la realidad de los riesgos. El contacto visual confirma que fuiste identificado, la detención completa garantiza tiempo de reacción, mantener vigilancia permite responder si el conductor comete un error, y entender que cada peatón debe ser visto individualmente (no en grupo) previene asunciones peligrosas.',
        safetyTip: 'En intersecciones complejas, tu seguridad requiere "defensa activa": anticipar, verificar y mantener opciones de escape.'
      }
    ]
  },
  {
    id: 5,
    title: 'Responsabilidad social y modelamiento',
    context: 'Vas acompañado de un hermano menor (8 años). Se acercan a un cruce con semáforo.',
    description: 'El semáforo peatonal está en rojo pero no se observan vehículos próximos. Tu hermano pregunta "¿por qué esperamos si no vienen carros?"',
    visualElements: {
      trafficLight: 'red',
      vehicles: 0,
      pedestrians: 2,
      weather: 'clear',
      timeOfDay: 'day'
    },
    challenges: [
      {
        question: '¿Cuál es la respuesta más educativa y responsable para tu hermano menor?',
        type: 'multiple-choice',
        options: [
          '"Porque hay cámaras y nos pueden multar"',
          '"Porque las reglas son las reglas y hay que obedecerlas"',
          '"Esperamos porque los vehículos pueden aparecer de repente y no dan tiempo a reaccionar. Cruzar con rojo enseña hábitos peligrosos que pueden causar accidentes después"',
          '"No sé, simplemente hay que esperar"'
        ],
        correctAnswer: '"Esperamos porque los vehículos pueden aparecer de repente y no dan tiempo a reaccionar. Cruzar con rojo enseña hábitos peligrosos que pueden causar accidentes después"',
        explanation: 'La educación en seguridad vial debe basarse en la comprensión de consecuencias, no en el miedo al castigo o la obediencia ciega. Explicar el razonamiento desarrolla pensamiento crítico y permite que la persona tome decisiones seguras incluso cuando no hay supervisión. Los niños imitan comportamientos, no palabras.',
        safetyTip: 'Estudios muestran que los niños replican el 87% de los comportamientos viales de sus referentes cercanos, no lo que se les dice verbalmente.'
      },
      {
        question: 'VERDADERO o FALSO: Cruzar con luz roja "solo una vez" cuando no vienen carros no afecta la formación de hábitos de seguridad.',
        type: 'true-false',
        options: [
          'VERDADERO: Una vez no hace diferencia',
          'FALSO: Cada acción refuerza patrones neurológicos que se vuelven automáticos'
        ],
        correctAnswer: 'FALSO: Cada acción refuerza patrones neurológicos que se vuelven automáticos',
        explanation: 'La neurociencia del aprendizaje demuestra que los hábitos se forman por repetición y refuerzo. Cada vez que cruzas con luz roja, tu cerebro registra "no pasa nada malo", reforzando ese comportamiento. Eventualmente se vuelve automático y lo harás incluso cuando SÍ haya peligro, porque el cerebro ya estableció el patrón de "cruzar con rojo es seguro".',
        safetyTip: 'La consistencia en comportamientos seguros no es rigidez, es la base neurológica de la supervivencia.'
      }
    ]
  }
];

const PedestrianRulesDesarrollo = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [started, setStarted] = useState(false);

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

  const scenario = SCENARIOS[currentScenario];
  const challenge = scenario.challenges[currentChallenge];
  const totalChallenges = SCENARIOS.reduce((sum, s) => sum + s.challenges.length, 0);
  const completedChallenges = SCENARIOS.slice(0, currentScenario).reduce((sum, s) => sum + s.challenges.length, 0) + currentChallenge;

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === challenge.correctAnswer) {
      const points = Math.round(100 / totalChallenges);
      setScore(prev => prev + points);
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentChallenge < scenario.challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setCurrentChallenge(0);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      setGameComplete(true);
    }
  };

  const calculateAccuracy = () => {
    return Math.round((correctAnswers / totalChallenges) * 100);
  };

  const handleComplete = async () => {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 70;

    if (!passed) {
      toast.warning('Se requiere mínimo 70% de precisión para aprobar');
      setTimeout(() => restart(), 1500);
      return;
    }

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
      
      toast.success('¡Nivel completado exitosamente!');
      
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
    setCurrentScenario(0);
    setCurrentChallenge(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setScore(0);
    setCorrectAnswers(0);
    setGameComplete(false);
    setStarted(false);
  };

  const getWeatherIcon = (weather: string) => {
    if (weather === 'rain') return '🌧️';
    if (weather === 'fog') return '🌫️';
    return '☀️';
  };

  const getTimeIcon = (time: string) => {
    return time === 'night' ? '🌙' : '☀️';
  };

  // Pantalla de inicio
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Reglas del Peatón - Desarrollo</h1>
              </div>
              <p className="text-indigo-100 text-lg">Situaciones complejas y toma de decisiones - Secundaria</p>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Competencias a desarrollar</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <Eye className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Evaluación de riesgos</h3>
                      <p className="text-sm text-slate-600">Analizar factores múltiples en situaciones complejas</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <Brain className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Pensamiento crítico</h3>
                      <p className="text-sm text-slate-600">Tomar decisiones fundamentadas bajo presión</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Adaptabilidad contextual</h3>
                      <p className="text-sm text-slate-600">Ajustar comportamiento según condiciones variables</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                    <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Liderazgo responsable</h3>
                      <p className="text-sm text-slate-600">Modelar comportamientos seguros para otros</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-8">
                <h3 className="font-semibold text-indigo-900 mb-3">Características del nivel</h3>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    <span>{SCENARIOS.length} escenarios interactivos con múltiples desafíos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    <span>Situaciones que integran factores climáticos, temporales y tecnológicos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    <span>Análisis de casos basados en estadísticas reales de accidentalidad</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    <span>Retroalimentación detallada con fundamento científico</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600">•</span>
                    <span>Requiere 70% de precisión para aprobar</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Iniciar nivel de desarrollo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (gameComplete) {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden">
            <div className={`p-8 text-white ${passed ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-amber-600 to-orange-600'}`}>
              <div className="flex items-center justify-center mb-4">
                {passed ? (
                  <Trophy className="w-16 h-16" />
                ) : (
                  <AlertTriangle className="w-16 h-16" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {passed ? 'Nivel Desarrollo Completado' : 'Nivel Finalizado'}
              </h1>
              <p className="text-center text-white/90">
                {passed 
                  ? 'Has demostrado competencia en análisis de situaciones complejas'
                  : 'Revisa los conceptos y fortalece tu pensamiento crítico'}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-indigo-50 rounded-lg p-5 text-center border border-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{accuracy}%</div>
                  <div className="text-sm text-slate-600">Precisión</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-5 text-center border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{correctAnswers}/{totalChallenges}</div>
                  <div className="text-sm text-slate-600">Correctas</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-5 text-center border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{score}</div>
                  <div className="text-sm text-slate-600">Puntuación</div>
                </div>
              </div>

              {passed && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">Competencias Desarrolladas</h4>
                      <p className="text-sm text-gray-700">
                        Has completado exitosamente el análisis de situaciones complejas. Tu capacidad de evaluación de riesgos y toma de decisiones está consolidada.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!passed && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 mb-1">Refuerzo Necesario</h4>
                      <p className="text-sm text-gray-700">
                        Se requiere 70% de precisión. Revisa las explicaciones de cada situación y refuerza tu comprensión de los principios de seguridad.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={restart}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reintentar nivel
                </button>
                {passed && (
                  <button
                    onClick={handleComplete}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Finalizar y Continuar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Juego principal
  const progress = ((completedChallenges + 1) / totalChallenges) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header con progreso */}
        <div className="bg-white rounded-lg shadow-sm border border-indigo-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm font-medium text-slate-700">
                Escenario {currentScenario + 1}/{SCENARIOS.length} - Desafío {currentChallenge + 1}/{scenario.challenges.length}
              </span>
              <div className="text-xs text-slate-500 mt-1">
                Progreso total: {completedChallenges + 1}/{totalChallenges} desafíos
              </div>
            </div>
            <span className="text-sm font-semibold text-indigo-600">
              Puntos: {score}
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel izquierdo: Contexto del escenario */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-indigo-100 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">{scenario.title}</h2>
              <div className="space-y-3">
                <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                  <p className="text-sm font-medium text-indigo-900 mb-1">Contexto</p>
                  <p className="text-sm text-slate-700">{scenario.context}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                  <p className="text-sm font-medium text-purple-900 mb-1">Descripción</p>
                  <p className="text-sm text-slate-700">{scenario.description}</p>
                </div>
              </div>
            </div>

            {/* Visualización del entorno */}
            <div className="bg-white rounded-lg shadow-sm border border-indigo-100 p-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Condiciones del entorno</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Semáforo</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    scenario.visualElements.trafficLight === 'red' ? 'bg-red-100 text-red-700' :
                    scenario.visualElements.trafficLight === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    scenario.visualElements.trafficLight === 'green' ? 'bg-green-100 text-green-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {scenario.visualElements.trafficLight === 'none' ? 'Sin semáforo' : 
                     scenario.visualElements.trafficLight?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Vehículos</span>
                  <span className="text-sm font-medium">🚗 {scenario.visualElements.vehicles}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Peatones</span>
                  <span className="text-sm font-medium">🚶 {scenario.visualElements.pedestrians}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Clima</span>
                  <span className="text-sm font-medium">{getWeatherIcon(scenario.visualElements.weather)} {
                    scenario.visualElements.weather === 'rain' ? 'Lluvia' :
                    scenario.visualElements.weather === 'fog' ? 'Niebla' : 'Despejado'
                  }</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Hora</span>
                  <span className="text-sm font-medium">{getTimeIcon(scenario.visualElements.timeOfDay)} {
                    scenario.visualElements.timeOfDay === 'night' ? 'Noche' : 'Día'
                  }</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel derecho: Desafío y opciones */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-indigo-100 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-indigo-100 rounded-lg p-2">
                  <Brain className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{challenge.question}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    {challenge.type === 'multiple-choice' ? 'Selección múltiple' :
                     challenge.type === 'true-false' ? 'Verdadero o Falso' :
                     'Secuencia correcta'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {challenge.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === challenge.correctAnswer;
                  
                  let className = 'w-full p-4 rounded-lg text-left transition-all border-2 ';
                  
                  if (showFeedback) {
                    if (isCorrect) {
                      className += 'bg-emerald-50 border-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      className += 'bg-red-50 border-red-500';
                    } else {
                      className += 'bg-slate-50 border-slate-200 opacity-50';
                    }
                  } else {
                    className += isSelected 
                      ? 'bg-indigo-100 border-indigo-400' 
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer';
                  }

                  return (
                    <button
                      key={index}
                      className={className}
                      onClick={() => handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm text-slate-800 leading-relaxed">{option}</span>
                        {showFeedback && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {showFeedback && (
              <div className="bg-white rounded-lg shadow-sm border border-indigo-100 p-6">
                <div className={`p-4 rounded-lg mb-4 ${selectedAnswer === challenge.correctAnswer ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === challenge.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedAnswer === challenge.correctAnswer ? 'Respuesta correcta' : 'Respuesta incorrecta'}
                    </p>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{challenge.explanation}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-semibold text-blue-900">Consejo de seguridad</p>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">{challenge.safetyTip}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {currentChallenge < scenario.challenges.length - 1 ? 'Siguiente desafío' :
                   currentScenario < SCENARIOS.length - 1 ? 'Siguiente escenario' : 'Ver resultados'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedestrianRulesDesarrollo;
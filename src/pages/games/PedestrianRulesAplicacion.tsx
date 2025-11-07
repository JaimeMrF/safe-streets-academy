import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Play, Trophy, AlertTriangle, ArrowRight, Clock, 
  Eye, Target, Shield, Zap, Award, RotateCcw,
  CheckCircle, XCircle, TrendingUp, Brain
} from 'lucide-react';

type Action = {
  id: string;
  label: string;
  correct: boolean;
  points: number;
  consequence: string;
  icon: string;
};

type SimulationScenario = {
  id: number;
  title: string;
  location: string;
  situation: string;
  timeLimit: number;
  visualState: {
    trafficLight: 'red' | 'yellow' | 'green';
    vehicles: Array<{ type: string; position: number; speed: string }>;
    pedestrians: number;
    weather: 'clear' | 'rain';
    hazards: string[];
  };
  actions: Action[];
  optimalAction: string;
  safetyScore: number;
  learningPoint: string;
};

const SCENARIOS: SimulationScenario[] = [
  {
    id: 1,
    title: 'Cruce Matutino - Zona Escolar',
    location: 'Avenida Principal con Calle 15',
    situation: 'Es hora pico. El semáforo está a punto de cambiar. Varios estudiantes comienzan a cruzar anticipadamente.',
    timeLimit: 8,
    visualState: {
      trafficLight: 'yellow',
      vehicles: [
        { type: '🚗', position: 30, speed: 'alta' },
        { type: '🚌', position: 50, speed: 'media' }
      ],
      pedestrians: 6,
      weather: 'clear',
      hazards: ['Presión grupal', 'Prisa', 'Vehículos acercándose']
    },
    actions: [
      {
        id: 'a1',
        label: 'Cruzar rápido con el grupo antes que cambie',
        correct: false,
        points: -15,
        consequence: 'RIESGO CRÍTICO: Un vehículo que no alcanza a frenar te pasa muy cerca. El conductor toca el claxon furioso.',
        icon: '⚠️'
      },
      {
        id: 'a2',
        label: 'Esperar en la acera hasta la luz verde completa',
        correct: true,
        points: 20,
        consequence: 'DECISIÓN SEGURA: Esperas pacientemente. El semáforo cambia a verde, verificas que los vehículos se detuvieron y cruzas con seguridad.',
        icon: '✅'
      },
      {
        id: 'a3',
        label: 'Cruzar por fuera del paso de cebra',
        correct: false,
        points: -20,
        consequence: 'RIESGO MÁXIMO: Sales de la zona protegida. Un ciclista que no te esperaba tiene que frenar bruscamente para evitarte.',
        icon: '❌'
      },
      {
        id: 'a4',
        label: 'Hacer contacto visual con conductores y avanzar',
        correct: false,
        points: -10,
        consequence: 'RIESGO MODERADO: Aunque haces contacto visual, la luz amarilla significa "no cruzar". Un conductor acelera para pasar.',
        icon: '⚡'
      }
    ],
    optimalAction: 'a2',
    safetyScore: 100,
    learningPoint: 'La luz amarilla NO es permiso para apresurarse. Tu seguridad no depende de la prisa de otros.'
  },
  {
    id: 2,
    title: 'Tarde Lluviosa - Visibilidad Reducida',
    location: 'Carrera 27 con Calle 45',
    situation: 'Llueve intensamente. Usas paraguas y audífonos. El semáforo está verde para peatones pero la visibilidad es muy baja.',
    timeLimit: 10,
    visualState: {
      trafficLight: 'green',
      vehicles: [
        { type: '🚗', position: 40, speed: 'media' },
        { type: '🏍️', position: 20, speed: 'alta' }
      ],
      pedestrians: 3,
      weather: 'rain',
      hazards: ['Lluvia intensa', 'Audífonos puestos', 'Parabrisas empañados', 'Visibilidad 30%']
    },
    actions: [
      {
        id: 'b1',
        label: 'Cruzar inmediatamente, tengo luz verde',
        correct: false,
        points: -15,
        consequence: 'PELIGRO: Una motocicleta con el parabrisas empañado no te ve a tiempo. Frena derrapando muy cerca de ti.',
        icon: '🏍️'
      },
      {
        id: 'b2',
        label: 'Quitarme audífonos, verificar 3 veces y cruzar alerta',
        correct: true,
        points: 25,
        consequence: 'EXCELENTE: Al quitar audífonos escuchas el motor acelerando. Verificas que TODOS los vehículos te vieron y cruzas con máxima atención.',
        icon: '👂'
      },
      {
        id: 'b3',
        label: 'Bajar el paraguas para ver mejor y cruzar',
        correct: false,
        points: -5,
        consequence: 'RIESGO: Mejoras tu visión pero te mojas y los conductores tampoco te ven bien. Un carro pasa cerca salpicando agua.',
        icon: '☔'
      },
      {
        id: 'b4',
        label: 'Esperar que pare de llover',
        correct: false,
        points: 0,
        consequence: 'POCO PRÁCTICO: Pierdes mucho tiempo. La solución no es evitar condiciones adversas sino aprender a manejarias de forma segura.',
        icon: '⏰'
      }
    ],
    optimalAction: 'b2',
    safetyScore: 100,
    learningPoint: 'Luz verde + condiciones adversas = multiplicar precauciones. Los audífonos eliminan tu capacidad de detectar peligros auditivos.'
  },
  {
    id: 3,
    title: 'Intersección Compleja - Múltiples Carriles',
    location: 'Avenida Quebracho con Calle 56',
    situation: 'Intersección de 6 carriles. Tienes luz verde pero varios vehículos están girando a la derecha desde diferentes carriles.',
    timeLimit: 12,
    visualState: {
      trafficLight: 'green',
      vehicles: [
        { type: '🚗', position: 25, speed: 'baja' },
        { type: '🚙', position: 35, speed: 'baja' },
        { type: '🚐', position: 45, speed: 'media' }
      ],
      pedestrians: 4,
      weather: 'clear',
      hazards: ['3 vehículos girando', 'Conductor mirando GPS', 'Punto ciego de camioneta']
    },
    actions: [
      {
        id: 'c1',
        label: 'Avanzar confiado, yo tengo preferencia',
        correct: false,
        points: -20,
        consequence: 'CRÍTICO: Un conductor distraído con el GPS gira sin verte. Tienes que retroceder rápidamente. Casi hay contacto.',
        icon: '📱'
      },
      {
        id: 'c2',
        label: 'Hacer contacto visual con CADA conductor antes de avanzar',
        correct: true,
        points: 30,
        consequence: 'ÓPTIMO: Esperas a que cada conductor te vea y confirme con un gesto. Cruzas por secciones, verificando cada carril. Seguridad total.',
        icon: '👁️'
      },
      {
        id: 'c3',
        label: 'Cruzar rápido entre los vehículos',
        correct: false,
        points: -15,
        consequence: 'ALTO RIESGO: Al acelerar no ves que hay un tercer vehículo en el punto ciego de la camioneta. Casi chocan contigo.',
        icon: '⚡'
      },
      {
        id: 'c4',
        label: 'Levantar la mano señalizando que voy a cruzar',
        correct: false,
        points: 5,
        consequence: 'INSUFICIENTE: Aunque señalizas, no verificas que te vieron. Un conductor sigue mirando su GPS. Es mejor el contacto visual directo.',
        icon: '✋'
      }
    ],
    optimalAction: 'c2',
    safetyScore: 100,
    learningPoint: 'En intersecciones complejas: un contacto visual por cada carril. Tu derecho de paso no garantiza tu seguridad.'
  },
  {
    id: 4,
    title: 'Tecnología vs Seguridad',
    location: 'Carrera 33 - Zona Comercial',
    situation: 'Recibes una notificación urgente. Estás a 3 metros del cruce. El semáforo está verde pero hay tráfico mezclado.',
    timeLimit: 6,
    visualState: {
      trafficLight: 'green',
      vehicles: [
        { type: '🚗', position: 30, speed: 'media' },
        { type: '🚴', position: 15, speed: 'alta' }
      ],
      pedestrians: 2,
      weather: 'clear',
      hazards: ['Notificación urgente', 'Ciclista rápido', 'Distracción digital']
    },
    actions: [
      {
        id: 'd1',
        label: 'Ver el mensaje rápido mientras cruzo',
        correct: false,
        points: -25,
        consequence: 'EXTREMO PELIGRO: Tu cerebro no procesa el ciclista que viene a alta velocidad. Chocas con él. Ambos caen. Lesiones moderadas.',
        icon: '💥'
      },
      {
        id: 'd2',
        label: 'Guardar el teléfono y cruzar con atención completa',
        correct: true,
        points: 25,
        consequence: 'DECISIÓN PERFECTA: Guardas el teléfono. Detectas al ciclista a tiempo, esperas que pase, y cruzas seguro. El mensaje puede esperar.',
        icon: '🎯'
      },
      {
        id: 'd3',
        label: 'Detenerme en medio del cruce para leer',
        correct: false,
        points: -30,
        consequence: 'PELIGRO CRÍTICO: Te detienes en la zona de conflicto. Un automóvil frena de emergencia. Provocas un casi-accidente múltiple.',
        icon: '🚨'
      },
      {
        id: 'd4',
        label: 'Contestar con mensaje de voz mientras camino',
        correct: false,
        points: -20,
        consequence: 'ALTO RIESGO: Aunque no miras el teléfono, tu atención cognitiva está dividida. No detectas cambios en el tráfico.',
        icon: '🎤'
      }
    ],
    optimalAction: 'd2',
    safetyScore: 100,
    learningPoint: 'Ningún mensaje vale tu vida. Los cruces son "zonas de desconexión digital" de 15 segundos. Tu cerebro no puede multitarea en situaciones de riesgo.'
  },
  {
    id: 5,
    title: 'Modelamiento Social - Hermano Menor',
    location: 'Avenida Santander - Zona Residencial',
    situation: 'Llevas a tu hermano de 6 años. El semáforo está rojo pero no se ven vehículos. Otros adultos comienzan a cruzar.',
    timeLimit: 10,
    visualState: {
      trafficLight: 'red',
      vehicles: [
        { type: '🚗', position: 80, speed: 'alta' }
      ],
      pedestrians: 5,
      weather: 'clear',
      hazards: ['Presión social', 'Niño observando', 'Vehículo lejano pero rápido']
    },
    actions: [
      {
        id: 'e1',
        label: 'Seguir al grupo para no confundir al niño',
        correct: false,
        points: -20,
        consequence: 'ERROR GRAVE: El vehículo lejano venía a 80 km/h. Llega justo cuando cruzan. El grupo debe correr. Tu hermano aprende: "las reglas se rompen".',
        icon: '👶'
      },
      {
        id: 'e2',
        label: 'Esperar y explicar: "Esperamos porque es más seguro, sin importar lo que hagan otros"',
        correct: true,
        points: 30,
        consequence: 'LIDERAZGO EJEMPLAR: Esperas pacientemente. El semáforo cambia, el vehículo pasa a alta velocidad. Tu hermano aprende: "las reglas me protegen".',
        icon: '🎓'
      },
      {
        id: 'e3',
        label: 'Cruzar pero decirle que normalmente no se hace',
        correct: false,
        points: -15,
        consequence: 'INCONSISTENCIA: Tu hermano aprende que las palabras no coinciden con las acciones. Creará confusión y comportamientos inseguros futuros.',
        icon: '🤷'
      },
      {
        id: 'e4',
        label: 'Regañar a las personas que cruzan',
        correct: false,
        points: -5,
        consequence: 'POCO EFECTIVO: Generas conflicto innecesario. Tu hermano aprende confrontación, no seguridad. La enseñanza efectiva es por ejemplo.',
        icon: '😠'
      }
    ],
    optimalAction: 'e2',
    safetyScore: 100,
    learningPoint: 'Los niños replican el 87% de comportamientos observados. Ser modelo de seguridad es un acto de liderazgo comunitario.'
  }
];

const PedestrianRulesAplicacion = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gamePhase, setGamePhase] = useState<'intro' | 'observing' | 'deciding' | 'feedback' | 'results'>('intro');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [safetyPoints, setSafetyPoints] = useState(0);
  const [decisions, setDecisions] = useState<Array<{ scenario: number; correct: boolean; points: number }>>([]);
  const [started, setStarted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    if (gamePhase === 'deciding' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gamePhase === 'deciding' && timeLeft === 0 && !selectedAction) {
      handleTimeout();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, gamePhase, selectedAction]);

  const scenario = SCENARIOS[currentScenario];

  const startScenario = () => {
    setGamePhase('observing');
    setTimeout(() => {
      setGamePhase('deciding');
      setTimeLeft(scenario.timeLimit);
    }, 3000);
  };

  const handleTimeout = () => {
    toast.error('¡Tiempo agotado! No tomar una decisión también es riesgoso.');
    setSelectedAction('timeout');
    setDecisions(prev => [...prev, { scenario: currentScenario, correct: false, points: -10 }]);
    setTotalScore(prev => prev - 10);
    setTimeout(() => {
      setGamePhase('feedback');
    }, 500);
  };

  const handleActionSelect = (actionId: string) => {
    if (selectedAction || gamePhase !== 'deciding') return;
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setSelectedAction(actionId);
    const action = scenario.actions.find(a => a.id === actionId);
    
    if (action) {
      setTotalScore(prev => prev + action.points);
      if (action.correct) {
        setSafetyPoints(prev => prev + scenario.safetyScore);
      }
      setDecisions(prev => [...prev, { 
        scenario: currentScenario, 
        correct: action.correct, 
        points: action.points 
      }]);
    }
    
    setTimeout(() => {
      setGamePhase('feedback');
    }, 500);
  };

  const handleNext = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAction(null);
      setGamePhase('observing');
      setTimeout(() => {
        setGamePhase('deciding');
        setTimeLeft(SCENARIOS[currentScenario + 1].timeLimit);
      }, 3000);
    } else {
      setGamePhase('results');
    }
  };

  const calculateAccuracy = () => {
    const correctCount = decisions.filter(d => d.correct).length;
    return Math.round((correctCount / SCENARIOS.length) * 100);
  };

  const handleComplete = async () => {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 60;

    if (!passed) {
      toast.warning('Se requiere mínimo 60% de decisiones correctas para aprobar');
      setTimeout(() => restart(), 1500);
      return;
    }

    try {
      const { error: progressError } = await supabase
        .from('student_progress')
        .upsert({
          student_id: studentId,
          route_id: routeId,
          score: totalScore,
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
    setTimeLeft(0);
    setGamePhase('intro');
    setSelectedAction(null);
    setTotalScore(0);
    setSafetyPoints(0);
    setDecisions([]);
    setStarted(false);
  };

  // Pantalla de introducción
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Reglas del Peatón - Aplicación</h1>
              </div>
              <p className="text-emerald-100 text-lg">Simulaciones prácticas en tiempo real - Nivel avanzado</p>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 mb-2">Mecánica del juego</h3>
                    <ul className="space-y-2 text-sm text-amber-800">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>5 simulaciones realistas</strong> de situaciones urbanas complejas</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>Toma de decisiones en tiempo limitado</strong> (6-12 segundos por escenario)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>Consecuencias inmediatas</strong> de cada acción tomada</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>Sistema de puntos de seguridad</strong> que refleja tu criterio</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>60% de decisiones correctas</strong> requeridas para aprobar</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Competencias evaluadas</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Eye className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Evaluación rápida de riesgos</h3>
                      <p className="text-sm text-slate-600">Identificar peligros en segundos</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <Brain className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Toma de decisiones bajo presión</h3>
                      <p className="text-sm text-slate-600">Actuar correctamente con tiempo limitado</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                    <Shield className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Priorización de seguridad</h3>
                      <p className="text-sm text-slate-600">Elegir siempre la opción más segura</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Aplicación práctica</h3>
                      <p className="text-sm text-slate-600">Ejecutar conocimientos en contexto real</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Importante
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-slate-400">▸</span>
                    <span>Cada escenario tiene un <strong>tiempo límite</strong>. No decidir también tiene consecuencias.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-400">▸</span>
                    <span>Las decisiones incorrectas <strong>restan puntos</strong> y muestran consecuencias realistas.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-400">▸</span>
                    <span>Lee cuidadosamente cada situación antes de que inicie el cronómetro.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Comenzar simulación
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (gamePhase === 'results') {
    const accuracy = calculateAccuracy();
    const passed = accuracy >= 60;
    const correctCount = decisions.filter(d => d.correct).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className={`p-8 text-white ${passed ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-amber-600 to-orange-600'}`}>
              <div className="flex items-center justify-center mb-4">
                {passed ? (
                  <Trophy className="w-16 h-16" />
                ) : (
                  <AlertTriangle className="w-16 h-16" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {passed ? '¡Simulación Completada!' : 'Simulación Finalizada'}
              </h1>
              <p className="text-center text-white/90">
                {passed 
                  ? 'Has demostrado capacidad de toma de decisiones seguras'
                  : 'Es necesario mejorar tu criterio de seguridad'}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-emerald-50 rounded-lg p-5 text-center border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{accuracy}%</div>
                  <div className="text-sm text-slate-600">Precisión</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-5 text-center border border-teal-100">
                  <div className="text-3xl font-bold text-teal-600 mb-1">{correctCount}/{SCENARIOS.length}</div>
                  <div className="text-sm text-slate-600">Correctas</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-5 text-center border border-cyan-100">
                  <div className="text-3xl font-bold text-cyan-600 mb-1">{safetyPoints}</div>
                  <div className="text-sm text-slate-600">Pts. Seguridad</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-5 text-center border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{totalScore > 0 ? '+' : ''}{totalScore}</div>
                  <div className="text-sm text-slate-600">Puntuación</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Resumen de decisiones</h3>
                <div className="space-y-3">
                  {decisions.map((decision, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 rounded-lg border ${
                      decision.correct 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        {decision.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-medium text-slate-800">
                          Escenario {idx + 1}: {SCENARIOS[idx].title}
                        </span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        decision.points > 0 ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {decision.points > 0 ? '+' : ''}{decision.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {passed && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">¡Competencia Desarrollada!</h4>
                      <p className="text-sm text-gray-700">
                        Has demostrado capacidad para tomar decisiones seguras bajo presión. Tu criterio de seguridad está bien desarrollado para situaciones urbanas complejas.
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
                      <h4 className="font-bold text-amber-800 mb-1">Práctica Adicional Requerida</h4>
                      <p className="text-sm text-gray-700">
                        Se requiere 60% de decisiones correctas (3/5 escenarios). Revisa las consecuencias de cada acción y practica la evaluación rápida de riesgos.
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
                  Reintentar simulación
                </button>
                {passed && (
                  <button
                    onClick={handleComplete}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
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

  // Fase de observación
  if (gamePhase === 'observing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Escenario {currentScenario + 1} de {SCENARIOS.length}</h2>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Observa atentamente</span>
              </div>
              <p className="text-blue-100 text-sm">{scenario.location}</p>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{scenario.title}</h3>
                <p className="text-lg text-slate-700 leading-relaxed">{scenario.situation}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    Estado visual
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-slate-600">Semáforo</span>
                      <span className={`px-2 py-1 rounded font-medium ${
                        scenario.visualState.trafficLight === 'red' ? 'bg-red-100 text-red-700' :
                        scenario.visualState.trafficLight === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {scenario.visualState.trafficLight.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-slate-600">Clima</span>
                      <span className="font-medium">{scenario.visualState.weather === 'rain' ? '🌧️ Lluvia' : '☀️ Despejado'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-slate-600">Peatones</span>
                      <span className="font-medium">🚶 {scenario.visualState.pedestrians}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-slate-600">Vehículos activos</span>
                      <span className="font-medium">{scenario.visualState.vehicles.length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-5 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Factores de riesgo detectados
                  </h4>
                  <ul className="space-y-2">
                    {scenario.visualState.hazards.map((hazard, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                        <span className="text-red-600 mt-1">⚠️</span>
                        <span>{hazard}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-indigo-700">
                  <Clock className="w-5 h-5 animate-pulse" />
                  <span className="font-medium">Preparándote para tomar decisión en 3 segundos...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fase de decisión
  if (gamePhase === 'deciding') {
    const selectedActionData = selectedAction ? scenario.actions.find(a => a.id === selectedAction) : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header con temporizador crítico */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-emerald-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Escenario {currentScenario + 1}: {scenario.title}</h3>
                <p className="text-sm text-slate-600">{scenario.location}</p>
              </div>
              <div className={`flex items-center gap-3 px-6 py-3 rounded-lg ${
                timeLeft <= 3 ? 'bg-red-100 border-2 border-red-500 animate-pulse' : 
                timeLeft <= 5 ? 'bg-amber-100 border-2 border-amber-500' : 
                'bg-blue-50 border-2 border-blue-300'
              }`}>
                <Clock className={`w-6 h-6 ${
                  timeLeft <= 3 ? 'text-red-600' : 
                  timeLeft <= 5 ? 'text-amber-600' : 
                  'text-blue-600'
                }`} />
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    timeLeft <= 3 ? 'text-red-700' : 
                    timeLeft <= 5 ? 'text-amber-700' : 
                    'text-blue-700'
                  }`}>
                    {timeLeft}
                  </div>
                  <div className="text-xs text-slate-600">segundos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Panel de contexto compacto */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">Situación</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{scenario.situation}</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200 p-4">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4" />
                  Peligros activos
                </h4>
                <div className="space-y-1">
                  {scenario.visualState.hazards.map((hazard, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-red-900">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      <span>{hazard}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                <div className="text-center">
                  <div className="text-sm text-blue-700 font-medium mb-1">Puntuación actual</div>
                  <div className="text-2xl font-bold text-blue-900">{totalScore}</div>
                  <div className="text-xs text-blue-600 mt-1">{safetyPoints} pts de seguridad</div>
                </div>
              </div>
            </div>

            {/* Panel de acciones */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Target className="w-6 h-6 text-emerald-600" />
                    ¿Qué acción tomas?
                  </h3>
                  <p className="text-sm text-slate-600">Selecciona tu decisión antes de que termine el tiempo</p>
                </div>

                <div className="grid gap-4">
                  {scenario.actions.map((action) => {
                    const isSelected = selectedAction === action.id;
                    
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleActionSelect(action.id)}
                        disabled={!!selectedAction}
                        className={`text-left p-5 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-500 scale-105 shadow-lg'
                            : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:scale-102 cursor-pointer'
                        } ${selectedAction && !isSelected ? 'opacity-40' : ''}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-3xl flex-shrink-0">{action.icon}</div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 leading-relaxed">{action.label}</p>
                          </div>
                          {isSelected && (
                            <div className="flex-shrink-0">
                              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                ELEGIDO
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fase de feedback
  if (gamePhase === 'feedback') {
    const action = selectedAction === 'timeout' 
      ? { correct: false, consequence: 'No tomaste una decisión a tiempo. En situaciones reales, la indecisión puede ser tan peligrosa como una mala decisión.', icon: '⏰', points: -10 }
      : scenario.actions.find(a => a.id === selectedAction);

    if (!action) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header de resultado */}
            <div className={`p-8 text-white ${
              action.correct 
                ? 'bg-gradient-to-r from-emerald-600 to-green-600' 
                : 'bg-gradient-to-r from-red-600 to-orange-600'
            }`}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-6xl">{action.icon}</div>
                {action.correct ? (
                  <CheckCircle className="w-16 h-16" />
                ) : (
                  <XCircle className="w-16 h-16" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-center mb-2">
                {action.correct ? '¡Decisión Correcta!' : 'Decisión Incorrecta'}
              </h2>
              <p className="text-center text-white/90 text-lg">
                {action.correct ? 'Actuaste de forma segura y responsable' : 'Esta acción pone en riesgo tu seguridad'}
              </p>
            </div>

            <div className="p-8">
              {/* Consecuencia */}
              <div className={`p-6 rounded-lg mb-6 ${
                action.correct 
                  ? 'bg-green-50 border-2 border-green-300' 
                  : 'bg-red-50 border-2 border-red-300'
              }`}>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Zap className={action.correct ? 'text-green-700' : 'text-red-700'} />
                  <span className={action.correct ? 'text-green-900' : 'text-red-900'}>Consecuencia</span>
                </h3>
                <p className={`leading-relaxed ${action.correct ? 'text-green-900' : 'text-red-900'}`}>
                  {action.consequence}
                </p>
              </div>

              {/* Puntos obtenidos */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className={`p-5 rounded-lg text-center ${
                  action.points > 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="text-sm text-slate-600 mb-1">Puntos de esta decisión</div>
                  <div className={`text-4xl font-bold ${action.points > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                    {action.points > 0 ? '+' : ''}{action.points}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg text-center">
                  <div className="text-sm text-slate-600 mb-1">Puntuación total</div>
                  <div className="text-4xl font-bold text-blue-700">{totalScore}</div>
                </div>
              </div>

              {/* Punto de aprendizaje */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-indigo-900 mb-2">Punto clave de aprendizaje</h4>
                    <p className="text-indigo-800 leading-relaxed">{scenario.learningPoint}</p>
                  </div>
                </div>
              </div>

              {/* Mostrar acción óptima si fue incorrecta */}
              {!action.correct && selectedAction !== 'timeout' && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    La acción más segura era:
                  </h4>
                  <div className="bg-white rounded p-4 border border-emerald-200">
                    <p className="text-slate-800">
                      {scenario.actions.find(a => a.id === scenario.optimalAction)?.label}
                    </p>
                  </div>
                </div>
              )}

              {/* Botón continuar */}
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {currentScenario < SCENARIOS.length - 1 ? (
                  <>
                    Siguiente escenario
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Ver resultados finales
                    <TrendingUp className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inicio de escenario (botón para comenzar)
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-xl border border-emerald-100 p-8 text-center">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Escenario {currentScenario + 1} de {SCENARIOS.length}
          </h2>
          <h3 className="text-3xl font-bold text-emerald-600 mb-4">{scenario.title}</h3>
          <p className="text-slate-600 mb-8">{scenario.location}</p>
          
          <button
            onClick={startScenario}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <Eye className="w-5 h-5" />
            Observar situación
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedestrianRulesAplicacion;
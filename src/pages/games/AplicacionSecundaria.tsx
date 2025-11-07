import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Play, Trophy, Star, Target, Zap, Clock, Shield, 
  CheckCircle, XCircle, AlertTriangle, Award, RotateCcw,
  ArrowRight, Brain, Eye, Lightbulb, TrendingUp, MapPin
} from 'lucide-react';

type ChallengeType = 'quick-decision' | 'spot-hazard' | 'sequence-order' | 'true-false' | 'best-action';

type Challenge = {
  id: number;
  type: ChallengeType;
  title: string;
  scenario: string;
  timeLimit: number;
  visual?: {
    trafficLight?: string;
    vehicles?: string[];
    hazards?: string[];
    weather?: string;
  };
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation: string;
  safetyTip: string;
};

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    type: 'spot-hazard',
    title: 'Identifica los Peligros',
    scenario: 'Vas caminando por una calle residencial a las 18:00. Observa la escena cuidadosamente.',
    timeLimit: 12,
    visual: {
      trafficLight: 'ninguno',
      vehicles: ['🚗 Auto estacionado con motor encendido', '🚌 Bus en parada'],
      hazards: ['Niños jugando cerca', 'Perro suelto', 'Conductor mirando teléfono', 'Bache en acera'],
      weather: 'despejado'
    },
    question: '¿Cuántos peligros potenciales identificas en esta escena?',
    options: ['2 peligros', '3 peligros', '4 peligros', '5 o más peligros'],
    correctAnswer: '4 peligros',
    points: 10,
    explanation: 'Los 4 peligros principales son: 1) Auto con motor encendido (puede arrancar), 2) Niños jugando (movimientos impredecibles), 3) Conductor distraído con teléfono (no está atento), 4) Bache en acera (riesgo de caída). El perro suelto y el bus también son factores, pero los 4 mencionados son los más críticos.',
    safetyTip: 'Siempre mantén una "distancia de reacción" de al menos 2 metros de vehículos con motor encendido.'
  },
  {
    id: 2,
    type: 'quick-decision',
    title: 'Decisión Rápida',
    scenario: 'Cruzas con luz verde. A mitad del paso de cebra, una ambulancia se acerca con sirena activada.',
    timeLimit: 8,
    visual: {
      trafficLight: 'verde',
      vehicles: ['🚑 Ambulancia aproximándose'],
      weather: 'despejado'
    },
    question: '¿Qué haces INMEDIATAMENTE?',
    options: [
      'Retroceder rápidamente a la acera original',
      'Correr al otro lado lo más rápido posible',
      'Caminar rápido pero firme al lado más cercano, hacer contacto visual con conductor de ambulancia',
      'Quedarme quieto en medio del cruce'
    ],
    correctAnswer: 'Caminar rápido pero firme al lado más cercano, hacer contacto visual con conductor de ambulancia',
    points: 15,
    explanation: 'Las ambulancias tienen conductores entrenados que esperan tu movimiento predecible. Caminar FIRME (no correr - riesgo de caída) al lado más cercano es lo correcto. El contacto visual confirma que te vieron. Retroceder aumenta tiempo de exposición, correr es inestable, quedarte quieto bloquea el paso.',
    safetyTip: 'Vehículos de emergencia: muévete de forma predecible y clara hacia el lado más cercano.'
  },
  {
    id: 3,
    type: 'sequence-order',
    title: 'Orden Correcto',
    scenario: 'Llegas a un cruce con semáforo. Está en verde para peatones pero hay 3 vehículos girando a la derecha.',
    timeLimit: 15,
    visual: {
      trafficLight: 'verde peatonal',
      vehicles: ['🚗', '🚙', '🚐'],
      weather: 'despejado'
    },
    question: 'Ordena las acciones en la secuencia CORRECTA:',
    options: [
      '1) Cruzar confiado → 2) Mirar vehículos → 3) Caminar normal → 4) Llegar al otro lado',
      '1) Hacer contacto visual con CADA conductor → 2) Verificar que se detuvieron → 3) Cruzar por secciones verificando cada carril → 4) Mantener atención hasta completar',
      '1) Levantar la mano → 2) Cruzar rápido → 3) No mirar atrás → 4) Correr',
      '1) Esperar que pasen todos → 2) Perder la luz verde → 3) Esperar siguiente ciclo → 4) Cruzar solo'
    ],
    correctAnswer: '1) Hacer contacto visual con CADA conductor → 2) Verificar que se detuvieron → 3) Cruzar por secciones verificando cada carril → 4) Mantener atención hasta completar',
    points: 12,
    explanation: 'En intersecciones con giros, tu luz verde NO garantiza seguridad. Debes verificar ACTIVAMENTE: contacto visual confirma que te vieron, verificar detención da margen de reacción, cruzar por secciones permite monitorear cada amenaza, mantener atención previene sorpresas de última fracción.',
    safetyTip: 'En giros vehiculares: un contacto visual por cada carril es tu seguro de vida.'
  },
  {
    id: 4,
    type: 'true-false',
    title: 'Verdadero o Falso',
    scenario: 'Tienes audífonos puestos escuchando música a volumen moderado mientras caminas por la ciudad.',
    timeLimit: 10,
    question: 'VERDADERO o FALSO: Está bien usar audífonos con música a volumen moderado porque puedo ver todo lo que pasa a mi alrededor.',
    options: [
      'VERDADERO: Si el volumen es moderado, puedo oír sonidos importantes y ver todo',
      'FALSO: Los audífonos eliminan señales auditivas críticas (bocinas, motores, gritos de advertencia) que detectan peligros fuera de tu campo visual. La vista cubre ~180°, el oído 360°'
    ],
    correctAnswer: 'FALSO: Los audífonos eliminan señales auditivas críticas (bocinas, motores, gritos de advertencia) que detectan peligros fuera de tu campo visual. La vista cubre ~180°, el oído 360°',
    points: 10,
    explanation: 'Tu vista tiene un campo de ~180° al frente. Tu oído tiene cobertura de 360° y detecta amenazas QUE NO PUEDES VER. Los audífonos eliminan: bocinas de advertencia, motores acelerando detrás de ti, gritos de "¡cuidado!", sirenas de emergencia, ciclistas aproximándose. Incluso a "volumen moderado", tu cerebro prioriza la música sobre sonidos ambientales.',
    safetyTip: 'En zonas de tráfico: tus oídos son tu "radar de 360°". No los desactives voluntariamente.'
  },
  {
    id: 5,
    type: 'best-action',
    title: 'Mejor Acción',
    scenario: 'Llueve intensamente. Necesitas cruzar una avenida de 4 carriles. Hay dos opciones: Opción A) Semáforo peatonal funcional (80 metros extra), Opción B) Sin semáforo (más directo).',
    timeLimit: 15,
    visual: {
      weather: 'lluvia intensa',
      vehicles: ['Múltiples vehículos'],
      hazards: ['Visibilidad reducida', 'Pavimento mojado', 'Neblina en parabrisas']
    },
    question: '¿Cuál es la MEJOR decisión considerando TODOS los factores?',
    options: [
      'Opción B - más rápido, menos tiempo bajo la lluvia',
      'Opción A - el semáforo es más seguro siempre, los 80m extra valen la pena',
      'Esperar a que pare de llover completamente',
      'Correr por la opción B para minimizar exposición'
    ],
    correctAnswer: 'Opción A - el semáforo es más seguro siempre, los 80m extra valen la pena',
    points: 15,
    explanation: 'Bajo lluvia intensa, TODOS los factores de riesgo se multiplican: visibilidad del conductor baja 70%, distancia de frenado aumenta 250%, tus reflejos en pavimento mojado disminuyen. El semáforo proporciona: marco legal de protección, expectativa de conductores de ver peatones, tiempo controlado para cruzar. Los 80 metros extra (1-2 minutos) son NADA comparado con el riesgo de cruzar 4 carriles sin protección bajo lluvia.',
    safetyTip: 'Principio de oro: NUNCA sacrifiques seguridad por conveniencia, especialmente bajo condiciones adversas.'
  },
  {
    id: 6,
    type: 'spot-hazard',
    title: 'Análisis de Intersección',
    scenario: 'Intersección compleja de 3 carriles por sentido. Tienes luz verde pero observas varios elementos.',
    timeLimit: 15,
    visual: {
      trafficLight: 'verde peatonal',
      vehicles: ['🚗 Primer carril detenido', '🚛 Camión en segundo carril (bloquea vista)', '❓ Tercer carril no visible'],
      hazards: ['Punto ciego del camión', 'Motociclistas frecuentes', 'Giro simultáneo permitido']
    },
    question: 'Identifica el MAYOR peligro en esta situación:',
    options: [
      'El semáforo puede cambiar mientras cruzo',
      'El punto ciego del camión oculta el tercer carril donde pueden venir motos/autos sin verme',
      'Los conductores pueden estar impacientes',
      'Hay muchos carriles que cruzar'
    ],
    correctAnswer: 'El punto ciego del camión oculta el tercer carril donde pueden venir motos/autos sin verme',
    points: 18,
    explanation: 'El "punto ciego del camión" es el escenario MÁS LETAL en intersecciones. El camión crea una "cortina visual" que oculta completamente vehículos en carriles adyacentes. Motociclistas frecuentemente: zigzaguean entre carriles, viajan más rápido, son menos visibles, tienen menor capacidad de frenado. Tu luz verde NO garantiza que el motociclista te vea o respete su señal. Solución: asomarte GRADUALMENTE más allá del camión para "revelar" el tercer carril.',
    safetyTip: 'Nunca cruces más allá de un vehículo grande sin asomarte gradualmente para obtener línea de visión.'
  },
  {
    id: 7,
    type: 'quick-decision',
    title: 'Dilema Ético',
    scenario: 'Grupo de amigos cruza con luz roja "porque no vienen carros". Te invitan. Tu hermano menor (7 años) te está observando.',
    timeLimit: 12,
    question: '¿Qué haces y por qué?',
    options: [
      'Seguir al grupo para mantener amistad',
      'Cruzar pero explicarle después a mi hermano que estuvo mal',
      'Quedarme, esperar luz verde y explicar en voz alta: "Las reglas nos protegen. Soy ejemplo para mi hermano y prefiero llegar 20 segundos tarde que arriesgarme"',
      'Regañar al grupo públicamente'
    ],
    correctAnswer: 'Quedarme, esperar luz verde y explicar en voz alta: "Las reglas nos protegen. Soy ejemplo para mi hermano y prefiero llegar 20 segundos tarde que arriesgarme"',
    points: 20,
    explanation: 'Este evalúa MADUREZ INTEGRAL. Dimensiones: 1) Legal: cruzar con rojo es infracción. 2) Seguridad: vehículos pueden aparecer súbitamente. 3) Modelamiento: los niños replican el 87% de COMPORTAMIENTOS observados, no palabras posteriores. 4) Liderazgo: tu firmeza respetuosa puede influenciar al grupo. La respuesta correcta demuestra: pensamiento independiente, consciencia de modelamiento, capacidad de comunicar valores sin confrontación agresiva.',
    safetyTip: 'Tu comportamiento en público enseña más que mil palabras. Sé el ejemplo que quieres ver.'
  },
  {
    id: 8,
    type: 'sequence-order',
    title: 'Protocolo de Emergencia',
    scenario: 'Estás cruzando. A mitad del paso, un vehículo pierde el control y derrapa hacia ti. Tienes 2 segundos para reaccionar.',
    timeLimit: 10,
    visual: {
      vehicles: ['🚗 Vehículo derrapando'],
      hazards: ['Emergencia', 'Pavimento mojado', 'Sin tiempo']
    },
    question: '¿Cuál es la secuencia de SUPERVIVENCIA?',
    options: [
      '1) Gritar → 2) Intentar detener al conductor → 3) Rezar → 4) Esperar',
      '1) Evaluar trayectoria del vehículo → 2) Saltar/correr PERPENDICULAR a la trayectoria (no hacia atrás) → 3) Proteger cabeza si caída inevitable → 4) Rodar al impactar suelo',
      '1) Quedarme quieto → 2) Cerrar los ojos → 3) Aceptar el impacto → 4) No hacer nada',
      '1) Correr en dirección contraria al auto → 2) Mirar hacia atrás → 3) Tropezar → 4) Impacto'
    ],
    correctAnswer: '1) Evaluar trayectoria del vehículo → 2) Saltar/correr PERPENDICULAR a la trayectoria (no hacia atrás) → 3) Proteger cabeza si caída inevitable → 4) Rodar al impactar suelo',
    points: 15,
    explanation: 'En emergencias de último segundo: 1) PERPENDICULAR es clave: si el auto viene hacia ti, moverse hacia atrás solo retrasa el impacto. Moverte 90° te saca de la trayectoria. 2) Proteger cabeza: si la caída es inevitable, brazos en X sobre cabeza. 3) Rodar al impactar: distribuye la fuerza del impacto, no absorber todo en un punto. Este protocolo se enseña en defensa personal y entrenamiento de deportes extremos.',
    safetyTip: 'Entrenar mentalmente escenarios de emergencia mejora tu tiempo de reacción en situaciones reales.'
  },
  {
    id: 9,
    type: 'best-action',
    title: 'Distracción Digital',
    scenario: 'Recibes notificación de mensaje importante. Faltan 50 metros para llegar al cruce con semáforo. El teléfono vibra insistentemente.',
    timeLimit: 12,
    visual: {
      trafficLight: 'próximo',
      hazards: ['Distracción', 'Proximidad a zona de riesgo', 'Urgencia emocional']
    },
    question: '¿Cuál es el protocolo CORRECTO de manejo de tecnología?',
    options: [
      'Ver el mensaje rápido ahora mientras camino hacia el cruce',
      'Usar mensaje de voz mientras me acerco al cruce',
      'Guardar teléfono AHORA. Esperar hasta cruzar completamente y estar en zona segura (acera, alejado de tráfico). ENTONCES revisar mensaje',
      'Leer el mensaje en el semáforo mientras espero la luz'
    ],
    correctAnswer: 'Guardar teléfono AHORA. Esperar hasta cruzar completamente y estar en zona segura (acera, alejado de tráfico). ENTONCES revisar mensaje',
    points: 12,
    explanation: 'Protocolo de "zonas de desconexión digital": cualquier área dentro de 50 metros de cruce vehicular es ZONA DE ATENCIÓN PLENA. Razones: 1) Tu cerebro necesita 3-5 segundos de "transición atencional" después de usar el teléfono - durante ese tiempo, VES pero no PROCESAS peligros. 2) La urgencia emocional del mensaje compromete tu juicio. 3) Incluso en el semáforo: necesitas observar el entorno, evaluar condiciones, preparar tu cruce. El mensaje puede esperar 30 segundos.',
    safetyTip: 'Regla de oro: Si no lo harías mientras conduces un auto, no lo hagas mientras eres peatón cerca del tráfico.'
  },
  {
    id: 10,
    type: 'true-false',
    title: 'Mito o Realidad',
    scenario: 'Has escuchado que "si un conductor te hace señas para que cruces, es seguro hacerlo incluso si el semáforo está en rojo".',
    timeLimit: 10,
    question: 'VERDADERO o FALSO: Las señas de un conductor prevalecen sobre el semáforo.',
    options: [
      'VERDADERO: Si el conductor me da permiso, es seguro cruzar',
      'FALSO: El semáforo tiene autoridad legal ABSOLUTA sobre gestos. El conductor puede no ver otros carriles/vehículos. Si hay accidente con luz roja, TÚ estás en falta legal'
    ],
    correctAnswer: 'FALSO: El semáforo tiene autoridad legal ABSOLUTA sobre gestos. El conductor puede no ver otros carriles/vehículos. Si hay accidente con luz roja, TÚ estás en falta legal',
    points: 10,
    explanation: 'Jerarquía de señales: 1° Señales luminosas (semáforos), 2° Agentes de tránsito uniformados, 3° Señales verticales, 4° Líneas en el pavimento. Los gestos de conductores NO están en esta jerarquía. Razones: 1) El conductor no tiene visibilidad de otros carriles (motos, ciclistas). 2) Otros conductores no anticipan que cruces con luz roja. 3) Legalmente, cruzar con rojo te hace responsable. 4) El conductor puede estar equivocado o distraído.',
    safetyTip: 'Las señales oficiales existen para eliminar la ambigüedad de gestos. SIEMPRE prevalece la señal.'
  },
  {
    id: 11,
    type: 'spot-hazard',
    title: 'Evaluación Nocturna',
    scenario: 'Son las 20:30, oscuridad total. Caminas por una avenida. Usas ropa oscura. No hay iluminación suficiente.',
    timeLimit: 12,
    visual: {
      weather: 'despejado',
      vehicles: ['🚗 Varios vehículos'],
      hazards: ['Oscuridad', 'Ropa oscura', 'Sin elementos reflectantes', 'Iluminación deficiente']
    },
    question: '¿Cuál es el factor de MAYOR RIESGO?',
    options: [
      'La oscuridad en sí misma',
      'La combinación: oscuridad + ropa oscura + sin reflectantes = invisibilidad total para conductores',
      'Que haya vehículos circulando',
      'La falta de iluminación pública'
    ],
    correctAnswer: 'La combinación: oscuridad + ropa oscura + sin reflectantes = invisibilidad total para conductores',
    points: 15,
    explanation: 'Los riesgos se MULTIPLICAN, no se suman. Un conductor con luces bajas te ve a ~50 metros con ropa clara, pero solo a ~15 metros con ropa oscura. Con ropa oscura + sin reflectantes + oscuridad total = prácticamente INVISIBLE hasta que es demasiado tarde para frenar. Elementos reflectantes aumentan tu visibilidad 500% - cuestan $2000 y pueden salvar tu vida. El 68% de atropellos nocturnos involucran peatones con ropa oscura.',
    safetyTip: 'De noche: ropa clara o elementos reflectantes no son opcionales, son OBLIGATORIOS para tu supervivencia.'
  },
  {
    id: 12,
    type: 'best-action',
    title: 'Situación Compleja Final',
    scenario: 'SITUACIÓN INTEGRAL: 19:30 hrs, llovizna, regresas de estudiar, mochila pesada, batería al 3%, mensaje urgente de casa. Opción A: semáforo (45 seg espera). Opción B: sin semáforo (directo).',
    timeLimit: 20,
    visual: {
      weather: 'llovizna',
      trafficLight: 'opciones múltiples',
      hazards: ['Múltiples factores', 'Urgencia emocional', 'Condiciones adversas', 'Fatiga']
    },
    question: 'ANÁLISIS INTEGRAL: ¿Cuál es el protocolo COMPLETO considerando TODOS los aspectos?',
    options: [
      'Opción B - es más rápido y el mensaje es urgente',
      'Ver el mensaje ahora para saber si es verdadera emergencia',
      'PROTOCOLO: 1) Opción A (semáforo=seguridad). 2) Mientras espero: guardar teléfono, ajustar mochila, preparar postura. 3) Con luz verde: verificar que vehículos se detuvieron, contacto visual, cruzar con atención 100%. 4) DESPUÉS en zona segura: revisar mensaje. Tiempo extra: 45 seg. Riesgos evitados: múltiples. Decisión madura',
      'Esperar a llegar a casa para revisar el mensaje'
    ],
    correctAnswer: 'PROTOCOLO: 1) Opción A (semáforo=seguridad). 2) Mientras espero: guardar teléfono, ajustar mochila, preparar postura. 3) Con luz verde: verificar que vehículos se detuvieron, contacto visual, cruzar con atención 100%. 4) DESPUÉS en zona segura: revisar mensaje. Tiempo extra: 45 seg. Riesgos evitados: múltiples. Decisión madura',
    points: 25,
    explanation: 'EVALUACIÓN FINAL DE COMPETENCIA INTEGRAL. Esta pregunta sintetiza TODO: 1) Toma de decisiones (semáforo vs directo). 2) Gestión de distractores (urgencia, fatiga, tecnología). 3) Evaluación de condiciones (clima, hora, estado físico). 4) Uso productivo de tiempo (preparación durante espera). 5) Protocolo de verificación. 6) Priorización correcta (seguridad > urgencia > eficiencia). Los 45 segundos "perdidos" son tu margen de supervivencia. Este nivel de integración define competencia en nivel secundaria.',
    safetyTip: 'Competencia real = integrar TODOS los conceptos simultáneamente bajo presión. Has completado el nivel.'
  }
];

const AplicacionSecundaria = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [answers, setAnswers] = useState<Array<{ challenge: number; correct: boolean; points: number }>>([]);
  const [gameComplete, setGameComplete] = useState(false);
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
        toast.error('Error al inicializar juego');
        navigate('/courses');
      }
    };

    initializeGame();
  }, [navigate, routeId]);

  useEffect(() => {
    if (started && !showFeedback && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (started && !showFeedback && timeLeft === 0 && !selectedAnswer) {
      handleTimeout();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [started, showFeedback, timeLeft, selectedAnswer]);

  const challenge = CHALLENGES[currentChallenge];

  const startGame = () => {
    setStarted(true);
    setTimeLeft(challenge.timeLimit);
  };

  const handleTimeout = () => {
    toast.error('¡Tiempo agotado!');
    setAnswers(prev => [...prev, { 
      challenge: currentChallenge, 
      correct: false, 
      points: 0 
    }]);
    setTimeout(() => {
      setShowFeedback(true);
    }, 500);
  };

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setSelectedAnswer(answer);
    const isCorrect = answer === challenge.correctAnswer;
    const points = isCorrect ? challenge.points : 0;
    
    setScore(prev => prev + points);
    setAnswers(prev => [...prev, { 
      challenge: currentChallenge, 
      correct: isCorrect, 
      points 
    }]);

    if (isCorrect) {
      setStars(prev => prev + 1);
    }
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentChallenge < CHALLENGES.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setTimeLeft(CHALLENGES[currentChallenge + 1].timeLimit);
    } else {
      setGameComplete(true);
    }
  };

  const calculateResults = () => {
    const correctCount = answers.filter(a => a.correct).length;
    const totalPoints = CHALLENGES.reduce((sum, c) => sum + c.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const accuracy = Math.round((correctCount / CHALLENGES.length) * 100);
    
    return { correctCount, totalPoints, percentage, accuracy };
  };

  const handleComplete = async () => {
    const { percentage } = calculateResults();
    const passed = percentage >= 70;

    if (!passed) {
      toast.warning('Se requiere mínimo 70% para aprobar');
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
          best_accuracy_percentage: percentage,
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
    setCurrentChallenge(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setTimeLeft(0);
    setScore(0);
    setStars(0);
    setAnswers([]);
    setGameComplete(false);
    setStarted(false);
  };

  const getChallengeIcon = (type: ChallengeType) => {
    switch (type) {
      case 'quick-decision': return <Zap className="w-5 h-5" />;
      case 'spot-hazard': return <Eye className="w-5 h-5" />;
      case 'sequence-order': return <Target className="w-5 h-5" />;
      case 'true-false': return <Brain className="w-5 h-5" />;
      case 'best-action': return <Shield className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getChallengeColor = (type: ChallengeType) => {
    switch (type) {
      case 'quick-decision': return 'from-red-500 to-orange-500';
      case 'spot-hazard': return 'from-blue-500 to-cyan-500';
      case 'sequence-order': return 'from-purple-500 to-pink-500';
      case 'true-false': return 'from-green-500 to-emerald-500';
      case 'best-action': return 'from-amber-500 to-yellow-500';
      default: return 'from-slate-500 to-gray-500';
    }
  };

  // Pantalla de introducción
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-indigo-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Target className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Aplicación Secundaria</h1>
                  <p className="text-purple-100 text-lg mt-1">Desafíos prácticos interactivos</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
                <div className="flex items-start gap-3">
                  <Trophy className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 mb-2">Mecánica del Juego</h3>
                    <ul className="space-y-2 text-sm text-amber-800">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>12 desafíos variados</strong> que ponen a prueba tu conocimiento práctico</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>5 tipos diferentes:</strong> Decisión rápida, Identificar peligros, Orden correcto, Verdadero/Falso, Mejor acción</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Tiempo limitado:</strong> 8-20 segundos por desafío</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Sistema de estrellas:</strong> Gana estrellas por cada respuesta correcta</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>70% requerido</strong> para aprobar el nivel</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-indigo-600" />
                    Tipos de Desafíos
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                      <Zap className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Decisión Rápida</div>
                        <div className="text-xs text-slate-600">Actúa bajo presión</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Identificar Peligros</div>
                        <div className="text-xs text-slate-600">Detecta riesgos ocultos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Orden Correcto</div>
                        <div className="text-xs text-slate-600">Secuencias lógicas</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <Brain className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Verdadero o Falso</div>
                        <div className="text-xs text-slate-600">Desmiente mitos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
                      <Shield className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Mejor Acción</div>
                        <div className="text-xs text-slate-600">Elige sabiamente</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    Habilidades Evaluadas
                  </h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Evaluación rápida de situaciones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Identificación de peligros múltiples</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Toma de decisiones bajo presión</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Conocimiento de protocolos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Análisis de consecuencias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Responsabilidad social</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Manejo de distractores</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-5 rounded-lg transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl text-lg"
              >
                <Play className="w-6 h-6" />
                Comenzar Desafíos
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (gameComplete) {
    const results = calculateResults();
    const passed = results.percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-indigo-200 overflow-hidden">
            <div className={`p-8 text-white ${passed ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-amber-600 to-orange-600'}`}>
              <div className="flex items-center justify-center mb-4">
                {passed ? (
                  <Trophy className="w-16 h-16" />
                ) : (
                  <AlertTriangle className="w-16 h-16" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {passed ? '¡Nivel Completado!' : 'Nivel Finalizado'}
              </h1>
              <p className="text-center text-white/90">
                {passed 
                  ? 'Has demostrado habilidades prácticas sólidas' 
                  : 'Necesitas reforzar algunos conceptos'}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-indigo-50 rounded-lg p-5 text-center border-2 border-indigo-200">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{results.percentage}%</div>
                  <div className="text-sm text-slate-600">Precisión</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-5 text-center border-2 border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{results.correctCount}/{CHALLENGES.length}</div>
                  <div className="text-sm text-slate-600">Correctas</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-5 text-center border-2 border-pink-200">
                  <div className="text-3xl font-bold text-pink-600 mb-1">{score}</div>
                  <div className="text-sm text-slate-600">Puntos</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-5 text-center border-2 border-amber-200">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-6 h-6 ${i < Math.floor((stars / CHALLENGES.length) * 3) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-slate-600">{stars} estrellas</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Resumen por desafío</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {answers.map((answer, idx) => {
                    const ch = CHALLENGES[idx];
                    return (
                      <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                        answer.correct 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-red-50 border-red-300'
                      }`}>
                        <div className="flex items-center gap-2">
                          {answer.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="text-sm font-medium text-slate-800">
                            {idx + 1}. {ch.title}
                          </span>
                        </div>
                        <span className={`text-sm font-bold ${answer.correct ? 'text-green-700' : 'text-red-700'}`}>
                          {answer.points > 0 ? '+' : ''}{answer.points}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {passed && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">¡Excelente Trabajo!</h4>
                      <p className="text-sm text-gray-700">
                        Has completado exitosamente el nivel de Aplicación Secundaria. Tus habilidades prácticas en seguridad vial están bien desarrolladas.
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
                        Se requiere 70% de precisión. Revisa las explicaciones de cada desafío y practica la identificación de situaciones de riesgo.
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
                  Reintentar
                </button>
                {passed && (
                  <button
                    onClick={handleComplete}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
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

  // Pantalla de feedback
  if (showFeedback) {
    const isCorrect = selectedAnswer === challenge.correctAnswer;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-indigo-200 overflow-hidden">
            <div className={`p-6 text-white ${
              isCorrect 
                ? 'bg-gradient-to-r from-emerald-600 to-green-600' 
                : 'bg-gradient-to-r from-red-600 to-rose-600'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {isCorrect ? (
                    <CheckCircle className="w-12 h-12" />
                  ) : (
                    <XCircle className="w-12 h-12" />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </h2>
                    <p className="text-white/90">
                      {isCorrect ? `+${challenge.points} puntos` : '0 puntos'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80">Desafío {currentChallenge + 1}/{CHALLENGES.length}</div>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold">{stars}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getChallengeColor(challenge.type)}`}>
                    <div className="text-white">
                      {getChallengeIcon(challenge.type)}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{challenge.title}</h3>
                </div>
              </div>

              <div className={`p-5 rounded-lg mb-5 ${
                isCorrect 
                  ? 'bg-green-50 border-2 border-green-300' 
                  : 'bg-red-50 border-2 border-red-300'
              }`}>
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Lightbulb className={isCorrect ? 'text-green-700' : 'text-red-700'} />
                  <span className={isCorrect ? 'text-green-900' : 'text-red-900'}>Explicación</span>
                </h4>
                <p className={`leading-relaxed text-sm ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                  {challenge.explanation}
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2 text-sm">Consejo de Seguridad</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">{challenge.safetyTip}</p>
                  </div>
                </div>
              </div>

              {!isCorrect && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-5 mb-6">
                  <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2 text-sm">
                    <Target className="w-5 h-5" />
                    Respuesta Correcta
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <p className="text-slate-800 text-sm leading-relaxed">
                      {challenge.correctAnswer}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {currentChallenge < CHALLENGES.length - 1 ? (
                  <>
                    Siguiente Desafío
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Ver Resultados
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

  // Pantalla de desafío activo
  const progress = ((currentChallenge + 1) / CHALLENGES.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header con progreso */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${getChallengeColor(challenge.type)}`}>
                <div className="text-white">
                  {getChallengeIcon(challenge.type)}
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  Desafío {currentChallenge + 1} de {CHALLENGES.length}
                </div>
                <div className="text-sm text-slate-600">{challenge.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold text-slate-900">{stars}</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft <= 3 ? 'bg-red-100 border-2 border-red-500 animate-pulse' : 
                timeLeft <= 5 ? 'bg-amber-100 border-2 border-amber-500' : 
                'bg-blue-50 border-2 border-blue-300'
              }`}>
                <Clock className={`w-5 h-5 ${
                  timeLeft <= 3 ? 'text-red-600' : 
                  timeLeft <= 5 ? 'text-amber-600' : 
                  'text-blue-600'
                }`} />
                <span className={`text-2xl font-bold ${
                  timeLeft <= 3 ? 'text-red-700' : 
                  timeLeft <= 5 ? 'text-amber-700' : 
                  'text-blue-700'
                }`}>
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel izquierdo: Escenario */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-200 p-5">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Escenario
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">{challenge.scenario}</p>
            </div>

            {challenge.visual && (
              <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-200 p-5">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  Elementos Visuales
                </h4>
                <div className="space-y-3 text-sm">
                  {challenge.visual.trafficLight && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Semáforo</div>
                      <div className="font-medium text-slate-800">{challenge.visual.trafficLight}</div>
                    </div>
                  )}
                  {challenge.visual.weather && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Clima</div>
                      <div className="font-medium text-slate-800">{challenge.visual.weather}</div>
                    </div>
                  )}
                  {challenge.visual.vehicles && challenge.visual.vehicles.length > 0 && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Vehículos</div>
                      <div className="space-y-1">
                        {challenge.visual.vehicles.map((v, i) => (
                          <div key={i} className="text-xs text-slate-700">{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {challenge.visual.hazards && challenge.visual.hazards.length > 0 && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">⚠️ Peligros</div>
                      <div className="space-y-1">
                        {challenge.visual.hazards.map((h, i) => (
                          <div key={i} className="text-xs text-red-700 font-medium">{h}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-300 p-5">
              <div className="text-center">
                <div className="text-sm text-indigo-700 font-medium mb-2">Puntuación</div>
                <div className="text-4xl font-bold text-indigo-900">{score}</div>
                <div className="text-xs text-indigo-600 mt-1">puntos acumulados</div>
              </div>
            </div>
          </div>

          {/* Panel derecho: Pregunta y opciones */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border-2 border-indigo-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-indigo-600" />
                  {challenge.question}
                </h3>
                <p className="text-sm text-slate-600">
                  Valor: <strong>{challenge.points} puntos</strong> • Selecciona tu respuesta
                </p>
              </div>

              <div className="space-y-3">
                {challenge.options?.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedAnswer}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-100 to-purple-100 border-indigo-500 scale-[1.02] shadow-lg'
                          : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:scale-[1.01] cursor-pointer'
                      } ${selectedAnswer && !isSelected ? 'opacity-40' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isSelected 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <p className="flex-1 text-slate-800 leading-relaxed text-sm pt-1">
                          {option}
                        </p>
                        {isSelected && (
                          <div className="flex-shrink-0">
                            <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              ✓
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {timeLeft <= 5 && (
                <div className={`mt-5 p-4 rounded-lg border-2 ${
                  timeLeft <= 3 
                    ? 'bg-red-50 border-red-300' 
                    : 'bg-amber-50 border-amber-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      timeLeft <= 3 ? 'text-red-600' : 'text-amber-600'
                    }`} />
                    <span className={`text-sm font-semibold ${
                      timeLeft <= 3 ? 'text-red-900' : 'text-amber-900'
                    }`}>
                      {timeLeft <= 3 
                        ? '¡URGENTE! Decide ahora' 
                        : '¡Apresúrate! Poco tiempo'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AplicacionSecundaria;
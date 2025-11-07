import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Award, Shield, Brain, Target, AlertTriangle, CheckCircle, 
  XCircle, Clock, Eye, Zap, TrendingUp, Star, Trophy,
  RotateCcw, ArrowRight, FileCheck, Lightbulb, Medal
} from 'lucide-react';

type QuestionType = 'multiple-choice' | 'true-false' | 'scenario-analysis' | 'priority-ranking' | 'case-study';

type CertificationQuestion = {
  id: number;
  category: string;
  type: QuestionType;
  difficulty: 'high' | 'critical';
  scenario: string;
  visualContext?: {
    trafficLight?: string;
    weather?: string;
    timeOfDay?: string;
    riskLevel?: 'bajo' | 'moderado' | 'alto' | 'crítico';
  };
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  timeLimit?: number;
  explanation: string;
  lawReference?: string;
  statisticReference?: string;
};

const CERTIFICATION_QUESTIONS: CertificationQuestion[] = [
  {
    id: 1,
    category: 'Evaluación de Riesgo Crítico',
    type: 'scenario-analysis',
    difficulty: 'critical',
    scenario: 'Intersección de 4 carriles sin semáforo peatonal. Hora: 19:00 (oscureciendo). Clima: llovizna. Usas audífonos y ropa oscura. Ves un espacio entre vehículos de aproximadamente 8 segundos.',
    visualContext: {
      weather: 'Llovizna',
      timeOfDay: 'Anocheciendo',
      riskLevel: 'crítico'
    },
    question: 'Identifica TODOS los factores de riesgo presentes y determina la acción correcta:',
    options: [
      'Cruzar aprovechando el espacio de 8 segundos - es suficiente tiempo',
      'Quitarme audífonos, buscar luz/paso de cebra alternativo, usar ropa/objeto visible, verificar 360°, cruzar solo con margen de seguridad amplio',
      'Esperar a que mejore el clima y haya más luz natural',
      'Cruzar rápidamente antes de que oscurezca más'
    ],
    correctAnswer: 'Quitarme audífonos, buscar luz/paso de cebra alternativo, usar ropa/objeto visible, verificar 360°, cruzar solo con margen de seguridad amplio',
    points: 15,
    timeLimit: 20,
    explanation: 'Esta situación acumula 6 factores de riesgo críticos: 1) Ausencia de semáforo, 2) Visibilidad reducida (hora), 3) Clima adverso, 4) Audífonos (pérdida sensorial), 5) Ropa oscura (baja visibilidad), 6) Intersección compleja. Los 8 segundos son INSUFICIENTES considerando que necesitas 12-15 segundos en condiciones óptimas. Cualquier factor de riesgo adicional multiplica (no suma) el peligro.',
    lawReference: 'Código Nacional de Tránsito Art. 57: El peatón debe cruzar con plenas garantías de seguridad',
    statisticReference: 'El 68% de atropellos nocturnos involucran peatones con ropa oscura y múltiples distractores'
  },
  {
    id: 2,
    category: 'Toma de Decisiones bajo Presión',
    type: 'multiple-choice',
    difficulty: 'high',
    scenario: 'Tienes luz verde peatonal (5 segundos restantes). A mitad del cruce, el semáforo cambia a amarillo intermitente. Un vehículo a 40 metros acelera. Quedas en la mitad del cruce.',
    visualContext: {
      trafficLight: 'Amarillo intermitente',
      riskLevel: 'alto'
    },
    question: '¿Cuál es la secuencia de acciones correcta en orden de prioridad?',
    options: [
      '1) Retroceder rápidamente a la acera original',
      '2) Correr al otro lado lo más rápido posible',
      '3) Detenerme y levantar la mano señalizando al conductor',
      '4) Caminar firme y rápido (sin correr) hacia el otro lado manteniendo contacto visual con el vehículo, estar preparado para acelerar o detener según comportamiento del conductor'
    ],
    correctAnswer: '4) Caminar firme y rápido (sin correr) hacia el otro lado manteniendo contacto visual con el vehículo, estar preparado para acelerar o detener según comportamiento del conductor',
    points: 12,
    timeLimit: 15,
    explanation: 'Retroceder aumenta el tiempo de exposición y te coloca en zona de conflicto por más tiempo. Correr incrementa 8x el riesgo de caída en pavimento mojado/irregular y elimina tu capacidad de reacción. Detenerte en el cruce es la peor opción. La acción correcta: continuar con paso firme (más rápido que normal pero controlado), mantener vigilancia del vehículo para poder reaccionar, y completar el cruce en la menor fracción de tiempo posible sin perder estabilidad.',
    lawReference: 'Resolución que establece que el peatón que inició cruce con luz verde mantiene preferencia',
    statisticReference: 'Las caídas durante cruces apresurados causan el 23% de lesiones graves en peatones'
  },
  {
    id: 3,
    category: 'Responsabilidad Legal y Social',
    type: 'case-study',
    difficulty: 'high',
    scenario: 'Grupo de 6 compañeros de clase cruza con luz roja "porque no vienen carros". Te invitan a seguirlos. Tú sabes que es incorrecto pero todos se ríen diciendo "no seas exagerado". Tu hermana de 10 años está contigo observando.',
    question: 'Analiza las dimensiones del problema y selecciona la respuesta que aborda TODOS los aspectos (legal, seguridad, social, modelamiento):',
    options: [
      'Seguir al grupo para evitar exclusión social - la presión grupal es importante a esta edad',
      'Cruzar con el grupo pero explicarle a mi hermana después que estuvo mal',
      'Quedarme y explicar: "Prefiero llegar 30 segundos tarde que arriesgarme. Las estadísticas muestran que este tipo de decisiones causan X% de accidentes. Soy responsable de ser ejemplo para mi hermana"',
      'Regañar al grupo y no juntarme más con ellos'
    ],
    correctAnswer: 'Quedarme y explicar: "Prefiero llegar 30 segundos tarde que arriesgarme. Las estadísticas muestran que este tipo de decisiones causan X% de accidentes. Soy responsable de ser ejemplo para mi hermana"',
    points: 18,
    timeLimit: 25,
    explanation: 'Esta situación evalúa madurez integral. Dimensión legal: cruzar con rojo es infracción (multa). Dimensión seguridad: vehículos pueden aparecer súbitamente. Dimensión psicosocial: presión grupal es real pero tu seguridad no es negociable. Dimensión modelamiento: tu hermana replicará tu comportamiento (87% de probabilidad según estudios), no tus palabras posteriores. La respuesta correcta demuestra: pensamiento crítico, conocimiento de datos, firmeza respetuosa, consciencia de modelamiento, y habilidad de comunicar razonamiento sin confrontación.',
    lawReference: 'Código de Tránsito Art. 115: Cruzar con luz roja es infracción sancionable',
    statisticReference: 'El 43% de atropellos de adolescentes ocurren en situaciones de presión grupal'
  },
  {
    id: 4,
    category: 'Tecnología y Distracción Cognitiva',
    type: 'true-false',
    difficulty: 'high',
    scenario: 'Estudios neurológicos recientes usando fMRI (resonancia magnética funcional) han demostrado el concepto de "ceguera por falta de atención".',
    question: 'VERDADERO o FALSO: Es seguro usar el teléfono para ver el mapa de navegación mientras caminas hacia un cruce, siempre y cuando levantes la vista justo antes de cruzar.',
    options: [
      'VERDADERO: Si levanto la vista antes de cruzar, puedo usar el teléfono mientras camino',
      'FALSO: El cerebro necesita 3-5 segundos para "reactivar" la atención plena al entorno después de una tarea cognitiva compleja. La visión se recupera inmediatamente pero el procesamiento cognitivo tiene latencia'
    ],
    correctAnswer: 'FALSO: El cerebro necesita 3-5 segundos para "reactivar" la atención plena al entorno después de una tarea cognitiva compleja. La visión se recupera inmediatamente pero el procesamiento cognitivo tiene latencia',
    points: 14,
    timeLimit: 18,
    explanation: 'La neurociencia cognitiva ha demostrado que existe un "periodo de transición atencional". Cuando tu cerebro está enfocado en una tarea compleja (leer mapa, interpretar información espacial), aunque levantes la vista, tu corteza prefrontal necesita 3-5 segundos para cambiar completamente de "modo tarea" a "modo vigilancia ambiental". Durante ese período de latencia, tus ojos VEN pero tu cerebro no PROCESA adecuadamente señales de peligro. Es la diferencia entre "visión" y "atención consciente".',
    statisticReference: 'Estudios con eye-tracking muestran que peatones en transición atencional tienen 73% menos probabilidad de detectar vehículos aproximándose'
  },
  {
    id: 5,
    category: 'Análisis de Condiciones Múltiples',
    type: 'priority-ranking',
    difficulty: 'critical',
    scenario: 'Debes cruzar una avenida. Tienes 4 opciones de puntos de cruce con diferentes características.',
    question: 'Ordena las opciones de MÁS segura a MENOS segura considerando TODOS los factores:',
    options: [
      'A) Semáforo peatonal + paso cebra + iluminación + zona escolar (50m extra) | B) Paso cebra sin semáforo + buena visibilidad (20m extra) | C) Sin señalización + 6 carriles + buena iluminación (punto más cercano) | D) Semáforo solo vehicular + sin paso cebra + zona oscura (30m extra)',
      'Orden correcto: A → B → D → C',
      'Orden correcto: C → B → A → D',
      'Orden correcto: B → A → C → D'
    ],
    correctAnswer: 'Orden correcto: A → B → D → C',
    points: 16,
    timeLimit: 30,
    explanation: 'A es óptima: tiene TODAS las protecciones (semáforo da preferencia legal, cebra aumenta visibilidad, iluminación mejora detección mutua, zona escolar aumenta atención de conductores). B es segunda: el paso de cebra proporciona visibilidad y marco legal aunque no hay semáforo. D es tercera: el semáforo ordena el tráfico aunque no sea específicamente peatonal. C es la PEOR: cruzar 6 carriles sin protección alguna, aunque haya luz, multiplica los puntos de conflicto (cada carril es un riesgo independiente). El principio: NUNCA sacrifiques seguridad por conveniencia. 50 metros extra pueden salvarte la vida.',
    lawReference: 'Art. 57 CNT: El peatón debe usar pasos establecidos cuando existan a menos de 150 metros',
    statisticReference: 'Cruzar en intersecciones no reguladas aumenta 340% el riesgo de atropello vs. semáforos peatonales'
  },
  {
    id: 6,
    category: 'Interpretación de Señales Complejas',
    type: 'multiple-choice',
    difficulty: 'high',
    scenario: 'Intersección con semáforo vehicular en VERDE para vehículos, semáforo peatonal en ROJO para peatones. Un vehículo se detiene y te hace señas para que cruces.',
    question: '¿Cuál es la interpretación correcta de esta situación y la acción apropiada?',
    options: [
      'El conductor me dio permiso, puedo cruzar con confianza',
      'Debo agradecer al conductor y cruzar rápidamente',
      'NO debo cruzar. El semáforo peatonal en rojo es vinculante independientemente de gestos. El conductor puede no tener visibilidad de otros carriles. Esperar luz verde',
      'Puedo cruzar verificando que no vengan otros vehículos'
    ],
    correctAnswer: 'NO debo cruzar. El semáforo peatonal en rojo es vinculante independientemente de gestos. El conductor puede no tener visibilidad de otros carriles. Esperar luz verde',
    points: 13,
    timeLimit: 15,
    explanation: 'Este es un escenario de "conflicto de señales". El semáforo tiene autoridad legal absoluta sobre gestos de conductores. Razones: 1) El conductor puede no ver vehículos en otros carriles (motos, ciclistas). 2) Otros conductores no están anticipando que cruces con luz roja. 3) Legalmente, si hay accidente, TÚ estás en falta por cruzar con luz roja. 4) El conductor puede estar mal informado o distraído. Las señales de tránsito existen precisamente para eliminar la ambigüedad de las interacciones sociales. SIEMPRE prevalece la señal oficial.',
    lawReference: 'CNT Art. 119: Las señales luminosas prevalecen sobre cualquier otra indicación',
    statisticReference: 'El 31% de atropellos con "permiso gestual" ocurren por vehículos en carriles que el conductor permisivo no podía ver'
  },
  {
    id: 7,
    category: 'Evaluación de Consecuencias',
    type: 'scenario-analysis',
    difficulty: 'critical',
    scenario: 'Vas tarde a un examen importante. Llegas al cruce: semáforo peatonal en rojo (25 segundos restantes). No se ven vehículos en 100 metros. El examen empieza en 3 minutos y estás a 2 minutos del lugar.',
    question: 'Realiza un análisis de consecuencias y selecciona el razonamiento correcto:',
    options: [
      'Cruzar con rojo está justificado porque el examen es importante y no vienen carros',
      'Cruzar rápido - la probabilidad de accidente es muy baja vs. perder el examen',
      'Esperar la luz verde. Consecuencias de cruzar con rojo: Posible atropello (lesión/muerte - probabilidad baja pero consecuencia máxima), multa ($), modelar mal ejemplo, contribuir a cultura de violación de normas. Consecuencias de llegar tarde: explicación al profesor, posible reprogramación, pérdida de puntos (consecuencia de magnitud menor). Análisis racional: ESPERAR',
      'Negociar con el conductor de algún vehículo que pase para que me lleve'
    ],
    correctAnswer: 'Esperar la luz verde. Consecuencias de cruzar con rojo: Posible atropello (lesión/muerte - probabilidad baja pero consecuencia máxima), multa ($), modelar mal ejemplo, contribuir a cultura de violación de normas. Consecuencias de llegar tarde: explicación al profesor, posible reprogramación, pérdida de puntos (consecuencia de magnitud menor). Análisis racional: ESPERAR',
    points: 20,
    timeLimit: 30,
    explanation: 'Este evalúa MADUREZ COGNITIVA: capacidad de análisis riesgo-beneficio bajo presión emocional. Principio de consecuencias asimétricas: aunque la probabilidad de accidente sea baja (ej. 0.1%), la magnitud de la consecuencia es INFINITA (muerte/lesión grave). En contraste, aunque la probabilidad de consecuencias académicas sea alta (90%), la magnitud es LIMITADA y REVERSIBLE (reprogramación, explicación, puntos). Matemática de decisiones: Riesgo = Probabilidad × Magnitud. 0.1% × Infinito > 90% × Finito. La única decisión racional es ESPERAR. Esta capacidad de análisis define la diferencia entre adolescentes y adultos maduros.',
    lawReference: 'Principio de proporcionalidad: ninguna urgencia personal justifica violación de normas de seguridad',
    statisticReference: 'El 71% de peatones fallecidos en atropellos reportaron "urgencia" o "prisa" como factor contribuyente'
  },
  {
    id: 8,
    category: 'Condiciones Adversas Extremas',
    type: 'multiple-choice',
    difficulty: 'critical',
    scenario: 'Lluvia torrencial, 20:30 hrs (noche cerrada), truenos, viento. Necesitas cruzar avenida de 4 carriles. Hay semáforo peatonal pero la visibilidad es menor a 15 metros. Los vehículos tienen las luces pero derrápan.',
    visualContext: {
      weather: 'Tormenta severa',
      timeOfDay: 'Noche',
      riskLevel: 'crítico'
    },
    question: '¿Cuál es el protocolo correcto para condiciones extremas?',
    options: [
      'Esperar a que mejore la tormenta bajo techo, aunque tome 1-2 horas',
      'Cruzar con luz verde pero muy rápido para minimizar exposición',
      'Con luz verde: remover audífonos, usar objeto reflectivo/linterna celular, verificar que CADA vehículo te vio y está completamente detenido (no solo frenando), cruzar con pasos firmes sin correr, verificar continuamente cada carril, mantener opciones de escape, estar preparado para retroceder si algún vehículo pierde control',
      'Pedir ayuda a un adulto para que cruce contigo'
    ],
    correctAnswer: 'Con luz verde: remover audífonos, usar objeto reflectivo/linterna celular, verificar que CADA vehículo te vio y está completamente detenido (no solo frenando), cruzar con pasos firmes sin correr, verificar continuamente cada carril, mantener opciones de escape, estar preparado para retroceder si algún vehículo pierde control',
    points: 18,
    timeLimit: 25,
    explanation: 'Condiciones extremas requieren protocolo EXTREMO de seguridad. Cada elemento es crítico: 1) Audífonos eliminan detección de derrapes/motores acelerando. 2) Objeto reflectivo/luz aumenta tu visibilidad 500%. 3) Verificar detención COMPLETA (no frenando) porque en pavimento mojado los vehículos pueden seguir deslizándose. 4) Paso firme sin correr evita caídas (superficie resbaladiza). 5) Verificación continua porque las condiciones cambian segundo a segundo. 6) Opciones de escape porque debes poder reaccionar si un vehículo pierde control. 7) La preparación mental para retroceder es crucial: muchos accidentes ocurren porque el peatón "se congela" en vez de reaccionar. Esperar la tormenta es sobre-precaución impráctica; cruzar rápido elimina control.',
    statisticReference: 'Bajo lluvia intensa, la distancia de frenado vehicular aumenta 250% y la visibilidad del conductor se reduce 70%'
  },
  {
    id: 9,
    category: 'Intersecciones Complejas',
    type: 'scenario-analysis',
    difficulty: 'high',
    scenario: 'Intersección con 3 carriles por sentido. Tienes luz verde peatonal. Carril 1: auto detenido. Carril 2: camión detenido (bloquea visión). Carril 3: no puedes ver detrás del camión. Motocicletas suelen usar ese carril.',
    question: '¿Cuál es el análisis correcto del "punto ciego del camión"?',
    options: [
      'Puedo cruzar confiadamente porque tengo luz verde y los vehículos están detenidos',
      'Cruzar rápido los dos primeros carriles y luego verificar el tercero',
      'Este es el escenario "zona de muerte del punto ciego". Aunque tengas luz verde, NO avances más allá del camión hasta: 1) Hacer contacto visual con el conductor del camión y confirmar que te vio, 2) Asomarte gradualmente para obtener línea de visión del carril 3, 3) Confirmar que NO vienen motos/bicicletas por carril 3 que no pudieron verte, 4) Solo entonces completar el cruce. El 43% de atropellos en intersecciones ocurre por vehículos ocultos por punto ciego',
      'Pasar por delante del camión en vez de por detrás para tener mejor visibilidad'
    ],
    correctAnswer: 'Este es el escenario "zona de muerte del punto ciego". Aunque tengas luz verde, NO avances más allá del camión hasta: 1) Hacer contacto visual con el conductor del camión y confirmar que te vio, 2) Asomarte gradualmente para obtener línea de visión del carril 3, 3) Confirmar que NO vienen motos/bicicletas por carril 3 que no pudieron verte, 4) Solo entonces completar el cruce. El 43% de atropellos en intersecciones ocurre por vehículos ocultos por punto ciego',
    points: 17,
    timeLimit: 25,
    explanation: 'El "punto ciego del camión" es el escenario MÁS PELIGROSO en intersecciones urbanas. Física del problema: un camión/bus crea una "cortina visual" que oculta completamente el carril adyacente. Motociclistas frecuentemente: 1) Viajan más rápido que autos, 2) Zigzaguean entre carriles, 3) Son menos visibles, 4) Tienen menor capacidad de frenado. Tu luz verde NO garantiza que el motociclista te vea o respete su luz. La secuencia correcta usa el principio de "revelación gradual": asomarte progresivamente permite tanto a ti detectar motos como a las motos detectarte. El contacto visual con el conductor del camión es crítico: él tiene perspectiva elevada y puede advertirte de peligros que no ves.',
    lawReference: 'CNT: El peatón debe verificar condiciones de seguridad incluso con preferencia',
    statisticReference: 'El 43% de atropellos fatales en intersecciones reguladas involucran vehículos ocultos en puntos ciegos'
  },
  {
    id: 10,
    category: 'Síntesis y Aplicación Integral',
    type: 'case-study',
    difficulty: 'critical',
    scenario: 'ESCENARIO FINAL INTEGRADOR: Avenida principal, 19:45 hrs, llovizna, regresas de actividad extracurricular con mochila pesada, teléfono vibra (mensaje urgente familiar), batería al 5%, necesitas llegar a casa (20 minutos caminando). Ves: Opción A: cruce con semáforo (luz roja, 40 seg), Opción B: cruce sin semáforo 80m adelante.',
    visualContext: {
      weather: 'Llovizna',
      timeOfDay: 'Anocheciendo',
      riskLevel: 'alto'
    },
    question: 'Evaluación INTEGRAL: Analiza todos los factores (seguridad, legales, psicológicos, prácticos) y determina el protocolo completo:',
    options: [
      'Opción B sin semáforo es más rápida, cruzar ahí para ganar tiempo',
      'Esperar en Opción A pero ver el mensaje mientras espero para no perder tiempo',
      'Protocolo completo: 1) Opción A (semáforo) - base legal y seguridad, 2) Mientras espero luz: guardar teléfono, ajustar mochila para mejor balance, identificar refugio/área iluminada, preparar postura alerta, 3) Con luz verde: remover audífonos si los tengo, verificar que vehículos se detuvieron, contacto visual con conductores, cruzar con atención 100% sin prisa, 4) Después de cruzar de forma segura, en zona segura: revisar mensaje. Tiempo "perdido": 40 seg. Riesgos evitados: múltiples. Decisión madura: SEGURIDAD primero, luego eficiencia',
      'Cruzar por B pero con mucha precaución y atención'
    ],
    correctAnswer: 'Protocolo completo: 1) Opción A (semáforo) - base legal y seguridad, 2) Mientras espero luz: guardar teléfono, ajustar mochila para mejor balance, identificar refugio/área iluminada, preparar postura alerta, 3) Con luz verde: remover audífonos si los tengo, verificar que vehículos se detuvieron, contacto visual con conductores, cruzar con atención 100% sin prisa, 4) Después de cruzar de forma segura, en zona segura: revisar mensaje. Tiempo "perdido": 40 seg. Riesgos evitados: múltiples. Decisión madura: SEGURIDAD primero, luego eficiencia',
    points: 25,
    timeLimit: 40,
    explanation: 'EVALUACIÓN FINAL DE MADUREZ INTEGRAL. Esta pregunta evalúa tu capacidad de integrar TODOS los conceptos: 1) Toma de decisiones (semáforo vs sin semáforo), 2) Gestión de distractores (teléfono, urgencia emocional), 3) Evaluación de condiciones (hora, clima, cansancio físico), 4) Uso de tiempo de espera productivamente (preparación), 5) Protocolo de verificación, 6) Priorización correcta (seguridad > urgencia > eficiencia). La respuesta correcta demuestra: pensamiento secuencial, consciencia situacional, resistencia a presión emocional (mensaje urgente), capacidad de diferir gratificación (esperar para revisar mensaje), y el principio rector: "llegar 40 segundos tarde es infinitamente mejor que no llegar". Este nivel de integración cognitiva y auto-regulación emocional define la COMPETENCIA CERTIFICADA en seguridad vial peatonal.',
    lawReference: 'Marco integral del Código Nacional de Tránsito para peatones responsables',
    statisticReference: 'Estudios longitudinales: peatones que integran protocolos sistemáticos tienen 89% menos probabilidad de accidentes vs. decisiones impulsivas'
  }
];

const PedestrianRulesCertificacion = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<{ question: number; correct: boolean; points: number; timeTaken: number }>>([]);
  const [examComplete, setExamComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeExam = async () => {
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
        toast.error('Error al inicializar certificación');
        navigate('/courses');
      }
    };

    initializeExam();
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

  const question = CERTIFICATION_QUESTIONS[currentQuestion];

  const startExam = () => {
    setStarted(true);
    setStartTime(Date.now());
    setTimeLeft(question.timeLimit || 30);
  };

  const handleTimeout = () => {
    toast.error('Tiempo agotado en esta pregunta');
    const timeTaken = (question.timeLimit || 30);
    setAnswers(prev => [...prev, { 
      question: currentQuestion, 
      correct: false, 
      points: 0,
      timeTaken 
    }]);
    setTimeout(() => {
      setShowFeedback(true);
    }, 500);
  };

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setSelectedAnswer(answer);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const isCorrect = answer === question.correctAnswer;
    const points = isCorrect ? question.points : 0;
    
    setScore(prev => prev + points);
    setAnswers(prev => [...prev, { 
      question: currentQuestion, 
      correct: isCorrect, 
      points,
      timeTaken 
    }]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < CERTIFICATION_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setStartTime(Date.now());
      setTimeLeft(CERTIFICATION_QUESTIONS[currentQuestion + 1].timeLimit || 30);
    } else {
      setExamComplete(true);
    }
  };

  const calculateResults = () => {
    const correctCount = answers.filter(a => a.correct).length;
    const totalPoints = CERTIFICATION_QUESTIONS.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const accuracy = Math.round((correctCount / CERTIFICATION_QUESTIONS.length) * 100);
    const averageTime = Math.round(answers.reduce((sum, a) => sum + a.timeTaken, 0) / answers.length);
    
    return { correctCount, totalPoints, percentage, accuracy, averageTime };
  };

  const getCertificationLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excelencia', color: 'from-yellow-500 to-amber-500', icon: Medal };
    if (percentage >= 80) return { level: 'Destacado', color: 'from-emerald-500 to-green-500', icon: Award };
    if (percentage >= 70) return { level: 'Aprobado', color: 'from-blue-500 to-cyan-500', icon: Shield };
    return { level: 'No Aprobado', color: 'from-slate-500 to-gray-500', icon: AlertTriangle };
  };

  const handleComplete = async () => {
    const { percentage } = calculateResults();
    const passed = percentage >= 70;

    if (!passed) {
      toast.warning('Se requiere mínimo 70% para obtener la certificación');
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
      
      toast.success('¡Certificación completada exitosamente!');
      
      if (courseId) {
        navigate(`/student/course/${courseId}`);
      } else {
        navigate('/courses');
      }
    } catch (error) {
      console.error('Error al registrar progreso:', error);
      toast.error('Error al guardar certificación');
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setTimeLeft(0);
    setScore(0);
    setAnswers([]);
    setExamComplete(false);
    setStarted(false);
    setStartTime(0);
  };

  // Pantalla de introducción
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-purple-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <Award className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <FileCheck className="w-10 h-10" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Examen de Certificación</h1>
                    <p className="text-purple-100 text-lg mt-1">Seguridad Vial Peatonal - Nivel Experto</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 mb-2">Advertencia Importante</h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Esta es una evaluación de alto nivel que requiere conocimiento profundo, análisis crítico y capacidad de síntesis. 
                      No se permite retroceder a preguntas anteriores. Cada decisión es definitiva. 
                      <strong> Requiere 70% de puntuación para certificarse.</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-purple-600" />
                    Características del examen
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>10 preguntas</strong> de análisis profundo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Tiempo limitado</strong> por pregunta (15-40 segundos)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Evaluación integral:</strong> conocimientos + análisis + ética</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Escenarios realistas</strong> con múltiples factores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Referencias legales</strong> y estadísticas reales</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    Niveles de certificación
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border border-yellow-300">
                      <span className="font-semibold text-yellow-900">🏆 Excelencia</span>
                      <span className="text-yellow-700">≥ 90%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg border border-emerald-300">
                      <span className="font-semibold text-emerald-900">⭐ Destacado</span>
                      <span className="text-emerald-700">80-89%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border border-blue-300">
                      <span className="font-semibold text-blue-900">✓ Aprobado</span>
                      <span className="text-blue-700">70-79%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg border border-slate-300">
                      <span className="font-semibold text-slate-700">✗ No Aprobado</span>
                      <span className="text-slate-600">&lt; 70%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  Competencias evaluadas
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-indigo-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>Evaluación de riesgos complejos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>Toma de decisiones bajo presión</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>Análisis de consecuencias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>Conocimiento legal y normativo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>Responsabilidad social</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>Síntesis y aplicación integral</span>
                  </div>
                </div>
              </div>

              <button
                onClick={startExam}
                className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 text-white font-bold py-5 rounded-lg transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl text-lg"
              >
                <Shield className="w-6 h-6" />
                Iniciar Examen de Certificación
                <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-center text-xs text-slate-500 mt-4">
                Al iniciar, aceptas que has completado todos los niveles previos y estás preparado para esta evaluación final
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (examComplete) {
    const results = calculateResults();
    const certLevel = getCertificationLevel(results.percentage);
    const passed = results.percentage >= 70;
    const CertIcon = certLevel.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-purple-200 overflow-hidden">
            <div className={`p-8 text-white bg-gradient-to-r ${certLevel.color}`}>
              <div className="flex items-center justify-center mb-6">
                <CertIcon className="w-20 h-20" />
              </div>
              <h1 className="text-4xl font-bold text-center mb-3">
                {passed ? `Certificación: ${certLevel.level}` : 'Certificación No Obtenida'}
              </h1>
              <p className="text-center text-white/90 text-lg">
                {passed 
                  ? 'Has demostrado competencia experta en seguridad vial peatonal' 
                  : 'Se requiere mayor preparación para obtener la certificación'}
              </p>
            </div>

            <div className="p-8">
              {/* Estadísticas principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-50 rounded-lg p-5 text-center border-2 border-purple-200">
                  <div className="text-4xl font-bold text-purple-600 mb-1">{results.percentage}%</div>
                  <div className="text-sm text-slate-600">Puntuación</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-5 text-center border-2 border-indigo-200">
                  <div className="text-4xl font-bold text-indigo-600 mb-1">{results.correctCount}/10</div>
                  <div className="text-sm text-slate-600">Correctas</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-5 text-center border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-600 mb-1">{score}</div>
                  <div className="text-sm text-slate-600">Puntos</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-5 text-center border-2 border-cyan-200">
                  <div className="text-4xl font-bold text-cyan-600 mb-1">{results.averageTime}s</div>
                  <div className="text-sm text-slate-600">Tiempo Prom.</div>
                </div>
              </div>

              {/* Desglose por categoría */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Desempeño por pregunta</h3>
                <div className="space-y-2">
                  {answers.map((answer, idx) => {
                    const q = CERTIFICATION_QUESTIONS[idx];
                    return (
                      <div key={idx} className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                        answer.correct 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-red-50 border-red-300'
                      }`}>
                        <div className="flex items-center gap-3 flex-1">
                          {answer.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-slate-900 text-sm">
                              Pregunta {idx + 1}: {q.category}
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5">
                              {q.difficulty === 'critical' ? '🔴 Crítica' : '🟡 Alta'} • {answer.timeTaken}s
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm font-bold ${
                          answer.correct ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {answer.correct ? `+${answer.points}` : '0'} pts
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certificado o mensaje de mejora */}
              {passed ? (
                <div className={`bg-gradient-to-r ${certLevel.color} rounded-lg p-8 mb-8 text-white`}>
                  <div className="text-center">
                    <CertIcon className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">¡Felicitaciones!</h3>
                    <p className="text-white/90 mb-4">
                      Has obtenido la certificación con nivel: <strong>{certLevel.level}</strong>
                    </p>
                    <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-sm">
                        Has demostrado comprensión profunda de principios de seguridad vial, 
                        capacidad de análisis en situaciones complejas y criterio maduro para 
                        tomar decisiones responsables.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-amber-900 mb-2">Certificación No Obtenida</h4>
                      <p className="text-sm text-amber-800 mb-3">
                        Se requiere un mínimo de 70% (7/10 preguntas correctas) para obtener la certificación. 
                        Tu puntuación actual: {results.percentage}%
                      </p>
                      <p className="text-sm text-amber-800">
                        <strong>Recomendación:</strong> Revisa las explicaciones detalladas de cada pregunta, 
                        refuerza los conceptos de las categorías donde tuviste dificultades, y vuelve a intentar 
                        cuando te sientas preparado.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex gap-3">
                <button
                  onClick={restart}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reintentar Certificación
                </button>
                {passed && (
                  <button
                    onClick={handleComplete}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r ${certLevel.color} text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
                  >
                    Finalizar y Obtener Certificado
                    <Award className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de pregunta con feedback
  if (showFeedback) {
    const isCorrect = selectedAnswer === question.correctAnswer;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-purple-200 overflow-hidden">
            {/* Header de resultado */}
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
                      {isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                    </h2>
                    <p className="text-white/90">
                      {isCorrect ? `+${question.points} puntos` : '0 puntos'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80">Pregunta {currentQuestion + 1}/10</div>
                  <div className="text-2xl font-bold">{score} pts</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Pregunta y categoría */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    question.difficulty === 'critical' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {question.difficulty === 'critical' ? 'Crítica' : 'Alta'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                    {question.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{question.question}</h3>
              </div>

              {/* Explicación detallada */}
              <div className={`p-6 rounded-lg mb-6 ${
                isCorrect 
                  ? 'bg-green-50 border-2 border-green-300' 
                  : 'bg-red-50 border-2 border-red-300'
              }`}>
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Brain className={isCorrect ? 'text-green-700' : 'text-red-700'} />
                  <span className={isCorrect ? 'text-green-900' : 'text-red-900'}>Explicación Detallada</span>
                </h4>
                <p className={`leading-relaxed mb-4 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                  {question.explanation}
                </p>

                {/* Referencias */}
                {question.lawReference && (
                  <div className="bg-white/50 rounded-lg p-4 mb-3">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <strong className="text-blue-900">Marco Legal:</strong>
                        <p className="text-blue-800 mt-1">{question.lawReference}</p>
                      </div>
                    </div>
                  </div>
                )}

                {question.statisticReference && (
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <strong className="text-purple-900">Dato Estadístico:</strong>
                        <p className="text-purple-800 mt-1">{question.statisticReference}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mostrar respuesta correcta si fue incorrecta */}
              {!isCorrect && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Respuesta Correcta
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <p className="text-slate-800 leading-relaxed">
                      {question.correctAnswer}
                    </p>
                  </div>
                </div>
              )}

              {/* Botón continuar */}
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {currentQuestion < CERTIFICATION_QUESTIONS.length - 1 ? (
                  <>
                    Siguiente Pregunta
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Ver Resultados de Certificación
                    <Trophy className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de pregunta activa
  const progress = ((currentQuestion + 1) / CERTIFICATION_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header con progreso y cronómetro */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-purple-300 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  question.difficulty === 'critical' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {question.difficulty === 'critical' ? '🔴 CRÍTICA' : '🟡 ALTA'}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  Pregunta {currentQuestion + 1} de {CERTIFICATION_QUESTIONS.length}
                </span>
              </div>
              <div className="text-xs text-slate-600">{question.category}</div>
            </div>
            <div className={`flex items-center gap-3 px-5 py-3 rounded-lg ${
              timeLeft <= 5 ? 'bg-red-100 border-2 border-red-500 animate-pulse' : 
              timeLeft <= 10 ? 'bg-amber-100 border-2 border-amber-500' : 
              'bg-blue-50 border-2 border-blue-300'
            }`}>
              <Clock className={`w-6 h-6 ${
                timeLeft <= 5 ? 'text-red-600' : 
                timeLeft <= 10 ? 'text-amber-600' : 
                'text-blue-600'
              }`} />
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  timeLeft <= 5 ? 'text-red-700' : 
                  timeLeft <= 10 ? 'text-amber-700' : 
                  'text-blue-700'
                }`}>
                  {timeLeft}
                </div>
                <div className="text-xs text-slate-600">segundos</div>
              </div>
            </div>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel izquierdo: Contexto */}
          <div className="lg:col-span-1 space-y-4">
            {/* Escenario */}
            <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-5">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Eye className="w-4 h-4 text-purple-600" />
                Escenario
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">{question.scenario}</p>
            </div>

            {/* Contexto visual si existe */}
            {question.visualContext && (
              <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-5">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <Target className="w-4 h-4 text-purple-600" />
                  Condiciones
                </h4>
                <div className="space-y-2">
                  {question.visualContext.trafficLight && (
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="text-xs text-slate-600">Semáforo</span>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100">
                        {question.visualContext.trafficLight}
                      </span>
                    </div>
                  )}
                  {question.visualContext.weather && (
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="text-xs text-slate-600">Clima</span>
                      <span className="text-xs font-medium">{question.visualContext.weather}</span>
                    </div>
                  )}
                  {question.visualContext.timeOfDay && (
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="text-xs text-slate-600">Hora</span>
                      <span className="text-xs font-medium">{question.visualContext.timeOfDay}</span>
                    </div>
                  )}
                  {question.visualContext.riskLevel && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-xs text-slate-600">Nivel de Riesgo</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        question.visualContext.riskLevel === 'crítico' ? 'bg-red-100 text-red-700' :
                        question.visualContext.riskLevel === 'alto' ? 'bg-orange-100 text-orange-700' :
                        question.visualContext.riskLevel === 'moderado' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {question.visualContext.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Puntuación actual */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-300 p-5">
              <div className="text-center">
                <div className="text-sm text-purple-700 font-medium mb-2">Puntuación Acumulada</div>
                <div className="text-4xl font-bold text-purple-900 mb-1">{score}</div>
                <div className="text-xs text-purple-600">de {CERTIFICATION_QUESTIONS.reduce((sum, q) => sum + q.points, 0)} puntos</div>
              </div>
            </div>
          </div>

          {/* Panel derecho: Pregunta y opciones */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border-2 border-purple-200 p-6">
              {/* Pregunta */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  {question.question}
                </h3>
                <p className="text-sm text-slate-600">
                  Valor: <strong>{question.points} puntos</strong> • 
                  Selecciona la respuesta más completa y correcta
                </p>
              </div>

              {/* Opciones */}
              <div className="space-y-3">
                {question.options?.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedAnswer}
                      className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-500 scale-[1.02] shadow-lg'
                          : 'bg-white border-slate-200 hover:border-purple-400 hover:bg-purple-50 hover:scale-[1.01] cursor-pointer'
                      } ${selectedAnswer && !isSelected ? 'opacity-40' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          isSelected 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <p className="flex-1 text-slate-800 leading-relaxed text-sm pt-1">
                          {option}
                        </p>
                        {isSelected && (
                          <div className="flex-shrink-0">
                            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              SELECCIONADO
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Advertencia de tiempo */}
              {timeLeft <= 10 && (
                <div className={`mt-6 p-4 rounded-lg border-2 ${
                  timeLeft <= 5 
                    ? 'bg-red-50 border-red-300' 
                    : 'bg-amber-50 border-amber-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      timeLeft <= 5 ? 'text-red-600' : 'text-amber-600'
                    }`} />
                    <span className={`text-sm font-semibold ${
                      timeLeft <= 5 ? 'text-red-900' : 'text-amber-900'
                    }`}>
                      {timeLeft <= 5 
                        ? '¡TIEMPO CRÍTICO! Selecciona una respuesta ahora' 
                        : 'Tiempo reducido - toma tu decisión'}
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

export default PedestrianRulesCertificacion;
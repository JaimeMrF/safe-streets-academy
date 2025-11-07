import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  CheckCircle, XCircle, ArrowRight, Play, Shield, 
  Trophy, AlertTriangle, Scale, Car, Users, Lightbulb, 
  RotateCcw, BookOpen, Bike, AlertCircle
} from 'lucide-react';

type CaseStudy = {
  id: number;
  category: 'legal' | 'ethical' | 'practical' | 'social';
  title: string;
  scenario: string;
  context: string;
  legalFramework?: string;
  challenges: {
    question: string;
    type: 'analysis' | 'application' | 'evaluation';
    options: string[];
    correctAnswer: string;
    deepExplanation: string;
    legalReference?: string;
    consequences: string;
  }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    category: 'legal',
    title: 'Responsabilidad legal del ciclista menor de edad',
    scenario: 'Juan, de 15 años, circula en bicicleta por una avenida principal. No respeta un semáforo en rojo y colisiona con un vehículo que tenía el paso. El conductor del vehículo sufre daños materiales significativos.',
    context: 'En Colombia, los ciclistas tienen derechos y deberes establecidos en el Código Nacional de Tránsito (Ley 769 de 2002). Los menores de edad también están sujetos a estas normas, aunque su responsabilidad legal varía según su edad.',
    legalFramework: 'Artículo 94 del Código Nacional de Tránsito: Los ciclistas deben respetar las señales de tránsito. Código de Infancia y Adolescencia (Ley 1098 de 2006): establece la responsabilidad penal desde los 14 años.',
    challenges: [
      {
        question: '¿Cuál es la principal consecuencia legal que enfrenta Juan en este caso?',
        type: 'analysis',
        options: [
          'No tiene ninguna responsabilidad por ser menor de edad',
          'Responsabilidad penal juvenil aplicable a mayores de 14 años, más responsabilidad civil por daños',
          'Solo sus padres responden económicamente sin consecuencias para él',
          'Va a prisión como un adulto'
        ],
        correctAnswer: 'Responsabilidad penal juvenil aplicable a mayores de 14 años, más responsabilidad civil por daños',
        deepExplanation: 'En Colombia, según el Sistema de Responsabilidad Penal para Adolescentes (SRPA), los menores entre 14 y 18 años tienen responsabilidad penal diferenciada. Juan, con 15 años, puede enfrentar sanciones dentro del sistema juvenil. Adicionalmente, existe responsabilidad civil por los daños causados, que generalmente recae sobre los padres o representantes legales según el Código Civil (Art. 2346-2350).',
        legalReference: 'Ley 1098 de 2006 - Art. 139 a 190. Código Civil - Art. 2346 a 2350.',
        consequences: 'Las consecuencias pueden incluir: amonestaciones, imposición de reglas de conducta, servicios a la comunidad, libertad asistida, e indemnización económica a cargo de los representantes legales. El registro en el SRPA puede afectar futuros antecedentes.'
      },
      {
        question: 'Desde una perspectiva de prevención, ¿qué medida hubiera sido más efectiva para evitar esta situación?',
        type: 'evaluation',
        options: [
          'Prohibir que los menores de 18 años circulen en bicicleta',
          'Educación vial sistemática y comprensión de consecuencias legales desde la formación escolar',
          'Aumentar las multas para ciclistas',
          'Eliminar los semáforos en zonas de alta circulación ciclística'
        ],
        correctAnswer: 'Educación vial sistemática y comprensión de consecuencias legales desde la formación escolar',
        deepExplanation: 'El Art. 56 de la Ley 769 de 2002 establece la obligatoriedad de la educación vial en todos los niveles educativos. La formación temprana y continua en normas de tránsito, combinada con la comprensión de las consecuencias legales, genera conciencia ciudadana efectiva. Los estudios demuestran que la educación preventiva es más efectiva que las medidas punitivas para cambiar comportamientos viales.',
        legalReference: 'Ley 769 de 2002 - Art. 56. Ley 1503 de 2011 - Promueve formación de hábitos seguros.',
        consequences: 'La educación vial reduce hasta un 40% los accidentes relacionados con jóvenes ciclistas según datos de la ANSV (Agencia Nacional de Seguridad Vial).'
      }
    ]
  },
  {
    id: 2,
    category: 'ethical',
    title: 'Dilema ético: testigo de conducción temeraria',
    scenario: 'Observas que tu mejor amigo, quien recientemente obtuvo su licencia de conducción, conduce de manera temeraria: exceso de velocidad, uso del celular, y no respeta señales. Has intentado hablar con él pero te responde que "controla perfectamente" y que "nunca le ha pasado nada".',
    context: 'En Colombia, la conducción temeraria está tipificada como una contravención grave. El uso del celular mientras se conduce aumenta 4 veces el riesgo de accidente. Como ciudadano, tienes responsabilidades éticas y sociales respecto a la seguridad vial.',
    legalFramework: 'Ley 769 de 2002, Art. 131: Define las contravenciones. Art. 55: Establece el comportamiento esperado de todos los actores viales.',
    challenges: [
      {
        question: '¿Cuál es la acción éticamente más correcta en esta situación, considerando tanto tu relación personal como la responsabilidad social?',
        type: 'evaluation',
        options: [
          'Ignorar la situación porque es su decisión personal y su vida',
          'Intervenir mediante diálogo fundamentado, informar a sus padres si es menor, y como última instancia reportar a autoridades si el peligro persiste',
          'Romper la amistad inmediatamente sin intentar ayudarlo',
          'Acompañarlo siempre para "cuidarlo" pero sin confrontarlo'
        ],
        correctAnswer: 'Intervenir mediante diálogo fundamentado, informar a sus padres si es menor, y como última instancia reportar a autoridades si el peligro persiste',
        deepExplanation: 'La ética de la responsabilidad social establece que tenemos deberes hacia el bienestar de otros, especialmente cuando podemos prevenir daños. El Art. 95 de la Constitución colombiana establece deberes de solidaridad social. La escalada de intervención (diálogo → familia → autoridades) balancea la relación personal con la protección de vidas. La omisión cuando se puede actuar genera responsabilidad moral.',
        legalReference: 'Constitución Política de Colombia - Art. 95: Deberes de la persona y del ciudadano.',
        consequences: 'Estadísticamente, un conductor temerario tiene 60% más probabilidades de causar un accidente fatal en los primeros dos años de conducción. Tu intervención puede salvar vidas, incluyendo la de tu amigo.'
      },
      {
        question: 'Si tu amigo causa un accidente grave mientras tú sabías de su conducción temeraria y no actuaste, ¿qué tipo de responsabilidad enfrentas?',
        type: 'analysis',
        options: [
          'Ninguna responsabilidad, cada quien responde por sus actos',
          'Responsabilidad moral y posible responsabilidad civil por omisión consciente',
          'Prisión por complicidad en el accidente',
          'Solo culpa emocional sin consecuencias reales'
        ],
        correctAnswer: 'Responsabilidad moral y posible responsabilidad civil por omisión consciente',
        deepExplanation: 'Aunque generalmente no existe responsabilidad penal por no reportar conductas de riesgo (excepto en casos específicos como conducción en estado de embriaguez conocida), sí existe responsabilidad moral clara. En casos donde se demuestre que tenías conocimiento del peligro y posibilidad real de prevención, podría configurarse responsabilidad civil por omisión. Más importante aún, la carga psicológica y moral de no haber actuado puede ser devastadora.',
        legalReference: 'Código Civil - Art. 2341: responsabilidad por daños causados. Principio de solidaridad social.',
        consequences: 'Más allá de lo legal, vivir con la carga de haber podido prevenir un accidente grave y no haberlo hecho genera consecuencias psicológicas significativas. La prevención es siempre preferible a la culpa posterior.'
      }
    ]
  },
  {
    id: 3,
    category: 'practical',
    title: 'Análisis de accidente: determinación de culpabilidad',
    scenario: 'En una intersección sin semáforo, un motociclista circulaba a velocidad dentro del límite permitido. Un vehículo, con señal de pare, no se detuvo completamente e ingresó a la intersección, resultando en una colisión. El motociclista sufrió lesiones graves.',
    context: 'La determinación de responsabilidad en accidentes de tránsito es compleja y requiere análisis técnico-legal. En Colombia, la investigación de accidentes la realiza la autoridad de tránsito mediante inspección técnica.',
    legalFramework: 'Ley 769 de 2002, Art. 109: Obligaciones frente a la señal de PARE. Art. 143: Procedimiento en caso de accidente.',
    challenges: [
      {
        question: 'Desde el análisis técnico-legal, ¿quién tiene la responsabilidad principal en este accidente?',
        type: 'application',
        options: [
          'El motociclista por no prever la imprudencia del vehículo',
          'El conductor del vehículo por no respetar la señal de PARE y no verificar la vía',
          'Ambos tienen igual responsabilidad por estar en la intersección',
          'Ninguno, fue un "accidente inevitable"'
        ],
        correctAnswer: 'El conductor del vehículo por no respetar la señal de PARE y no verificar la vía',
        deepExplanation: 'El Art. 109 de la Ley 769 de 2002 es explícito: ante una señal de PARE, el conductor debe detenerse completamente y ceder el paso a los vehículos que circulan por la vía preferencial. El motociclista tenía el derecho de paso y circulaba dentro de los límites legales. La responsabilidad primaria recae en quien no respetó la señalización. Sin embargo, el concepto de "conducción defensiva" sugiere que todos los actores viales deben anticipar errores de otros.',
        legalReference: 'Ley 769 de 2002 - Art. 109: Señal de PARE. Art. 55: Comportamiento del conductor.',
        consequences: 'El conductor del vehículo enfrenta: comparendo por no respetar señalización (C07), responsabilidad civil por lesiones y daños, posible proceso penal por lesiones culposas (Art. 120 Código Penal), aumento sustancial en pólizas de seguro, y registro en el RUNT.'
      },
      {
        question: 'Como testigo presencial del accidente, ¿cuál es tu obligación legal y ética?',
        type: 'application',
        options: [
          'Irte rápidamente para no involucrarte en problemas legales',
          'Permanecer en el lugar, colaborar con autoridades proporcionando testimonio veraz, y asistir a víctimas si tienes conocimientos de primeros auxilios',
          'Solo tomar fotos y publicarlas en redes sociales',
          'Llamar al 123 pero irte antes de que lleguen las autoridades'
        ],
        correctAnswer: 'Permanecer en el lugar, colaborar con autoridades proporcionando testimonio veraz, y asistir a víctimas si tienes conocimientos de primeros auxilios',
        deepExplanation: 'El Art. 143 de la Ley 769 establece obligaciones de los testigos de accidentes. El Art. 131 del Código Penal tipifica la omisión de socorro como delito. Éticamente, el principio de solidaridad (Art. 95 Constitución) nos obliga a asistir. Tu testimonio puede ser crucial para determinar responsabilidades. La omisión de socorro puede generar responsabilidad penal.',
        legalReference: 'Ley 769 de 2002 - Art. 143. Código Penal - Art. 131: Omisión de socorro.',
        consequences: 'Permanecer y colaborar protege legalmente al testigo (tu declaración veraz no te hace responsable) y puede ser determinante para que las víctimas reciban justicia. La omisión puede generar hasta 32 meses de prisión.'
      }
    ]
  },
  {
    id: 4,
    category: 'social',
    title: 'Cultura vial y convivencia urbana',
    scenario: 'En tu colegio, un grupo significativo de estudiantes ha adoptado prácticas riesgosas: cruzar corriendo entre vehículos, usar patinetas en vías vehiculares sin protección, y generar "retos" virales que implican peligros en el tráfico.',
    context: 'La cultura vial es el conjunto de valores, comportamientos y actitudes de una sociedad frente a la movilidad. En Colombia, el PESV (Plan Estratégico de Seguridad Vial) busca transformar estos comportamientos.',
    legalFramework: 'Ley 1503 de 2011: Promueve la formación de hábitos, comportamientos y conductas seguros en la vía. Ley 1098 de 2006: Protección integral de niños, niñas y adolescentes.',
    challenges: [
      {
        question: 'Como líder estudiantil comprometido con la seguridad, ¿cuál es la estrategia más efectiva para cambiar esta cultura de riesgo?',
        type: 'evaluation',
        options: [
          'Reportar individualmente a cada estudiante con las directivas para que los sancionen',
          'Liderar un movimiento de educación entre pares, crear contenido educativo viral alternativo, e involucrar a la comunidad educativa en un proyecto de seguridad vial',
          'Ignorar la situación porque "cada quien es responsable de sí mismo"',
          'Unirse a las prácticas riesgosas para no ser excluido socialmente'
        ],
        correctAnswer: 'Liderar un movimiento de educación entre pares, crear contenido educativo viral alternativo, e involucrar a la comunidad educativa en un proyecto de seguridad vial',
        deepExplanation: 'La teoría del cambio social establece que las transformaciones culturales son más efectivas cuando surgen desde los propios grupos. La educación entre pares (peer education) tiene una efectividad del 60% superior a la enseñanza vertical en adolescentes. El Art. 32 de la Ley 1098 establece el derecho de participación de los adolescentes. Crear contranarrativas positivas que compitan con los contenidos riesgosos es una estrategia probada en salud pública.',
        legalReference: 'Ley 1503 de 2011 - Art. 3: Principios. Ley 1098 de 2006 - Art. 32: Derecho de participación.',
        consequences: 'Programas de educación vial liderados por jóvenes han reducido accidentes hasta en un 35% en colegios colombianos según la ANSV. Tu liderazgo puede crear un efecto multiplicador que salve vidas.'
      },
      {
        question: 'El colegio decide implementar un "Proyecto de Movilidad Escolar Segura". ¿Qué elementos son esenciales para su éxito según la normativa colombiana?',
        type: 'application',
        options: [
          'Solo conferencias dictadas por policía de tránsito una vez al año',
          'Diagnóstico participativo, plan de acción con la comunidad, formación continua, intervención del entorno escolar, y evaluación permanente',
          'Comprar señales de tránsito para el colegio',
          'Prohibir que los estudiantes salgan del colegio'
        ],
        correctAnswer: 'Diagnóstico participativo, plan de acción con la comunidad, formación continua, intervención del entorno escolar, y evaluación permanente',
        deepExplanation: 'La Guía de Planes Escolares de Movilidad (ANSV) establece 7 pasos: diagnóstico, conformación de equipo, formación de la comunidad educativa, diseño participativo de estrategias, intervención del entorno, seguimiento y evaluación. La participación de toda la comunidad (estudiantes, docentes, familias, vecinos) es crucial. El enfoque debe ser sistémico, no puntual.',
        legalReference: 'Resolución 1565 de 2014 ANSV: Guía metodológica para elaboración de PMES.',
        consequences: 'Los Planes de Movilidad Escolar han reducido hasta un 55% los accidentes en entornos escolares en ciudades como Bogotá y Medellín. La sostenibilidad del proyecto depende de la apropiación comunitaria.'
      }
    ]
  },
  {
    id: 5,
    category: 'legal',
    title: 'Responsabilidad de pasajero: caso del conductor en estado de embriaguez',
    scenario: 'Asistes a una fiesta. Tu amigo, quien tiene vehículo y fue quien los transportó, consume alcohol durante la reunión. Al finalizar, insiste en conducir de regreso argumentando que "solo fueron unas cervezas" y que "está bien".',
    context: 'En Colombia, conducir bajo efectos del alcohol es una de las principales causas de accidentes fatales. El Art. 152 de la Ley 769 lo tipifica como contravención gravísima. La alcoholemia permitida es 0.0 para conductores.',
    legalFramework: 'Ley 769 de 2002, Art. 152: Embriaguez grado 0. Código Penal, Art. 110: Homicidio culposo agravado cuando el conductor está en embriaguez.',
    challenges: [
      {
        question: 'Desde la perspectiva de responsabilidad compartida, ¿cuál es la acción correcta?',
        type: 'evaluation',
        options: [
          'Subir al vehículo porque confías en tu amigo y asumir el riesgo individual',
          'Impedir que conduzca, ofrecer alternativas (taxi, conductor designado, aplicación), y en último caso retener las llaves o alertar a autoridades',
          'Subir pero pedirle que conduzca "despacio"',
          'Solo tú no subir pero dejar que otros suban'
        ],
        correctAnswer: 'Impedir que conduzca, ofrecer alternativas (taxi, conductor designado, aplicación), y en último caso retener las llaves o alertar a autoridades',
        deepExplanation: 'Permitir conscientemente que un conductor en estado de embriaguez conduzca puede configurar coautoría o complicidad en caso de accidente. Jurídicamente, si conoces el estado del conductor y aun así permites que otras personas aborden el vehículo, puedes ser considerado corresponsable. Más importante, éticamente tienes el deber de proteger vidas. Las estadísticas muestran que el 27% de muertes viales en Colombia involucran alcohol.',
        legalReference: 'Ley 769 de 2002 - Art. 152. Código Penal - Art. 30: Coautores y partícipes.',
        consequences: 'Si ocurre un accidente fatal, los pasajeros que conocían el estado del conductor pueden enfrentar procesos civiles por no haber impedido la conducción. El conductor enfrenta hasta 10 años de prisión por homicidio culposo agravado.'
      },
      {
        question: 'Tu amigo se molesta y dice que "exageras" y que "eres aburrido". ¿Cómo respondes desde una posición de asertividad y conocimiento legal?',
        type: 'application',
        options: [
          'Ceder para mantener la amistad y evitar conflictos',
          '"No es exageración, es prevención. Un accidente por embriaguez puede significar vidas perdidas, años de cárcel y culpas permanentes. Valoro nuestra amistad y por eso no permitiré que cometas este error"',
          'Responder agresivamente e irte molesto sin más explicación',
          'Aceptar subir para "no dañar la fiesta"'
        ],
        correctAnswer: '"No es exageración, es prevención. Un accidente por embriaguez puede significar vidas perdidas, años de cárcel y culpas permanentes. Valoro nuestra amistad y por eso no permitiré que cometas este error"',
        deepExplanation: 'La comunicación asertiva en seguridad vial es fundamental. Debe incluir: información factual (consecuencias legales y sociales), expresión de sentimientos genuinos (preocupación), y propuesta de alternativas constructivas. Las amistades verdaderas se fortalecen cuando uno protege al otro de decisiones con consecuencias irreversibles. Los datos demuestran que la presión de pares puede reducir hasta en 70% la probabilidad de conducción en embriaguez cuando se ejerce correctamente.',
        legalReference: 'Principios de prevención de la Ley 1503 de 2011.',
        consequences: 'Tu firmeza puede prevenir un accidente fatal. Las estadísticas muestran que en el 40% de casos, el conductor desistió de conducir en embriaguez cuando amigos ejercieron presión para impedirlo. Tu acción puede salvar múltiples vidas.'
      }
    ]
  }
];

const TrafficSafetyDesarrolloSecundaria = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentCase, setCurrentCase] = useState(0);
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

  const caseStudy = CASE_STUDIES[currentCase];
  const challenge = caseStudy.challenges[currentChallenge];
  const totalChallenges = CASE_STUDIES.reduce((sum, c) => sum + c.challenges.length, 0);
  const completedChallenges = CASE_STUDIES.slice(0, currentCase).reduce((sum, c) => sum + c.challenges.length, 0) + currentChallenge;

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
    if (currentChallenge < caseStudy.challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else if (currentCase < CASE_STUDIES.length - 1) {
      setCurrentCase(prev => prev + 1);
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
    setCurrentCase(0);
    setCurrentChallenge(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setScore(0);
    setCorrectAnswers(0);
    setGameComplete(false);
    setStarted(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'legal': return Scale;
      case 'ethical': return Users;
      case 'practical': return Car;
      case 'social': return Shield;
      default: return AlertTriangle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legal': return 'from-blue-600 to-indigo-700';
      case 'ethical': return 'from-purple-600 to-pink-600';
      case 'practical': return 'from-orange-600 to-red-600';
      case 'social': return 'from-green-600 to-emerald-700';
      default: return 'from-slate-600 to-gray-700';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'legal': return 'bg-blue-50 border-blue-200';
      case 'ethical': return 'bg-purple-50 border-purple-200';
      case 'practical': return 'bg-orange-50 border-orange-200';
      case 'social': return 'bg-green-50 border-green-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  // Pantalla de inicio
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-zinc-900 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-10 h-10" />
                <div>
                  <h1 className="text-3xl font-bold">Seguridad Vial - Nivel Desarrollo</h1>
                  <p className="text-slate-300 text-lg mt-1">Análisis de casos y responsabilidad legal - Bachillerato</p>

                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-8">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Nivel de complejidad avanzado</h3>
                    <p className="text-sm text-amber-800">
                      Este nivel requiere análisis crítico, comprensión de marcos legales colombianos y toma de decisiones complejas. Estudiarás casos reales basados en la normativa nacional.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Competencias a evaluar</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <Scale className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Análisis legal</h3>
                      <p className="text-sm text-slate-700">Interpretación de normativa del Código Nacional de Tránsito</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-5 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Razonamiento ético</h3>
                      <p className="text-sm text-slate-700">Dilemas morales y responsabilidad social vial</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-5 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <Car className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Aplicación práctica</h3>
                      <p className="text-sm text-slate-700">Resolución de situaciones reales de tránsito</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-5 bg-green-50 rounded-lg border-2 border-green-200">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Conciencia social</h3>
                      <p className="text-sm text-slate-700">Cultura vial y transformación comunitaria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 border border-slate-300 rounded-lg p-5 mb-8">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Estructura del nivel
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>5 casos de estudio</strong> basados en situaciones reales</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>10 desafíos totales</strong> que integran análisis legal, ético y práctico</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>Referencias legales:</strong> Ley 769/2002, Código Penal, Constitución Política</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>Retroalimentación profunda</strong> con consecuencias legales y sociales</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">•</span>
                    <span><strong>Aprobación:</strong> 70% de precisión requerida</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-full bg-gradient-to-r from-slate-700 to-zinc-900 hover:from-slate-800 hover:to-zinc-950 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Iniciar análisis de casos
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className={`p-8 text-white bg-gradient-to-r ${passed ? 'from-emerald-600 to-green-700' : 'from-amber-600 to-orange-700'}`}>
              <div className="flex items-center justify-center mb-4">
                {passed ? (
                  <Trophy className="w-20 h-20" />
                ) : (
                  <AlertTriangle className="w-20 h-20" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {passed ? 'Análisis Completado Exitosamente' : 'Evaluación Finalizada'}
              </h1>
              <p className="text-center text-white/90 text-lg">
                {passed 
                  ? 'Has demostrado competencia en análisis legal y ético de situaciones viales'
                  : 'Revisa los conceptos legales y refuerza tu comprensión normativa'}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 rounded-lg p-6 text-center border-2 border-slate-200">
                  <div className="text-4xl font-bold text-slate-900 mb-1">{accuracy}%</div>
                  <div className="text-sm text-slate-600">Precisión</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-6 text-center border-2 border-slate-200">
                  <div className="text-4xl font-bold text-slate-900 mb-1">{correctAnswers}/{totalChallenges}</div>
                  <div className="text-sm text-slate-600">Correctas</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-6 text-center border-2 border-slate-200">
                  <div className="text-4xl font-bold text-slate-900 mb-1">{score}</div>
                  <div className="text-sm text-slate-600">Puntuación</div>
                </div>
              </div>

              {passed && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Competencias Certificadas</h4>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        Has demostrado comprensión sólida de la normativa colombiana en seguridad vial, capacidad de análisis ético y toma de decisiones responsables. Estás preparado para ser un ciudadano vial consciente y promotor de cultura vial en tu comunidad.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!passed && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-900 mb-2">Refuerzo Recomendado</h4>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        Se requiere 70% de precisión. Te recomendamos revisar el Código Nacional de Tránsito (Ley 769/2002), estudiar casos de jurisprudencia y reflexionar sobre las consecuencias legales de las acciones viales.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={restart}
                  className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reintentar evaluación
                </button>
                {passed && (
                  <button
                    onClick={handleComplete}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-700 to-zinc-900 hover:from-slate-800 hover:to-zinc-950 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
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
  const CategoryIcon = getCategoryIcon(caseStudy.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header con progreso */}
        <div className="bg-white rounded-lg shadow-md border border-slate-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm font-semibold text-slate-800">
                Caso {currentCase + 1}/{CASE_STUDIES.length} - Desafío {currentChallenge + 1}/{caseStudy.challenges.length}
              </span>
              <div className="text-xs text-slate-600 mt-1">
                Progreso: {completedChallenges + 1}/{totalChallenges} desafíos completados
              </div>
            </div>
            <span className="text-sm font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-lg">
              {score} pts
            </span>
          </div>
          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-slate-700 to-zinc-900 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel izquierdo: Caso de estudio */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
              <div className={`flex items-center gap-3 mb-4 p-3 rounded-lg bg-gradient-to-r ${getCategoryColor(caseStudy.category)}`}>
                <CategoryIcon className="w-6 h-6 text-white" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                  {caseStudy.category === 'legal' ? 'Análisis Legal' :
                   caseStudy.category === 'ethical' ? 'Dilema Ético' :
                   caseStudy.category === 'practical' ? 'Caso Práctico' : 'Responsabilidad Social'}
                </h3>
              </div>
              
              <h2 className="text-lg font-bold text-slate-900 mb-3">{caseStudy.title}</h2>
              
              <div className={`p-4 rounded-lg border-2 ${getCategoryBg(caseStudy.category)} mb-3`}>
                <p className="text-xs font-semibold text-slate-700 uppercase mb-2">Escenario</p>
                <p className="text-sm text-slate-800 leading-relaxed">{caseStudy.scenario}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-3">
                <p className="text-xs font-semibold text-slate-700 uppercase mb-2">Contexto</p>
                <p className="text-xs text-slate-700 leading-relaxed">{caseStudy.context}</p>
              </div>

              {caseStudy.legalFramework && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-4 h-4 text-blue-600" />
                    <p className="text-xs font-bold text-blue-900 uppercase">Marco Legal</p>
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">{caseStudy.legalFramework}</p>
                </div>
              )}
            </div>
          </div>

          {/* Panel derecho: Desafío */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className={`rounded-lg p-3 bg-gradient-to-br ${getCategoryColor(caseStudy.category)}`}>
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-semibold">
                    {challenge.type === 'analysis' ? '📊 Análisis de situación' :
                     challenge.type === 'application' ? '⚖️ Aplicación normativa' :
                     '🎯 Evaluación y juicio'}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{challenge.question}</h3>
                </div>
              </div>

              <div className="space-y-3">
                {challenge.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === challenge.correctAnswer;
                  
                  let className = 'w-full p-4 rounded-lg text-left transition-all border-2 ';
                  
                  if (showFeedback) {
                    if (isCorrect) {
                      className += 'bg-emerald-50 border-emerald-500 shadow-md';
                    } else if (isSelected && !isCorrect) {
                      className += 'bg-red-50 border-red-500 shadow-md';
                    } else {
                      className += 'bg-slate-50 border-slate-200 opacity-60';
                    }
                  } else {
                    className += isSelected 
                      ? 'bg-slate-100 border-slate-500 shadow-md' 
                      : 'bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 cursor-pointer hover:shadow-md';
                  }

                  return (
                    <button
                      key={index}
                      className={className}
                      onClick={() => handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm text-slate-800 leading-relaxed text-left">{option}</span>
                        {showFeedback && isCorrect && (
                          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {showFeedback && (
              <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                <div className={`p-5 rounded-lg mb-4 border-2 ${selectedAnswer === challenge.correctAnswer ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {selectedAnswer === challenge.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <p className="text-base font-bold text-slate-900">
                      {selectedAnswer === challenge.correctAnswer ? 'Análisis Correcto' : 'Respuesta Incorrecta'}
                    </p>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed mb-3">{challenge.deepExplanation}</p>
                  
                  {challenge.legalReference && (
                    <div className="bg-white/50 rounded p-3 mt-3">
                      <p className="text-xs font-semibold text-slate-700 mb-1">📋 Referencias legales:</p>
                      <p className="text-xs text-slate-600">{challenge.legalReference}</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                    <p className="text-sm font-bold text-amber-900">Consecuencias</p>
                  </div>
                  <p className="text-sm text-amber-900 leading-relaxed">{challenge.consequences}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full mt-5 bg-gradient-to-r from-slate-700 to-zinc-900 hover:from-slate-800 hover:to-zinc-950 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {currentChallenge < caseStudy.challenges.length - 1 ? 'Siguiente desafío' :
                   currentCase < CASE_STUDIES.length - 1 ? 'Siguiente caso' : 'Ver resultados finales'}
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

export default TrafficSafetyDesarrolloSecundaria;
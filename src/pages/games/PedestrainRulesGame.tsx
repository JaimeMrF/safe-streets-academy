import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  CheckCircle, XCircle, ArrowRight, Play, BookOpen, 
  Trophy, AlertTriangle, Users, MapPin, Camera, Video, RotateCcw
} from 'lucide-react';

type Scenario = {
  id: number;
  title: string;
  situation: string;
  mediaType: 'video' | 'image' | '3d';
  mediaUrl: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Señalización vial: Semáforo peatonal',
    situation: 'Te encuentras en una intersección con semáforo peatonal. La luz verde para peatones se activa, sin embargo, observas que un vehículo se aproxima a velocidad considerable sin mostrar señales de desaceleración. Según las normas de seguridad vial, ¿cuál es el procedimiento correcto que debes seguir?',
    mediaType: 'video',
    mediaUrl: 'https://freesvg.org/img/1551866263.png',
    options: [
      {
        text: 'Iniciar el cruce inmediatamente ejerciendo mi derecho de paso como peatón según lo indica el semáforo',
        isCorrect: false,
        feedback: 'Incorrecto. El derecho de paso no garantiza tu seguridad física. La prioridad siempre debe ser verificar que los vehículos se hayan detenido completamente antes de iniciar el cruce, independientemente de la señalización.'
      },
      {
        text: 'Permanecer en la acera hasta confirmar visualmente que el vehículo se ha detenido por completo y establecer contacto visual con el conductor antes de cruzar',
        isCorrect: true,
        feedback: 'Correcto. Este procedimiento aplica el principio de "seguridad defensiva peatonal". Aunque la ley te otorga el derecho de paso, tu seguridad personal debe prevalecer. Verificar la detención completa del vehículo y el contacto visual reduce significativamente el riesgo de atropello.'
      },
      {
        text: 'Cruzar rápidamente corriendo para minimizar el tiempo de exposición al tráfico vehicular',
        isCorrect: false,
        feedback: 'Incorrecto. Correr en cruces peatonales aumenta el riesgo de caídas, dificulta que los conductores calculen tu trayectoria y velocidad, y puede generar situaciones de pánico. El cruce debe realizarse a paso firme pero controlado.'
      }
    ],
    explanation: 'Según estadísticas de seguridad vial, el 34% de los accidentes peatonales ocurren en cruces señalizados debido a la falsa sensación de seguridad. La "conducción defensiva" también aplica a peatones: siempre debes anticipar errores de otros usuarios viales.'
  },
  {
    id: 2,
    title: 'Análisis de riesgos: Zona sin señalización',
    situation: 'Necesitas cruzar una vía de doble sentido que carece de semáforo y paso peatonal señalizado. A ambos lados de la vía hay vehículos estacionados que obstruyen parcialmente la visibilidad. Desde el punto de vista de la seguridad vial, ¿cuál es la acción más apropiada?',
    mediaType: 'image',
    mediaUrl: 'https://example.com/calle-sin-senalizacion.jpg',
    options: [
      {
        text: 'Cruzar entre los vehículos estacionados por ser la distancia más corta y directa',
        isCorrect: false,
        feedback: 'Incorrecto. Cruzar entre vehículos estacionados crea un "punto ciego" bidireccional: ni tú puedes ver los vehículos en circulación ni los conductores pueden verte a ti hasta el último momento, aumentando exponencialmente el riesgo de colisión.'
      },
      {
        text: 'Desplazarse hasta localizar una intersección o zona donde exista visibilidad clara en ambas direcciones del tráfico',
        isCorrect: true,
        feedback: 'Correcto. Este enfoque se basa en el principio de "máxima visibilidad mutua". En ausencia de infraestructura peatonal adecuada, el peatón debe compensar creando las condiciones de seguridad mediante la elección estratégica del punto de cruce.'
      },
      {
        text: 'Esperar hasta que no se observe ningún vehículo en circulación y cruzar rápidamente',
        isCorrect: false,
        feedback: 'Incorrecto. La ausencia momentánea de vehículos visibles no garantiza seguridad si tu campo visual está comprometido. Los vehículos pueden aparecer súbitamente desde zonas ocultas. La velocidad de cruce no compensa la falta de visibilidad adecuada.'
      }
    ],
    explanation: 'El 45% de atropellos fatales ocurren en zonas sin infraestructura peatonal. Los estudios de accidentalidad demuestran que la visibilidad es el factor más crítico en la seguridad peatonal, más incluso que la velocidad del tráfico.'
  },
  {
    id: 3,
    title: 'Factores de distracción: Dispositivos electrónicos',
    situation: 'Te encuentras caminando por la acera mientras redactas un mensaje de texto importante en tu teléfono móvil. Al llegar a un cruce peatonal señalizado, el semáforo indica luz verde para peatones. Considerando los protocolos de seguridad vial, ¿cuál es el procedimiento adecuado?',
    mediaType: '3d',
    mediaUrl: 'https://example.com/modelo-3d-peatonal.glb',
    options: [
      {
        text: 'Continuar escribiendo el mensaje mientras cruzo, aprovechando que el semáforo me otorga el derecho de paso',
        isCorrect: false,
        feedback: 'Incorrecto. Los estudios de atención dividida demuestran que el uso simultáneo de dispositivos electrónicos reduce tu capacidad de procesamiento visual y auditivo del entorno hasta en un 50%, aumentando cuatro veces la probabilidad de accidente.'
      },
      {
        text: 'Guardar el dispositivo móvil, realizar una inspección visual completa en ambas direcciones y cruzar con atención plena al entorno',
        isCorrect: true,
        feedback: 'Correcto. Este procedimiento sigue el protocolo de "atención exclusiva en zonas críticas". El cruce de calles requiere el 100% de tus capacidades cognitivas y sensoriales. Ninguna actividad paralela justifica comprometer tu seguridad.'
      },
      {
        text: 'Reducir mi velocidad de marcha mientras mantengo la atención en el dispositivo para disponer de mayor tiempo de reacción',
        isCorrect: false,
        feedback: 'Incorrecto. La velocidad reducida no compensa la degradación crítica de tu atención. Los datos muestran que la distracción, no la velocidad, es el factor determinante en accidentes peatonales relacionados con dispositivos móviles.'
      }
    ],
    explanation: 'Investigaciones neurológicas confirman que el cerebro humano no puede procesar simultáneamente dos tareas cognitivas complejas. Los "peatones distraídos" representan el 15% de las fatalidades peatonales en zonas urbanas.'
  },
  {
    id: 4,
    title: 'Convivencia en espacio público: Desplazamiento grupal',
    situation: 'Te desplazas junto a un grupo de compañeros por una acera de ancho limitado (aproximadamente 1.5 metros). En dirección contraria se aproxima otro grupo de peatones. Desde la perspectiva de la convivencia vial responsable, ¿qué acción deberías tomar?',
    mediaType: 'video',
    mediaUrl: 'https://example.com/grupo-acera.mp4',
    options: [
      {
        text: 'Mantener la formación actual del grupo, ya que llegamos primero a esta sección de la acera',
        isCorrect: false,
        feedback: 'Incorrecto. Esta actitud viola el principio de "uso compartido del espacio público". Ocupar la totalidad del ancho peatonal obliga a otros usuarios a opciones peligrosas como invadir la calzada, generando situaciones de riesgo innecesarias.'
      },
      {
        text: 'Reorganizar el grupo en formación de fila india o parejas para facilitar el paso bidireccional seguro',
        isCorrect: true,
        feedback: 'Correcto. Esta acción demuestra "ciudadanía vial responsable". El espacio peatonal es un recurso compartido que requiere cooperación mutua. Esta actitud previene conflictos y garantiza el tránsito seguro de todos los usuarios.'
      },
      {
        text: 'Que algunos integrantes del grupo se desplacen temporalmente a la calzada vehicular para ceder espacio',
        isCorrect: false,
        feedback: 'Incorrecto. Abandonar el espacio peatonal protegido expone innecesariamente a personas al tráfico vehicular. La solución siempre debe buscarse dentro de la infraestructura peatonal mediante reorganización espacial del grupo.'
      }
    ],
    explanation: 'El concepto de "cultura vial" implica que todos los usuarios del espacio público tienen derechos y obligaciones equivalentes. El respeto mutuo y la cooperación son fundamentos de la movilidad urbana segura.'
  },
  {
    id: 5,
    title: 'Condiciones ambientales adversas: Visibilidad reducida',
    situation: 'Se presenta una lluvia intensa que reduce significativamente la visibilidad. Necesitas cruzar una avenida principal donde los vehículos circulan a velocidad moderada (40-50 km/h). Las condiciones ambientales comprometen tanto tu visibilidad como la de los conductores. ¿Cuál es el protocolo de seguridad apropiado?',
    mediaType: 'image',
    mediaUrl: 'https://example.com/lluvia-cruce.jpg',
    options: [
      {
        text: 'Posponer el cruce hasta que las condiciones meteorológicas mejoren sustancialmente',
        isCorrect: false,
        feedback: 'Si bien es una opción prudente, no siempre es práctica o posible. Es fundamental desarrollar competencias para cruzar de manera segura bajo condiciones adversas, ya que son situaciones frecuentes en la vida urbana.'
      },
      {
        text: 'Incrementar activamente mi visibilidad mediante ropa de colores claros o reflectantes, verificar contacto visual con los conductores y realizar el cruce con precaución extrema',
        isCorrect: true,
        feedback: 'Correcto. Este enfoque aplica el principio de "compensación de riesgo". Ante condiciones adversas que aumentan los factores de peligro, debes incrementar proporcionalmente las medidas de seguridad, especialmente aquellas relacionadas con visibilidad mutua.'
      },
      {
        text: 'Cruzar a mayor velocidad (corriendo) para minimizar el tiempo de exposición a las condiciones climáticas adversas',
        isCorrect: false,
        feedback: 'Incorrecto. Correr sobre superficies húmedas aumenta dramáticamente el riesgo de caídas debido a la reducción del coeficiente de fricción. Además, dificulta que los conductores, cuyo tiempo de reacción ya está comprometido, calculen tu trayectoria.'
      }
    ],
    explanation: 'Las estadísticas muestran que el 28% de los accidentes peatonales ocurren bajo condiciones de lluvia o poca luz. La distancia de frenado vehicular puede aumentar hasta un 50% en condiciones húmedas, requiriendo precauciones adicionales de todos los usuarios viales.'
  },
  {
    id: 6,
    title: 'Infraestructura vial: Identificación de zonas seguras',
    situation: 'Necesitas cruzar una vía de alta circulación vehicular. En un radio de 100 metros identificas: a) un cruce con semáforo peatonal, b) un paso elevado peatonal (puente), y c) un punto sin señalización con buena visibilidad. ¿Cuál opción prioriza tu seguridad según la jerarquía de infraestructura peatonal?',
    mediaType: '3d',
    mediaUrl: 'https://example.com/infraestructura-vial.glb',
    options: [
      {
        text: 'El punto sin señalización con buena visibilidad, por ser la ruta más directa',
        isCorrect: false,
        feedback: 'Incorrecto. Aunque la visibilidad es importante, la infraestructura especializada proporciona separación física o temporal del tráfico vehicular, reduciendo significativamente los puntos de conflicto y el riesgo de colisión.'
      },
      {
        text: 'El paso elevado peatonal, por ofrecer separación física completa del tráfico vehicular',
        isCorrect: true,
        feedback: 'Correcto. Los pasos elevados representan el nivel más alto en la jerarquía de seguridad peatonal al eliminar completamente la interacción con vehículos. Aunque requieren mayor esfuerzo físico, proporcionan seguridad absoluta durante el cruce.'
      },
      {
        text: 'El cruce con semáforo peatonal, por ofrecer regulación temporal del tráfico',
        isCorrect: false,
        feedback: 'Aunque es una opción válida y segura, técnicamente el paso elevado es superior porque elimina por completo el riesgo de conflicto con vehículos. Los semáforos regulan pero no eliminan la interacción peatón-vehículo.'
      }
    ],
    explanation: 'La jerarquía de seguridad vial peatonal prioriza: 1) Separación física (puentes/túneles), 2) Separación temporal (semáforos), 3) Reducción de velocidad (reductores), 4) Señalización pasiva. Cada nivel superior reduce exponencialmente el riesgo.'
  },
  {
    id: 7,
    title: 'Responsabilidad colectiva: Comportamiento ejemplo',
    situation: 'Observas que un compañero de tu edad cruza habitualmente la calle por zonas no señalizadas y sin verificar el tráfico, argumentando que "nunca le ha pasado nada". Como persona informada en seguridad vial, ¿cuál es tu responsabilidad en esta situación?',
    mediaType: 'video',
    mediaUrl: 'https://example.com/comportamiento-vial.mp4',
    options: [
      {
        text: 'Ignorar la situación, ya que cada persona es responsable de sus propias decisiones',
        isCorrect: false,
        feedback: 'Incorrecto. La seguridad vial es una responsabilidad colectiva. El silencio ante comportamientos de riesgo normaliza conductas peligrosas y puede influir negativamente en otros, especialmente en grupos de pares donde la presión social es significativa.'
      },
      {
        text: 'Dialogar constructivamente sobre los riesgos, compartir información de seguridad vial y modelar comportamientos seguros consistentemente',
        isCorrect: true,
        feedback: 'Correcto. Este enfoque demuestra "liderazgo en seguridad vial". La educación entre pares es altamente efectiva. Tu ejemplo y comunicación respetuosa pueden prevenir accidentes futuros. Las estadísticas muestran que un solo accidente puede tener consecuencias permanentes.'
      },
      {
        text: 'Reportar el comportamiento a las autoridades escolares para que tomen medidas disciplinarias',
        isCorrect: false,
        feedback: 'Aunque la intención es positiva, el enfoque punitivo sin diálogo previo puede generar resistencia. La primera acción debe ser la comunicación directa y educativa. Las medidas institucionales son complementarias, no sustitutivas del diálogo.'
      }
    ],
    explanation: 'Los estudios de psicología social demuestran que el comportamiento de pares tiene mayor influencia en adolescentes que las normas formales. El "efecto espectador" indica que la probabilidad de intervención aumenta cuando las personas entienden su responsabilidad como agentes de cambio.'
  }
];

const PedestrianRulesGame = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (scenario.options[index].isCorrect) {
      setScore(prev => prev + Math.round(100 / SCENARIOS.length));
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setGameComplete(true);
    }
  };

  const calculateAccuracy = () => {
    return Math.round((correctAnswers / SCENARIOS.length) * 100);
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
      
      // Redirigir al selector de niveles del curso
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
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setCorrectAnswers(0);
    setGameComplete(false);
    setStarted(false);
  };

  // Pantalla de inicio
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Reglas del Peatón - Introducción</h1>
              </div>
              <p className="text-slate-200 text-lg">Nivel introductorio de seguridad vial - Secundaria</p>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Objetivos del nivel</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Conceptos fundamentales</h3>
                      <p className="text-sm text-slate-600">Comprender los principios básicos de seguridad peatonal</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Reconocimiento de riesgos</h3>
                      <p className="text-sm text-slate-600">Identificar situaciones comunes de peligro en la vía</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Comportamiento seguro</h3>
                      <p className="text-sm text-slate-600">Aprender las acciones correctas como peatón responsable</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                    <Users className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Responsabilidad compartida</h3>
                      <p className="text-sm text-slate-600">Entender tu rol en la seguridad vial urbana</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">Instrucciones</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Este nivel contiene {SCENARIOS.length} situaciones prácticas de seguridad vial</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Cada situación incluye material visual de apoyo</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Lee atentamente antes de seleccionar tu respuesta</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Recibirás retroalimentación después de cada respuesta</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Necesitas 70% o más para completar el nivel</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Comenzar nivel
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
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className={`p-8 text-white ${passed ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-amber-600 to-orange-600'}`}>
              <div className="flex items-center justify-center mb-4">
                {passed ? (
                  <Trophy className="w-16 h-16" />
                ) : (
                  <AlertTriangle className="w-16 h-16" />
                )}
              </div>
              <h1 className="text-2xl font-bold text-center mb-2">
                {passed ? 'Nivel Completado' : 'Nivel Finalizado'}
              </h1>
              <p className="text-center text-white/90">
                {passed 
                  ? 'Has aprobado el nivel introductorio de seguridad peatonal'
                  : 'Repasa los conceptos e intenta nuevamente'}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 rounded-lg p-6 text-center border border-slate-200">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{accuracy}%</div>
                  <div className="text-sm text-slate-600">Precisión</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-6 text-center border border-slate-200">
                  <div className="text-3xl font-bold text-slate-900 mb-1">{correctAnswers}/{SCENARIOS.length}</div>
                  <div className="text-sm text-slate-600">Respuestas correctas</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Puntuación</span>
                  <span className="text-sm font-semibold text-slate-900">{score}/100</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${passed ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              {passed && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">Nivel Aprobado</h4>
                      <p className="text-sm text-gray-700">
                        Tu progreso ha sido registrado. Puedes continuar con los siguientes niveles del curso.
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
                      <h4 className="font-bold text-amber-800 mb-1">Refuerzo Recomendado</h4>
                      <p className="text-sm text-gray-700">
                        Se requiere un mínimo de 70% de precisión. Revisa los conceptos y realiza nuevamente la evaluación.
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
                    className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
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
  const progress = ((currentScenario + 1) / SCENARIOS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header con progreso */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">
              Situación {currentScenario + 1} de {SCENARIOS.length}
            </span>
            <span className="text-sm font-semibold text-slate-900">
              Puntos: {score}
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-700 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-6">
         
  

          {/* Panel derecho: Situación y opciones */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{scenario.title}</h2>
              <p className="text-slate-700 leading-relaxed">{scenario.situation}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">¿Cuál es la decisión más segura?</h3>
              <div className="space-y-3">
                {scenario.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = option.isCorrect;
                  
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
                      ? 'bg-slate-100 border-slate-400' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer';
                  }

                  return (
                    <button
                      key={index}
                      className={className}
                      onClick={() => handleOptionSelect(index)}
                      disabled={showFeedback}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm text-slate-800">{option.text}</span>
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

            {showFeedback && selectedOption !== null && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className={`p-4 rounded-lg mb-4 ${scenario.options[selectedOption].isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-sm text-slate-800 font-medium mb-1">
                    {scenario.options[selectedOption].isCorrect ? 'Respuesta correcta' : 'Respuesta incorrecta'}
                  </p>
                  <p className="text-sm text-slate-700">{scenario.options[selectedOption].feedback}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-blue-900 mb-1">Explicación complementaria</p>
                  <p className="text-sm text-blue-800">{scenario.explanation}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {currentScenario < SCENARIOS.length - 1 ? 'Siguiente situación' : 'Ver resultados'}
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

export default PedestrianRulesGame;
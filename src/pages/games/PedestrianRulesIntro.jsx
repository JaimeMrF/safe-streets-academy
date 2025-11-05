import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Target, TrendingUp, Award, Info, Play } from 'lucide-react';

const PedestrianRulesIntro = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [educationLevel, setEducationLevel] = useState('primaria');

  // Situaciones básicas del peatón (adaptadas por nivel educativo)
  const getScenarios = () => {
    const baseScenarios = [
      {
        id: 1,
        title: 'Caminando por la Acera',
        description: '¿Por dónde debe caminar un peatón de forma segura?',
        context: 'Vas caminando por la calle. Hay una acera y la calzada donde pasan los autos.',
        situation: '🚶‍♂️👨‍👩‍👧',
        correctOption: {
          text: 'Por la acera',
          explanation: educationLevel === 'primaria' 
            ? 'La acera es el espacio para los peatones. Es seguro caminar ahí.'
            : educationLevel === 'secundaria'
            ? 'La acera es el espacio designado exclusivamente para los peatones. Caminar por la calzada es peligroso.'
            : 'La acera está diseñada específicamente para el tránsito peatonal, separándote del flujo vehicular y reduciendo significativamente el riesgo de accidentes.',
          tips: educationLevel === 'primaria'
            ? ['Siempre usa la acera', 'No te acerques a la calle', 'Camina con cuidado']
            : educationLevel === 'secundaria'
            ? ['Siempre camina por la acera cuando esté disponible', 'Mantente alejado del borde de la calle', 'No juegues en la acera cerca de la calle']
            : ['Utiliza la acera en todo momento', 'Mantén distancia del bordillo', 'Estate atento a entradas de garajes', 'Si la acera está bloqueada, busca alternativas seguras']
        },
        options: [
          { text: 'Por la acera', icon: '🚶', isCorrect: true },
          { text: 'Por la calle', icon: '🚗', isCorrect: false },
          { text: 'En medio de la calle', icon: '⚠️', isCorrect: false }
        ]
      },
      {
        id: 2,
        title: 'Mirando Antes de Cruzar',
        description: '¿Qué debes hacer antes de cruzar la calle?',
        context: educationLevel === 'primaria'
          ? 'Quieres cruzar la calle para ir al parque.'
          : educationLevel === 'secundaria'
          ? 'Necesitas cruzar la calle para ir al parque. Hay autos pasando.'
          : 'Te encuentras en una intersección sin semáforo. Necesitas cruzar hacia el parque del otro lado.',
        situation: '🚗➡️ 👀 ⬅️🚙',
        correctOption: {
          text: 'Mirar a ambos lados',
          explanation: educationLevel === 'primaria'
            ? 'Mira a la izquierda, luego a la derecha, y otra vez a la izquierda antes de cruzar.'
            : educationLevel === 'secundaria'
            ? 'Siempre debes mirar hacia la izquierda y derecha antes de cruzar para asegurarte de que no vienen autos.'
            : 'Debes realizar una inspección visual completa: primero a la izquierda (de donde vienen los autos más cercanos), luego a la derecha, y nuevamente a la izquierda antes de iniciar el cruce.',
          tips: educationLevel === 'primaria'
            ? ['Mira a la izquierda', 'Mira a la derecha', 'No corras']
            : educationLevel === 'secundaria'
            ? ['Primero mira a la izquierda', 'Luego mira a la derecha', 'Vuelve a mirar a la izquierda', 'Nunca cruces corriendo']
            : ['Técnica izquierda-derecha-izquierda', 'Mantén contacto visual con los conductores', 'Escucha vehículos que no puedas ver', 'Cruza con paso firme pero sin correr']
        },
        options: [
          { text: 'Mirar a ambos lados', icon: '👀', isCorrect: true },
          { text: 'Cruzar corriendo', icon: '🏃', isCorrect: false },
          { text: 'Mirar el celular', icon: '📱', isCorrect: false }
        ]
      },
      {
        id: 3,
        title: 'El Semáforo Peatonal',
        description: '¿Con qué luz del semáforo peatonal debes cruzar?',
        context: educationLevel === 'primaria'
          ? 'Ves un semáforo peatonal con luces.'
          : educationLevel === 'secundaria'
          ? 'Estás frente a un semáforo peatonal que tiene luces de colores.'
          : 'Te encuentras en una intersección regulada por semáforo. El semáforo peatonal está activo.',
        situation: '🚦👤',
        correctOption: {
          text: 'Cuando está en verde',
          explanation: educationLevel === 'primaria'
            ? 'Verde significa que puedes cruzar. Pero siempre mira si vienen autos.'
            : educationLevel === 'secundaria'
            ? 'La luz verde del semáforo peatonal indica que es seguro cruzar. Aun así, siempre verifica que los autos se hayan detenido.'
            : 'La señal verde indica tu derecho de paso, pero debes confirmar que todos los vehículos se hayan detenido completamente antes de iniciar el cruce. El derecho de paso no elimina tu responsabilidad de verificar.',
          tips: educationLevel === 'primaria'
            ? ['Verde = Cruza', 'Rojo = Espera', 'Mira los autos']
            : educationLevel === 'secundaria'
            ? ['Verde = Puedes cruzar (verifica primero)', 'Rojo = No cruces, espera', 'Nunca cruces con luz roja', 'Cruza rápido pero sin correr']
            : ['Verde: derecho de paso confirmando seguridad', 'Rojo: espera obligatoria', 'Ámbar/intermitente: no inicies el cruce', 'Si ya cruzando, continúa con precaución']
        },
        options: [
          { text: 'Cuando está en verde', icon: '🟢', isCorrect: true },
          { text: 'Cuando está en rojo', icon: '🔴', isCorrect: false },
          { text: 'En cualquier momento', icon: '🤷', isCorrect: false }
        ]
      },
      {
        id: 4,
        title: 'Jugando Cerca de la Calle',
        description: '¿Es seguro jugar pelota cerca de la calle?',
        context: educationLevel === 'primaria'
          ? 'Tus amigos quieren jugar con una pelota cerca de la calle.'
          : educationLevel === 'secundaria'
          ? 'Tus amigos quieren jugar fútbol en un espacio cerca de la calle transitada.'
          : 'Un grupo de amigos propone jugar con una pelota en un área cercana a una vía de tráfico moderado.',
        situation: '⚽🏠🚗',
        correctOption: {
          text: 'No, es peligroso',
          explanation: educationLevel === 'primaria'
            ? 'La pelota puede irse a la calle y alguien puede correr tras ella. Eso es muy peligroso.'
            : educationLevel === 'secundaria'
            ? 'Nunca debes jugar cerca de la calle. La pelota puede rodar hacia la calle y alguien puede correr tras ella sin ver los autos.'
            : 'Jugar cerca de vías vehiculares representa múltiples riesgos: objetos que ruedan hacia la calzada, reacciones impulsivas de correr tras ellos, y reducción de la atención al entorno. Estos factores combinados aumentan exponencialmente el riesgo de accidentes.',
          tips: educationLevel === 'primaria'
            ? ['Juega en parques', 'Lejos de las calles', 'Pide ayuda si algo cae a la calle']
            : educationLevel === 'secundaria'
            ? ['Juega en parques o patios cerrados', 'Mantente alejado de calles transitadas', 'Si algo cae a la calle, pide ayuda a un adulto', 'Las calles son para los vehículos']
            : ['Utiliza áreas recreativas designadas', 'Evita proximidad a vías de circulación', 'Si un objeto cae a la calle, solicita ayuda adulta', 'Reconoce la separación entre espacios de juego y tránsito vehicular']
        },
        options: [
          { text: 'No, es peligroso', icon: '⛔', isCorrect: true },
          { text: 'Sí, si tengo cuidado', icon: '🤔', isCorrect: false },
          { text: 'Sí, es divertido', icon: '🎮', isCorrect: false }
        ]
      },
      {
        id: 5,
        title: 'Esperando en la Esquina',
        description: '¿Dónde debes esperar para cruzar?',
        context: educationLevel === 'primaria'
          ? 'Llegas a la esquina y debes esperar.'
          : educationLevel === 'secundaria'
          ? 'Llegas a la esquina y necesitas esperar a que no pasen autos para cruzar.'
          : 'Te aproximas a una intersección donde necesitas esperar el momento adecuado para cruzar.',
        situation: '🛑👤',
        correctOption: {
          text: 'En la acera, alejado del borde',
          explanation: educationLevel === 'primaria'
            ? 'Espera en la acera, lejos del borde. Así estás seguro.'
            : educationLevel === 'secundaria'
            ? 'Debes esperar sobre la acera, alejado del borde de la calle. Así los autos pueden pasar con seguridad y tú estás protegido.'
            : 'La posición de espera debe ser sobre la acera, manteniendo distancia del bordillo. Esto proporciona espacio de seguridad ante vehículos que puedan pasar cerca del borde y te mantiene fuera de la zona de conflicto vehicular.',
          tips: educationLevel === 'primaria'
            ? ['Espera en la acera', 'No te acerques', 'Espera con paciencia']
            : educationLevel === 'secundaria'
            ? ['Párate en la acera, no en la calle', 'Mantente alejado del borde', 'No te asomes mientras esperas', 'Espera pacientemente']
            : ['Posiciónate sobre la acera completamente', 'Mantén distancia prudente del bordillo', 'Evita asomarte a la calzada', 'Permanece atento pero paciente']
        },
        options: [
          { text: 'En la acera, alejado del borde', icon: '✅', isCorrect: true },
          { text: 'Al borde de la calle', icon: '🦶', isCorrect: false },
          { text: 'En medio de la calle', icon: '❌', isCorrect: false }
        ]
      },
      {
        id: 6,
        title: 'Con un Adulto',
        description: '¿Cuándo debes dar la mano a un adulto?',
        context: educationLevel === 'primaria'
          ? 'Vas caminando con tu mamá por la calle.'
          : educationLevel === 'secundaria'
          ? 'Vas caminando con tu mamá por una calle muy transitada.'
          : 'Te desplazas con un adulto responsable por una zona de alto tráfico vehicular.',
        situation: '👩‍👦🚗🚙',
        correctOption: {
          text: 'Siempre en calles transitadas',
          explanation: educationLevel === 'primaria'
            ? 'Dar la mano a un adulto te mantiene seguro, especialmente en calles con muchos autos.'
            : educationLevel === 'secundaria'
            ? 'Los niños siempre deben ir de la mano de un adulto en calles transitadas o al cruzar. Esto te mantiene seguro y cerca de quien te cuida.'
            : 'Mantener contacto físico con el adulto responsable en entornos de alto tráfico asegura supervisión constante, previene separaciones imprevistas y permite respuesta inmediata ante situaciones de riesgo.',
          tips: educationLevel === 'primaria'
            ? ['Da la mano al cruzar', 'No te sueltes', 'Los adultos te protegen']
            : educationLevel === 'secundaria'
            ? ['Da la mano al cruzar calles', 'No te sueltes en lugares con tráfico', 'Los adultos te ayudan a estar seguro', 'Obedece a tus padres']
            : ['Mantén contacto en zonas de tráfico', 'La supervisión adulta es esencial', 'Respeta las indicaciones del responsable', 'Reconoce situaciones de alto riesgo']
        },
        options: [
          { text: 'Siempre en calles transitadas', icon: '🤝', isCorrect: true },
          { text: 'Solo si quiero', icon: '🙅', isCorrect: false },
          { text: 'Nunca es necesario', icon: '🚫', isCorrect: false }
        ]
      }
    ];

    return baseScenarios;
  };

  const scenarios = getScenarios();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('intro');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
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

        // Obtener el nivel educativo del estudiante
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('education_level')
          .eq('id', user.id)
          .single();

        if (profileData && profileData.education_level) {
          setEducationLevel(profileData.education_level);
        }

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

  const handleAnswer = (option) => {
    const scenario = scenarios[currentScenario];
    setSelectedAnswer(option.text);

    if (option.isCorrect) {
      const points = Math.floor(100 / scenarios.length);
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
      setFeedback({ type: 'correct', message: '¡Muy bien! Esa es la respuesta correcta.' });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: `No es correcto. La respuesta correcta es: ${scenario.correctOption.text}` 
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 rounded-t-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Users className="w-16 h-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                Reglas del Peatón
              </h1>
              <p className="text-xl text-center text-blue-100">
                Nivel: Introducción
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ¿Qué aprenderás?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                    <div className="text-3xl">🚶‍♂️</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Caminar Seguro</h3>
                      <p className="text-sm text-gray-600">Dónde y cómo caminar por las calles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <div className="text-3xl">👀</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Mirar y Cruzar</h3>
                      <p className="text-sm text-gray-600">Cómo cruzar la calle correctamente</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                    <div className="text-3xl">🚦</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Semáforos</h3>
                      <p className="text-sm text-gray-600">Entender las señales de tráfico</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
                    <div className="text-3xl">🤝</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Con Adultos</h3>
                      <p className="text-sm text-gray-600">Importancia de ir acompañado</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  ¿Cómo funciona?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Responde preguntas sobre situaciones cotidianas como peatón</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Aprende las reglas básicas de seguridad vial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Descubre consejos importantes para estar seguro</span>
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
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg py-6"
              >
                <Play className="w-6 h-6 mr-2" />
                Comenzar Aprendizaje
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="px-4 py-2 text-lg bg-white">
                  <Users className="w-5 h-5 mr-2" />
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
                  <div className="bg-blue-100 rounded-full p-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">{scenario.title}</h2>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
                  <div className="text-5xl text-center mb-3">{scenario.situation}</div>
                  <p className="text-lg text-gray-700 italic text-center">"{scenario.context}"</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  {scenario.description}
                </h3>
              </div>

              {/* Opciones */}
              <div className="grid md:grid-cols-3 gap-4">
                {scenario.options.map((option, index) => {
                  const isSelected = selectedAnswer === option.text;
                  const isCorrect = option.isCorrect && isSelected;
                  const isWrong = !option.isCorrect && isSelected;

                  return (
                    <button
                      key={index}
                      onClick={() => !feedback && handleAnswer(option)}
                      disabled={!!feedback}
                      className={`
                        p-6 rounded-xl border-2 transition-all transform hover:scale-105
                        ${!feedback ? 'bg-white hover:border-blue-500 hover:shadow-lg' : ''}
                        ${isCorrect ? 'bg-green-50 border-green-500 shadow-lg' : ''}
                        ${isWrong ? 'bg-red-50 border-red-500' : ''}
                        ${!isSelected && feedback ? 'opacity-50' : ''}
                      `}
                    >
                      <div className="text-6xl mb-4 text-center">{option.icon}</div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800 text-center flex-1">{option.text}</h3>
                        {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-600 ml-2" />}
                        {isWrong && <XCircle className="w-6 h-6 text-red-600 ml-2" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Feedback y Explicación */}
          {feedback && showExplanation && (
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

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {scenario.correctOption.text}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {scenario.correctOption.explanation}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Consejos de Seguridad:
                    </h5>
                    <ul className="space-y-2">
                      {scenario.correctOption.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={nextScenario}
                  size="lg"
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-700"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-2xl">
          <CardContent className="p-0">
            <div className={`${passed ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white p-8 md:p-12 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-7xl mb-4">{passed ? '🎉' : '📚'}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {passed ? '¡Excelente Trabajo!' : '¡Sigue Practicando!'}
                </h1>
                <p className="text-xl text-white/90">
                  {passed ? 'Conoces las reglas básicas del peatón' : 'Repasa las reglas y vuelve a intentarlo'}
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
                        ? '¡Has aprendido las reglas básicas para ser un peatón seguro!' 
                        : 'Te recomendamos repasar las reglas de seguridad peatonal.'}
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

export default PedestrianRulesIntro;
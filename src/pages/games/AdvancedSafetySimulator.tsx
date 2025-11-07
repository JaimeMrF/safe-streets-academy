import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Play,
  AlertTriangle,
  RotateCcw,
  Brain,
  Eye,
  MapPin,
  Activity,
  Scale
} from 'lucide-react';

type AdvancedScenario = {
  id: number;
  title: string;
  complexity: string;
  context: string;
  scenario: string;
  visualData: {
    location: string;
    timeOfDay: string;
    weather: string;
    traffic: string;
    pedestrians: number;
  };
  challenges: {
    question: string;
    type: 'critical-analysis' | 'multi-factor' | 'risk-assessment' | 'legal-ethical';
    options: string[];
    correctAnswer: string;
    explanation: string;
    legalContext?: string;
    riskLevel: 'high' | 'critical';
  }[];
};

const SCENARIOS: AdvancedScenario[] = [
  {
    id: 1,
    title: 'Intersección compleja: Toma de decisiones bajo múltiples variables',
    complexity: 'Análisis de riesgo avanzado',
    context: 'Cruce de avenida principal con calle secundaria. Semáforo vehicular en verde, semáforo peatonal en rojo. Hora: 18:30, lluvia moderada, visibilidad reducida.',
    scenario: 'Observas que varios vehículos giran a la derecha sin detenerse completamente. Un bus articula se aproxima por el carril izquierdo. Hay construcción en la acera opuesta que obliga a los peatones a desviarse. Dos ciclistas circulan entre carriles.',
    visualData: {
      location: 'Intersección urbana de alto tráfico',
      timeOfDay: 'Tarde (18:30) - inicio hora pico',
      weather: 'Lluvia moderada',
      traffic: 'Denso, múltiples carriles',
      pedestrians: 8
    },
    challenges: [
      {
        question: 'En esta situación con múltiples factores de riesgo, ¿cuál es la secuencia de evaluación CORRECTA antes de intentar cruzar?',
        type: 'multi-factor',
        options: [
          'Verificar semáforo → Esperar que cambie a verde → Cruzar inmediatamente',
          '1) Evaluar trayectoria del bus (punto ciego), 2) Identificar vehículos girando (mayor riesgo estadístico), 3) Confirmar que ciclistas te vieron, 4) Verificar pavimento mojado, 5) Calcular tiempo de cruce vs ciclo semafórico',
          'Esperar a que no haya ningún vehículo visible',
          'Cruzar junto con otros peatones para ser más visible'
        ],
        correctAnswer: '1) Evaluar trayectoria del bus (punto ciego), 2) Identificar vehículos girando (mayor riesgo estadístico), 3) Confirmar que ciclistas te vieron, 4) Verificar pavimento mojado, 5) Calcular tiempo de cruce vs ciclo semafórico',
        explanation: 'En intersecciones complejas, el análisis debe ser secuencial y priorizado: (1) Vehículos grandes crean zonas ciegas masivas - si no puedes ver al conductor del bus, él no te ve; (2) Los giros son el factor #1 en atropellos en intersecciones (43% según estudios); (3) Ciclistas son impredecibles y pueden cambiar dirección súbitamente; (4) Pavimento mojado duplica la distancia de frenado y aumenta tu tiempo de cruce si resbalas; (5) Si el semáforo cambiará pronto, podrías quedar atrapado en medio del cruce.',
        legalContext: 'Ley 769 de 2002, Art. 57: "El peatón debe cerciorarse de que puede cruzar sin peligro". La responsabilidad legal recae en verificación activa, no solo en tener luz verde.',
        riskLevel: 'critical'
      },
      {
        question: 'El semáforo peatonal cambia a verde. Un vehículo con señal de giro activada se aproxima rápidamente. El conductor mira hacia otro lado. ¿Acción correcta?',
        type: 'risk-assessment',
        options: [
          'Cruzar porque tengo preferencia legal con luz verde',
          'Hacer contacto visual forzado (posicionarse en su línea de visión), evaluar si reduce velocidad, preparar respuesta evasiva, cruzar solo si hay confirmación clara',
          'Gritar o hacer señas al conductor',
          'Confiar en que el conductor me verá en el último momento'
        ],
        correctAnswer: 'Hacer contacto visual forzado (posicionarse en su línea de visión), evaluar si reduce velocidad, preparar respuesta evasiva, cruzar solo si hay confirmación clara',
        explanation: 'La preferencia legal NO elimina el riesgo físico. Estrategia defensiva correcta: (1) Posicionarte donde el conductor DEBE mirarte (su trayectoria de giro); (2) Observar indicadores de percepción: ¿frena, reduce velocidad, gira la cabeza?; (3) Mantener "plan B": ruta de escape si no frena; (4) NUNCA asumir que serás visto - "tener razón" no evita lesiones. En lluvia, la distancia de reacción del conductor aumenta 40-60%.',
        legalContext: 'Artículo 94, Ley 769: Aunque el peatón tenga preferencia, debe actuar con "prudencia y precaución". En accidente con luz verde peatonal, puede aplicarse "culpa compartida" si no hubo verificación.',
        riskLevel: 'critical'
      },
      {
        question: 'Análisis de escenario: Con lluvia, visibilidad reducida y múltiples actores (bus, autos, ciclistas), ¿qué factor representa el MAYOR riesgo sistémico?',
        type: 'critical-analysis',
        options: [
          'La lluvia porque reduce tracción',
          'La combinación de: ángulos muertos del bus + atención dividida de conductores girando + velocidad inadecuada para condiciones + tu tiempo de cruce aumentado por pavimento resbaladizo',
          'Los ciclistas porque son impredecibles',
          'El semáforo porque puede estar dañado'
        ],
        correctAnswer: 'La combinación de: ángulos muertos del bus + atención dividida de conductores girando + velocidad inadecuada para condiciones + tu tiempo de cruce aumentado por pavimento resbaladizo',
        explanation: 'El riesgo NO es un factor aislado, es la INTERACCIÓN de múltiples factores: (1) Bus crea "sombra" donde otros conductores no te ven; (2) Conductores girando miran el tráfico que viene, NO hacia donde giran; (3) Muchos conductores no ajustan velocidad a condiciones climáticas; (4) Tu cruce será más lento (cuidado al pisar) justo cuando necesitas ser más rápido. Esta "convergencia de riesgos" es cuando ocurren la mayoría de accidentes graves. Un solo factor es manejable; cuatro simultáneos son críticos.',
        riskLevel: 'critical'
      }
    ]
  },
  {
    id: 2,
    title: 'Responsabilidad compartida: Análisis legal y ético',
    complexity: 'Implicaciones legales y morales',
    context: 'Zona escolar, hora de salida (12:30). Semáforo en verde peatonal. Un estudiante menor (12 años) inicia cruce sin mirar. Vehículo se aproxima a 40 km/h (límite: 30 km/h en zona escolar).',
    scenario: 'Eres testigo de la situación. El conductor frena pero no podrá detenerse a tiempo. El niño no es consciente del peligro. Hay 3 segundos antes del impacto potencial.',
    visualData: {
      location: 'Zona escolar señalizada',
      timeOfDay: 'Mediodía (12:30) - hora de salida',
      weather: 'Despejado',
      traffic: 'Moderado, varios padres recogiendo estudiantes',
      pedestrians: 15
    },
    challenges: [
      {
        question: 'Desde perspectiva de PREVENCIÓN, ¿cuál acción es más efectiva en estos 3 segundos críticos?',
        type: 'critical-analysis',
        options: [
          'Gritar "¡CUIDADO!" al niño para que se devuelva',
          'Hacer señas al conductor para que frene más fuerte',
          'Intervención física: jalar al niño hacia atrás de forma segura (sin causarle caída) mientras simultáneamente señalizas al conductor con mano libre',
          'Filmar la situación como evidencia'
        ],
        correctAnswer: 'Intervención física: jalar al niño hacia atrás de forma segura (sin causarle caída) mientras simultáneamente señalizas al conductor con mano libre',
        explanation: 'En situaciones de emergencia con menores: (1) Los niños tienen tiempo de reacción más lento que adultos (0.7-1.2 seg vs 0.4-0.6 seg) - gritar puede no ser suficiente; (2) El conductor ya está frenando al máximo; (3) La intervención física CONTROLADA es la única que garantiza sacar al menor de la trayectoria; (4) Señalizar al conductor simultáneamente puede hacerlo reducir velocidad adicional o maniobrar. IMPORTANTE: La intervención debe ser firme pero segura - no jalar bruscamente (riesgo de caída que cause otras lesiones).',
        legalContext: 'Artículo 131, Código de Infancia: Obligación legal de proteger menores en peligro inminente. No intervenir pudiendo hacerlo constituye "omisión de socorro" (Código Penal, Art. 131).',
        riskLevel: 'critical'
      },
      {
        question: 'Análisis legal post-incidente (si ocurre colisión): ¿Cómo se distribuiría típicamente la responsabilidad?',
        type: 'legal-ethical',
        options: [
          '100% responsabilidad del conductor por exceso de velocidad',
          '100% responsabilidad del menor por cruzar sin precaución',
          'Responsabilidad compartida: Conductor (60-70%) por exceder límite en zona escolar + Tutor del menor (20-30%) por falta de supervisión + Entidad de tránsito (10%) si señalización inadecuada',
          'No hay responsabilidad porque fue un accidente'
        ],
        correctAnswer: 'Responsabilidad compartida: Conductor (60-70%) por exceder límite en zona escolar + Tutor del menor (20-30%) por falta de supervisión + Entidad de tránsito (10%) si señalización inadecuada',
        explanation: 'El sistema legal colombiano aplica "culpa compartida" evaluando: (1) CONDUCTOR: Excedió límite específico de zona escolar (30 km/h) diseñado precisamente para dar tiempo de reacción ante comportamiento impredecible de menores - responsabilidad mayor; (2) TUTOR: Los menores de 12 años requieren supervisión en vías - no estaba presente; (3) ENTIDAD: Si señalización de zona escolar es insuficiente, hay responsabilidad institucional. CLAVE: Aunque el menor inició cruce incorrectamente, la ley reconoce que los niños NO tienen capacidad de juicio completa - por eso existen límites especiales en zonas escolares.',
        legalContext: 'Ley 769, Art. 106: Límites en zona escolar. Código Civil, Art. 2341: Responsabilidad por culpa. Jurisprudencia: En colisiones con menores, se presume mayor responsabilidad del conductor.',
        riskLevel: 'high'
      },
      {
        question: 'Dimensión ética: Si TÚ fueras el conductor cumpliendo el límite (30 km/h) y aún así el niño cruzara súbitamente haciendo imposible frenar, ¿cuál reflexión es más madura?',
        type: 'legal-ethical',
        options: [
          '"No es mi culpa, el niño cruzó mal"',
          '"Aunque legalmente no hay culpa si cumplí normas, éticamente debo reconocer que conducir cerca de escuelas requiere anticipación extrema: reducir velocidad AÚN MÁS del límite, cubrir el freno, escanear constantemente - porque los niños son impredecibles por naturaleza"',
          '"La culpa es de los padres por no supervisar"',
          '"Es responsabilidad de las autoridades poner más señales"'
        ],
        correctAnswer: '"Aunque legalmente no hay culpa si cumplí normas, éticamente debo reconocer que conducir cerca de escuelas requiere anticipación extrema: reducir velocidad AÚN MÁS del límite, cubrir el freno, escanear constantemente - porque los niños son impredecibles por naturaleza"',
        explanation: 'Esta pregunta evalúa madurez moral. Diferencia entre legalidad y ética: (1) LEGAL: Cumplir el límite de 30 km/h puede eximirte de sanción; (2) ÉTICO: Reconocer que los límites son MÍNIMOS, no óptimos. Conducción ética cerca de escuelas significa: velocidad incluso menor (20-25 km/h), pie sobre freno (no acelerador), atención al 200%, anticipar lo impredecible. Los niños NO tienen corteza prefrontal completamente desarrollada - actúan impulsivamente. Un adulto responsable ANTICIPA esto, no solo "cumple la regla". Esto se llama "ética del cuidado" vs "ética de reglas".',
        riskLevel: 'high'
      }
    ]
  },
  {
    id: 3,
    title: 'Infraestructura deficiente: Navegación de riesgos sistémicos',
    complexity: 'Compensación de fallas del sistema',
    context: 'Avenida de 4 carriles sin semáforo peatonal ni puente. Velocidad permitida: 60 km/h. Parada de bus en un lado, universidad en el otro. Hora: 7:00 AM.',
    scenario: 'Debes cruzar para llegar a clase. No hay paso peatonal marcado en 400 metros a la redonda. El tráfico es continuo. Varios estudiantes cruzan "cuando pueden". Algunos vehículos van a 70-80 km/h.',
    visualData: {
      location: 'Avenida arterial urbana',
      timeOfDay: 'Mañana (07:00) - hora pico',
      weather: 'Despejado',
      traffic: 'Continuo, alta velocidad',
      pedestrians: 20
    },
    challenges: [
      {
        question: 'Análisis de la situación: ¿Quién tiene la responsabilidad PRIMARY de este riesgo?',
        type: 'critical-analysis',
        options: [
          'Los peatones por cruzar ilegalmente',
          'Los conductores por exceder el límite',
          'La autoridad de tránsito y planeación urbana por diseño vial deficiente: no proveer infraestructura peatonal segura en zona con demanda evidente (universidad + parada bus)',
          'La universidad por no ubicarse mejor'
        ],
        correctAnswer: 'La autoridad de tránsito y planeación urbana por diseño vial deficiente: no proveer infraestructura peatonal segura en zona con demanda evidente (universidad + parada bus)',
        explanation: 'Este es un ejemplo de "violencia vial sistémica". Análisis: (1) Cuando MUCHAS personas cruzan ilegalmente consistentemente, no es "mal comportamiento individual" - es EVIDENCIA de necesidad insatisfecha; (2) La infraestructura debe diseñarse para el comportamiento humano REAL, no ideal; (3) Poner universidad + parada de bus sin paso seguro es negligencia en planeación; (4) Aunque los peatones y conductores infrinjan normas, la CAUSA RAÍZ es falta de alternativa segura. Esto se llama "enfoque de sistemas en seguridad" vs "culpar al usuario".',
        legalContext: 'Ley 769, Art. 3: El Estado tiene obligación de proveer infraestructura vial segura. Pueden proceder acciones de tutela por amenaza al derecho a la vida si hay negligencia probada.',
        riskLevel: 'critical'
      },
      {
        question: 'Dado que la infraestructura es deficiente pero debes cruzar HOY, ¿cuál es la estrategia de MENOR riesgo?',
        type: 'risk-assessment',
        options: [
          'Cruzar corriendo en el primer hueco que veas',
          'Cruzar con el grupo de estudiantes para ser más visible',
          '1) Caminar 400m hasta paso señalizado, 2) Si tiempo no permite: Identificar momento con interrupción natural del tráfico (semáforo lejano en rojo), 3) Cruzar de carril en carril (no todo de una vez), 4) Contacto visual con cada conductor, 5) Ropa visible, 6) NO usar celular/audífonos',
          'Esperar a que un vehículo se detenga voluntariamente'
        ],
        correctAnswer: '1) Caminar 400m hasta paso señalizado, 2) Si tiempo no permite: Identificar momento con interrupción natural del tráfico (semáforo lejano en rojo), 3) Cruzar de carril en carril (no todo de una vez), 4) Contacto visual con cada conductor, 5) Ropa visible, 6) NO usar celular/audífonos',
        explanation: 'Estrategia de mitigación de riesgo en infraestructura deficiente: (1) SIEMPRE preferir opción legal aunque implique tiempo - tu vida vale más que 5 minutos; (2) Si cruce ilegal es inevitable: hacerlo INTELIGENTEMENTE; (3) Los semáforos lejanos crean "olas" de tráfico - hay momentos sin vehículos; (4) Cruzar por etapas (esperar en mediana o divisor) reduce exposición; (5) Contacto visual × número de carriles - CADA conductor debe verte; (6) Visibilidad y atención plena son NO-NEGOCIABLES; (7) NUNCA correr - aumenta riesgo de caída y dificulta a conductores calcular tu posición.',
        riskLevel: 'critical'
      },
      {
        question: 'Acción cívica: ¿Cuál es la manera más efectiva de solucionar este problema estructural a largo plazo?',
        type: 'legal-ethical',
        options: [
          'Quejarse en redes sociales',
          'Ignorarlo, "siempre ha sido así"',
          'Documentar (fotos/video de cruces peligrosos), recolectar firmas de comunidad universitaria, presentar derecho de petición formal a Secretaría de Movilidad citando normativa (Ley 769, Art. 3), y si no hay respuesta en 15 días, considerar tutela colectiva',
          'Esperar que alguien más lo solucione'
        ],
        correctAnswer: 'Documentar (fotos/video de cruces peligrosos), recolectar firmas de comunidad universitaria, presentar derecho de petición formal a Secretaría de Movilidad citando normativa (Ley 769, Art. 3), y si no hay respuesta en 15 días, considerar tutela colectiva',
        explanation: 'Ciudadanía activa en seguridad vial: (1) EVIDENCIA: Documentación fotográfica/video demuestra el riesgo objetivamente; (2) LEGITIMIDAD: Firmas demuestran que no es queja individual sino necesidad comunitaria; (3) CANAL LEGAL: Derecho de petición (Ley 1755) obliga respuesta en 15 días; (4) FUNDAMENTO: Citar normativa específica (Ley 769 Art. 3) hace la petición jurídicamente sólida; (5) ESCALAMIENTO: Tutela colectiva procede si hay amenaza al derecho fundamental (vida) por omisión estatal. Redes sociales generan ruido; acción legal genera cambio. Este es empoderamiento ciudadano real.',
        legalContext: 'Derecho de petición (Art. 23 Constitución, Ley 1755). Tutela colectiva para derechos difusos (Decreto 2591). Precedente: Tutelas han obligado instalación de semáforos y puentes peatonales.',
        riskLevel: 'high'
      }
    ]
  },
  {
    id: 4,
    title: 'Presión social y liderazgo: Resistencia a comportamientos riesgosos',
    complexity: 'Inteligencia social y autonomía',
    context: 'Salida nocturna con grupo de amigos (23:00). Zona de bares, calle con tráfico moderado pero vehículos a alta velocidad. Varios del grupo han consumido alcohol.',
    scenario: 'El grupo decide cruzar con luz roja "porque no vienen carros". Uno de ellos te presiona: "No seas aburrido, todos lo hacemos". Eres el único sobrio. Observas vehículos a distancia pero acercándose.',
    visualData: {
      location: 'Zona rosa, área de bares',
      timeOfDay: 'Noche (23:00)',
      weather: 'Despejado',
      traffic: 'Moderado, velocidades altas',
      pedestrians: 6
    },
    challenges: [
      {
        question: 'Desde inteligencia emocional y liderazgo, ¿cuál es la respuesta más efectiva a la presión social?',
        type: 'legal-ethical',
        options: [
          'Ceder para no quedar mal con el grupo',
          'Alejarte del grupo sin decir nada',
          '"Ustedes vayan, yo espero la luz" - afirmación tranquila sin juicio + explicación si preguntan: "A 60 km/h, un carro recorre 17 metros por segundo. Lo que parece lejos llega en 3 segundos. No vale el riesgo"',
          'Sermonearlos sobre lo irresponsables que son'
        ],
        correctAnswer: '"Ustedes vayan, yo espero la luz" - afirmación tranquila sin juicio + explicación si preguntan: "A 60 km/h, un carro recorre 17 metros por segundo. Lo que parece lejos llega en 3 segundos. No vale el riesgo"',
        explanation: 'Liderazgo efectivo bajo presión social: (1) FIRMEZA SIN AGRESIÓN: "Ustedes vayan, yo espero" establece límite personal sin atacar; (2) NO MORALIZAR: Decir "son irresponsables" genera resistencia; (3) DATOS NO EMOCIONES: Explicar con física (17 m/s) es más convincente que "es peligroso"; (4) MODELAMIENTO: Tu comportamiento puede influir silenciosamente - especialmente siendo el sobrio, tienes autoridad moral; (5) AUTOESTIMA: Tu seguridad NO depende de aprobación grupal. Estudios: En grupos, 60% ceden a presión; líderes efectivos son el 15% que mantienen autonomía sin alienar al grupo.',
        legalContext: 'Más allá de lo legal, esto evalúa madurez psicosocial: capacidad de resistir presión de pares, común en adolescencia pero debe superarse en adultez temprana.',
        riskLevel: 'high'
      },
      {
        question: 'Uno de tus amigos ebrios insiste en cruzar y arrastra a otro. Como persona sobria del grupo, ¿cuál es tu responsabilidad moral y legal?',
        type: 'legal-ethical',
        options: [
          'No es tu problema, son adultos',
          'Llamar a la policía',
          'Intervención activa: Impedir físicamente el cruce si es necesario (especialmente del más ebrio), buscar ruta segura alternativa, ofrecerte a pedir taxi/Uber, explicar que su juicio está alterado. Si rechazan, quedarte para al menos vigilar',
          'Irte a casa, no quieres problemas'
        ],
        correctAnswer: 'Intervención activa: Impedir físicamente el cruce si es necesario (especialmente del más ebrio), buscar ruta segura alternativa, ofrecerte a pedir taxi/Uber, explicar que su juicio está alterado. Si rechazan, quedarte para al menos vigilar',
        explanation: 'Responsabilidad en grupos con alcohol: (1) LEGAL: Si puedes prevenir daño y no lo haces, hay "omisión de socorro" (Código Penal); (2) MORAL: El alcohol deteriora toma de decisiones - tu amigo no está en capacidad de evaluar riesgo correctamente; (3) PRÁCTICA: Intervenir físicamente (impedir cruce) es aceptable con personas en estado de alteración que ponen en riesgo su vida; (4) ALTERNATIVAS: Ofrecer soluciones (taxi) muestra que no es "controlarlos" sino protegerlos; (5) PERSISTENCIA: Si rechazan, quedarte cerca para ayudar si pasa algo. Esto es amistad real vs "llevarse bien". En estudios, 73% de víctimas de atropello nocturno tenían alcohol - tus amigos están en riesgo objetivo.',
        legalContext: 'Código Penal Art. 131: Omisión de socorro. Si alguien resulta herido y pudiste prevenir, hay responsabilidad. En contextos de grupo, puede aplicarse "posición de garante".',
        riskLevel: 'critical'
      },
      {
        question: 'Reflexión final: Si el grupo cruzó y no pasó nada, ¿qué conclusión es correcta?',
        type: 'critical-analysis',
        options: [
          '"Ves? Exageré, no había peligro real"',
          '"El riesgo no ocurrió, pero existió. No confundir resultado favorable con decisión correcta. La ruleta rusa tiene 5/6 de probabilidad de sobrevivir, pero nadie sensato la juega. El juicio se basa en riesgo ANTES del resultado, no después"',
          '"Debo adaptarme más al grupo"',
          '"Las normas son muy exageradas"'
        ],
        correctAnswer: '"El riesgo no ocurrió, pero existió. No confundir resultado favorable con decisión correcta. La ruleta rusa tiene 5/6 de probabilidad de sobrevivir, pero nadie sensato la juega. El juicio se basa en riesgo ANTES del resultado, no después"',
        explanation: 'Sesgo cognitivo crítico: "OUTCOME BIAS" (sesgo de resultado). Error lógico: juzgar calidad de decisión por resultado, no por información disponible al momento de decidir. Ejemplo: Cruzar con luz roja tiene digamos 2% de probabilidad de atropello. Si cruzas 50 veces y no pasa nada, ¿fue buena decisión? NO. Tuviste SUERTE 50 veces. En la vez 51 puede ocurrir. Las buenas decisiones se basan en minimizar PROBABILIDAD de daño, no en que "no pasó". Esto aplica a todo en vida: inversiones, salud, relaciones. Adultos maduros entienden probabilidad; inmaduros solo aprenden con consecuencias. ¿Qué prefieres ser?',
        riskLevel: 'high'
      }
    ]
  },
  {
    id: 5,
    title: 'Evaluación integral: Caso complejo multi-escenario',
    complexity: 'Síntesis de todos los conocimientos',
    context:
      'Camino hacia entrevista de trabajo importante. Llegas con 10 minutos de adelanto. El cruce peatonal está a 150 metros pero implica desviarte y potencialmente llegar justo a tiempo.',
    scenario:
      'Frente a ti: calle de 2 carriles, tráfico moderado, velocidad estimada 50 km/h. Ves un "hueco" de aproximadamente 8 segundos entre vehículos. El cruce son 10 metros. No hay semáforo pero hay paso de cebra no muy visible.',
    visualData: {
      location: 'Calle residencial con comercio',
      timeOfDay: 'Mañana (08:50)',
      weather: 'Despejado',
      traffic: 'Moderado, fluido',
      pedestrians: 3
    },
    challenges: [
      {
        question: 'Análisis decisional: ¿Cuál es la decisión CORRECTA integrando seguridad, legalidad y contexto?',
        type: 'critical-analysis',
        options: [
          'Cruzar en el "hueco" - 8 segundos son suficientes para 10 metros',
          'Ir al cruce oficial (150m desvío = 2 minutos caminando + 1 min de semáforo = 3 minutos total). Llegas justo a tiempo pero seguro y legal',
          'Cruzar corriendo para reducir tiempo de exposición',
          'Llamar a la entrevista explicando que llegarás 5 minutos tarde'
        ],
        correctAnswer:
          'Ir al cruce oficial (150m desvío = 2 minutos caminando + 1 min de semáforo = 3 minutos total). Llegas justo a tiempo pero seguro y legal',
        explanation:
          'Integración de factores: (1) SEGURIDAD: 8 segundos parecen suficientes pero: a 50 km/h, un vehículo recorre casi 14 m/s. Si el cálculo o distancia es mínima, margen de error = riesgo mortal. (2) LEGALIDAD: cruzar fuera del paso = infracción tipo B04. (3) CONTEXTO: llegar justo a tiempo es aceptable, arriesgar tu vida no. (4) ESTRATEGIA: la puntualidad responsable es llegar vivo. Priorización correcta: seguridad > legalidad > oportunidad.',
        legalContext:
          'Ley 769, Art. 57: El peatón debe usar pasos habilitados. Código Nacional de Tránsito. Cruzar fuera del paso puede implicar comparendo y riesgo objetivo.',
        riskLevel: 'critical'
      }
    ]
  }
];

const AdvancedSafetySimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = SCENARIOS[currentScenario];
  const challenge = scenario.challenges[currentChallenge];

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === challenge.correctAnswer) {
      setFeedback('correct');
      setScore((prev) => prev + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  const nextChallenge = () => {
    if (currentChallenge + 1 < scenario.challenges.length) {
      setCurrentChallenge((prev) => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else if (currentScenario + 1 < SCENARIOS.length) {
      setCurrentScenario((prev) => prev + 1);
      setCurrentChallenge(0);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrentScenario(0);
    setCurrentChallenge(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">✅ Simulación completada</h2>
        <p className="text-lg mb-4">Puntaje total: {score} / {SCENARIOS.reduce((acc, s) => acc + s.challenges.length, 0)}</p>
        <button
          onClick={restart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> Reiniciar Simulación
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Brain className="w-6 h-6 text-purple-400" /> {scenario.title}
      </h2>
      <p className="text-sm text-gray-400 mb-4">{scenario.complexity}</p>
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p className="text-yellow-300 italic mb-2">{scenario.context}</p>
        <p className="text-gray-200">{scenario.scenario}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> {scenario.visualData.location}</div>
        <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-pink-400" /> {scenario.visualData.timeOfDay}</div>
        <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-green-400" /> Tráfico: {scenario.visualData.traffic}</div>
        <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400" /> Riesgo: {challenge.riskLevel}</div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{challenge.question}</h3>
      <div className="flex flex-col gap-2 mb-4">
        {challenge.options.map((option, index) => {
          const isCorrect = feedback && option === challenge.correctAnswer;
          const isWrong = feedback && option === selectedAnswer && option !== challenge.correctAnswer;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`p-3 rounded-lg text-left transition-colors border
                ${isCorrect ? 'bg-green-700 border-green-500' :
                isWrong ? 'bg-red-700 border-red-500' :
                'bg-gray-800 hover:bg-gray-700 border-gray-700'}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="p-4 rounded-lg mb-4 bg-gray-800 border border-gray-700">
          {feedback === 'correct' ? (
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <CheckCircle className="w-5 h-5" /> ¡Correcto!
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <XCircle className="w-5 h-5" /> Respuesta incorrecta
            </div>
          )}
          <p className="text-sm text-gray-300 mb-2">{challenge.explanation}</p>
          {challenge.legalContext && (
            <p className="text-xs text-blue-400 italic">📘 {challenge.legalContext}</p>
          )}
          <button
            onClick={nextChallenge}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" /> Siguiente
          </button>
        </div>
      )}

      <div className="text-right text-sm text-gray-500">
        Escenario {currentScenario + 1}/{SCENARIOS.length} • Pregunta {currentChallenge + 1}/{scenario.challenges.length}
      </div>
    </div>
  );
};

export default AdvancedSafetySimulator;

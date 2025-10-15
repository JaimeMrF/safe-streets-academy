import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Flame, Check, X, LogOut, ArrowLeft, Trophy } from "lucide-react";
import { toast } from "sonner";
import nexiaLogo from "../assets/nexia-logo.webp";
import rutasData from "../db/rutas.json";
import { upsertProgress } from "../lib/progress";
import Memoria4x4 from "./games/memoria4x4/Memoria4x4";

interface GameData {
  code1: string;
  code2: string;
  match: boolean;
}

const GAME_ROUNDS = 10;
const TIME_LIMIT = 5000; // 5 seconds per round

const StudentDashboard = () => {
  const { routeId } = useParams();
  
  // Si el routeId es 9, renderizar el juego de memoria
  if (Number(routeId) === 9) {
    return <Memoria4x4 />;
  }
  
  // De lo contrario, renderizar el juego de Cruce de Listas (juego por defecto)
  return <GameCruceListas />;
};

const GameCruceListas = () => {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [route, setRoute] = useState<any>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [celebrating, setCelebrating] = useState(false);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [roundStartTime, setRoundStartTime] = useState<number>(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login?role=student");
      return;
    }
    const parsed = JSON.parse(userData);
    if (parsed.role !== "student") {
      navigate("/login?role=student");
      return;
    }
    setUser(parsed);

    // Cargar información de la ruta
    const currentRoute = rutasData.find((r: any) => r.id === Number(routeId));
    if (currentRoute) {
      setRoute(currentRoute);
    } else {
      toast.error("Ruta no encontrada");
      navigate("/courses");
    }
  }, [navigate, routeId]);

  useEffect(() => {
    if (gameStarted && currentRound < GAME_ROUNDS) {
      generateNewRound();
    }
  }, [gameStarted, currentRound]);

  useEffect(() => {
    if (gameStarted && currentRound < GAME_ROUNDS) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 100) {
            handleAnswer(null); // Time's up
            return TIME_LIMIT;
          }
          return prev - 100;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [gameStarted, currentRound]);

  const generateNewRound = () => {
    const shouldMatch = Math.random() > 0.5;
    const code1 = generateCode();
    const code2 = shouldMatch ? code1 : generateCode();
    
    setGameData({ code1, code2, match: shouldMatch });
    setTimeLeft(TIME_LIMIT);
    setRoundStartTime(Date.now());
  };

  const generateCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const number = Math.floor(Math.random() * 100);
    return `${letter}-${number}`;
  };

  const handleAnswer = (answer: boolean | null) => {
    if (!gameData) return;
    
    const responseTime = Date.now() - roundStartTime;
    setResponseTimes([...responseTimes, responseTime]);
    
    const correct = answer === gameData.match;
    
    if (correct) {
      setScore(score + 1);
    }
    
    if (currentRound + 1 >= GAME_ROUNDS) {
      finishGame();
    } else {
      setCurrentRound(currentRound + 1);
    }
  };

const finishGame = () => {
  // Calcular puntuación final: score ya contiene las respuestas correctas acumuladas.
  // No sumar condicionales que evalúen funciones - antes se usó `handleAnswer` por error.
  const finalScore = score;
  const accuracy = (finalScore / GAME_ROUNDS) * 100;
  const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / 1000;
    
    // Actualizar racha del usuario
    const updatedUser = {
      ...user,
      streak: user.streak + 1,
      lastPlayed: new Date().toISOString()
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    // Guardar/actualizar progreso
    const completed = accuracy >= 80;
    const scoreValue = Math.round(accuracy);
    
    upsertProgress(user.id, Number(routeId), completed, scoreValue, avgResponseTime);
    
    // Guardar resultados del juego
    const gameResults = JSON.parse(localStorage.getItem("gameResults") || "[]");
    gameResults.push({
      date: new Date().toISOString(),
      routeId: Number(routeId),
      score: finalScore,
      accuracy: Math.round(accuracy),
      avgTime: Math.round(avgResponseTime * 1000),
      email: user.email
    });
    localStorage.setItem("gameResults", JSON.stringify(gameResults));
    
    // Celebration
    setCelebrating(true);
      
      if (accuracy >= 80) {
        toast.success(`¡Nivel completado! ${Math.round(accuracy)}% de precisión 🎉`);
      } else {
        toast.info(`Necesitas 80% o más para desbloquear el siguiente nivel. Obtuviste ${Math.round(accuracy)}%`);
      }
      
      setTimeout(() => {
        // ✅ CAMBIAR ESTA LÍNEA:
        if (route) {
          navigate(`/student/course/${route.course_id}`); // ← Cambiar aquí
        } else {
          navigate("/courses");
        }
      }, 3000);
    };

    const handleBackToRoute = () => {
      if (route) {
        navigate(`/student/course/${route.course_id}`); // ← Cambiar aquí
      } else {
        navigate("/courses");
      }
    };

  if (!user || !route) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToRoute}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img
                src={nexiaLogo}
                alt="Nexia+"
                className="h-10"
              />
              <div>
                <p className="text-sm text-gray-500">Nivel</p>
                <p className="font-bold text-gray-900">{route.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-2 rounded-full border border-orange-200">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-600">{user.streak} días</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user.nombre}</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-4 py-8">
          {!gameStarted ? (
            <Card className="p-8 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl animate-fade-in">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  El Cruce de Listas
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Compara dos códigos y decide si son iguales o diferentes. Tienes 5 segundos por ronda. ¡Necesitas 80% de precisión para completar este nivel!
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <h3 className="font-semibold text-gray-700 mb-2">Tu Racha Actual</h3>
                    <p className="text-4xl font-bold text-blue-600">{user.streak} días</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <h3 className="font-semibold text-gray-700 mb-2">Rondas</h3>
                    <p className="text-4xl font-bold text-purple-600">{GAME_ROUNDS}</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-amber-800">
                    💡 <strong>Consejo:</strong> Lee ambos códigos cuidadosamente. La letra y el número deben coincidir exactamente.
                  </p>
                </div>
                
                <Button
                  size="lg"
                  className="text-xl px-12 h-16 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mt-6"
                  onClick={() => setGameStarted(true)}
                >
                  Comenzar Juego
                </Button>
              </div>
            </Card>
          ) : celebrating ? (
            <Card className="p-8 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl animate-scale-in">
              <div className="text-center space-y-6">
                <div className="text-8xl animate-bounce-slow">
                  {((score / GAME_ROUNDS) * 100) >= 80 ? '🎉' : '💪'}
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {((score / GAME_ROUNDS) * 100) >= 80 ? '¡Nivel Completado!' : '¡Buen Intento!'}
                </h2>
                <div className="space-y-4">
                  <p className="text-3xl font-semibold text-gray-900">
                    {score}/{GAME_ROUNDS} respuestas correctas
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Precisión</span>
                      <span className="text-sm font-bold text-gray-900">{((score / GAME_ROUNDS) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          ((score / GAME_ROUNDS) * 100) >= 80 
                            ? 'bg-gradient-to-r from-green-400 to-green-600' 
                            : 'bg-gradient-to-r from-amber-400 to-amber-600'
                        }`}
                        style={{ width: `${((score / GAME_ROUNDS) * 100)}%` }}
                      />
                    </div>
                  </div>
                  {((score / GAME_ROUNDS) * 100) >= 80 ? (
                    <p className="text-lg text-green-600 font-medium">
                      ✅ ¡Has desbloqueado el siguiente nivel!
                    </p>
                  ) : (
                    <p className="text-lg text-amber-600 font-medium">
                      ⚠️ Necesitas 80% o más para desbloquear el siguiente nivel
                    </p>
                  )}
                </div>
                <p className="text-gray-500">Regresando a la ruta...</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Progress */}
              <Card className="p-6 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-semibold">Ronda {currentRound + 1} de {GAME_ROUNDS}</span>
                    <span className="font-semibold text-green-600">{score} correctas</span>
                  </div>
                  <Progress value={((currentRound + 1) / GAME_ROUNDS) * 100} className="h-2" />
                </div>
              </Card>

              {/* Timer */}
              <div className="w-full bg-gray-200 rounded-full overflow-hidden h-3 shadow-inner">
                <div 
                  className={`h-3 transition-all duration-100 ease-linear ${
                    timeLeft < 1000 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-primary to-secondary'
                  }`}
                  style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
                />
              </div>

              {/* Game Area */}
              <Card className="p-12 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div className="text-center space-y-4 group">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Código 1</p>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200 group-hover:border-blue-300 transition-all">
                      <p className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {gameData?.code1}
                      </p>
                    </div>
                  </div>
                  <div className="text-center space-y-4 group">
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Código 2</p>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 group-hover:border-purple-300 transition-all">
                      <p className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {gameData?.code2}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Button
                    size="lg"
                    className="h-24 text-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    onClick={() => handleAnswer(true)}
                  >
                    <Check className="w-8 h-8 mr-2" />
                    SÍ - Son iguales
                  </Button>
                  <Button
                    size="lg"
                    className="h-24 text-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    onClick={() => handleAnswer(false)}
                  >
                    <X className="w-8 h-8 mr-2" />
                    NO - Son diferentes
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.4s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
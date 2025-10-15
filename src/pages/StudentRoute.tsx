import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle, Trophy, Award, Download, Play } from "lucide-react";
import nexiaLogo from "@/assets/nexia-logo.webp";
import cursosData from "@/db/cursos.json";
import rutasData from "@/db/rutas.json";
import { getStudentCourseProgress, ProgressRecord } from "@/lib/progress";

interface Route {
  id: number;
  course_id: number;
  name: string;
  level_order: number;
  is_certification_level: boolean;
}


const StudentRoute = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const selectedCourse = cursosData.find((c) => c.id === Number(courseId));
    setCourse(selectedCourse);

    const courseRoutes = rutasData.filter((r) => r.course_id === Number(courseId));
    setRoutes(courseRoutes);

    // Recargar progreso cada vez que el componente se monta
    const perCourse = getStudentCourseProgress(parsedUser.id, Number(courseId));
    setProgress(perCourse);
  }, [navigate, courseId]);

  // Recargar progreso cuando el componente vuelve a estar visible o se enfoca
  useEffect(() => {
    const reloadProgress = () => {
      if (user && courseId) {
        const perCourse = getStudentCourseProgress(user.id, Number(courseId));
        setProgress(perCourse);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        reloadProgress();
      }
    };

    const handleFocus = () => {
      reloadProgress();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, courseId]);

  const isLevelUnlocked = (route: Route): boolean => {
    if (route.level_order === 1) return true;

    const previousRoute = routes.find((r) => r.level_order === route.level_order - 1);
    if (!previousRoute) return false;

    const previousProgress = progress.find((p) => p.route_id === previousRoute.id);
    return previousProgress?.completion_status === "completed" && (previousProgress.best_accuracy_percentage ?? 0) >= 80;
  };

  const getLevelStatus = (route: Route): "locked" | "available" | "completed" => {
    const levelProgress = progress.find((p) => p.route_id === route.id);
    if (levelProgress?.completion_status === "completed") return "completed";
    if (isLevelUnlocked(route)) return "available";
    return "locked";
  };

  const handleLevelClick = (route: Route) => {
    const status = getLevelStatus(route);
    if (status === "locked") return;

    // Navegar al juego correspondiente en lugar de completar automáticamente
    navigate(`/game/${route.id}`);
  };

  const allCompleted = routes.every((r) => {
    const p = progress.find((pr) => pr.route_id === r.id);
    return p && p.completion_status === "completed" && (p.best_accuracy_percentage ?? 0) >= 80;
  });

  const generateCertificate = () => {
    const link = document.createElement("a");
    link.href = "/Certificado.pdf";
    link.download = `Certificado_${user.nombre}_${course.nombre}.pdf`; 
    link.click();
  };

  if (!user || !course) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src={nexiaLogo}
            alt="Nexia+"
            className="h-12 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/courses")}
          />
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">{user.nombre}</span>
            <Button 
              variant="outline" 
              onClick={() => navigate("/courses")}
              className="border-gray-300 hover:bg-primary/10 hover:border-primary transition-all"
            >
              Mis Cursos
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {course.nombre}
          </h1>
          <p className="text-gray-600 text-lg">{course.description}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-4" />
        </div>

        {/* Ruta de progreso con diseño mejorado */}
        <div className="max-w-3xl mx-auto space-y-6">
          {routes.map((route, index) => {
            const status = getLevelStatus(route);
            const levelProgress = progress.find((p) => p.route_id === route.id);
            const zigzag = index % 2 === 0 ? "ml-0 mr-auto" : "ml-auto mr-0";

            return (
              <div
                key={route.id}
                className={`relative w-11/12 ${zigzag} group animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Conector visual entre niveles */}
                {index < routes.length - 1 && (
                  <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-full w-px h-6 bg-gradient-to-b from-gray-300 to-transparent`} />
                )}

                <div
                  className={`relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all duration-300 ${
                    status === "locked"
                      ? "opacity-60 border-gray-200 cursor-not-allowed"
                      : status === "completed"
                      ? "border-green-400 shadow-xl shadow-green-100 hover:shadow-2xl"
                      : "border-primary shadow-xl shadow-primary/20 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  }`}
                  onClick={() => handleLevelClick(route)}
                >
                  {/* Badge de nivel */}
                  <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                    status === "completed" ? "bg-gradient-to-br from-green-400 to-green-600" :
                    status === "available" ? "bg-gradient-to-br from-primary to-secondary" :
                    "bg-gray-400"
                  }`}>
                    {route.level_order}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 flex-1">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-xl ${
                        status === "locked" ? "bg-gray-100" :
                        status === "completed" ? "bg-gradient-to-br from-green-50 to-green-100" :
                        "bg-gradient-to-br from-blue-50 to-purple-50"
                      }`}>
                        {status === "locked" && <Lock className="h-8 w-8 text-gray-400" />}
                        {status === "available" && <Play className="h-8 w-8 text-primary" />}
                        {status === "completed" && <CheckCircle className="h-8 w-8 text-green-500" />}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                          {route.name}
                          {route.is_certification_level && (
                            <Award className="h-5 w-5 text-amber-500" />
                          )}
                        </h3>
                        
                        {status === "completed" && levelProgress && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${levelProgress.best_accuracy_percentage}%` }}
                              />
                            </div>
                            <div className="text-sm font-semibold text-green-600">
                              <div>{levelProgress.best_accuracy_percentage}% <span className="text-xs text-gray-500">(mejor)</span></div>
                              {typeof levelProgress.last_accuracy_percentage === 'number' && (
                                <div className="text-xs text-gray-600">Último intento: {levelProgress.last_accuracy_percentage}%</div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {status === "locked" && route.level_order > 1 && (
                          <p className="text-sm text-gray-500 mt-1">
                            🔒 Completa el nivel anterior con 80% de precisión
                          </p>
                        )}

                        {status === "available" && (
                          <p className="text-sm text-primary font-medium mt-1 flex items-center gap-1">
                            <Play className="h-4 w-4" />
                            Haz clic para jugar
                          </p>
                        )}
                      </div>
                    </div>

                    {route.is_certification_level && status === "completed" && (
                      <div className="animate-bounce-slow">
                        <Trophy className="h-12 w-12 text-amber-500" />
                      </div>
                    )}
                  </div>

                  {/* Efecto de hover para niveles disponibles */}
                  {status === "available" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón de certificado mejorado */}
        {allCompleted && (
          <div className="text-center mt-16 animate-fade-in">
            <div className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-2xl">
              <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4 animate-bounce-slow" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Felicitaciones! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Has completado todos los niveles exitosamente
              </p>
              <Button
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 h-12 px-8"
                onClick={generateCertificate}
              >
                <Download className="mr-2 h-5 w-5" /> 
                Descargar Certificado
              </Button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
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

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default StudentRoute;
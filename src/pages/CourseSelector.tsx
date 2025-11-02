import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, Trophy, Clock, ArrowRight, Sparkles, Target } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  name: string;
  description: string;
  education_level: string;
  icon: string;
  color: string;
}

const CourseSelector = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userLevel, setUserLevel] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // VERIFICAR ROL DEL USUARIO PRIMERO
      const { data: userRole, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (roleError) {
        console.error("Error al obtener rol:", roleError);
        toast.error("Error al verificar permisos");
        setLoading(false);
        return;
      }

      // Si es profesor, redirigir a dashboard de profesor
      if (userRole?.role === "teacher") {
        toast.info("Redirigiendo al panel de profesor...");
        navigate("/teacher/dashboard");
        return;
      }

      // Si es admin, redirigir a dashboard de admin
      if (userRole?.role === "admin") {
        toast.info("Redirigiendo al panel de administrador...");
        navigate("/admin/dashboard");
        return;
      }

      // Solo si es estudiante, continuar con la carga de cursos
      if (userRole?.role === "student") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserName(`${profile.first_name} ${profile.last_name}`);
          setUserLevel(profile.education_level);
          
          // CARGAR TODOS LOS CURSOS DEL NIVEL EDUCATIVO
          const { data: coursesData, error: coursesError } = await supabase
            .from("courses")
            .select("*")
            .eq("education_level", profile.education_level)
            .order("created_at", { ascending: true });

          if (coursesError) {
            console.error("Error al cargar cursos:", coursesError);
            toast.error("Error al cargar cursos");
          }

          if (coursesData) {
            console.log(`✅ Cursos cargados: ${coursesData.length}`, coursesData);
            setCourses(coursesData);
          } else {
            console.log("⚠️ No se encontraron cursos");
            setCourses([]);
          }
        }
      } else {
        // Si no tiene rol asignado
        toast.error("No tienes un rol asignado. Contacta al administrador.");
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  const getEducationLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      preescolar: "Preescolar",
      primaria: "Primaria",
      secundaria: "Secundaria",
      bachillerato: "Bachillerato",
    };
    return labels[level] || level;
  };

  const getEducationLevelEmoji = (level: string) => {
    const emojis: Record<string, string> = {
      preescolar: "🚦",
      primaria: "🚸",
      secundaria: "🚴",
      bachillerato: "🚗",
    };
    return emojis[level] || "📚";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-slate-700 mb-2">Verificando permisos...</p>
          <p className="text-sm text-slate-500">Espera un momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 text-blue-200 opacity-30 animate-float">
        <BookOpen className="w-24 h-24" />
      </div>
      <div className="absolute bottom-20 left-20 text-purple-200 opacity-30 animate-float animation-delay-2000">
        <Trophy className="w-28 h-28" />
      </div>

      <div className="relative p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-6xl animate-wave drop-shadow-lg">{getEducationLevelEmoji(userLevel)}</div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-xs font-medium text-blue-900 mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Estudiante Activo</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                        ¡Hola, {userName.split(' ')[0]}!
                      </span>
                    </h1>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                        <Target className="w-4 h-4 mr-1.5" />
                        {getEducationLevelLabel(userLevel)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                  ¡Estás listo para aprender! 🚀 Selecciona un curso para comenzar tu <span className="font-bold text-blue-600">aventura de seguridad vial</span>.
                </p>
              </div>

              <div className="flex gap-3 w-full lg:w-auto animate-slide-down">
                <Button 
                  onClick={() => navigate("/resources")}
                  className="flex-1 lg:flex-none bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 font-semibold"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Recursos
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="flex-1 lg:flex-none bg-white hover:bg-red-50 border-2 border-slate-300 hover:border-red-400 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-slate-700 hover:text-red-600 font-semibold"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Salir
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
              <Card className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-800">{courses.length}</p>
                      <p className="text-sm font-medium text-slate-600">Cursos Disponibles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-800">0</p>
                      <p className="text-sm font-medium text-slate-600">Logros Obtenidos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-800">0h</p>
                      <p className="text-sm font-medium text-slate-600">Tiempo de Estudio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Courses Grid */}
          {courses.length > 0 ? (
            <>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Tus Cursos</h2>
                <span className="text-sm text-slate-500 ml-2">({courses.length} disponibles)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <Card 
                    key={course.id}
                    className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer overflow-hidden animate-slide-up"
                    onClick={() => navigate(`/student/course/${course.id}`)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className="h-3 w-full relative overflow-hidden"
                      style={{ background: course.color }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-6xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg">
                          {course.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                            {course.name}
                          </CardTitle>
                          <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                            {course.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium">Progreso</span>
                            <span className="text-slate-800 font-bold">0%</span>
                          </div>
                          <div className="relative flex-1 bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                            <div 
                              className="h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                              style={{ 
                                background: course.color,
                                width: '0%'
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full group-hover:shadow-xl transition-all duration-300 font-semibold text-white"
                          style={{ 
                            background: course.color,
                            borderColor: course.color 
                          }}
                        >
                          Comenzar Curso
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="border-2 border-dashed border-slate-300 bg-white/70 backdrop-blur-sm shadow-xl animate-fade-in">
              <CardContent className="pt-16 pb-16 text-center">
                <div className="relative w-28 h-28 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BookOpen className="w-14 h-14 text-slate-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  No hay cursos disponibles
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                  Por el momento no hay cursos para tu nivel educativo (<span className="font-semibold text-blue-600">{getEducationLevelLabel(userLevel)}</span>). ¡Pronto habrá más contenido!
                </p>
                <Button 
                  onClick={() => navigate("/resources")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explorar Recursos
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-wave {
          animation: wave 2.5s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
};

export default CourseSelector;
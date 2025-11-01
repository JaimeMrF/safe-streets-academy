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

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserName(`${profile.first_name} ${profile.last_name}`);
        setUserLevel(profile.education_level);
        
        const { data: coursesData } = await supabase
          .from("courses")
          .select("*")
          .eq("education_level", profile.education_level);

        if (coursesData) {
          setCourses(coursesData);
        }
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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-700">Cargando tus cursos...</p>
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

      <div className="relative p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-5xl animate-wave">{getEducationLevelEmoji(userLevel)}</div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        ¡Hola, {userName.split(' ')[0]}!
                      </span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900">
                        <Target className="w-4 h-4 mr-1" />
                        {getEducationLevelLabel(userLevel)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-slate-600 max-w-2xl">
                  ¡Estás listo para aprender! Selecciona un curso para comenzar tu aventura de seguridad vial.
                </p>
              </div>

              <div className="flex gap-3 w-full lg:w-auto animate-slide-down">
                <Button 
                  onClick={() => navigate("/resources")}
                  className="flex-1 lg:flex-none bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Recursos
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="flex-1 lg:flex-none bg-white hover:bg-red-50 border-2 border-slate-200 hover:border-red-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-slate-700 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Salir
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/90 hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{courses.length}</p>
                      <p className="text-sm text-slate-600">Cursos Disponibles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/90 hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">0</p>
                      <p className="text-sm text-slate-600">Logros Obtenidos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/90 hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">0h</p>
                      <p className="text-sm text-slate-600">Tiempo de Estudio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Courses Grid */}
          {courses.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-2xl font-bold text-slate-800">Tus Cursos</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <Card 
                    key={course.id}
                    className="group border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/90 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/student/course/${course.id}`)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className="h-2 w-full"
                      style={{ background: course.color }}
                    />
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                          {course.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                            {course.name}
                          </CardTitle>
                          <CardDescription className="text-sm line-clamp-2">
                            {course.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                background: course.color,
                                width: '0%'
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium">0%</span>
                        </div>
                        
                        <Button 
                          className="w-full group-hover:shadow-lg transition-all duration-300"
                          style={{ 
                            background: course.color,
                            borderColor: course.color 
                          }}
                        >
                          Comenzar Curso
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="border-2 border-dashed border-slate-300 bg-white/50 backdrop-blur-sm">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  No hay cursos disponibles
                </h3>
                <p className="text-slate-600 mb-6">
                  Por el momento no hay cursos para tu nivel educativo ({getEducationLevelLabel(userLevel)})
                </p>
                <Button 
                  onClick={() => navigate("/resources")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
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
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
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
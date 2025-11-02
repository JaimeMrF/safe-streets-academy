import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, Trophy, Clock, ArrowRight, User } from "lucide-react";
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

      if (userRole?.role === "teacher") {
        toast.info("Redirigiendo al panel de profesor");
        navigate("/teacher/dashboard");
        return;
      }

      if (userRole?.role === "admin") {
        toast.info("Redirigiendo al panel de administrador");
        navigate("/admin/dashboard");
        return;
      }

      if (userRole?.role === "student") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserName(`${profile.first_name} ${profile.last_name}`);
          setUserLevel(profile.education_level);
          
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
            console.log(`Cursos cargados: ${coursesData.length}`, coursesData);
            setCourses(coursesData);
          } else {
            console.log("No se encontraron cursos");
            setCourses([]);
          }
        }
      } else {
        toast.error("No tienes un rol asignado. Contacta al administrador");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-gray-700 mb-2">Verificando permisos</p>
          <p className="text-sm text-gray-500">Por favor espere</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                VS
              </div>
              <span className="text-lg font-bold text-gray-900">ViaSafe Educación</span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate("/resources")}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Recursos
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bienvenido, {userName.split(' ')[0]}
              </h1>
              <p className="text-gray-600">
                Nivel: <span className="font-semibold text-blue-600">{getEducationLevelLabel(userLevel)}</span>
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            Seleccione un curso para comenzar su aprendizaje en seguridad vial.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  <p className="text-sm text-gray-600">Cursos Disponibles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Logros Obtenidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0h</p>
                  <p className="text-sm text-gray-600">Tiempo de Estudio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        {courses.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mis Cursos</h2>
              <p className="text-gray-600">{courses.length} curso(s) disponible(s)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card 
                  key={course.id}
                  className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/student/course/${course.id}`)}
                >
                  <div 
                    className="h-2 w-full"
                    style={{ background: course.color }}
                  />
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 text-gray-900">
                          {course.name}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progreso</span>
                          <span className="text-gray-900 font-semibold">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              background: course.color,
                              width: '0%'
                            }}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full text-white"
                        style={{ 
                          background: course.color
                        }}
                      >
                        Comenzar Curso
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card className="border-2 border-dashed border-gray-300 bg-white">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                No hay cursos disponibles
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Por el momento no hay cursos para su nivel educativo (<span className="font-semibold">{getEducationLevelLabel(userLevel)}</span>). Pronto habrá más contenido disponible.
              </p>
              <Button 
                onClick={() => navigate("/resources")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Explorar Recursos
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseSelector;
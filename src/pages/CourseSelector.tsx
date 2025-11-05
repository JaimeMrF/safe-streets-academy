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

interface CourseProgress {
  courseId: string;
  completedRoutes: number;
  totalRoutes: number;
  percentage: number;
}

const CourseSelector = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, CourseProgress>>({});
  const [userLevel, setUserLevel] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      setUserId(user.id);

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
            
            // Calcular progreso para cada curso
            await calculateProgress(coursesData, user.id);
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

  const calculateProgress = async (coursesData: Course[], studentId: string) => {
    const progressMap: Record<string, CourseProgress> = {};

    for (const course of coursesData) {
      // Obtener todas las rutas del curso
      const { data: routes, error: routesError } = await supabase
        .from("routes")
        .select("id")
        .eq("course_id", course.id);

      if (routesError) {
        console.error("Error al obtener rutas:", routesError);
        continue;
      }

      const totalRoutes = routes?.length || 0;

      if (totalRoutes === 0) {
        progressMap[course.id] = {
          courseId: course.id,
          completedRoutes: 0,
          totalRoutes: 0,
          percentage: 0
        };
        continue;
      }

      // Obtener rutas completadas del estudiante
      const { data: progress, error: progressError } = await supabase
        .from("student_progress")
        .select("route_id, completed")
        .eq("student_id", studentId)
        .in("route_id", routes.map(r => r.id))
        .eq("completed", true);

      if (progressError) {
        console.error("Error al obtener progreso:", progressError);
      }

      const completedRoutes = progress?.length || 0;
      const percentage = Math.round((completedRoutes / totalRoutes) * 100);

      progressMap[course.id] = {
        courseId: course.id,
        completedRoutes,
        totalRoutes,
        percentage
      };
    }

    setCourseProgress(progressMap);
  };

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

  // Calcular estadísticas totales
  const getTotalStats = () => {
    const totalCompleted = Object.values(courseProgress).reduce(
      (sum, progress) => sum + progress.completedRoutes,
      0
    );
    const coursesInProgress = Object.values(courseProgress).filter(
      (progress) => progress.percentage > 0 && progress.percentage < 100
    ).length;
    const coursesCompleted = Object.values(courseProgress).filter(
      (progress) => progress.percentage === 100
    ).length;

    return { totalCompleted, coursesInProgress, coursesCompleted };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-secondary rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold mb-2">Cargando cursos</p>
          <p className="text-sm text-muted-foreground">Por favor espere</p>
        </div>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
                ITAL
              </div>
              <span className="text-lg font-bold">ITAL - Plataforma Educativa</span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate("/resources")}
                variant="outline"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Recursos
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
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
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Bienvenido, {userName.split(' ')[0]}
              </h1>
              <p className="text-muted-foreground">
                Nivel: <span className="font-semibold text-primary">{getEducationLevelLabel(userLevel)}</span>
              </p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Seleccione un curso para comenzar su aprendizaje.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{courses.length}</p>
                  <p className="text-sm text-muted-foreground">Cursos Disponibles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
                  <p className="text-sm text-muted-foreground">Cursos Completados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCompleted}</p>
                  <p className="text-sm text-muted-foreground">Lecciones Completadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        {courses.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Mis Cursos</h2>
              <p className="text-muted-foreground">{courses.length} curso(s) disponible(s)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const progress = courseProgress[course.id] || { 
                  completedRoutes: 0, 
                  totalRoutes: 0, 
                  percentage: 0 
                };

                return (
                  <Card 
                    key={course.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
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
                          <CardTitle className="text-lg mb-2">
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
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="font-semibold">
                              {progress.percentage}% ({progress.completedRoutes}/{progress.totalRoutes})
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${progress.percentage}%`,
                                background: course.color
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
                          {progress.percentage === 0 ? 'Comenzar Curso' : 
                           progress.percentage === 100 ? 'Revisar Curso' : 
                           'Continuar Curso'}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
          ) : (
            <Card className="border-2 border-dashed">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  No hay cursos disponibles
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Por el momento no hay cursos para su nivel educativo (<span className="font-semibold">{getEducationLevelLabel(userLevel)}</span>). Pronto habrá más contenido disponible.
                </p>
                <Button 
                  onClick={() => navigate("/resources")}
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
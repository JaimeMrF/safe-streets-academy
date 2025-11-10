import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  CheckCircle2,
  Circle,
  Award,
  Calendar,
  Mail,
  User,
  BarChart3,
  Activity
} from "lucide-react";
import { toast } from "sonner";

interface StudentProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  education_level: string;
  birth_date: string;
  created_at: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  education_level: string;
}

interface Route {
  id: string;
  name: string;
  description: string;
  level_order: number;
  game_type: string;
  is_certification_level: boolean;
}

interface Progress {
  route_id: string;
  completed: boolean;
  score: number;
  completion_status: string;
  best_accuracy_percentage: number;
  attempts: number;
  completion_date: string;
  last_attempt_date: string;
}

interface CourseProgress {
  course: Course;
  routes: Route[];
  progress: Progress[];
  completedRoutes: number;
  totalRoutes: number;
  averageScore: number;
  overallProgress: number;
}

const StudentDetail = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [coursesProgress, setCoursesProgress] = useState<CourseProgress[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalTime: 0,
    totalAchievements: 0,
    averageScore: 0,
    totalRoutes: 0,
    completedRoutes: 0
  });
  const [advancedMetrics, setAdvancedMetrics] = useState({
    totalAttempts: 0,
    perfectScores: 0,
    averageAccuracy: 0,
    consecutiveDays: 0,
    bestStreak: 0,
    completionRate: 0,
    retryRate: 0
  });

  useEffect(() => {
    const loadStudentData = async () => {
      if (!studentId) return;

      try {
        // Cargar perfil del estudiante
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", studentId)
          .single();

        if (profileError) throw profileError;
        setStudent(profileData);

        // Cargar cursos del nivel del estudiante
        const { data: coursesData, error: coursesError } = await supabase
          .from("courses")
          .select("*")
          .eq("education_level", profileData.education_level)
          .order("created_at", { ascending: true });

        if (coursesError) throw coursesError;

        // Para cada curso, cargar sus rutas y progreso
        const coursesWithProgress: CourseProgress[] = [];
        let totalScore = 0;
        let totalAttempts = 0;
        let completedRoutesCount = 0;
        let totalRoutesCount = 0;

        for (const course of coursesData || []) {
          // Cargar rutas del curso
          const { data: routesData } = await supabase
            .from("routes")
            .select("*")
            .eq("course_id", course.id)
            .order("level_order", { ascending: true });

          // Cargar progreso del estudiante en este curso
          const routeIds = routesData?.map(r => r.id) || [];
          const { data: progressData } = await supabase
            .from("student_progress")
            .select("*")
            .eq("student_id", studentId)
            .in("route_id", routeIds);

          const routes = routesData || [];
          const progress = progressData || [];
          const completed = progress.filter(p => p.completed).length;
          const total = routes.length;
          const avgScore = progress.length > 0
            ? progress.reduce((sum, p) => sum + p.score, 0) / progress.length
            : 0;

          totalRoutesCount += total;
          completedRoutesCount += completed;
          totalScore += progress.reduce((sum, p) => sum + p.score, 0);
          totalAttempts += progress.length;

          coursesWithProgress.push({
            course,
            routes,
            progress,
            completedRoutes: completed,
            totalRoutes: total,
            averageScore: avgScore,
            overallProgress: total > 0 ? (completed / total) * 100 : 0
          });
        }

        setCoursesProgress(coursesWithProgress);

        // Calcular estadísticas generales
        const completedCourses = coursesWithProgress.filter(
          cp => cp.completedRoutes === cp.totalRoutes && cp.totalRoutes > 0
        ).length;

        setStats({
          totalCourses: coursesData?.length || 0,
          completedCourses,
          totalTime: 0, // Calcular basado en avg_response_time
          totalAchievements: completedRoutesCount,
          averageScore: totalAttempts > 0 ? totalScore / totalAttempts : 0,
          totalRoutes: totalRoutesCount,
          completedRoutes: completedRoutesCount
        });

        const newAdvancedMetrics = {
          totalAttempts: 0,
          perfectScores: 0,
          averageAccuracy: 0,
          consecutiveDays: 0,
          bestStreak: 0,
          improvementRate: 0,
          completionRate: 0,
          retryRate: 0
        };

        // Calcular métricas avanzadas
        const allProgress = coursesWithProgress.flatMap(cp => cp.progress);

        allProgress.forEach(p => {
          newAdvancedMetrics.totalAttempts += p.attempts || 0;
          if (p.score === 100) newAdvancedMetrics.perfectScores++;
          if (p.best_accuracy_percentage) {
            newAdvancedMetrics.averageAccuracy += p.best_accuracy_percentage;
          }
        });

        newAdvancedMetrics.averageAccuracy = allProgress.length > 0 ? 
          newAdvancedMetrics.averageAccuracy / allProgress.length : 0;

        newAdvancedMetrics.completionRate = allProgress.length > 0 ?
          (allProgress.filter(p => p.completed).length / allProgress.length * 100) : 0;

        newAdvancedMetrics.retryRate = allProgress.length > 0 ?
          (newAdvancedMetrics.totalAttempts / allProgress.length) : 0;

        // Calcular racha
        const dates = allProgress
          .filter(p => p.last_attempt_date)
          .map(p => new Date(p.last_attempt_date))
          .sort((a, b) => b.getTime() - a.getTime());

        if (dates.length > 0) {
          newAdvancedMetrics.consecutiveDays = 1;
          for (let i = 0; i < dates.length - 1; i++) {
            const diff = Math.abs(dates[i].getTime() - dates[i + 1].getTime());
            const daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (daysDiff === 1) {
              newAdvancedMetrics.consecutiveDays++;
            } else {
              break;
            }
          }
          newAdvancedMetrics.bestStreak = newAdvancedMetrics.consecutiveDays;
        }

        setAdvancedMetrics(newAdvancedMetrics);
      } catch (error) {
        console.error("Error loading student data:", error);
        toast.error("Error al cargar datos del estudiante");
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, [studentId]);

  const getEducationLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      preescolar: "Preescolar",
      primaria: "Primaria",
      secundaria: "Secundaria",
      bachillerato: "Bachillerato",
    };
    return labels[level] || level;
  };

  const getEducationLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      preescolar: "#EF4444",
      primaria: "#3B82F6",
      secundaria: "#10B981",
      bachillerato: "#8B5CF6",
    };
    return colors[level] || "#64748B";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { label: string; className: string }> = {
      completed: { label: "Completado", className: "bg-green-100 text-green-800 border-green-300" },
      in_progress: { label: "En Progreso", className: "bg-blue-100 text-blue-800 border-blue-300" },
      not_started: { label: "No Iniciado", className: "bg-slate-100 text-slate-800 border-slate-300" }
    };
    const style = styles[status] || styles.not_started;
    return <Badge variant="outline" className={style.className}>{style.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-slate-700">Cargando datos del estudiante...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600 mb-4">No se encontró el estudiante</p>
            <Button onClick={() => navigate("/teacher/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/teacher/dashboard")}
              className="mb-4 hover:bg-white/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Estudiantes
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Student Profile Card */}
              <Card className="lg:col-span-1 border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl">
                    {student.first_name} {student.last_name}
                  </CardTitle>
                  <Badge 
                    className="mt-2 text-white"
                    style={{ background: getEducationLevelColor(student.education_level) }}
                  >
                    {getEducationLevelLabel(student.education_level)}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">
                      Registrado: {formatDate(student.created_at)}
                    </span>
                  </div>
                  {student.birth_date && (
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">
                        Nacimiento: {formatDate(student.birth_date)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/95 hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{stats.completedCourses}/{stats.totalCourses}</p>
                      <p className="text-xs text-slate-600">Cursos</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/95 hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{stats.completedRoutes}/{stats.totalRoutes}</p>
                      <p className="text-xs text-slate-600">Niveles</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/95 hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{stats.averageScore.toFixed(0)}%</p>
                      <p className="text-xs text-slate-600">Puntuación</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-lg backdrop-blur-sm bg-white/95 hover:shadow-xl transition-all">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{stats.totalAchievements}</p>
                      <p className="text-xs text-slate-600">Logros</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
              <TabsTrigger value="metrics" className="rounded-xl">
                <BarChart3 className="w-4 h-4 mr-2" />
                Métricas Avanzadas
              </TabsTrigger>
              <TabsTrigger value="overview" className="rounded-xl">
                <BarChart3 className="w-4 h-4 mr-2" />
                Vista General
              </TabsTrigger>
              <TabsTrigger value="courses" className="rounded-xl">
                <BookOpen className="w-4 h-4 mr-2" />
                Cursos Detallados
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-xl">
                <Activity className="w-4 h-4 mr-2" />
                Actividad Reciente
              </TabsTrigger>
            </TabsList>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      Total Intentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-slate-800">{advancedMetrics.totalAttempts}</p>
                    <p className="text-sm text-slate-600 mt-1">Actividades realizadas</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      Puntuaciones Perfectas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-slate-800">{advancedMetrics.perfectScores}</p>
                    <p className="text-sm text-slate-600 mt-1">100% de precisión</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Precisión Promedio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-slate-800">{advancedMetrics.averageAccuracy.toFixed(1)}%</p>
                    <p className="text-sm text-slate-600 mt-1">En todas las actividades</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-500" />
                      Racha Actual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-slate-800">{advancedMetrics.consecutiveDays}</p>
                    <p className="text-sm text-slate-600 mt-1">Días consecutivos</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tasa de Completación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-slate-800">{advancedMetrics.completionRate.toFixed(1)}%</p>
                    <p className="text-sm text-slate-600 mt-1">Niveles completados</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      Tasa de Reintentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-slate-800">{advancedMetrics.retryRate.toFixed(1)}x</p>
                    <p className="text-sm text-slate-600 mt-1">Promedio por nivel</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Mejor Racha
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-slate-800">{advancedMetrics.bestStreak}</p>
                    <p className="text-sm text-slate-600 mt-1">Días consecutivos máx.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesProgress.map((courseProgress, index) => (
                  <Card
                    key={courseProgress.course.id}
                    className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl transition-all duration-300 overflow-hidden animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className="h-2 w-full"
                      style={{ background: courseProgress.course.color }}
                    />
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{courseProgress.course.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">
                            {courseProgress.course.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {courseProgress.completedRoutes}/{courseProgress.totalRoutes} niveles completados
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-600">Progreso</span>
                          <span className="font-bold text-slate-800">
                            {courseProgress.overallProgress.toFixed(0)}%
                          </span>
                        </div>
                        <Progress 
                          value={courseProgress.overallProgress} 
                          className="h-3"
                          style={{
                            background: `${courseProgress.course.color}20`
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium">
                            {courseProgress.averageScore.toFixed(0)}% prom.
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          Ver detalles →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              {coursesProgress.map((courseProgress) => (
                <Card
                  key={courseProgress.course.id}
                  className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 overflow-hidden"
                >
                  <div
                    className="h-3 w-full"
                    style={{ background: courseProgress.course.color }}
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{courseProgress.course.icon}</div>
                        <div>
                          <CardTitle className="text-2xl mb-1">
                            {courseProgress.course.name}
                          </CardTitle>
                          <CardDescription>{courseProgress.course.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-slate-800">
                          {courseProgress.overallProgress.toFixed(0)}%
                        </p>
                        <p className="text-sm text-slate-600">Completado</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courseProgress.routes.map((route) => {
                        const routeProgress = courseProgress.progress.find(
                          p => p.route_id === route.id
                        );
                        const isCompleted = routeProgress?.completed || false;
                        const status = routeProgress?.completion_status || "not_started";

                        return (
                          <div
                            key={route.id}
                            className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : (
                                <Circle className="w-6 h-6 text-slate-300" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-slate-800 truncate">
                                  Nivel {route.level_order}: {route.name}
                                </p>
                                {route.is_certification_level && (
                                  <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                                    <Award className="w-3 h-3 mr-1" />
                                    Certificación
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">{route.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              {getStatusBadge(status)}
                              {routeProgress && (
                                <div className="text-right">
                                  <p className="text-lg font-bold text-slate-800">
                                    {routeProgress.score}%
                                  </p>
                                  <p className="text-xs text-slate-600">
                                    {routeProgress.attempts} intentos
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Actividad Reciente
                  </CardTitle>
                  <CardDescription>
                    Últimas acciones del estudiante en la plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {coursesProgress
                      .flatMap(cp =>
                        cp.progress
                          .filter(p => p.last_attempt_date)
                          .map(p => ({
                            ...p,
                            course: cp.course,
                            route: cp.routes.find(r => r.id === p.route_id)
                          }))
                      )
                      .sort((a, b) =>
                        new Date(b.last_attempt_date).getTime() -
                        new Date(a.last_attempt_date).getTime()
                      )
                      .slice(0, 10)
                      .map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="text-3xl">{activity.course.icon}</div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">
                              {activity.route?.name}
                            </p>
                            <p className="text-sm text-slate-600">
                              {activity.course.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-800">
                              {activity.score}%
                            </p>
                            <p className="text-xs text-slate-600">
                              {formatDate(activity.last_attempt_date)}
                            </p>
                          </div>
                          {activity.completed && (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          )}
                        </div>
                      ))}

                    {coursesProgress.every(cp => cp.progress.length === 0) && (
                      <div className="text-center py-12">
                        <Activity className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <p className="text-slate-600">
                          Este estudiante aún no ha iniciado ningún curso
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
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

export default StudentDetail;
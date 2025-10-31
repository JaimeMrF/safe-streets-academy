import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Award, Clock } from "lucide-react";

interface StudentWithProgress {
  id: string;
  first_name: string;
  last_name: string;
  education_level: string;
  total_routes: number;
  completed_routes: number;
  average_score: number;
  best_accuracy: number;
  total_attempts: number;
  completion_percentage: number;
  has_certification: boolean;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentWithProgress[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("todos");
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageCompletion: 0,
    topPerformer: "",
    totalActivities: 0,
    certifiedStudents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user is teacher or admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      const isTeacherOrAdmin = roles?.some(r => r.role === "teacher" || r.role === "admin");
      if (!isTeacherOrAdmin) {
        navigate("/courses");
        return;
      }

      loadDashboardData();
    };

    checkAuth();
  }, []);

  const loadDashboardData = async () => {
    // Load all students with their progress
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*");

    if (!profilesData) {
      setLoading(false);
      return;
    }

    // Load progress for all students
    const { data: progressData } = await supabase
      .from("student_progress")
      .select("*");

    // Load all routes count
    const { data: routesData } = await supabase
      .from("routes")
      .select("id, course_id, courses(education_level)");

    const studentsWithProgress = profilesData.map(student => {
      const studentProgress = progressData?.filter(p => p.student_id === student.id) || [];
      const relevantRoutes = routesData?.filter((r: any) => 
        r.courses?.education_level === student.education_level
      ) || [];

      const completed = studentProgress.filter(p => p.completed).length;
      const totalScore = studentProgress.reduce((sum, p) => sum + p.score, 0);
      const avgScore = studentProgress.length > 0 ? totalScore / studentProgress.length : 0;
      const bestAccuracy = studentProgress.length > 0 
        ? Math.max(...studentProgress.map(p => p.best_accuracy_percentage || 0))
        : 0;
      const totalAttempts = studentProgress.reduce((sum, p) => sum + (p.attempts || 0), 0);
      const completionPercentage = relevantRoutes.length > 0 
        ? (completed / relevantRoutes.length) * 100 
        : 0;
      const hasCertification = completionPercentage === 100;

      return {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        education_level: student.education_level,
        total_routes: relevantRoutes.length,
        completed_routes: completed,
        average_score: Math.round(avgScore),
        best_accuracy: Math.round(bestAccuracy),
        total_attempts: totalAttempts,
        completion_percentage: Math.round(completionPercentage),
        has_certification: hasCertification,
      };
    });

    setStudents(studentsWithProgress);

    // Calculate stats
    const totalStudents = studentsWithProgress.length;
    const totalCompletion = studentsWithProgress.reduce((sum, s) => sum + s.completion_percentage, 0);
    const avgCompletion = totalStudents > 0 ? totalCompletion / totalStudents : 0;
    
    const topStudent = studentsWithProgress.reduce((top, student) => 
      student.average_score > (top?.average_score || 0) ? student : top
    , studentsWithProgress[0]);

    const certifiedCount = studentsWithProgress.filter(s => s.has_certification).length;

    setStats({
      totalStudents,
      averageCompletion: Math.round(avgCompletion),
      topPerformer: topStudent ? `${topStudent.first_name} ${topStudent.last_name}` : "N/A",
      totalActivities: progressData?.length || 0,
      certifiedStudents: certifiedCount,
    });

    setLoading(false);
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

  const filteredStudents = selectedLevel === "todos" 
    ? students 
    : students.filter(s => s.education_level === selectedLevel);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Cargando panel...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Panel de Profesor</h1>
          <p className="text-muted-foreground">Monitorea el progreso y rendimiento de todos tus estudiantes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completación Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageCompletion}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mejor Estudiante</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{stats.topPerformer}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Actividades Totales</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalActivities}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Certificados</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.certifiedStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Estudiantes certificados</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtro por Nivel */}
        <div className="mb-6">
          <Tabs value={selectedLevel} onValueChange={setSelectedLevel}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="preescolar">Preescolar</TabsTrigger>
              <TabsTrigger value="primaria">Primaria</TabsTrigger>
              <TabsTrigger value="secundaria">Secundaria</TabsTrigger>
              <TabsTrigger value="bachillerato">Bachillerato</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso de Estudiantes {selectedLevel !== "todos" && `- ${getEducationLevelLabel(selectedLevel)}`}</CardTitle>
            <CardDescription>
              Vista detallada del rendimiento individual ({filteredStudents.length} estudiante{filteredStudents.length !== 1 ? 's' : ''})
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Punt. Promedio</TableHead>
                  <TableHead>Mejor Precisión</TableHead>
                  <TableHead>Intentos</TableHead>
                  <TableHead>Completadas</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No hay estudiantes en este nivel
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {student.first_name} {student.last_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getEducationLevelLabel(student.education_level)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <Progress 
                            value={student.completion_percentage} 
                            className="w-16"
                          />
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {student.completion_percentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.average_score >= 80 ? "default" : "secondary"}>
                          {student.average_score}/100
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-primary">
                          {student.best_accuracy}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{student.total_attempts}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm whitespace-nowrap">
                          {student.completed_routes}/{student.total_routes}
                        </span>
                      </TableCell>
                      <TableCell>
                        {student.has_certification ? (
                          <Badge className="bg-gradient-to-r from-primary to-accent">
                            <Award className="h-3 w-3 mr-1" />
                            Certificado
                          </Badge>
                        ) : (
                          <Badge variant="outline">En Progreso</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
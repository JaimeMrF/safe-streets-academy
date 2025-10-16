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
  total_time_spent: number;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentWithProgress[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageCompletion: 0,
    topPerformer: "",
    totalActivities: 0,
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

      return {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        education_level: student.education_level,
        total_routes: relevantRoutes.length,
        completed_routes: completed,
        average_score: Math.round(avgScore),
        total_time_spent: 0, // Would need to track this
      };
    });

    setStudents(studentsWithProgress);

    // Calculate stats
    const totalStudents = studentsWithProgress.length;
    const totalCompletion = studentsWithProgress.reduce((sum, s) => 
      sum + (s.total_routes > 0 ? (s.completed_routes / s.total_routes) * 100 : 0), 0
    );
    const avgCompletion = totalStudents > 0 ? totalCompletion / totalStudents : 0;
    
    const topStudent = studentsWithProgress.reduce((top, student) => 
      student.average_score > (top?.average_score || 0) ? student : top
    , studentsWithProgress[0]);

    setStats({
      totalStudents,
      averageCompletion: Math.round(avgCompletion),
      topPerformer: topStudent ? `${topStudent.first_name} ${topStudent.last_name}` : "N/A",
      totalActivities: progressData?.length || 0,
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Cargando panel...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Panel de Profesor</h1>
          <p className="text-muted-foreground">Monitorea el progreso de todos tus estudiantes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso de Estudiantes</CardTitle>
            <CardDescription>Vista detallada del rendimiento individual</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Puntuación Promedio</TableHead>
                  <TableHead>Completadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.first_name} {student.last_name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getEducationLevelLabel(student.education_level)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={student.total_routes > 0 ? (student.completed_routes / student.total_routes) * 100 : 0} 
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground">
                          {student.total_routes > 0 ? Math.round((student.completed_routes / student.total_routes) * 100) : 0}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.average_score >= 80 ? "default" : "secondary"}>
                        {student.average_score}/100
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.completed_routes}/{student.total_routes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
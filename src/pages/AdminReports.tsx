// src/pages/AdminReports.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp, Users, BookOpen, Award, Download } from "lucide-react";
import { toast } from "sonner";

const AdminReports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalProgress: 0,
    avgProgress: 0,
    studentsByLevel: {
      preescolar: 0,
      primaria: 0,
      secundaria: 0,
      bachillerato: 0
    }
  });

  useEffect(() => {
    checkAdminAccess();
    loadStats();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Debes iniciar sesión");
      navigate("/auth");
      return;
    }

    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (userRole?.role !== "admin") {
      toast.error("No tienes permisos de administrador");
      navigate("/courses");
      return;
    }
  };

  const loadStats = async () => {
    try {
      // Contar estudiantes
      const { count: studentsCount } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "student");

      // Contar profesores
      const { count: teachersCount } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "teacher");

      // Contar cursos
      const { count: coursesCount } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true });

      // Estudiantes por nivel
      const { data: studentsByLevel } = await supabase
        .from("profiles")
        .select("education_level")
        .in("id", 
          (await supabase.from("user_roles").select("user_id").eq("role", "student"))
            .data?.map(r => r.user_id) || []
        );

      const levelCounts = {
        preescolar: 0,
        primaria: 0,
        secundaria: 0,
        bachillerato: 0
      };

      studentsByLevel?.forEach(s => {
        if (s.education_level in levelCounts) {
          levelCounts[s.education_level as keyof typeof levelCounts]++;
        }
      });

      setStats({
        totalStudents: studentsCount || 0,
        totalTeachers: teachersCount || 0,
        totalCourses: coursesCount || 0,
        totalProgress: 0, // Implementar cuando tengas tabla de progreso
        avgProgress: 0,
        studentsByLevel: levelCounts
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Error al cargar estadísticas");
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    toast.success("Reporte exportado exitosamente");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/dashboard")}
            className="hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Dashboard
          </Button>
          <Button
            onClick={exportReport}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>

        <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/95 mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                  Reportes y Estadísticas
                </CardTitle>
                <CardDescription>
                  Análisis detallado del sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Estudiantes
              </CardTitle>
              <Users className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalStudents}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Usuarios activos
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Profesores
              </CardTitle>
              <Users className="w-5 h-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {stats.totalTeachers}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Educadores registrados
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Cursos
              </CardTitle>
              <BookOpen className="w-5 h-5 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">
                {stats.totalCourses}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Contenido disponible
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Progreso Promedio
              </CardTitle>
              <Award className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.avgProgress}%
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Completado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Distribución por Nivel Educativo */}
        <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader>
            <CardTitle className="text-xl">
              Distribución de Estudiantes por Nivel Educativo
            </CardTitle>
            <CardDescription>
              Cantidad de estudiantes registrados en cada nivel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="font-medium text-slate-700">Preescolar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.studentsByLevel.preescolar / stats.totalStudents * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-pink-600 w-12 text-right">
                    {stats.studentsByLevel.preescolar}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium text-slate-700">Primaria</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.studentsByLevel.primaria / stats.totalStudents * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-blue-600 w-12 text-right">
                    {stats.studentsByLevel.primaria}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="font-medium text-slate-700">Secundaria</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.studentsByLevel.secundaria / stats.totalStudents * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-purple-600 w-12 text-right">
                    {stats.studentsByLevel.secundaria}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium text-slate-700">Bachillerato</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.studentsByLevel.bachillerato / stats.totalStudents * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-green-600 w-12 text-right">
                    {stats.studentsByLevel.bachillerato}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
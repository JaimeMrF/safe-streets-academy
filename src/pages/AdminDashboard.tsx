// src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserPlus, 
  BarChart3,
  LogOut,
  Settings
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
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
      .single();

    if (userRole?.role !== "admin") {
      toast.error("No tienes permisos de administrador");
      navigate("/courses");
      return;
    }

    setLoading(false);
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

      setStats({
        totalStudents: studentsCount || 0,
        totalTeachers: teachersCount || 0,
        totalCourses: coursesCount || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sesión cerrada");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Panel de Administración
                </h1>
                <p className="text-sm text-slate-600">ViaSafe Educación</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/courses")}
                className="hidden sm:flex"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Cursos
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-xs text-slate-500 mt-1">
                Usuarios registrados como estudiantes
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Profesores
              </CardTitle>
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {stats.totalTeachers}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Profesores activos en la plataforma
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
                Cursos disponibles en la plataforma
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Registrar Profesor */}
          <Card className="border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/teacher/register")}>
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-center text-xl">
                Registrar Profesor
              </CardTitle>
              <CardDescription className="text-center">
                Crear una nueva cuenta de profesor en el sistema
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Ver Estudiantes */}
          <Card className="border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/admin/students")}>
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-center text-xl">
                Ver Estudiantes
              </CardTitle>
              <CardDescription className="text-center">
                Lista completa de estudiantes registrados
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Ver Profesores */}
          <Card className="border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/admin/teachers")}>
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-center text-xl">
                Ver Profesores
              </CardTitle>
              <CardDescription className="text-center">
                Gestionar cuentas de profesores
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Gestionar Cursos */}
          <Card className="border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/admin/courses")}>
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-center text-xl">
                Gestionar Cursos
              </CardTitle>
              <CardDescription className="text-center">
                Crear, editar y administrar cursos
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Reportes */}
          <Card className="border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/admin/reports")}>
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-center text-xl">
                Reportes
              </CardTitle>
              <CardDescription className="text-center">
                Ver estadísticas y reportes del sistema
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Configuración */}
          <Card className="border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/admin/settings")}>
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-center text-xl">
                Configuración
              </CardTitle>
              <CardDescription className="text-center">
                Ajustes generales del sistema
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
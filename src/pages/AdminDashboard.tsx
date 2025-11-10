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
import { siteConfig } from "@/config/site.config";

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
      .select("user_role")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (userRole?.user_role !== "admin") {
      toast.error("No tienes permisos de administrador");
      navigate("/courses");
      return;
    }

    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const { count: studentsCount } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("user_role", "student");

      const { count: teachersCount } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("user_role", "teacher");

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verificando permisos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo ITAL */}
              <img 
                src={siteConfig.logo.url}
                alt={siteConfig.logo.alt}
                className="h-12 w-auto object-contain"
              />
              <div className="w-px h-10 bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Panel de Administración
                  </h1>
                  <p className="text-sm text-gray-600">{siteConfig.shortName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/courses")}
                className="hidden sm:flex border-gray-300"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Cursos
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-gray-300 text-red-600 hover:text-red-700 hover:bg-red-50"
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
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Estudiantes
              </CardTitle>
              <Users className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalStudents}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Usuarios registrados como estudiantes
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Profesores
              </CardTitle>
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalTeachers}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Profesores activos en la plataforma
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Cursos
              </CardTitle>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalCourses}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Cursos disponibles en la plataforma
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión del Sistema</h2>
          <p className="text-gray-600">Acceda a las diferentes funciones administrativas</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Registrar Profesor */}
          <Card className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => navigate("/teacher/register")}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-center text-lg text-gray-900">
                Registrar Profesor
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Crear una nueva cuenta de profesor en el sistema
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Ver Estudiantes */}
          <Card className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => navigate("/admin/students")}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-center text-lg text-gray-900">
                Ver Estudiantes
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Lista completa de estudiantes registrados
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Ver Profesores */}
          <Card className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => navigate("/admin/teachers")}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-center text-lg text-gray-900">
                Ver Profesores
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Gestionar cuentas de profesores
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Gestionar Cursos */}
          <Card className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => navigate("/admin/courses")}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-center text-lg text-gray-900">
                Gestionar Cursos
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Crear, editar y administrar cursos
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Reportes */}
          <Card className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => navigate("/admin/reports")}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-center text-lg text-gray-900">
                Reportes
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Ver estadísticas y reportes del sistema
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Configuración */}
          <Card className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => navigate("/admin/settings")}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-center text-lg text-gray-900">
                Configuración
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
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
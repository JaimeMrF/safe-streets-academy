import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Users, GraduationCap, TrendingUp, Award, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  education_level: string;
  created_at: string;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [teacherName, setTeacherName] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Verificar que sea profesor
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (userRole?.role !== "teacher") {
        toast.error("No tienes permisos de profesor");
        navigate("/courses");
        return;
      }

      // Obtener datos del profesor
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setTeacherName(`${profile.first_name} ${profile.last_name}`);
      }

      // Obtener TODOS los estudiantes (usuarios con rol student)
      const { data: studentRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "student");

      if (rolesError) {
        console.error("Error al obtener roles:", rolesError);
        toast.error("Error al cargar estudiantes");
        setLoading(false);
        return;
      }

      if (studentRoles && studentRoles.length > 0) {
        const studentIds = studentRoles.map(r => r.user_id);

        // Obtener perfiles de todos los estudiantes
        const { data: studentsData, error: studentsError } = await supabase
          .from("profiles")
          .select("*")
          .in("id", studentIds)
          .order("created_at", { ascending: false });

        if (studentsError) {
          console.error("Error al cargar estudiantes:", studentsError);
          toast.error("Error al cargar estudiantes");
        } else {
          console.log(`✅ Estudiantes cargados: ${studentsData?.length || 0}`, studentsData);
          setStudents(studentsData || []);
          setFilteredStudents(studentsData || []);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Filtrar estudiantes por búsqueda y nivel
  useEffect(() => {
    let filtered = students;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(student =>
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por nivel educativo
    if (levelFilter !== "all") {
      filtered = filtered.filter(student => student.education_level === levelFilter);
    }

    setFilteredStudents(filtered);
  }, [searchTerm, levelFilter, students]);

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

  const getEducationLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      preescolar: "#EF4444",
      primaria: "#3B82F6",
      secundaria: "#10B981",
      bachillerato: "#8B5CF6",
    };
    return colors[level] || "#64748B";
  };

  const getStudentsByLevel = (level: string) => {
    return students.filter(s => s.education_level === level).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-secondary rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold mb-2">Cargando estudiantes...</p>
          <p className="text-sm text-muted-foreground">Espera un momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 relative overflow-hidden">

      <div className="relative p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div className="space-y-2 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-medium mb-2">
                  <GraduationCap className="w-3 h-3" />
                  <span>Panel de Profesor</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
                  Bienvenido, {teacherName.split(' ')[0]}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Gestiona y supervisa el progreso de tus estudiantes
                </p>
              </div>

              <div className="flex gap-3 w-full lg:w-auto">
                <Button 
                  onClick={() => navigate("/teacher/courses")}
                  className="flex-1 lg:flex-none"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Gestionar Cursos
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="flex-1 lg:flex-none"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Salir
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              <Card className="hover:shadow-lg transition-all overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary rounded-lg">
                      <Users className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{students.length}</p>
                      <p className="text-sm text-muted-foreground">Total Estudiantes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🚦</span>
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-800">{getStudentsByLevel("preescolar")}</p>
                      <p className="text-sm font-medium text-slate-600">Preescolar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🚸</span>
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-800">{getStudentsByLevel("primaria")}</p>
                      <p className="text-sm font-medium text-slate-600">Primaria</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🚴</span>
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold text-slate-800">{getStudentsByLevel("secundaria") + getStudentsByLevel("bachillerato")}</p>
                      <p className="text-sm font-medium text-slate-600">Secundaria+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 border-2 border-slate-200 focus:border-purple-500 rounded-xl bg-white"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-64 h-12 border-2 border-slate-200 focus:border-purple-500 rounded-xl bg-white">
                <Filter className="w-5 h-5 mr-2" />
                <SelectValue placeholder="Filtrar por nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="preescolar">🚦 Preescolar</SelectItem>
                <SelectItem value="primaria">🚸 Primaria</SelectItem>
                <SelectItem value="secundaria">🚴 Secundaria</SelectItem>
                <SelectItem value="bachillerato">🚗 Bachillerato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students List */}
          {filteredStudents.length > 0 ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Mis Estudiantes</h2>
                <span className="text-sm text-slate-500 ml-2">({filteredStudents.length} encontrados)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student, index) => (
                  <Card
                    key={student.id}
                    className="group border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden animate-slide-up"
                    onClick={() => navigate(`/teacher/student/${student.id}`)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className="h-2 w-full"
                      style={{ background: getEducationLevelColor(student.education_level) }}
                    />
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                          {getEducationLevelEmoji(student.education_level)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1 group-hover:text-purple-600 transition-colors">
                            {student.first_name} {student.last_name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {student.email}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ background: getEducationLevelColor(student.education_level) }}
                        >
                          {getEducationLevelLabel(student.education_level)}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          Ver Progreso →
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
                  <Users className="w-14 h-14 text-slate-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  No se encontraron estudiantes
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                  {searchTerm || levelFilter !== "all"
                    ? "Intenta con otros filtros de búsqueda"
                    : "Aún no tienes estudiantes registrados en la plataforma"}
                </p>
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

export default TeacherDashboard;
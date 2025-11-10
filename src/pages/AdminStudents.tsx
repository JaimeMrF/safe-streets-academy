// src/pages/AdminStudents.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, UserCircle, Mail, Calendar, GraduationCap, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  education_level: string;
  created_at: string;
}

const AdminStudents = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkAdminAccess();
    loadStudents();
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
  };

  const loadStudents = async () => {
    try {
      const { data: studentRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("user_role", "student");

      if (!studentRoles || studentRoles.length === 0) {
        setStudents([]);
        setLoading(false);
        return;
      }

      const userIds = studentRoles.map(sr => sr.user_id);

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStudents(profiles || []);
    } catch (error) {
      console.error("Error loading students:", error);
      toast.error("Error al cargar estudiantes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm("⚠️ ¿Estás seguro de eliminar este estudiante?\n\nEsta acción eliminará:\n- El perfil del estudiante\n- Todo su progreso en cursos\n- Su rol de usuario\n\nEsta acción NO se puede deshacer.")) return;

    try {
      // 1. Eliminar progreso del estudiante
      const { error: progressError } = await supabase
        .from("student_progress")
        .delete()
        .eq("student_id", studentId);

      if (progressError) {
        console.error("Error eliminando progreso:", progressError);
      }

      // 2. Eliminar rol del usuario
      const { error: roleError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", studentId);

      if (roleError) {
        console.error("Error eliminando rol:", roleError);
      }

      // 3. Eliminar perfil del estudiante
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", studentId);

      if (profileError) throw profileError;

      toast.success("✅ Estudiante eliminado completamente del sistema");
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("❌ Error al eliminar estudiante. Verifica los permisos.");
    }
  };

  const filteredStudents = students.filter(student =>
    student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEducationLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      preescolar: "bg-pink-100 text-pink-800",
      primaria: "bg-blue-100 text-blue-800",
      secundaria: "bg-purple-100 text-purple-800",
      bachillerato: "bg-green-100 text-green-800"
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Cargando estudiantes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Dashboard
        </Button>

        <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                    Gestión de Estudiantes
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    Total: {students.length} estudiantes
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </CardHeader>

          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <UserCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">No se encontraron estudiantes</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Nivel</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {student.first_name?.[0]}{student.last_name?.[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {student.first_name} {student.last_name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            {student.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getEducationLevelBadge(student.education_level)}>
                            <GraduationCap className="w-3 h-3 mr-1" />
                            {student.education_level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(student.created_at).toLocaleDateString("es-ES")}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStudents;
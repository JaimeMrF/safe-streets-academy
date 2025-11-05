// src/pages/AdminTeachers.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, GraduationCap, Mail, Calendar, UserPlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Teacher {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

const AdminTeachers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkAdminAccess();
    loadTeachers();
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

  const loadTeachers = async () => {
    try {
      const { data: teacherRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "teacher");

      if (!teacherRoles || teacherRoles.length === 0) {
        setTeachers([]);
        setLoading(false);
        return;
      }

      const userIds = teacherRoles.map(tr => tr.user_id);

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTeachers(profiles || []);
    } catch (error) {
      console.error("Error loading teachers:", error);
      toast.error("Error al cargar profesores");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (!confirm("⚠️ ¿Estás seguro de eliminar este profesor?\n\nEsta acción eliminará:\n- El perfil del profesor\n- Su rol de usuario\n\nEsta acción NO se puede deshacer.")) return;

    try {
      // 1. Eliminar rol del usuario
      const { error: roleError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", teacherId);

      if (roleError) {
        console.error("Error eliminando rol:", roleError);
      }

      // 2. Eliminar perfil del profesor
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", teacherId);

      if (profileError) throw profileError;

      toast.success("✅ Profesor eliminado completamente del sistema");
      loadTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("❌ Error al eliminar profesor. Verifica los permisos.");
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Cargando profesores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
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
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Gestión de Profesores
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    Total: {teachers.length} profesores
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/teacher/register")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Nuevo Profesor
              </Button>
            </div>

            <div className="mt-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 border-2 border-slate-200 focus:border-purple-500 rounded-xl"
              />
            </div>
          </CardHeader>

          <CardContent>
            {filteredTeachers.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg mb-4">No hay profesores registrados</p>
                <Button
                  onClick={() => navigate("/teacher/register")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrar Primer Profesor
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profesor</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {teacher.first_name?.[0]}{teacher.last_name?.[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {teacher.first_name} {teacher.last_name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            {teacher.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Activo
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(teacher.created_at).toLocaleDateString("es-ES")}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTeacher(teacher.id)}
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

export default AdminTeachers;
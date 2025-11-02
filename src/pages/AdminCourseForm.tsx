import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface CourseFormData {
  name: string;
  description: string;
  education_level: "preescolar" | "primaria" | "secundaria" | "bachillerato";
  icon: string;
  color: string;
}

const AdminCourseForm = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    name: "",
    description: "",
    education_level: "preescolar",
    icon: "📚",
    color: "#4F46E5"
  });

  useEffect(() => {
    checkAdminAccess();
    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

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

  const loadCourse = async () => {
    if (!courseId) return;

    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          description: data.description,
          education_level: data.education_level,
          icon: data.icon || "📚",
          color: data.color || "#4F46E5"
        });
      }
    } catch (error) {
      console.error("Error loading course:", error);
      toast.error("Error al cargar el curso");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (courseId) {
        const { error } = await supabase
          .from("courses")
          .update(formData)
          .eq("id", courseId);

        if (error) throw error;
        toast.success("Curso actualizado exitosamente");
      } else {
        const { error } = await supabase
          .from("courses")
          .insert([formData]);

        if (error) throw error;
        toast.success("Curso creado exitosamente");
      }

      navigate("/admin/courses");
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Error al guardar el curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/courses")}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Cursos
        </Button>

        <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
                {courseId ? "Editar Curso" : "Crear Nuevo Curso"}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Curso</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Señales de Tránsito"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe el contenido del curso..."
                  required
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education_level">Nivel Educativo</Label>
                <Select
                  value={formData.education_level}
                  onValueChange={(value) => setFormData({ ...formData, education_level: value as "preescolar" | "primaria" | "secundaria" | "bachillerato" })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preescolar">Preescolar</SelectItem>
                    <SelectItem value="primaria">Primaria</SelectItem>
                    <SelectItem value="secundaria">Secundaria</SelectItem>
                    <SelectItem value="bachillerato">Bachillerato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icono (Emoji)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="📚"
                    className="h-12 text-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Guardando..." : "Guardar Curso"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/courses")}
                  className="h-12"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCourseForm;

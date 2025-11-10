import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

interface RouteFormData {
  name: string;
  description: string;
  course_id: string;
  game_type: string;
  level_order: number;
  video_url?: string;
  model_3d_url?: string;
  is_certification_level: boolean;
  game_config?: Record<string, any>;
}

const AdminRouteForm = () => {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Array<{ id: string; name: string }>>([]);
  const [formData, setFormData] = useState<RouteFormData>({
    name: "",
    description: "",
    course_id: "",
    game_type: "memory",
    level_order: 1,
    is_certification_level: false,
    game_config: { difficulty: "medium", theme: "traffic-lights" }
  });

  useEffect(() => {
    checkAdminAccess();
    loadCourses();
    if (routeId) {
      loadRoute();
    }
  }, [routeId]);

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

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error loading courses:", error);
      toast.error("Error al cargar cursos");
    }
  };

  const loadRoute = async () => {
    if (!routeId) return;

    try {
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("id", routeId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          description: data.description || "",
          course_id: data.course_id,
          game_type: data.game_type,
          level_order: data.level_order,
          video_url: data.video_url || "",
          model_3d_url: data.model_3d_url || "",
          is_certification_level: data.is_certification_level || false,
          game_config: (data.game_config as Record<string, any>) || { difficulty: "medium", theme: "traffic-lights" }
        });
      }
    } catch (error) {
      console.error("Error loading route:", error);
      toast.error("Error al cargar la ruta");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        video_url: formData.video_url || null,
        model_3d_url: formData.model_3d_url || null
      };

      if (routeId) {
        const { error } = await supabase
          .from("routes")
          .update(dataToSave)
          .eq("id", routeId);

        if (error) throw error;
        toast.success("Nivel actualizado exitosamente");
      } else {
        const { error } = await supabase
          .from("routes")
          .insert([dataToSave]);

        if (error) throw error;
        toast.success("Nivel creado exitosamente");
      }

      navigate("/admin/courses");
    } catch (error) {
      console.error("Error saving route:", error);
      toast.error("Error al guardar el nivel");
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
          Volver
        </Button>

        <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                {routeId ? "Editar Nivel" : "Crear Nuevo Nivel"}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Nivel</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Señales Básicas - Nivel 1"
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
                  placeholder="Describe el nivel..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course_id">Curso</Label>
                  <Select
                    value={formData.course_id}
                    onValueChange={(value) => setFormData({ ...formData, course_id: value })}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecciona un curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level_order">Orden del Nivel</Label>
                  <Input
                    id="level_order"
                    type="number"
                    min="1"
                    value={formData.level_order}
                    onChange={(e) => setFormData({ ...formData, level_order: parseInt(e.target.value) })}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="game_type">Tipo de Juego</Label>
                <Select
                  value={formData.game_type}
                  onValueChange={(value) => setFormData({ ...formData, game_type: value })}
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="memory">Memoria</SelectItem>
                    <SelectItem value="memoria4x4">Memoria 4x4</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="3d-model">Modelo 3D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.game_type === "video" && (
                <div className="space-y-2">
                  <Label htmlFor="video_url">URL del Video</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="h-12"
                  />
                </div>
              )}

              {formData.game_type === "3d-model" && (
                <div className="space-y-2">
                  <Label htmlFor="model_3d_url">URL del Modelo 3D</Label>
                  <Input
                    id="model_3d_url"
                    value={formData.model_3d_url}
                    onChange={(e) => setFormData({ ...formData, model_3d_url: e.target.value })}
                    placeholder="URL del archivo .glb o .gltf"
                    className="h-12"
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="certification">Nivel de Certificación</Label>
                  <p className="text-sm text-slate-500">
                    Marca si este es el nivel final para obtener certificado
                  </p>
                </div>
                <Switch
                  id="certification"
                  checked={formData.is_certification_level}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, is_certification_level: checked })
                  }
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Guardando..." : "Guardar Nivel"}
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

export default AdminRouteForm;

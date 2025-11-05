import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Video, Box, BookOpen, Play } from "lucide-react";
import { toast } from "sonner";

interface Resource {
  id: string;
  name: string;
  description: string;
  game_type: string;
  video_url?: string;
  model_3d_url?: string;
  course_name: string;
  education_level: string;
}

const ResourceLibrary = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);
    loadResources(user.id);
  };

  const loadResources = async (userId: string) => {
    try {
      // Get user profile to filter by education level
      const { data: profile } = await supabase
        .from("profiles")
        .select("education_level")
        .eq("id", userId)
        .single();

      if (!profile) return;

      // Get all routes with videos or 3D models
      const { data: routesData, error } = await supabase
        .from("routes")
        .select(`
          id,
          name,
          description,
          game_type,
          video_url,
          model_3d_url,
          courses (
            name,
            education_level
          )
        `)
        .eq("courses.education_level", profile.education_level)
        .in("game_type", ["video", "3d-model"]);

      if (error) throw error;

      const formattedResources = routesData?.map(route => ({
        id: route.id,
        name: route.name,
        description: route.description || "",
        game_type: route.game_type,
        video_url: route.video_url,
        model_3d_url: route.model_3d_url,
        course_name: (route.courses as any)?.name || "",
        education_level: (route.courses as any)?.education_level || "",
      })) || [];

      setResources(formattedResources);
    } catch (error: any) {
      toast.error("Error al cargar recursos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const videoResources = resources.filter(r => r.game_type === "video");
  const model3DResources = resources.filter(r => r.game_type === "3d-model");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate("/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Cursos
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground flex items-center gap-3">
            <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Biblioteca de Recursos
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Explora videos educativos y modelos 3D interactivos
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Cargando recursos...</div>
          </div>
        ) : (
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos ({videoResources.length})
              </TabsTrigger>
              <TabsTrigger value="3d-models" className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                Modelos 3D ({model3DResources.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {videoResources.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No hay videos disponibles en este momento
                  </div>
                ) : (
                  videoResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Video className="h-8 w-8 text-accent" />
                          <Badge variant="secondary">{resource.course_name}</Badge>
                        </div>
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="w-full"
                          onClick={() => navigate(`/game/video/${resource.id}`)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Ver Video
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="3d-models">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {model3DResources.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No hay modelos 3D disponibles en este momento
                  </div>
                ) : (
                  model3DResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Box className="h-8 w-8 text-primary" />
                          <Badge variant="secondary">{resource.course_name}</Badge>
                        </div>
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="w-full"
                          onClick={() => navigate(`/game/3d-model/${resource.id}`)}
                        >
                          <Box className="mr-2 h-4 w-4" />
                          Explorar Modelo
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;

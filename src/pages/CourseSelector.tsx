import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  name: string;
  description: string;
  education_level: string;
  icon: string;
  color: string;
}

const CourseSelector = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userLevel, setUserLevel] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserName(`${profile.first_name} ${profile.last_name}`);
        setUserLevel(profile.education_level);
        
        const { data: coursesData } = await supabase
          .from("courses")
          .select("*")
          .eq("education_level", profile.education_level);

        if (coursesData) {
          setCourses(coursesData);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Cargando cursos...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Bienvenido, {userName}</h1>
            <p className="text-muted-foreground">
              Nivel: {getEducationLevelLabel(userLevel)}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer border-border bg-card"
              onClick={() => navigate(`/student/course/${course.id}`)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{course.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{course.name}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" style={{ background: course.color }}>
                  Comenzar Curso
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center text-muted-foreground mt-12">
            No hay cursos disponibles para tu nivel educativo.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSelector;
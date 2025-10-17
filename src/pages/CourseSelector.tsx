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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">¡Hola, {userName.split(' ')[0]}! 👋</h1>
            <p className="text-muted-foreground">
              Nivel: {getEducationLevelLabel(userLevel)}
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate("/resources")}
              className="flex-1 md:flex-none"
            >
              📚 Recursos
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex-1 md:flex-none"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              onClick={() => navigate(`/student/course/${course.id}`)}
              style={{ borderLeft: `4px solid ${course.color}` }}
            >
              <CardHeader>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="text-4xl md:text-5xl">{course.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl mb-2">{course.name}</CardTitle>
                    <CardDescription className="text-sm">{course.description}</CardDescription>
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
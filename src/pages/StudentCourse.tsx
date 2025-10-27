import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle, Lock } from "lucide-react";
import { toast } from "sonner";

interface Route {
  id: string;
  name: string;
  description: string;
  level_order: number;
  game_type: string;
  is_certification_level: boolean;
}

interface StudentProgress {
  route_id: string;
  completed: boolean;
  score: number;
  best_accuracy_percentage: number;
}

const StudentCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
      loadCourseData(user.id);
    };

    checkAuth();
  }, [courseId]);

  const loadCourseData = async (userId: string) => {
    // Load course info
    const { data: course } = await supabase
      .from("courses")
      .select("name")
      .eq("id", courseId)
      .single();

    if (course) {
      setCourseName(course.name);
    }

    // Load routes
    const { data: routesData } = await supabase
      .from("routes")
      .select("*")
      .eq("course_id", courseId)
      .order("level_order");

    if (routesData) {
      setRoutes(routesData);
    }

    // Load progress
    const { data: progressData } = await supabase
      .from("student_progress")
      .select("route_id, completed, score, best_accuracy_percentage")
      .eq("student_id", userId)
      .in("route_id", routesData?.map(r => r.id) || []);

    if (progressData) {
      setProgress(progressData);
    }

    setLoading(false);
  };

  const getProgressForRoute = (routeId: string) => {
    return progress.find(p => p.route_id === routeId);
  };

  const isRouteLocked = (levelOrder: number) => {
    if (levelOrder === 1) return false;
    const previousRoute = routes.find(r => r.level_order === levelOrder - 1);
    if (!previousRoute) return false;
    const previousProgress = getProgressForRoute(previousRoute.id);
    return !previousProgress?.completed;
  };

  const calculateOverallProgress = () => {
    if (routes.length === 0) return 0;
    const completed = progress.filter(p => p.completed).length;
    return (completed / routes.length) * 100;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Cargando...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/courses")} className="mb-4 md:mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Cursos
        </Button>

        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">{courseName}</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Progress value={calculateOverallProgress()} className="flex-1 w-full" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {Math.round(calculateOverallProgress())}% Completado
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6">
          {routes.map((route) => {
            const routeProgress = getProgressForRoute(route.id);
            const locked = isRouteLocked(route.level_order);

            return (
              <Card key={route.id} className={`${locked ? "opacity-60" : ""} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-start justify-between gap-3">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <CardTitle className="text-xl md:text-2xl">{route.name}</CardTitle>
                        {routeProgress?.completed && (
                          <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        )}
                        {locked && <Lock className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />}
                        {route.is_certification_level && (
                          <Badge variant="secondary" className="text-xs">Certificación</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">{route.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                      Nivel {route.level_order}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3 md:gap-4 text-sm w-full md:w-auto">
                      {routeProgress && (
                        <>
                          <div>
                            <span className="text-muted-foreground">Puntuación: </span>
                            <span className="font-semibold">{routeProgress.score}/100</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Mejor precisión: </span>
                            <span className="font-semibold">{routeProgress.best_accuracy_percentage}%</span>
                          </div>
                        </>
                      )}
                    </div>
                    <Link to={locked ? '#' : `/game/${route.game_type}/${route.id}`} className="w-full md:w-auto">
                      <Button disabled={locked} className="w-full md:w-auto">
                        <Play className="mr-2 h-4 w-4" />
                        {routeProgress?.completed ? "Jugar de Nuevo" : "Comenzar"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentCourse;
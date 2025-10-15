import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BookOpen, Plus, ArrowLeft, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import viaSafeLogo from "@/assets/viasafe-logo.png";
import cursosData from "@/db/cursos.json";

interface CourseFormData {
  nombre: string;
  description: string;
  salary_potential: string;
}

const CreateCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    nombre: "",
    description: "",
    salary_potential: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "teacher") {
      navigate("/courses");
      return;
    }
    setUser(parsedUser);
  }, [navigate]);

  const handleLogoClick = () => navigate("/courses");
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleInputChange = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.nombre.trim() || !formData.description.trim() || !formData.salary_potential.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to a database
    // For now, we'll just show a success message
    toast({
      title: "¡Curso creado!",
      description: `El curso "${formData.nombre}" ha sido creado exitosamente.`,
    });

    // Reset form
    setFormData({
      nombre: "",
      description: "",
      salary_potential: "",
    });

    // Navigate back to courses
    setTimeout(() => {
      navigate("/courses");
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="floating-orb absolute top-20 left-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="floating-orb-delayed absolute bottom-20 right-10 w-80 h-80 bg-purple-300/25 rounded-full blur-3xl"></div>
        <div className="floating-orb-slow absolute top-1/2 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b-4 border-gradient">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src={viaSafeLogo}
            alt="ViaSafe Educación"
            className="h-8 sm:h-10 md:h-12 cursor-pointer hover:scale-110 transition-all duration-300 drop-shadow-lg"
            onClick={handleLogoClick}
          />
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-sm font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Docente: {user.nombre}
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="hover:scale-105 transition-transform border-2 hover:border-red-400"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl relative">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={() => navigate("/courses")}
          className="mb-6 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Cursos
        </Button>

        {/* Page Title */}
        <div className="mb-8 slide-up">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border-2 border-blue-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg pulse-animation">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Crear Nuevo Curso
                </h1>
                <p className="text-sm text-gray-600 font-medium mt-1">Diseña un curso personalizado para tus estudiantes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-2 border-blue-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-sm slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              Información del Curso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Name */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-base font-semibold text-gray-700">
                  Nombre del Curso *
                </Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Contabilidad & Finanzas Básicas"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-white/90 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Course Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold text-gray-700">
                  Descripción *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe los objetivos y contenidos del curso"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-32 text-base border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-white/90 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Salary Potential / Job Opportunities */}
              <div className="space-y-2">
                <Label htmlFor="salary_potential" className="text-base font-semibold text-gray-700">
                  Oportunidades Laborales *
                </Label>
                <Textarea
                  id="salary_potential"
                  placeholder="Ej: Auxiliar contable, Asistente administrativo, Digitador financiero"
                  value={formData.salary_potential}
                  onChange={(e) => handleInputChange("salary_potential", e.target.value)}
                  className="min-h-24 text-base border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-white/90 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Crear Curso
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/courses")}
                  className="h-14 px-8 text-lg border-2 hover:border-gray-400"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-2 border-purple-200/50 shadow-xl bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Consejos para crear un buen curso:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Usa un nombre descriptivo y motivador</li>
                  <li>• Describe claramente qué aprenderán los estudiantes</li>
                  <li>• Menciona las oportunidades laborales específicas</li>
                  <li>• Considera las habilidades necesarias para cada perfil</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <style>{`
        .floating-orb {
          animation: float-orb 20s ease-in-out infinite;
        }
        
        .floating-orb-delayed {
          animation: float-orb 25s ease-in-out infinite;
          animation-delay: 5s;
        }
        
        .floating-orb-slow {
          animation: float-orb 30s ease-in-out infinite;
          animation-delay: 10s;
        }
        
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .pulse-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .border-gradient {
          border-image: linear-gradient(to right, hsl(217 100% 57%), hsl(163 100% 45%)) 1;
        }
      `}</style>
    </div>
  );
};

export default CreateCourse;

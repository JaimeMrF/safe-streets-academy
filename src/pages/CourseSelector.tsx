import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, TrendingUp, Users, LogOut, Sparkles, Plus } from "lucide-react";
import viaSafeLogo from "@/assets/viasafe-logo.png";
import cursosData from "@/db/cursos.json";
import { BookOpen as IconBook, Sparkles as IconSparkles, Banknote as IconBanknote, Users as IconUsers, Brain as IconBrain } from "lucide-react";

interface Course {
  id: number;
  nombre: string;
  description: string;
  salary_potential: string;
  num_enrolled: number;
}

const CourseSelector = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses] = useState<Course[]>(cursosData);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const filteredCourses = courses.filter((course) =>
    course.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseSelect = (courseId: number) => {
    if (user?.role === "teacher") {
      navigate(`/teacher/course/${courseId}`);
    } else {
      navigate(`/student/course/${courseId}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  // Colores vibrantes para cada curso
  const courseColors = [
    { bg: "from-blue-400 to-blue-600", icon: "from-blue-500 to-blue-700", hover: "hover:from-blue-500 hover:to-blue-700" },
    { bg: "from-purple-400 to-purple-600", icon: "from-purple-500 to-purple-700", hover: "hover:from-purple-500 hover:to-purple-700" },
    { bg: "from-green-400 to-green-600", icon: "from-green-500 to-green-700", hover: "hover:from-green-500 hover:to-green-700" },
    { bg: "from-orange-400 to-orange-600", icon: "from-orange-500 to-orange-700", hover: "hover:from-orange-500 hover:to-orange-700" },
    { bg: "from-pink-400 to-pink-600", icon: "from-pink-500 to-pink-700", hover: "hover:from-pink-500 hover:to-pink-700" },
    { bg: "from-cyan-400 to-cyan-600", icon: "from-cyan-500 to-cyan-700", hover: "hover:from-cyan-500 hover:to-cyan-700" }
  ];

  // Helper para devolver un icono por curso (fallback a BookOpen)
  function getCourseIcon(courseId: number, className = "w-6 h-6") {
    switch (courseId) {
      case 1:
        return <IconBanknote className={className} />;
      case 2:
        return <IconBrain className={className} />;
      case 3:
        return <IconSparkles className={className} />;
      default:
        return <IconBook className={className} />;
    }
  }

  if (user.role === "student") {
    // 🎨 INTERFAZ SIMPLIFICADA PARA ESTUDIANTES - CON ESTILO MEJORADO
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
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <img
              src={viaSafeLogo}
              alt="ViaSafe Educación"
              className="h-8 sm:h-10 md:h-12 cursor-pointer hover:scale-110 transition-all duration-300 drop-shadow-lg"
              onClick={handleLogoClick}
            />
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  ¡Hola, {user.nombre}!
                </span>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-2 border-red-300 text-red-600 hover:bg-red-50 h-12 px-6 hover:scale-105 transition-transform"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="container mx-auto px-6 py-12 relative">
          {/* Título Grande y Claro */}
          <div className="text-center mb-16 slide-up">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl mb-8 border-2 border-blue-200/50 hover:shadow-3xl hover:scale-105 transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4 pulse-animation">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                Elige tu Curso
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                Haz clic en el curso que quieres aprender
              </p>
            </div>
          </div>

          {/* Tarjetas de Cursos */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredCourses.map((course, index) => {
              const colors = courseColors[index % courseColors.length];
              return (
                <button
                  key={course.id}
                  onClick={() => handleCourseSelect(course.id)}
                  className={`group relative bg-gradient-to-br ${colors.bg} ${colors.hover} rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 slide-up`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative text-center space-y-6">
                    {/* Ícono Grande */}
                    <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${colors.icon} rounded-3xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                      {getCourseIcon(course.id, "w-16 h-16 text-white")}
                    </div>
                    
                    {/* Nombre del Curso */}
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight px-4">
                      {course.nombre}
                    </h3>
                    
                    {/* Botón de Acción */}
                    <div className="pt-4">
                      <div className="bg-white text-gray-900 font-bold text-xl px-8 py-4 rounded-2xl inline-flex items-center gap-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <span>Empezar</span>
                        <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </div>
                    </div>

                    {/* Número de estudiantes */}
                    <div className="flex items-center justify-center gap-2 text-white/90 pt-2">
                      <Users className="w-6 h-6" />
                      <span className="text-lg font-semibold">{course.num_enrolled} estudiantes</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mensaje motivacional */}
          <div className="text-center mt-16 slide-up" style={{ animationDelay: `${filteredCourses.length * 0.15}s` }}>
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border-2 border-yellow-200/50 hover:scale-105 transition-all duration-300">
              <p className="text-2xl text-gray-700 font-bold">
                🌟 ¡Tú puedes lograrlo! 🌟
              </p>
            </div>
          </div>
        </main>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-25px) translateX(15px); }
          }

          @keyframes floatDelayed {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-35px) translateX(-20px); }
          }

          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(30px) scale(1.15); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .slide-up {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }

          .floating-orb {
            animation: float 7s ease-in-out infinite;
          }

          .floating-orb-delayed {
            animation: floatDelayed 9s ease-in-out infinite;
          }

          .floating-orb-slow {
            animation: floatSlow 11s ease-in-out infinite;
          }

          .pulse-animation {
            animation: pulse 2s ease-in-out infinite;
          }

          .border-gradient {
            border-image: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6) 1;
          }
        `}</style>
      </div>
    );
  }

  // 📊 INTERFAZ DETALLADA PARA PROFESORES - CON ESTILO MEJORADO
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8 relative">
        {/* Título */}
        <div className="text-center slide-up">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border-2 border-blue-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
            <div className="flex items-center gap-4 justify-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg pulse-animation">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Selecciona tu Curso
                </h1>
                <p className="text-sm text-gray-600 font-medium mt-1">
                  Explora nuestros cursos y gestiona el progreso de tus estudiantes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar and Create Button */}
        <div className="max-w-5xl mx-auto slide-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.1s' }}>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Buscar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-white/90 backdrop-blur-sm"
            />
          </div>
          <Button 
            onClick={() => navigate("/teacher/create-course")}
            className="h-14 px-8 text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Crear Curso
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl border-2 border-blue-200/50 hover:border-blue-400 transition-all duration-500 hover:scale-105 slide-up flex flex-col"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <div className="flex-1">
                {/* Ícono y título */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                    {getCourseIcon(course.id, "w-6 h-6 text-white")}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{course.nombre}</h3>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>
                
                <div className="space-y-3 mb-6">
                  {/* Potencial laboral */}
                  <div className="flex items-start gap-2 text-sm bg-green-50/80 rounded-lg p-3 border border-green-200/50">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1 font-semibold">Potencial Laboral:</p>
                      <p className="text-sm text-gray-700 leading-snug font-medium">{course.salary_potential}</p>
                    </div>
                  </div>

                  {/* Estudiantes inscritos */}
                  <div className="flex items-center gap-2 text-sm bg-blue-50/80 rounded-lg p-3 border border-blue-200/50">
                    <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">
                      <span className="font-bold text-blue-600">{course.num_enrolled}</span> estudiantes inscritos
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleCourseSelect(course.id)}
                className="w-full mt-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ver Dashboard
              </Button>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(15px); }
        }

        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-35px) translateX(-20px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(30px) scale(1.15); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .slide-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .floating-orb {
          animation: float 7s ease-in-out infinite;
        }

        .floating-orb-delayed {
          animation: floatDelayed 9s ease-in-out infinite;
        }

        .floating-orb-slow {
          animation: floatSlow 11s ease-in-out infinite;
        }

        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }

        .border-gradient {
          border-image: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6) 1;
        }
      `}</style>
    </div>
  );
};

export default CourseSelector;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Brain, Trophy, Users, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { 
      icon: Brain, 
      title: "Aprendizaje Interactivo", 
      desc: "Juegos y actividades diseñadas pedagógicamente",
      color: "from-blue-500 to-cyan-500",
      delay: "0"
    },
    { 
      icon: Trophy, 
      title: "Sistema de Logros", 
      desc: "Gana puntos y certificaciones",
      color: "from-amber-500 to-orange-500",
      delay: "100"
    },
    { 
      icon: ShieldCheck, 
      title: "Contenido Profesional", 
      desc: "Desarrollado por expertos",
      color: "from-emerald-500 to-teal-500",
      delay: "200"
    },
    { 
      icon: Users, 
      title: "Todas las Edades", 
      desc: "Desde preescolar hasta bachillerato",
      color: "from-purple-500 to-pink-500",
      delay: "300"
    }
  ];

  const levels = [
    { level: "Preescolar", age: "3-5 años", icon: "🚦", color: "from-red-400 to-pink-400", bg: "bg-red-50" },
    { level: "Primaria", age: "6-11 años", icon: "🚸", color: "from-yellow-400 to-orange-400", bg: "bg-yellow-50" },
    { level: "Secundaria", age: "12-14 años", icon: "🚴", color: "from-blue-400 to-cyan-400", bg: "bg-blue-50" },
    { level: "Bachillerato", age: "15-18 años", icon: "🚗", color: "from-purple-400 to-indigo-400", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="h-28 w-28 relative z-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                VS
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-900 mb-6 animate-slide-down">
              <Sparkles className="w-4 h-4" />
              <span>Plataforma en educación vial</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-slide-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                ViaSafe Educación
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mb-10 leading-relaxed animate-slide-up animation-delay-200">
              Aprende seguridad vial de forma <span className="font-bold text-blue-600">divertida</span> e <span className="font-bold text-purple-600">interactiva</span>. 
              Juegos, videos y experiencias 3D adaptadas a tu nivel educativo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
              <Button onClick={() => window.location.href = '/auth'} size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                Comenzar Ahora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

            </div>
          </div>

          <div className="max-w-5xl mx-auto relative animate-fade-in animation-delay-600">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />

          </div>
        </div>
      </div>


        


      {/* Levels */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Niveles Educativos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Contenido personalizado para cada etapa del aprendizaje
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {levels.map((item, idx) => (
              <Card 
                key={item.level}
                className="group bg-white border-2 border-slate-200 hover:border-transparent hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`h-32 ${item.bg} flex items-center justify-center text-7xl relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <span className="relative z-10 transform group-hover:rotate-12 transition-transform duration-500">
                    {item.icon}
                  </span>
                </div>
                <CardContent className="pt-6 pb-8 text-center">
                  <h3 className="font-bold text-2xl mb-2 text-slate-800 group-hover:text-slate-900">
                    {item.level}
                  </h3>
                  <p className="text-slate-600 font-medium">{item.age}</p>
                  <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${item.color} rounded-full mx-auto transition-all duration-500`} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            ¿Listo para empezar tu aventura?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Únete a miles de estudiantes que ya están aprendiendo de forma divertida
          </p>
          <Button onClick={() => window.location.href = '/auth'} size="lg" className="text-lg px-12 py-6 bg-white text-purple-600 hover:bg-slate-100 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 font-bold">
            Crear Cuenta Gratis
          </Button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
};

export default Index;


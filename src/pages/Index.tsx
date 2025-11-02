import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Brain, Trophy, Users, Sparkles, ArrowRight, Play, BookOpen, Gamepad2, Youtube, FileText, Download, Star, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);

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

  const videos = [
    {
      title: "Semáforos y Señales Básicas",
      duration: "5:30",
      level: "Preescolar",
      thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
      views: "12.5K",
      description: "Aprende los colores del semáforo de forma divertida"
    },
    {
      title: "Cómo Cruzar la Calle Seguro",
      duration: "7:15",
      level: "Primaria",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      views: "8.3K",
      description: "Pasos para cruzar de manera segura"
    },
    {
      title: "Ciclismo Urbano Seguro",
      duration: "10:45",
      level: "Secundaria",
      thumbnail: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
      views: "15.2K",
      description: "Reglas y equipamiento para ciclistas"
    },
    {
      title: "Preparación para la Licencia",
      duration: "12:20",
      level: "Bachillerato",
      thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
      views: "20.1K",
      description: "Todo sobre el examen de conducción"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Guía de Señales de Tránsito",
      type: "PDF",
      size: "2.5 MB",
      downloads: "3.2K",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "Manual del Peatón",
      type: "PDF",
      size: "1.8 MB",
      downloads: "2.8K",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Download,
      title: "Actividades Imprimibles",
      type: "ZIP",
      size: "5.4 MB",
      downloads: "4.5K",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Gamepad2,
      title: "Juegos Educativos",
      type: "WEB",
      size: "Online",
      downloads: "10K+",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Profesora de Primaria",
      avatar: "👩‍🏫",
      text: "Mis estudiantes están mucho más conscientes de la seguridad vial. ¡Los juegos interactivos son geniales!",
      rating: 5
    },
    {
      name: "Carlos Ramírez",
      role: "Padre de Familia",
      avatar: "👨",
      text: "Mi hijo aprendió más en una semana con ViaSafe que en todo el año escolar. Muy recomendado.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Estudiante de Secundaria",
      avatar: "👧",
      text: "¡Es súper divertido! No parece que estés estudiando, pero aprendes muchísimo sobre seguridad.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Estudiantes Activos", icon: Users },
    { number: "200+", label: "Lecciones Interactivas", icon: BookOpen },
    { number: "98%", label: "Tasa de Satisfacción", icon: Star },
    { number: "15+", label: "Premios Educativos", icon: Trophy }
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
              <span>Plataforma #1 en educación vial</span>
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
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              ¿Por qué ViaSafe?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Una plataforma completa diseñada para hacer el aprendizaje memorable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="group bg-white border-2 border-slate-200 hover:border-transparent hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <CardContent className="pt-8 pb-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="relative py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
              <Youtube className="w-4 h-4 mr-2" />
              Contenido en Video
            </Badge>
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Videos Educativos
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Aprende viendo contenido profesional y entretenido
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, idx) => (
              <Card 
                key={idx}
                className="group overflow-hidden bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveVideo(idx)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100">
                    {video.level}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">{video.description}</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <Users className="w-4 h-4 mr-1" />
                    {video.views} vistas
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => window.location.href = '/auth'} size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Ver Todos los Videos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
              <Download className="w-4 h-4 mr-2" />
              Recursos Gratuitos
            </Badge>
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Material Descargable
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Guías, manuales y actividades para reforzar el aprendizaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, idx) => (
              <Card 
                key={idx}
                className="group bg-white border-2 border-slate-200 hover:border-purple-400 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <resource.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-purple-600 transition-colors">
                    {resource.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <Badge variant="outline">{resource.type}</Badge>
                    <span>{resource.size}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <Download className="w-4 h-4 mr-1" />
                    {resource.downloads} descargas
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Lo Que Dicen Nuestros Usuarios
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Miles de familias confían en ViaSafe para la educación vial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-white border-2 border-slate-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => window.location.href = '/auth'} size="lg" className="text-lg px-12 py-6 bg-white text-purple-600 hover:bg-slate-100 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 font-bold">
              Crear Cuenta Gratis
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-purple-600">
              Ver Demo
            </Button>
          </div>
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
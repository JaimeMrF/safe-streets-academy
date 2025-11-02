import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Brain, Trophy, Users, ArrowRight, Play, BookOpen, Gamepad2, Youtube, FileText, Download, Star, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  const features = [
    { 
      icon: Brain, 
      title: "Aprendizaje Interactivo", 
      desc: "Juegos y actividades diseñadas pedagógicamente"
    },
    { 
      icon: Trophy, 
      title: "Sistema de Logros", 
      desc: "Gana puntos y certificaciones"
    },
    { 
      icon: ShieldCheck, 
      title: "Contenido Profesional", 
      desc: "Desarrollado por expertos"
    },
    { 
      icon: Users, 
      title: "Todas las Edades", 
      desc: "Desde preescolar hasta bachillerato"
    }
  ];

  const levels = [
    { level: "Preescolar", age: "3-5 años", icon: "🚦" },
    { level: "Primaria", age: "6-11 años", icon: "🚸" },
    { level: "Secundaria", age: "12-14 años", icon: "🚴" },
    { level: "Bachillerato", age: "15-18 años", icon: "🚗" },
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
      downloads: "3.2K"
    },
    {
      icon: BookOpen,
      title: "Manual del Peatón",
      type: "PDF",
      size: "1.8 MB",
      downloads: "2.8K"
    },
    {
      icon: Download,
      title: "Actividades Imprimibles",
      type: "ZIP",
      size: "5.4 MB",
      downloads: "4.5K"
    },
    {
      icon: Gamepad2,
      title: "Juegos Educativos",
      type: "WEB",
      size: "Online",
      downloads: "10K+"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Profesora de Primaria",
      avatar: "👩‍🏫",
      text: "Mis estudiantes están mucho más conscientes de la seguridad vial. Los juegos interactivos son geniales.",
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
      text: "Es súper divertido. No parece que estés estudiando, pero aprendes muchísimo sobre seguridad.",
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
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
                VS
              </div>
              <span className="text-xl font-bold text-gray-900">ViaSafe Educación</span>
            </div>
            <Button onClick={() => window.location.href = '/auth'} className="bg-blue-600 hover:bg-blue-700 text-white">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Educación Vial Profesional para Todas las Edades
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Plataforma educativa integral con contenido interactivo, videos profesionales y recursos descargables adaptados a cada nivel educativo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.href = '/auth'} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Comenzar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8">
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

 


  

      {/* Videos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Videos Educativos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aprende con contenido profesional y entretenido
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, idx) => (
              <Card 
                key={idx}
                className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => setActiveVideo(idx)}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
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
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {video.views} vistas
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => window.location.href = '/auth'} size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Ver Todos los Videos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">
              <Download className="w-4 h-4 mr-2" />
              Recursos Gratuitos
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Material Descargable
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guías, manuales y actividades para reforzar el aprendizaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, idx) => (
              <Card 
                key={idx}
                className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                    <resource.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {resource.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <Badge variant="outline" className="border-gray-300">{resource.type}</Badge>
                    <span>{resource.size}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Download className="w-4 h-4 mr-1" />
                    {resource.downloads} descargas
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

 
      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Comience su Educación Vial Hoy
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Únase a miles de estudiantes que están aprendiendo seguridad vial de manera efectiva
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/auth'} size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Crear Cuenta Gratis
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8">
              Contactar Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  VS
                </div>
                <span className="text-lg font-bold">ViaSafe</span>
              </div>
              <p className="text-gray-400 text-sm">
                Educación vial profesional para todas las edades
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Características</li>
                <li>Niveles</li>
                <li>Recursos</li>
                <li>Precios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Acerca de</li>
                <li>Blog</li>
                <li>Contacto</li>
                <li>Carreras</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Privacidad</li>
                <li>Términos</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ViaSafe Educación. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
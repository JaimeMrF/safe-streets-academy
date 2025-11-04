import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Brain, Trophy, Users, ArrowRight, Play, BookOpen, FileText, Download } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site.config";

const Index = () => {
  // Usar configuración centralizada del sitio
  const { name, description, videos, resources, educationLevels, colors } = siteConfig;

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="h-12 w-12 rounded flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: `hsl(${colors.primary})` }}
              >
                {siteConfig.shortName}
              </div>
              <span className="text-xl font-bold text-gray-900">{name}</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/auth'} 
              style={{ 
                backgroundColor: `hsl(${colors.primary})`,
              }}
              className="text-white hover:opacity-90 transition-opacity"
            >
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
              {name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/auth'} 
                size="lg" 
                style={{ backgroundColor: `hsl(${colors.primary})` }}
                className="text-white hover:opacity-90 px-8"
              >
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
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="border border-gray-200 hover:shadow-lg transition-shadow bg-white text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <feature.icon className="w-8 h-8" style={{ color: `hsl(${colors.primary})` }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Levels Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Niveles Educativos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contenido adaptado para cada etapa del desarrollo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationLevels.map((level, idx) => (
              <Card key={idx} className="border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="text-6xl mb-4">{level.icon}</div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{level.level}</h3>
                  <p className="text-sm text-gray-600">{level.age}</p>
                </CardContent>
              </Card>
            ))}
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
                onClick={() => window.open(video.youtubeEmbedUrl, '_blank')}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <Play className="w-8 h-8 ml-1" style={{ color: `hsl(${colors.primary})` }} />
                    </div>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <Badge 
                    className="mb-2 hover:opacity-90"
                    style={{ 
                      backgroundColor: `hsl(${colors.primary} / 0.1)`,
                      color: `hsl(${colors.primary})`
                    }}
                  >
                    {video.level}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
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
            <Badge 
              className="mb-4 text-white px-4 py-2"
              style={{ backgroundColor: `hsl(${colors.primary})` }}
            >
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, idx) => {
              const Icon = idx === 0 ? FileText : idx === 1 ? BookOpen : Download;
              return (
                <Card 
                  key={idx}
                  className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                  onClick={() => window.open(resource.downloadUrl, '_blank')}
                >
                  <CardContent className="p-6">
                    <div 
                      className="w-14 h-14 mb-4 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `hsl(${colors.primary} / 0.1)` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: `hsl(${colors.primary})` }} />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <Badge variant="outline" className="border-gray-300">{resource.type}</Badge>
                      <span>{resource.size}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      style={{ color: `hsl(${colors.primary})` }}
                      className="w-full hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: `hsl(${colors.primary})` }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Comience su Educación Vial Hoy
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Únase a miles de estudiantes que están aprendiendo seguridad vial de manera efectiva
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/auth'} 
              size="lg" 
              className="bg-white hover:bg-gray-100 px-8"
              style={{ color: `hsl(${colors.primary})` }}
            >
              Crear Cuenta Gratis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 px-8"
              onClick={() => window.location.href = '/contact'}
            >
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
                <div 
                  className="h-10 w-10 rounded flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: `hsl(${colors.primary})` }}
                >
                  {siteConfig.shortName}
                </div>
                <span className="text-lg font-bold">{name}</span>
              </div>
              <p className="text-gray-400 text-sm">
                {description.slice(0, 60)}...
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {siteConfig.navigation.footer.product.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {siteConfig.navigation.footer.company.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {siteConfig.navigation.footer.legal.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 {name}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
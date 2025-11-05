import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Brain, Trophy, Users, ArrowRight, Play, BookOpen, FileText, Download } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site.config";

const Index = () => {
  // Usar configuración centralizada del sitio
  const { name, description, videos, resources, educationLevels, colors } = siteConfig;

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
              Aprende con contenido entretenido
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
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: `hsl(${colors.primary})` }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Comience su Educación Vial Hoy
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Index;
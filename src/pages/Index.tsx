import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Users, Award, MessageCircle, X, ArrowRight, School, Baby, GraduationCap, Bike, Shield, Video, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import viaSafeLogo from "@/assets/viasafe-logo.png";
import heroImage from "@/assets/hero-road-safety.jpg";

const Index = () => {
  const { toast } = useToast();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setShowContactForm(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const levels = [
    {
      icon: Baby,
      title: "Preescolar (3-5 años)",
      description: "Colores del semáforo, cruzar la calle y señales básicas",
      gradient: "from-green-400 to-emerald-500",
      bg: "from-green-50 to-emerald-50",
      delay: "0ms"
    },
    {
      icon: School,
      title: "Primaria (6-11 años)",
      description: "Reglas de peatones, señales de tráfico y zonas seguras",
      gradient: "from-blue-400 to-cyan-500",
      bg: "from-blue-50 to-cyan-50",
      delay: "150ms"
    },
    {
      icon: Bike,
      title: "Secundaria (12-14 años)",
      description: "Ciclismo seguro, equipamiento y circulación urbana",
      gradient: "from-yellow-400 to-amber-500",
      bg: "from-yellow-50 to-amber-50",
      delay: "300ms"
    },
    {
      icon: GraduationCap,
      title: "Bachillerato (15-18 años)",
      description: "Preparación para conducir, leyes y responsabilidad vial",
      gradient: "from-red-400 to-rose-500",
      bg: "from-red-50 to-rose-50",
      delay: "450ms"
    }
  ];

  const features = [
    {
      icon: Gamepad2,
      title: "Juegos Interactivos",
      description: "Aprende jugando con actividades diseñadas para cada edad",
      color: "text-primary"
    },
    {
      icon: Video,
      title: "Videos Educativos",
      description: "Contenido multimedia atractivo y fácil de entender",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Certificaciones",
      description: "Obtén certificados al completar cada nivel educativo",
      color: "text-accent"
    }
  ];

  const stats = [
    { icon: Users, value: "745+", label: "Estudiantes Activos", delay: "0ms" },
    { icon: Award, value: "98%", label: "Tasa de Aprobación", delay: "100ms" },
    { icon: Car, value: "4", label: "Niveles Educativos", delay: "200ms" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute top-0 -right-4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute -bottom-8 left-20 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className={`flex flex-col items-center text-center space-y-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
            <img 
              src={viaSafeLogo} 
              alt="ViaSafe Educación" 
              className="h-32 w-auto relative z-10 drop-shadow-2xl transform transition-transform duration-500 hover:scale-110"
            />
          </div>
          
          {/* Title */}
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              Educación en Seguridad Vial
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
          </div>
          
          {/* Hero Image */}
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={heroImage} 
              alt="Niños aprendiendo seguridad vial" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl leading-relaxed">
            Plataforma educativa gamificada que enseña <span className="text-primary font-semibold">seguridad vial</span> a 
            través de juegos, videos y actividades interactivas adaptadas a cada edad.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link to="/login?role=student">
              <Button 
                size="lg" 
                className="text-lg px-10 h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                Soy Estudiante
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login?role=teacher">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 h-14 border-2 hover:bg-secondary/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                Soy Docente
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-border/50"
                style={{ animationDelay: stat.delay }}
              >
                <Icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Levels Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Niveles Educativos
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Contenido adaptado a cada etapa del desarrollo
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {levels.map((level, index) => {
              const Icon = level.icon;
              return (
                <div
                  key={index}
                  className={`relative group bg-gradient-to-br ${level.bg} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-border/50`}
                  style={{ animationDelay: level.delay }}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${level.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{level.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{level.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            ¿Cómo Aprendemos?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Metodología innovadora para un aprendizaje efectivo
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-border/50 text-center"
                >
                  <Icon className={`w-16 h-16 ${feature.color} mb-6 mx-auto`} />
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-24 max-w-2xl mx-auto text-center">
          <Button
            onClick={() => setShowContactForm(true)}
            size="lg"
            variant="outline"
            className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Contáctanos
          </Button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Mensaje"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

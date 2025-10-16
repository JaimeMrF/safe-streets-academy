import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Brain, Trophy, Users } from "lucide-react";
import viaSafeLogo from "@/assets/viasafe-logo.png";
import heroImage from "@/assets/hero-road-safety.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex flex-col items-center text-center mb-12">
            <img src={viaSafeLogo} alt="ViaSafe Educación" className="h-24 mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              ViaSafe Educación
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mb-8">
              Aprende seguridad vial de forma divertida e interactiva. Juegos, videos y experiencias 3D adaptadas a tu nivel educativo.
            </p>
            <div className="flex gap-4">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8">
                  Comenzar Ahora
                </Button>
              </Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <img src={heroImage} alt="Seguridad Vial" className="w-full h-[400px] object-cover" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué ViaSafe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="pt-6 text-center">
              <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-bold mb-2 text-card-foreground">Aprendizaje Interactivo</h3>
              <p className="text-sm text-muted-foreground">
                Juegos y actividades diseñadas pedagógicamente
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-secondary" />
              <h3 className="font-bold mb-2 text-card-foreground">Sistema de Logros</h3>
              <p className="text-sm text-muted-foreground">
                Gana puntos y certificaciones
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6 text-center">
              <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="font-bold mb-2 text-card-foreground">Contenido Profesional</h3>
              <p className="text-sm text-muted-foreground">
                Desarrollado por expertos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <h3 className="font-bold mb-2 text-card-foreground">Todas las Edades</h3>
              <p className="text-sm text-muted-foreground">
                Desde preescolar hasta bachillerato
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Levels */}
      <div className="bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Niveles Educativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { level: "Preescolar", age: "3-5 años", icon: "🚦" },
              { level: "Primaria", age: "6-11 años", icon: "🚸" },
              { level: "Secundaria", age: "12-14 años", icon: "🚴" },
              { level: "Bachillerato", age: "15-18 años", icon: "🚗" },
            ].map((item) => (
              <Card key={item.level} className="bg-card border-border hover:border-primary transition-colors">
                <div className="h-24 bg-muted flex items-center justify-center text-6xl">
                  {item.icon}
                </div>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-lg mb-1">{item.level}</h3>
                  <p className="text-sm text-muted-foreground">{item.age}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
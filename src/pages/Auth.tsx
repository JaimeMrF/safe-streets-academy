import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, UserCircle, GraduationCap, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [educationLevel, setEducationLevel] = useState("primaria");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("¡Inicio de sesión exitoso!");
      setLoading(false);
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("¡Cuenta creada exitosamente!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="absolute top-10 left-10 text-blue-200 opacity-50">
        <ShieldCheck className="w-32 h-32" />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-200 opacity-50">
        <GraduationCap className="w-32 h-32" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:block space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-900">
                <Sparkles className="w-4 h-4" />
                <span>Educación vial del futuro</span>
              </div>
              
              <h1 className="text-6xl font-extrabold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                  Aprende
                </span>
                <br />
                <span className="text-slate-800">seguridad vial</span>
                <br />
                <span className="text-slate-600">de forma divertida</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Únete a miles de estudiantes que están aprendiendo las mejores prácticas de seguridad vial con contenido interactivo y gamificado.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Contenido Certificado</h3>
                  <p className="text-sm text-slate-600">Aprobado por expertos en seguridad vial</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Aprende Jugando</h3>
                  <p className="text-sm text-slate-600">Juegos interactivos y experiencias 3D</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full animate-slide-up">
            <div className="text-center mb-8 lg:hidden">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl mb-4 transform hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">VS</span>
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                ViaSafe Educación
              </h2>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg">
                <TabsTrigger 
                  value="login"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/90">
                  <CardHeader className="space-y-3 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <UserCircle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                      ¡Bienvenido de vuelta!
                    </CardTitle>
                    <CardDescription className="text-center text-base">
                      Ingresa tus credenciales para continuar aprendiendo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-slate-700 font-medium">
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-11 h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-slate-700 font-medium">
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-11 h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 pt-2">
                    <Button 
                      onClick={handleLogin}
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                      disabled={loading}
                    >
                      {loading ? "Iniciando..." : "Iniciar Sesión"}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      type="button"
                      variant="ghost" 
                      className="text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => window.location.href = "/teacher/register"}
                    >
                      ¿Eres profesor? Regístrate aquí →
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/90">
                  <CardHeader className="space-y-3 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      ¡Comienza tu aventura!
                    </CardTitle>
                    <CardDescription className="text-center text-base">
                      Crea tu cuenta y comienza a aprender de forma divertida
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-slate-700 font-medium">
                          Nombre
                        </Label>
                        <Input
                          id="first-name"
                          placeholder="Juan"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="h-11 border-2 border-slate-200 focus:border-purple-500 rounded-xl transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-slate-700 font-medium">
                          Apellido
                        </Label>
                        <Input
                          id="last-name"
                          placeholder="Pérez"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="h-11 border-2 border-slate-200 focus:border-purple-500 rounded-xl transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education-level" className="text-slate-700 font-medium">
                        Nivel Educativo
                      </Label>
                      <Select value={educationLevel} onValueChange={(value) => setEducationLevel(value)}>
                        <SelectTrigger className="h-11 border-2 border-slate-200 focus:border-purple-500 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preescolar">🚦 Preescolar (3-5 años)</SelectItem>
                          <SelectItem value="primaria">🚸 Primaria (6-11 años)</SelectItem>
                          <SelectItem value="secundaria">🚴 Secundaria (12-14 años)</SelectItem>
                          <SelectItem value="bachillerato">🚗 Bachillerato (15-18 años)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-slate-700 font-medium">
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="pl-11 h-11 border-2 border-slate-200 focus:border-purple-500 rounded-xl transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-slate-700 font-medium">
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="pl-11 h-11 border-2 border-slate-200 focus:border-purple-500 rounded-xl transition-all duration-300"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Mínimo 8 caracteres</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={handleSignup}
                      className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                      disabled={loading}
                    >
                      {loading ? "Creando cuenta..." : "Crear Cuenta"}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <p className="text-center text-sm text-slate-500 mt-6">
              Al registrarte, aceptas nuestros{" "}
              <button className="text-blue-600 hover:underline">Términos de Servicio</button>
              {" "}y{" "}
              <button className="text-blue-600 hover:underline">Política de Privacidad</button>
            </p>
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
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

export default Auth;
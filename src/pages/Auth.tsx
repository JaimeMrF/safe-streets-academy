import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, UserCircle, GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [educationLevel, setEducationLevel] = useState<"preescolar" | "primaria" | "secundaria" | "bachillerato">("primaria");

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: userRole, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error al verificar rol:", error);
          return;
        }

        if (userRole?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (userRole?.role === "teacher") {
          navigate("/teacher/dashboard", { replace: true });
        } else if (userRole?.role === "student") {
          navigate("/courses", { replace: true });
        }
      }
    } catch (error) {
      console.error("Error en checkUserSession:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const { data: userRole, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .limit(1)
          .maybeSingle();

        if (roleError) {
          console.error("Error al verificar rol:", roleError);
          toast.error("Error al verificar permisos");
          setLoading(false);
          return;
        }

        if (userRole?.role === "admin") {
          toast.success("Bienvenido Administrador");
          navigate("/admin/dashboard", { replace: true });
        } else if (userRole?.role === "teacher") {
          toast.success("Bienvenido Profesor");
          navigate("/teacher/dashboard", { replace: true });
        } else {
          toast.success("Sesión iniciada correctamente");
          navigate("/courses", { replace: true });
        }
      }
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/courses`,
        data: {
          first_name: firstName,
          last_name: lastName,
          education_level: educationLevel,
        },
      },
    });

    if (authError) {
      toast.error(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: authData.user.id,
          email: signupEmail,
          first_name: firstName,
          last_name: lastName,
          education_level: educationLevel,
        }, {
          onConflict: "id"
        });

      if (profileError) {
        console.error("Error al crear el perfil:", profileError);
        toast.error("Error al crear el perfil");
        setLoading(false);
        return;
      }

      const { error: roleError } = await supabase
        .from("user_roles")
        .upsert({
          user_id: authData.user.id,
          role: "student",
        }, {
          onConflict: "user_id"
        });

      if (roleError) {
        toast.error("Error al asignar rol");
        setLoading(false);
        return;
      }

      toast.success("Cuenta creada exitosamente");
      navigate("/courses");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">ITAL</span>
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">Instituto Técnico Alfonso López</span>
              <p className="text-xs text-muted-foreground">Ocaña, Norte de Santander</p>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Information */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Plataforma de Educación Vial
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Acceda a contenido educativo de calidad para aprender las mejores prácticas de seguridad vial.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-card rounded-lg border">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Contenido Certificado</h3>
                  <p className="text-sm text-gray-600">Material educativo aprobado por expertos en seguridad vial y pedagogía</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card rounded-lg border">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Aprendizaje Estructurado</h3>
                  <p className="text-sm text-gray-600">Cursos organizados por nivel educativo con seguimiento de progreso</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card rounded-lg border">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <UserCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Perfil Personalizado</h3>
                  <p className="text-sm text-gray-600">Contenido adaptado a su edad y nivel de conocimiento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Auth Forms */}
          <div className="w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card p-1">
                <TabsTrigger 
                  value="login"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <Card className="shadow-md">
                  <CardHeader className="space-y-3 pb-6">
                    <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mx-auto">
                      <UserCircle className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-center">
                      Iniciar Sesión
                    </CardTitle>
                    <CardDescription className="text-center">
                      Ingrese sus credenciales para acceder a la plataforma
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-gray-700 font-medium">
                          Correo Electrónico
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="pl-11 h-11 border-gray-300 focus:border-blue-600"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-gray-700 font-medium">
                          Contraseña
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="pl-11 h-11 border-gray-300 focus:border-blue-600"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                      >
                        ¿Olvidó su contraseña?
                      </button>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-2">
                      <Button 
                        type="submit"
                        className="w-full h-11"
                        disabled={loading}
                      >
                        {loading ? "Iniciando..." : "Iniciar Sesión"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <Card className="shadow-md">
                  <CardHeader className="space-y-3 pb-6">
                    <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mx-auto">
                      <GraduationCap className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-center">
                      Crear Cuenta
                    </CardTitle>
                    <CardDescription className="text-center">
                      Complete el formulario para registrarse en la plataforma
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSignup}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name" className="text-gray-700 font-medium">
                            Nombre
                          </Label>
                          <Input
                            id="first-name"
                            placeholder="Nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-10 border-gray-300 focus:border-blue-600"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name" className="text-gray-700 font-medium">
                            Apellido
                          </Label>
                          <Input
                            id="last-name"
                            placeholder="Apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-10 border-gray-300 focus:border-blue-600"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education-level" className="text-gray-700 font-medium">
                          Nivel Educativo
                        </Label>
                        <Select value={educationLevel} onValueChange={(value: "preescolar" | "primaria" | "secundaria" | "bachillerato") => setEducationLevel(value)}>
                          <SelectTrigger className="h-10 border-gray-300 focus:border-blue-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="preescolar">Preescolar (3-5 años)</SelectItem>
                            <SelectItem value="primaria">Primaria (6-11 años)</SelectItem>
                            <SelectItem value="secundaria">Secundaria (12-14 años)</SelectItem>
                            <SelectItem value="bachillerato">Bachillerato (15-18 años)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-gray-700 font-medium">
                          Correo Electrónico
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            className="pl-11 h-10 border-gray-300 focus:border-blue-600"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-gray-700 font-medium">
                          Contraseña
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            className="pl-11 h-10 border-gray-300 focus:border-blue-600"
                            required
                            minLength={6}
                          />
                        </div>
                        <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        type="submit"
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={loading}
                      >
                        {loading ? "Creando cuenta..." : "Crear Cuenta"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>

            <p className="text-center text-sm text-gray-500 mt-6">
              Al registrarse, acepta nuestros{" "}
              <button className="text-blue-600 hover:underline">Términos de Servicio</button>
              {" "}y{" "}
              <button className="text-blue-600 hover:underline">Política de Privacidad</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
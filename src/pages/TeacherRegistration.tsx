import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus, Mail, Lock, User, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegisterTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Debes iniciar sesión");
        navigate("/auth");
        return;
      }

      const { data: userRole } = await supabase
        .from("user_roles")
        .select("user_role")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (userRole?.user_role !== "admin") {
        toast.error("Solo los administradores pueden crear profesores");
        navigate("/courses");
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/teacher/dashboard`,
          data: {
            first_name: firstName,
            last_name: lastName,
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
            email: email,
            first_name: firstName,
            last_name: lastName,
            education_level: "bachillerato",
          }, {
            onConflict: "id"
          });

        if (profileError) {
          console.error("Error al crear perfil:", profileError);
          toast.error("Error al crear el perfil del profesor");
          setLoading(false);
          return;
        }

        const { error: roleError } = await supabase
          .from("user_roles")
          .upsert({
            user_id: authData.user.id,
            role: "teacher",
          }, {
            onConflict: "user_id"
          });

        if (roleError) {
          console.error("Error al asignar rol:", roleError);
          toast.error("Error al asignar rol de profesor");
          setLoading(false);
          return;
        }

        toast.success("Profesor registrado exitosamente");
        
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        
        setTimeout(() => {
          navigate("/admin/teachers");
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar profesor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
              ITAL
            </div>
            <span className="text-lg font-bold">ITAL - Administración</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
          </Button>

          <Card className="shadow-md">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-lg flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                Registrar Nuevo Profesor
              </CardTitle>
              <CardDescription>
                Complete el formulario para crear una cuenta de profesor
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleRegisterTeacher}>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-gray-700 font-medium">
                      Nombre
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="first-name"
                        placeholder="Nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-11 h-11 border-gray-300 focus:border-blue-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-gray-700 font-medium">
                      Apellido
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="last-name"
                        placeholder="Apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-11 h-11 border-gray-300 focus:border-blue-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="profesor@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-11 border-gray-300 focus:border-blue-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 h-11 border-gray-300 focus:border-blue-600"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">
                        Privilegios de Profesor
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Ver todos los estudiantes</li>
                        <li>• Acceder al progreso de estudiantes</li>
                        <li>• Gestionar cursos y contenido</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={loading}
                >
                  {loading ? (
                    "Registrando..."
                  ) : (
                    <>
                      <UserPlus className="mr-2 w-4 h-4" />
                      Crear Cuenta de Profesor
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistration;
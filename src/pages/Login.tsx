import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import estudiantesData from "@/db/estudiantes.json";
import docentesData from "@/db/docentes.json";
import nexiaLogo from "@/assets/nexia-logo.webp";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleFromUrl = searchParams.get("role") || "student";
  
  const [role, setRole] = useState<"student" | "teacher">(roleFromUrl as "student" | "teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Registrar
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha, setFecha] = useState("");
  const [condicion, setCondicion] = useState("");
  const [nivel, setNivel] = useState("");

  const [registrado, setRegistrado] = useState(false);
  
  useEffect(() => {
    setRole(roleFromUrl as "student" | "teacher");
    setRegistrado(false)
  }, [roleFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      let authenticatedUser = null;
  
      if (role === "student") {
        const student = estudiantesData.find(
          (s) => s.correo === email && s.password === password
        );
        if (student) {
          authenticatedUser = {
            id: student.id,
            nombre: `${student.nombre} ${student.apellido}`,
            email: student.correo,
            role: "student",
            streak: 5,
            accuracy: 92,
          };
        }
      } else {
        const teacher = docentesData.find(
          (t) => t.correo === email && t.password === password
        );
        if (teacher) {
          authenticatedUser = {
            id: teacher.id,
            nombre: teacher.nombre,
            email: teacher.correo,
            role: "teacher",
          };
        }
      }
  
      if (authenticatedUser) {
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
        toast.success(`¡Bienvenido${role === "teacher" ? "a" : ""}!`);
        navigate("/courses");
      } else {
        toast.error("Credenciales incorrectas");
      }
    } else {

      setRegistrado(true)
      let registrarUsuario = null
      let data = null

      if (role === "student") {
        data = estudiantesData
        const id = Math.max(...estudiantesData.map(estudiante => estudiante.id))
        
        registrarUsuario = {
          id: id + 1,
          nombre: nombre,
          apellido: apellido,
          fecha: fecha,
          condicion: condicion,
          nivel: nivel,
          correo: email,
          password: password
        }
      } else {
        data = docentesData
        const id = Math.max(...docentesData.map(estudiante => estudiante.id))

        registrarUsuario = {
          id: id + 1,
          nombre: nombre + " " + apellido,
          correo: email,
          password: password
        }
      }
      
      data.push(registrarUsuario)

      setEmail("")
      setPassword("")
      setNombre("")
      setApellido("")
      setFecha("")
      setCondicion("")
      setNivel("")
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Orbs de fondo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="floating-orb absolute top-20 left-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="floating-orb-delayed absolute bottom-20 right-10 w-80 h-80 bg-purple-300/25 rounded-full blur-3xl"></div>
        <div className="floating-orb-slow absolute top-1/2 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl border-2 border-gradient p-6 animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src={nexiaLogo} 
              alt="Nexia+" 
              className="h-16 animate-pulse w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {role === "student" ? "Portal Estudiante" : "Portal Docente"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isLogin ? "Ingresa a tu cuenta" : "Crea una nueva cuenta"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={role} onValueChange={(v) => {
            setRole(v as "student" | "teacher")
            setRegistrado(false)
          }} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 rounded-xl overflow-hidden shadow-lg">
              <TabsTrigger value="student" className="hover:bg-blue-500/20 transition-colors">Estudiante</TabsTrigger>
              <TabsTrigger value="teacher" className="hover:bg-purple-500/20 transition-colors">Docente</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="h-12 shadow-md hover:shadow-lg transition-all rounded-xl"
              />
            </div>}

            {!isLogin && <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                className="h-12 shadow-md hover:shadow-lg transition-all rounded-xl"
              />
            </div>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 shadow-md hover:shadow-lg transition-all rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 shadow-md hover:shadow-lg transition-all rounded-xl"
              />
            </div>

            {!isLogin && role === "student" && <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                className="h-12 shadow-md hover:shadow-lg transition-all rounded-xl"
              />
            </div>}


            {!isLogin && role === "student" && <div className="space-y-2">
              <Label htmlFor="condicion">Condición</Label>
              <Input
                id="condicion"
                type="text"
                placeholder="Condición"
                value={condicion}
                onChange={(e) => setCondicion(e.target.value)}
                required
                className="h-12 shadow-md hover:shadow-lg transition-all rounded-xl"
              />
            </div>}

            {!isLogin && role === "student" && <div className="space-y-2">
              <Label htmlFor="nivel">Nivel</Label>
              <Input
                id="nivel"
                type="text"
                placeholder="Nivel"
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                required
                className="h-12 shadow-md hover:shadow-lg transition-all rounded-xl"
              />
            </div>}

            {registrado && <div className="mt-6 p-4 bg-green-300 rounded-lg text-sm text-green-700 font-semibold">
              Registrado correctamente.
            </div>}
            
            <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all rounded-xl">
              {isLogin ? "Ingresar" : "Crear Cuenta"}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full hover:underline"
              onClick={() => {
                setIsLogin(!isLogin)
                setRegistrado(false)
              }}
            >
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </Button>
          </form>
          
          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-lg text-sm text-gray-700 shadow-md">
            <p className="font-semibold mb-1">Credenciales de prueba:</p>
            {role === "student" ? (
              <p>Email: laura.martinez@example.com | Pass: Lm2025#</p>
            ) : (
              <p>Email: maria.lopez@instituto.edu | Pass: MfL#2025</p>
            )}
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(15px); }
        }

        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-35px) translateX(-20px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(30px) scale(1.15); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-fade-in { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .floating-orb { animation: float 7s ease-in-out infinite; }
        .floating-orb-delayed { animation: floatDelayed 9s ease-in-out infinite; }
        .floating-orb-slow { animation: floatSlow 11s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .border-gradient { border-image: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6) 1; }
      `}</style>
    </div>
  );
};

export default Login;

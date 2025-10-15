import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Target, Search, Award, BookOpen, Clock, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
} from "recharts";

import nexiaLogo from "@/assets/nexia-logo.webp";
import cursosData from "@/db/cursos.json";
import estudiantesData from "@/db/estudiantes.json";
import progresoData from "@/db/progreso_estudiantes.json";
import rutasData from "@/db/rutas.json";

interface StudentDetail {
  id: number;
  nombre: string;
  apellido: string;
  fecha: string;
  edad: number;
  condicion: string;
  nivel: string;
  correo: string;
}

const TeacherCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "teacher") {
      navigate("/courses");
      return;
    }
    setUser(parsedUser);

    const selectedCourse = cursosData.find((c) => c.id === Number(courseId));
    setCourse(selectedCourse);

    const courseRoutes = rutasData.filter((r) => r.course_id === Number(courseId));
    const routeIds = courseRoutes.map((r) => r.id);
    const enrolledStudentIds = new Set(
      progresoData.filter((p) => routeIds.includes(p.route_id)).map((p) => p.student_id)
    );
    const enrolledStudents = estudiantesData.filter((s) => enrolledStudentIds.has(s.id));
    setStudents(enrolledStudents);
  }, [navigate, courseId]);

  const handleLogoClick = () => navigate("/courses");
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getCourseRoutes = () => rutasData.filter((r) => r.course_id === Number(courseId));

  const getStudentRecordsForCourse = (studentId: number) => {
    const routeIds = getCourseRoutes().map((r) => r.id);
    return progresoData
      .filter((p) => p.student_id === studentId && routeIds.includes(p.route_id))
      .sort((a, b) => {
        if (a.route_id !== b.route_id) return a.route_id - b.route_id;
        return (a.current_level_number || 0) - (b.current_level_number || 0);
      });
  };

  const buildStudentsStats = () => {
    const courseRoutes = getCourseRoutes();
    const totalRoutes = courseRoutes.length || 1;

    return students.map((s) => {
      const records = getStudentRecordsForCourse(s.id);
      const completed = records.filter(
        (r) => r.completion_status === "completed" || r.completion_status === "certificado"
      ).length;
      const completionPercent = Math.round((completed / totalRoutes) * 100);

      const recordsWithAccuracy = records.filter((r) => typeof r.best_accuracy_percentage === "number");
      const avgAccuracy =
        recordsWithAccuracy.length > 0
          ? Math.round(
              recordsWithAccuracy.reduce((sum, r) => sum + (r.best_accuracy_percentage || 0), 0) /
                recordsWithAccuracy.length
            )
          : 0;

      const certifications = records.filter((r) => r.completion_status === "completed" && r.score >= 80).length;

      return {
        studentId: s.id,
        name: `${s.nombre} ${s.apellido}`,
        shortName: s.nombre,
        completion: Number.isFinite(completionPercent) ? completionPercent : 0,
        avgAccuracy: Number.isFinite(avgAccuracy) ? avgAccuracy : 0,
        certifications,
        records,
      };
    });
  };

  const studentsStats = buildStudentsStats();

  const filteredStudents = students.filter(
    (s) =>
      s.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.correo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user || !course) return null;

  const overallStats = () => {
    const courseRoutes = getCourseRoutes();
    const routeIds = courseRoutes.map((r) => r.id);
    const courseProgress = progresoData.filter((p) => routeIds.includes(p.route_id));

    const accuracyRecords = courseProgress.filter((p) => typeof p.best_accuracy_percentage === "number");
    const avgAccuracy =
      accuracyRecords.length > 0
        ? accuracyRecords.reduce((sum, p) => sum + (p.best_accuracy_percentage || 0), 0) / accuracyRecords.length
        : 0;

    const avgCompletion =
      courseProgress.length > 0
        ? (courseProgress.filter((p) => p.completion_status === "completado").length / courseProgress.length) * 100
        : 0;

    return {
      activeStudents: new Set(courseProgress.map((p) => p.student_id)).size,
      avgAccuracy: avgAccuracy.toFixed(1),
      completionRate: avgCompletion.toFixed(1),
    };
  };

  const stats = overallStats();

  const barLineData = studentsStats.map((st) => ({
    shortName: st.shortName,
    completion: st.completion,
    avgAccuracy: st.avgAccuracy,
    fullName: st.name,
    certifications: st.certifications,
  }));

  const computeNivelStats = () => {
    const courseRoutes = getCourseRoutes();
    const routeIds = courseRoutes.map((r) => r.id);
    const courseProgress = progresoData.filter((p) => routeIds.includes(p.route_id));

    if (courseProgress.length === 0) return [{ nivel: 1, completados: 0, enProgreso: 0 }];

    const maxNivel = Math.max(...courseProgress.map((p) => p.current_level_number || 0));
    const nivelesMap = new Map<number, { nivel: number; completados: number; enProgreso: number }>();

    courseProgress.forEach((reg) => {
      const nivel = reg.current_level_number || 1;
      if (!nivelesMap.has(nivel)) nivelesMap.set(nivel, { nivel, completados: 0, enProgreso: 0 });
      const entry = nivelesMap.get(nivel)!;
      if (reg.completion_status === "completed" || reg.completed) entry.completados += 1;
      else entry.enProgreso += 1;
    });

    const nivelesArray = [];
    for (let i = 1; i <= maxNivel; i++) {
      nivelesArray.push(nivelesMap.get(i) || { nivel: i, completados: 0, enProgreso: 0 });
    }
    return nivelesArray;
  };

  const nivelesData = computeNivelStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="floating-orb absolute top-20 left-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="floating-orb-delayed absolute bottom-20 right-10 w-80 h-80 bg-purple-300/25 rounded-full blur-3xl"></div>
        <div className="floating-orb-slow absolute top-1/2 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b-4 border-gradient">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src={nexiaLogo}
            alt="Nexia+"
            className="h-8 sm:h-10 md:h-12 cursor-pointer hover:scale-110 transition-all duration-300 drop-shadow-lg"
            onClick={handleLogoClick}
          />
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="text-sm font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Docente: {user.nombre}
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="hover:scale-105 transition-transform border-2 hover:border-red-400"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 relative">
        {/* Course Title */}
        <div className="slide-up">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border-2 border-blue-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg pulse-animation">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {course.nombre}
                </h1>
                <p className="text-sm text-gray-600 font-medium mt-1">Dashboard del Docente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="p-5 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
            <CardContent className="flex items-center justify-between gap-4 p-0">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Alumnos Activos</p>
                <p className="text-4xl font-black text-blue-600">{stats.activeStudents}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-5 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-300 hover:scale-105 bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm">
            <CardContent className="flex items-center justify-between gap-4 p-0">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Precisión Prom.</p>
                <p className="text-4xl font-black text-green-600">{stats.avgAccuracy}%</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-5 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-300 hover:scale-105 bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm">
            <CardContent className="flex items-center justify-between gap-4 p-0">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Progreso Prom.</p>
                <p className="text-4xl font-black text-purple-600">{stats.completionRate}%</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card className="border-2 border-blue-200/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              Completitud y Precisión por Estudiante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={barLineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="shortName" style={{ fontSize: '12px' }} />
                <YAxis domain={[0, 100]} style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                <Bar dataKey="completion" name="Completado (%)" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="avgAccuracy" name="Precisión Prom." stroke="#4ade80" strokeWidth={3} dot={{ r: 5, fill: '#4ade80' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              Estado por Nivel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={nivelesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="nivel" style={{ fontSize: '12px' }} />
                <YAxis allowDecimals={false} style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="completados" fill="#4ade80" name="Completados" radius={[8, 8, 0, 0]} />
                <Bar dataKey="enProgreso" fill="#facc15" name="En progreso" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search bar */}
        <div className="relative max-w-xl slide-up" style={{ animationDelay: '0.4s' }}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar estudiantes por nombre o correo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-base shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-white/90 backdrop-blur-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200/50 slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Correo</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nivel</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Complt.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Prec. Prom.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Certif.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentsStats
                  .filter((st) => filteredStudents.some((fs) => fs.id === st.studentId))
                  .map((st, idx) => {
                    const studentMeta = students.find((x) => x.id === st.studentId) || { correo: "-", nivel: "-" };
                    return (
                      <tr 
                        key={st.studentId} 
                        className="hover:bg-blue-50/50 transition-all duration-300 hover:shadow-md"
                      >
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              const s = students.find((x) => x.id === st.studentId) || null;
                              setSelectedStudent(s);
                              setShowDetail(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 font-bold text-left hover:underline flex items-center gap-2 transition-colors"
                          >
                            <Users className="w-4 h-4" />
                            {st.name}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{studentMeta.correo}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                            {studentMeta.nivel}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${st.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-gray-700">{st.completion}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-green-600">{st.avgAccuracy}%</span>
                        </td>
                        <td className="px-6 py-4">
                          {st.certifications > 0 ? (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                              <Award className="w-3 h-3" />
                              {st.certifications}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Dialog */}
      <Dialog open={showDetail} onOpenChange={(v) => { if (!v) setSelectedStudent(null); setShowDetail(v); }}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-2 border-blue-200">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Detalle del Estudiante
            </DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 space-y-3 border-2 border-blue-200/50 shadow-lg">
                <h3 className="font-black text-2xl text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{selectedStudent.nombre[0]}</span>
                  </div>
                  {selectedStudent.nombre} {selectedStudent.apellido}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/70 rounded-lg p-3">
                    <span className="font-bold text-gray-700">📧 Correo:</span>
                    <span className="text-gray-600">{selectedStudent.correo}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 rounded-lg p-3">
                    <span className="font-bold text-gray-700">🎂 Edad:</span>
                    <span className="text-gray-600">{selectedStudent.edad} años</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 rounded-lg p-3">
                    <span className="font-bold text-gray-700">📚 Nivel:</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">{selectedStudent.nivel}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 rounded-lg p-3">
                    <span className="font-bold text-gray-700">🏥 Condición:</span>
                    <span className="text-gray-600">{selectedStudent.condicion}</span>
                  </div>
                </div>
              </div>

              <Card className="shadow-xl border-2 border-blue-200/50 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Progreso Individual
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {getStudentRecordsForCourse(selectedStudent.id).map((rec) => (
                      <div 
                        key={`${rec.route_id}-${rec.current_level_number}`} 
                        className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-300"
                      >
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            {(rutasData.find(r => r.id === rec.route_id)?.name) || `Ruta ${rec.route_id}`} - Nivel {rec.current_level_number}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Última: {rec.last_completion_date || "-"}
                          </div>
                        </div>
                        <div className="text-right">
                          {rec.completion_status === "certificado" ? (
                            <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl text-sm font-black shadow-lg flex items-center gap-2">
                              <Award className="w-5 h-5" />
                              Certificado
                            </span>
                          ) : (
                            <>
                              <div className="text-lg font-black text-green-600">
                                {typeof rec.best_accuracy_percentage === "number" ? `${rec.best_accuracy_percentage}%` : "--"}
                              </div>
                              <div className="text-xs mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                                {rec.completion_status}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                    {getStudentRecordsForCourse(selectedStudent.id).length === 0 && (
                      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">
                          Este estudiante aún no tiene registros de progreso en este curso.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

        .slide-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .floating-orb {
          animation: float 7s ease-in-out infinite;
        }

        .floating-orb-delayed {
          animation: floatDelayed 9s ease-in-out infinite;
        }

        .floating-orb-slow {
          animation: floatSlow 11s ease-in-out infinite;
        }

        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }

        .border-gradient {
          border-image: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6) 1;
        }
      `}</style>
    </div>
  );
};

export default TeacherCourse;
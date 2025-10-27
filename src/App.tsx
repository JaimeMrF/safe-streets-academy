import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import CourseSelector from "./pages/CourseSelector";
import StudentCourse from "./pages/StudentCourse";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherRegistration from "./pages/TeacherRegistration";
import ResourceLibrary from "./pages/ResourceLibrary";
import MemoryGame from "./pages/games/MemoryGame";
import QuizGame from "./pages/games/QuizGame";
import VideoPlayer from "./pages/games/VideoPlayer";
import Model3DViewer from "./pages/games/Model3DViewer";
import Memoria4x4 from "./pages/games/memoria4x4/Memoria4x4";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/teacher/register" element={<TeacherRegistration />} />
          <Route path="/courses" element={<CourseSelector />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          <Route path="/student/course/:courseId" element={<StudentCourse />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/game/memory/:routeId" element={<MemoryGame />} />
          <Route path="/game/memoria4x4/:routeId" element={<Memoria4x4 />} />
          <Route path="/game/quiz/:routeId" element={<QuizGame />} />
          <Route path="/game/video/:routeId" element={<VideoPlayer />} />
          <Route path="/game/3d-model/:routeId" element={<Model3DViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

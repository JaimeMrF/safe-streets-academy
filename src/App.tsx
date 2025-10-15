import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CourseSelector from "./pages/CourseSelector";
import CreateCourse from "./pages/CreateCourse";
import StudentRoute from "./pages/StudentRoute";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherCourse from "./pages/TeacherCourse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<CourseSelector />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/student/course/:courseId" element={<StudentRoute />} />
          <Route path="/teacher/course/:courseId" element={<TeacherCourse />} />
          <Route path="/game/:routeId" element={<StudentDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Video, BookOpen } from 'lucide-react';

const VideoLevel2 = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);

  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);

  // ============================================
  // Inicialización del nivel
  // ============================================
  useEffect(() => {
    const initializeLevel = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          toast.error('Debe iniciar sesión para continuar');
          navigate('/auth');
          return;
        }

        setStudentId(user.id);

        if (routeId) {
          const { data: routeData, error: routeError } = await supabase
            .from('routes')
            .select('course_id')
            .eq('id', routeId)
            .single();

          if (routeError) throw routeError;
          setCourseId(routeData.course_id);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error inicializando nivel:', error);
        toast.error('Error al cargar el nivel');
        navigate('/courses');
      }
    };

    initializeLevel();
  }, [routeId, navigate]);

  // ============================================
  // Configuración del reproductor de YouTube
  // ============================================
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('yt-player', {
        videoId: 'BROJyi3l_Ws',
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setVideoStarted(true);
            }
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              handleVideoEnd();
            }
          },
        },
      });
    };
  }, []);

  // ============================================
  // Manejo de eventos del video y progreso
  // ============================================
  const handleVideoEnd = () => {
    setVideoEnded(true);
    toast.success('¡Has completado el video!');
  };

  const handleCompleteLevel = async () => {
    try {
      const { error } = await supabase
        .from('student_progress')
        .upsert(
          {
            student_id: studentId,
            route_id: routeId,
            score: 100,
            completed: true,
            best_accuracy_percentage: 100,
            completion_date: new Date().toISOString(),
          },
          { onConflict: 'student_id,route_id' }
        );

      if (error) throw error;

      toast.success('Nivel completado exitosamente');
      if (courseId) {
        navigate(`/student/course/${courseId}`);
      } else {
        navigate('/courses');
      }
    } catch (error) {
      console.error('Error al registrar progreso:', error);
      toast.error('Error al guardar progreso');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-600">Cargando nivel...</p>
      </div>
    );
  }

  // ============================================
  // Render principal
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-xl border-t-4 border-indigo-600">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-8 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <Video className="w-16 h-16" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Nivel de Video Educativo</h1>
            <p className="text-center text-indigo-100">
              Observa el video y completa el nivel
            </p>
          </div>

          {/* Video Section */}
          <div className="p-6">
            <div className="mb-6">
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                <BookOpen className="w-4 h-4 mr-2 inline" /> Video Interactivo
              </Badge>
              <div className="bg-slate-100 rounded-lg overflow-hidden">
                <div id="yt-player" className="w-full h-64 md:h-96"></div>
              </div>
            </div>

            {/* Botón de completar */}
            {videoEnded ? (
              <Button
                onClick={handleCompleteLevel}
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
              >
                Completar Nivel
                <CheckCircle2 className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                disabled={!videoStarted}
                onClick={() =>
                  toast.info('Debes ver el video completo para continuar')
                }
                size="lg"
                className="w-full bg-gradient-to-r from-slate-400 to-gray-500 text-white hover:from-slate-500 hover:to-gray-600 disabled:opacity-70"
              >
                Ver el video completo para continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoLevel2;

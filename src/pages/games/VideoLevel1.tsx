import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Video, BookOpen } from 'lucide-react';

const VideoLevel1 = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);

  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);

  // ============================================
  // Función auxiliar para extraer video ID de YouTube
  // ============================================
  const extractYouTubeVideoId = (url: string): string | null => {
    try {
      // Patrones comunes de URLs de YouTube
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // ID directo
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      return null;
    } catch (error) {
      console.error('Error extrayendo video ID:', error);
      return null;
    }
  };

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
          // Obtener datos de la ruta incluyendo video_url
          const { data: routeData, error: routeError } = await supabase
            .from('routes')
            .select('course_id, video_url')
            .eq('id', routeId)
            .single();

          if (routeError) throw routeError;

          setCourseId(routeData.course_id);

          // Verificar y procesar video_url
          if (routeData.video_url) {
            setVideoUrl(routeData.video_url);
            const extractedId = extractYouTubeVideoId(routeData.video_url);
            
            if (extractedId) {
              setVideoId(extractedId);
            } else {
              toast.error('URL de video no válida');
              console.error('No se pudo extraer el ID del video de:', routeData.video_url);
            }
          } else {
            toast.error('Este nivel no tiene un video asignado');
            console.error('No hay video_url en la ruta:', routeId);
          }
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
    // Solo inicializar el reproductor si tenemos un videoId
    if (!videoId) return;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('yt-player', {
        videoId: videoId, // Usar el videoId dinámico
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
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

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

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

  // Si no hay video, mostrar mensaje
  if (!videoId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Video no disponible
            </h2>
            <p className="text-gray-600 mb-4">
              Este nivel no tiene un video asignado o la URL no es válida.
            </p>
            <Button
              onClick={() => navigate(courseId ? `/student/course/${courseId}` : '/courses')}
            >
              Volver a Cursos
            </Button>
          </CardContent>
        </Card>
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
              <div className="bg-slate-100 rounded-lg overflow-hidden shadow-inner">
                <div id="yt-player" className="w-full h-64 md:h-96"></div>
              </div>
            </div>

            {/* Información del video */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Video ID:</span> {videoId}
              </p>
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
                {videoStarted ? 'Reproduciendo video...' : 'Ver el video completo para continuar'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoLevel1;
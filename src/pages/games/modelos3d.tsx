import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Box, Rotate3D, Info } from 'lucide-react';

const Sketchfab3DViewer = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const viewerApiRef = useRef<any>(null);

  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [model3dUrl, setModel3dUrl] = useState('');
  const [modelId, setModelId] = useState('');
  const [loading, setLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [viewTime, setViewTime] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [canComplete, setCanComplete] = useState(false);

  // Tiempo mínimo de visualización en segundos
  const MIN_VIEW_TIME = 30;

  // ============================================
  // Función auxiliar para extraer Model ID de Sketchfab
  // ============================================
  const extractSketchfabModelId = (url: string): string | null => {
    try {
      // Patrones comunes de URLs de Sketchfab
      const patterns = [
        /sketchfab\.com\/3d-models\/[^\/]+-([a-f0-9]{32})/i,
        /sketchfab\.com\/models\/([a-f0-9]{32})/i,
        /^([a-f0-9]{32})$/i // ID directo
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      return null;
    } catch (error) {
      console.error('Error extrayendo model ID:', error);
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
          // Obtener datos de la ruta incluyendo model_3d_url
          const { data: routeData, error: routeError } = await supabase
            .from('routes')
            .select('course_id, model_3d_url')
            .eq('id', routeId)
            .single();

          if (routeError) throw routeError;

          setCourseId(routeData.course_id);

          // Verificar y procesar model_3d_url
          if (routeData.model_3d_url) {
            setModel3dUrl(routeData.model_3d_url);
            const extractedId = extractSketchfabModelId(routeData.model_3d_url);
            
            if (extractedId) {
              setModelId(extractedId);
            } else {
              toast.error('URL de modelo 3D no válida');
              console.error('No se pudo extraer el ID del modelo de:', routeData.model_3d_url);
            }
          } else {
            toast.error('Este nivel no tiene un modelo 3D asignado');
            console.error('No hay model_3d_url en la ruta:', routeId);
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
  // Configuración del visor de Sketchfab
  // ============================================
  useEffect(() => {
    if (!modelId || !iframeRef.current) return;

    // Cargar Sketchfab Viewer API
    const script = document.createElement('script');
    script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    script.async = true;
    
    script.onload = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const client = new (window as any).Sketchfab(iframe);

      client.init(modelId, {
        success: (api: any) => {
          viewerApiRef.current = api;
          
          api.start(() => {
            setModelLoaded(true);
            toast.success('Modelo 3D cargado correctamente');
            
            // Detectar interacciones
            api.addEventListener('viewerready', () => {
              console.log('Viewer ready');
            });

            api.addEventListener('click', () => {
              setIsInteracting(true);
            });
          });
        },
        error: () => {
          toast.error('Error al cargar el modelo 3D');
        },
        autostart: 1,
        preload: 1,
        ui_controls: 1,
        ui_infos: 1,
        ui_inspector: 0,
        ui_stop: 0,
        ui_hint: 2,
        ui_help: 1,
        ui_settings: 1,
        ui_vr: 0,
        ui_ar: 0,
        ui_annotations: 1,
        scrollwheel: 1,
        transparent: 0,
        autospin: 0.2,
      });
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [modelId]);

  // ============================================
  // Contador de tiempo de visualización
  // ============================================
  useEffect(() => {
    if (!modelLoaded) return;

    const interval = setInterval(() => {
      setViewTime((prev) => {
        const newTime = prev + 1;
        if (newTime >= MIN_VIEW_TIME && isInteracting) {
          setCanComplete(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [modelLoaded, isInteracting]);

  // ============================================
  // Manejo de progreso
  // ============================================
  const handleCompleteLevel = async () => {
    if (!canComplete) {
      toast.warning(`Debes interactuar con el modelo por al menos ${MIN_VIEW_TIME} segundos`);
      return;
    }

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

  // ============================================
  // Funciones de control del modelo
  // ============================================
  const resetCamera = () => {
    if (viewerApiRef.current) {
      viewerApiRef.current.setCameraLookAt([0, 0, 10], [0, 0, 0], 1);
      toast.info('Cámara reiniciada');
    }
  };

  const toggleAutoRotate = () => {
    if (viewerApiRef.current) {
      viewerApiRef.current.getAnnotationList((err: any, annotations: any) => {
        if (!err) {
          console.log('Annotations:', annotations);
        }
      });
      toast.info('Usa el mouse para rotar el modelo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Rotate3D className="w-16 h-16 mx-auto mb-4 text-indigo-600 animate-spin" />
          <p className="text-gray-600">Cargando modelo 3D...</p>
        </div>
      </div>
    );
  }

  // Si no hay modelo, mostrar mensaje
  if (!modelId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Box className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Modelo 3D no disponible
            </h2>
            <p className="text-gray-600 mb-4">
              Este nivel no tiene un modelo 3D asignado o la URL no es válida.
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

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ============================================
  // Render principal
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-xl border-t-4 border-purple-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Box className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Exploración de Modelo 3D
                  </h1>
                  <p className="text-gray-600">
                    Interactúa con el modelo para completar el nivel
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-2">
                  <Rotate3D className="w-4 h-4 mr-2 inline" />
                  {formatTime(viewTime)}
                </Badge>
                <Badge className={`px-4 py-2 ${
                  canComplete 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {canComplete ? '✓ Completado' : `${MIN_VIEW_TIME - viewTime}s restantes`}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visor 3D */}
        <Card className="mb-6 shadow-xl">
          <CardContent className="p-6">
            <div className="mb-4">
              <Badge className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-100">
                <Rotate3D className="w-4 h-4 mr-2 inline" /> Modelo Interactivo 3D
              </Badge>
            </div>

            {/* Iframe de Sketchfab */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <iframe
                ref={iframeRef}
                id="sketchfab-viewer"
                className="w-full h-[500px] md:h-[600px]"
                frameBorder="0"
                allow="autoplay; fullscreen; vr"
                allowFullScreen
              />
              
              {!modelLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <div className="text-center">
                    <Rotate3D className="w-12 h-12 mx-auto mb-4 text-white animate-spin" />
                    <p className="text-white font-semibold">Cargando modelo 3D...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controles */}
            <div className="mt-4 flex gap-3 flex-wrap">
              <Button
                onClick={resetCamera}
                variant="outline"
                size="sm"
                disabled={!modelLoaded}
              >
                <Rotate3D className="w-4 h-4 mr-2" />
                Reiniciar Vista
              </Button>
              
              <Button
                onClick={toggleAutoRotate}
                variant="outline"
                size="sm"
                disabled={!modelLoaded}
              >
                <Box className="w-4 h-4 mr-2" />
                Información
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instrucciones */}
        <Card className="mb-6 shadow-lg border-l-4 border-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">
                  Cómo interactuar:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-2xl">🖱️</span>
                    <span><strong>Click izquierdo + arrastrar:</strong> Rotar el modelo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-2xl">🖱️</span>
                    <span><strong>Click derecho + arrastrar:</strong> Mover el modelo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    <span><strong>Scroll:</strong> Acercar o alejar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-2xl">📌</span>
                    <span><strong>Click en puntos:</strong> Ver anotaciones (si hay)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información del modelo */}
        <Card className="mb-6 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Model ID:</p>
                <code className="text-xs bg-white px-3 py-1 rounded border">
                  {modelId}
                </code>
              </div>
              <a
                href={`https://sketchfab.com/3d-models/${modelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 text-sm font-semibold"
              >
                Ver en Sketchfab ↗
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Botón de completar */}
        <Card className="shadow-xl">
          <CardContent className="p-6">
            {canComplete ? (
              <Button
                onClick={handleCompleteLevel}
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-lg py-6"
              >
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Completar Nivel
              </Button>
            ) : (
              <Button
                disabled
                size="lg"
                className="w-full bg-gradient-to-r from-slate-400 to-gray-500 text-white text-lg py-6 opacity-70"
              >
                {modelLoaded 
                  ? `Explora el modelo por ${MIN_VIEW_TIME - viewTime}s más...` 
                  : 'Cargando modelo 3D...'}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sketchfab3DViewer;
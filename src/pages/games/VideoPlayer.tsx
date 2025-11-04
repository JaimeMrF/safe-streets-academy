import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VideoPlayer = () => {
  const navigate = useNavigate();

  // ⚠️⚠️⚠️ INSTRUCCIONES PARA AGREGAR VIDEO ⚠️⚠️⚠️
  // 
  // 1. Ve a YouTube y encuentra tu video
  // 2. Haz clic en "Compartir" -> "Insertar"
  // 3. Copia la URL que aparece en el iframe (algo como: https://www.youtube.com/embed/ABC123)
  // 4. PEGALA EN LA LÍNEA 33 DONDE DICE "VIDEO_ID_AQUI"
  // 
  // ⚠️ IMPORTANTE: Usa el formato /embed/, NO el formato /watch?v=
  // ✅ CORRECTO: https://www.youtube.com/embed/dQw4w9WgXcQ
  // ❌ INCORRECTO: https://www.youtube.com/watch?v=dQw4w9WgXcQ

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <Button onClick={() => navigate(-1)} className="mb-4 md:mb-6">Volver</Button>
        
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {/* 
              ⚠️⚠️⚠️ AQUI PONES EL LINK DE TU VIDEO ⚠️⚠️⚠️
              Cambia "VIDEO_ID_AQUI" por el ID de tu video de YouTube
              
              Ejemplo: https://www.youtube.com/embed/dQw4w9WgXcQ
            */}
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
                title="Video Educativo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoPlayer;
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VideoPlayer = () => {
  const navigate = useNavigate();

  // INSTRUCCIONES PARA AGREGAR VIDEO:
  // Reemplaza la URL en el src del iframe con tu video de YouTube
  // Formato: https://www.youtube.com/embed/VIDEO_ID
  // Ejemplo: https://www.youtube.com/embed/dQw4w9WgXcQ

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate(-1)} className="mb-6">Volver</Button>
        
        <Card>
          <CardContent className="p-0">
            {/* CAMBIA ESTA URL POR TU VIDEO */}
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
              title="Video Educativo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoPlayer;
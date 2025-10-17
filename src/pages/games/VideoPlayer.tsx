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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <Button onClick={() => navigate(-1)} className="mb-4 md:mb-6">Volver</Button>
        
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {/* CAMBIA ESTA URL POR TU VIDEO 
                Formato: https://www.youtube.com/embed/VIDEO_ID
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
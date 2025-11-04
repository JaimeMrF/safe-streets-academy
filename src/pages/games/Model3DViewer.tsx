import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Model3DViewer = () => {
  const navigate = useNavigate();

  // ⚠️⚠️⚠️ INSTRUCCIONES PARA MODELO 3D ⚠️⚠️⚠️
  // 
  // OPCIÓN 1: Usar Sketchfab (RECOMENDADO)
  // 1. Sube tu modelo 3D (.glb, .obj, etc.) a Sketchfab.com
  // 2. Una vez subido, haz clic en "Share" -> "Embed"
  // 3. Copia la URL del iframe (https://sketchfab.com/models/TU_ID_AQUI/embed)
  // 4. PEGALA EN LA LÍNEA 37 DONDE DICE "a643a6b86d5a4955af17d4f091a55090"
  // 
  // OPCIÓN 2: Usar otro servicio
  // Puedes usar cualquier servicio que te dé un embed link (iframe)
  // Solo cambia la URL completa en la línea 37
  //
  // ⚠️ El modelo actual es un ejemplo de Sketchfab

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <Button onClick={() => navigate(-1)} className="mb-4 md:mb-6">Volver</Button>
        
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {/* 
              ⚠️⚠️⚠️ AQUI PONES EL LINK DE TU MODELO 3D ⚠️⚠️⚠️
              
              Cambia el ID "a643a6b86d5a4955af17d4f091a55090" por el ID de tu modelo
              
              Formato Sketchfab: https://sketchfab.com/models/TU_ID_AQUI/embed
            */}
            <div className="relative" style={{ paddingBottom: "75%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://sketchfab.com/models/a643a6b86d5a4955af17d4f091a55090/embed"
                title="Modelo 3D Interactivo"
                allow="autoplay; fullscreen; vr"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Model3DViewer;
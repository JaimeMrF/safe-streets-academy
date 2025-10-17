import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Model3DViewer = () => {
  const navigate = useNavigate();

  // INSTRUCCIONES PARA MODELO 3D:
  // 1. Sube tu modelo .glb a Sketchfab o similar
  // 2. Obtén el embed code
  // 3. Reemplaza el iframe src con tu URL de modelo
  // Ejemplo Sketchfab: https://sketchfab.com/models/YOUR_MODEL_ID/embed

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <Button onClick={() => navigate(-1)} className="mb-4 md:mb-6">Volver</Button>
        
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0">
            {/* CAMBIA ESTA URL POR TU MODELO 3D 
                1. Sube tu modelo .glb a Sketchfab o similar
                2. Obtén el embed code
                3. Reemplaza el iframe src con tu URL
                Ejemplo Sketchfab: https://sketchfab.com/models/YOUR_MODEL_ID/embed
            */}
            <div className="relative" style={{ paddingBottom: "75%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://sketchfab.com/models/URL_DEL_MODELO/embed"
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
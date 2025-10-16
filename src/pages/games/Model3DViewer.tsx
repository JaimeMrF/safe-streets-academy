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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate(-1)} className="mb-6">Volver</Button>
        
        <Card>
          <CardContent className="p-0">
            {/* CAMBIA ESTA URL POR TU MODELO 3D */}
            <iframe
              width="100%"
              height="600"
              src="https://sketchfab.com/models/URL_DEL_MODELO/embed"
              title="Modelo 3D Interactivo"
              allow="autoplay; fullscreen; vr"
              className="rounded-lg"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Model3DViewer;
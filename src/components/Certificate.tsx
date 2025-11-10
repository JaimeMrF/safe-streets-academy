import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download } from "lucide-react";
import viaSafeLogo from "@/assets/viasafe-logo.webp";

interface CertificateProps {
  studentName: string;
  educationLevel: string;
  completionDate: string;
  averageScore: number;
}

const Certificate = ({ studentName, educationLevel, completionDate, averageScore }: CertificateProps) => {
  const getEducationLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      preescolar: "Preescolar",
      primaria: "Primaria",
      secundaria: "Secundaria",
      bachillerato: "Bachillerato",
    };
    return labels[level] || level;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-4 border-primary shadow-2xl bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <CardContent className="p-12 text-center" id="certificate">
          <img src={viaSafeLogo} alt="ViaSafe" className="h-20 mx-auto mb-6" />
          
          <div className="mb-8">
            <Award className="h-24 w-24 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Certificado de Excelencia
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          </div>

          <div className="space-y-6 mb-8">
            <p className="text-xl text-muted-foreground">
              Se otorga el presente certificado a
            </p>
            
            <h2 className="text-4xl font-bold text-foreground">
              {studentName}
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Por completar exitosamente todos los cursos de <strong>Seguridad Vial</strong> del nivel{" "}
              <strong>{getEducationLevelLabel(educationLevel)}</strong> con una puntuación promedio de{" "}
              <strong className="text-primary">{averageScore}%</strong>
            </p>

            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Fecha de Certificación</p>
              <p className="text-lg font-semibold">{new Date(completionDate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </div>

          <div className="border-t-2 border-primary/20 pt-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold mb-2">Plataforma Educativa</p>
                <p className="text-muted-foreground">ViaSafe Educación</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Programa</p>
                <p className="text-muted-foreground">Seguridad Vial Integral</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Nivel Completado</p>
                <p className="text-muted-foreground">{getEducationLevelLabel(educationLevel)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-6 print:hidden">
        <Button onClick={handlePrint} size="lg" className="gap-2">
          <Download className="h-4 w-4" />
          Descargar Certificado
        </Button>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate, #certificate * {
            visibility: visible;
          }
          #certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Certificate;

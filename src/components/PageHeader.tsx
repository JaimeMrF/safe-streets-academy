import { Button } from "@/components/ui/button";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  backTo?: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  backTo,
  actions 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 space-y-4">
      {backTo && (
        <Button
          variant="ghost"
          onClick={() => navigate(backTo)}
          className="hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
};

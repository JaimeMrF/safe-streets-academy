import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export const LoadingSpinner = ({ 
  size = "md", 
  message = "Cargando...",
  className 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-16 h-16 border-4",
    lg: "w-24 h-24 border-4"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div 
        className={cn(
          "border-primary border-t-transparent rounded-full animate-spin",
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="text-muted-foreground text-center">{message}</p>
      )}
    </div>
  );
};

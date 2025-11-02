import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

type UserRole = "admin" | "teacher" | "student" | null;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadUserRole(session.user.id);
        } else {
          setRole(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        await loadUserRole(user.id);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setRole(data?.role as UserRole);
    } catch (error) {
      console.error("Error loading user role:", error);
      setRole(null);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      toast.success("Sesión cerrada");
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const requireAuth = (redirectTo: string = "/auth") => {
    if (!user && !loading) {
      toast.error("Debes iniciar sesión");
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  const requireRole = (requiredRole: UserRole, redirectTo: string = "/courses") => {
    if (!loading && role !== requiredRole) {
      toast.error("No tienes permisos para acceder a esta página");
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return {
    user,
    role,
    loading,
    logout,
    requireAuth,
    requireRole,
    isAdmin: role === "admin",
    isTeacher: role === "teacher",
    isStudent: role === "student",
  };
};

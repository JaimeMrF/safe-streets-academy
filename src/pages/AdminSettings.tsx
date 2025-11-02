// src/pages/AdminSettings.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Settings, Bell, Lock, Database, Shield, Save } from "lucide-react";
import { toast } from "sonner";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Configuraciones
  const [settings, setSettings] = useState({
    siteName: "ViaSafe Educación",
    siteEmail: "admin@viasafe.com",
    allowRegistration: true,
    requireEmailVerification: false,
    enableNotifications: true,
    maintenanceMode: false
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Debes iniciar sesión");
      navigate("/auth");
      return;
    }

    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (userRole?.role !== "admin") {
      toast.error("No tienes permisos de administrador");
      navigate("/courses");
      return;
    }

    setLoading(false);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Aquí guardarías las configuraciones en la base de datos
      // Por ahora solo simulamos el guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Configuración guardada exitosamente");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Error al guardar configuración");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Dashboard
        </Button>

        <Card className="border-2 border-white/50 shadow-2xl backdrop-blur-sm bg-white/95 mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-gray-700">
                  Configuración del Sistema
                </CardTitle>
                <CardDescription>
                  Administra las opciones generales de la plataforma
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Configuración General */}
        <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-600" />
              <CardTitle className="text-lg">Configuración General</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="site-name">Nombre del Sitio</Label>
              <Input
                id="site-name"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="h-11 border-2 border-slate-200 focus:border-slate-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-email">Email del Administrador</Label>
              <Input
                id="site-email"
                type="email"
                value={settings.siteEmail}
                onChange={(e) => setSettings({...settings, siteEmail: e.target.value})}
                className="h-11 border-2 border-slate-200 focus:border-slate-500 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Acceso */}
        <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-600" />
              <CardTitle className="text-lg">Control de Acceso</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Permitir Registro de Usuarios</Label>
                <p className="text-sm text-slate-500">
                  Los usuarios pueden crear nuevas cuentas
                </p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => setSettings({...settings, allowRegistration: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Verificación de Email</Label>
                <p className="text-sm text-slate-500">
                  Requerir verificación de email al registrarse
                </p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => setSettings({...settings, requireEmailVerification: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Mantenimiento</Label>
                <p className="text-sm text-slate-500">
                  Bloquear acceso al sitio excepto para administradores
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Notificaciones */}
        <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-600" />
              <CardTitle className="text-lg">Notificaciones</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Habilitar Notificaciones</Label>
                <p className="text-sm text-slate-500">
                  Enviar notificaciones por email a los usuarios
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Base de Datos */}
        <Card className="border-2 border-white/50 shadow-xl backdrop-blur-sm bg-white/95 mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-slate-600" />
              <CardTitle className="text-lg">Base de Datos</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-3">
                Herramientas de mantenimiento de la base de datos
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => toast.info("Función próximamente")}
                  className="flex-1"
                >
                  Respaldar BD
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Función próximamente")}
                  className="flex-1"
                >
                  Optimizar BD
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
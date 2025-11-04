# 🚀 GUÍA DE PUESTA EN PRODUCCIÓN

## ⚠️ IMPORTANTE: DESARROLLO LOCAL vs PRODUCCIÓN

**Este proyecto USA Supabase Cloud vía Lovable actualmente.**

Si quieres desarrollo 100% LOCAL y deployment SIN Lovable Cloud:
👉 **Lee `DEPLOY-GRATIS.md`** - Guía completa de deployment gratuito

---

## 📋 SEPARACIÓN BACKEND / FRONTEND

### ✅ FRONTEND (React + Vite)
**Ubicación:** Toda la carpeta `src/`

**Archivos principales:**
- `src/` - Todo el código de la interfaz de usuario
- `public/` - Archivos estáticos (imágenes, robots.txt)
- `index.html` - Punto de entrada HTML
- `vite.config.ts` - Configuración de Vite
- `tailwind.config.ts` - Configuración de estilos

**Despliegue Frontend (opciones):**
1. **Netlify** (Recomendado)
   ```bash
   npm run build
   # Sube la carpeta dist/ a Netlify
   ```

2. **Vercel**
   ```bash
   npm run build
   # Conecta tu repositorio con Vercel
   ```

3. **GitHub Pages**
   ```bash
   npm run build
   # Configura GitHub Actions para desplegar dist/
   ```

---

### ✅ BACKEND (Supabase)
**Ubicación:** Carpeta `supabase/`

**Archivos principales:**
- `supabase/config.toml` - Configuración de Supabase
- `supabase/init.sql` - Inicialización de base de datos
- `supabase/seed.sql` - Datos de ejemplo

**Tu proyecto ya está conectado a Supabase Cloud:**
- URL: `https://zvzsczvlnecketlpxilp.supabase.co`
- Ya tienes el backend funcionando ✅

**Para un proyecto nuevo:**
1. Crear cuenta en [Supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Copiar URL y API Keys
4. Actualizar `.env` con tus credenciales

---

## 🎨 CUSTOMIZACIÓN RÁPIDA

### 1️⃣ CAMBIAR COLORES, LOGOS Y TEXTOS
**Archivo:** `src/config/site.config.ts`

```typescript
// ⚠️ AQUI CAMBIAS TODO ⚠️
export const siteConfig = {
  name: "TU NOMBRE AQUI",           // Nombre del sitio
  shortName: "TN",                  // Iniciales para logo
  colors: {
    primary: "220 90% 56%",         // Color principal (HSL)
    // ... más colores
  },
  // ... toda la configuración
};
```

### 2️⃣ AGREGAR VIDEOS DE YOUTUBE
**Archivo:** `src/config/site.config.ts`

```typescript
videos: [
  {
    title: "Tu Video",
    // ⚠️ AQUI PONES EL LINK ⚠️
    youtubeEmbedUrl: "https://www.youtube.com/embed/TU_VIDEO_ID",
    // ... resto de configuración
  }
]
```

### 3️⃣ AGREGAR RECURSOS DESCARGABLES
**Archivo:** `src/config/site.config.ts`

```typescript
resources: [
  {
    title: "Tu Recurso",
    // ⚠️ AQUI PONES EL LINK DEL PDF/ZIP ⚠️
    downloadUrl: "/resources/tu-archivo.pdf"
    // ... resto de configuración
  }
]
```

### 4️⃣ CAMBIAR LOGO E IMÁGENES
**Ubicación:** Carpeta `public/`

1. Coloca tus imágenes en `public/`
2. Actualiza `src/config/site.config.ts`:
   ```typescript
   logo: {
     url: "/tu-logo.png",  // ⚠️ AQUI TU LOGO
     alt: "Tu Logo"
   }
   ```

---

## 🔐 GESTIÓN DE USUARIOS Y ROLES

### **ESTUDIANTES** 🎓
**Capacidades:**
- Ver y completar cursos
- Jugar minijuegos
- Ver videos y modelos 3D
- Descargar recursos
- Ver su progreso y certificados

**Base de datos:**
- Tabla `profiles` - Información del estudiante
- Tabla `student_progress` - Progreso en cada curso
- Tabla `user_roles` - Rol asignado

### **PROFESORES** 👨‍🏫
**Capacidades:**
- Ver lista de todos los estudiantes
- Ver progreso individual y colectivo
- Métricas y estadísticas
- Filtrar por nivel educativo

**Acceso:** `/teacher/dashboard`

### **ADMINISTRADORES** 🛡️
**Capacidades:**
- CREAR usuarios reales
- ELIMINAR usuarios reales
- Gestionar cursos
- Crear rutas/niveles de juegos
- Gestionar profesores

**Acceso:** `/admin/dashboard`

---

## 📊 ESTRUCTURA DE LA BASE DE DATOS

### Tablas principales:

1. **`profiles`** - Información de usuarios
   - `id` (UUID)
   - `first_name`, `last_name`
   - `email`
   - `education_level`

2. **`user_roles`** - Roles de usuarios
   - `user_id` (FK a profiles)
   - `role` (student, teacher, admin)

3. **`courses`** - Cursos disponibles
   - `id` (UUID)
   - `name`, `description`
   - `education_level`
   - `color`, `icon`

4. **`routes`** - Niveles/juegos de cada curso
   - `id` (UUID)
   - `course_id` (FK a courses)
   - `game_type` (memory, quiz, video, model3d)
   - `level_order`
   - `game_config` (JSON con configuración)

5. **`student_progress`** - Progreso de estudiantes
   - `student_id` (FK a profiles)
   - `route_id` (FK a routes)
   - `completed`, `score`
   - `best_accuracy_percentage`

---

## 🚀 DESPLIEGUE PASO A PASO

### 1. Preparar Frontend
```bash
# Instalar dependencias
npm install

# Compilar para producción
npm run build
```

### 2. Configurar Variables de Entorno
**Archivo:** `.env`
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-key-publica
```

### 3. Desplegar Frontend
- Sube la carpeta `dist/` a tu servicio de hosting
- O conecta tu repositorio con Netlify/Vercel

### 4. Configurar Backend (Supabase)
- Ya está configurado si usas el proyecto actual
- Para nuevo proyecto: importa los archivos SQL de `supabase/`

---

## ✅ CHECKLIST ANTES DE PRODUCCIÓN

- [ ] Cambiar nombre y colores en `site.config.ts`
- [ ] Agregar tus videos reales
- [ ] Subir tus archivos PDF/ZIP
- [ ] Cambiar logo e imágenes
- [ ] Crear usuario admin inicial
- [ ] Probar registro de estudiantes
- [ ] Probar juegos y progreso
- [ ] Verificar que todos los links funcionen
- [ ] Compilar y probar build de producción
- [ ] Configurar dominio personalizado

---

## 🔧 COMANDOS ÚTILES

```bash
# Desarrollo local
npm run dev

# Compilar para producción
npm run build

# Vista previa del build
npm run preview

# Linter
npm run lint
```

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa los logs del navegador (F12)
2. Verifica que las variables de entorno estén correctas
3. Asegúrate que Supabase esté funcionando
4. Revisa la documentación de [Supabase](https://supabase.com/docs)

---

## 🎯 RECORDATORIO IMPORTANTE

**TODO ES CONFIGURABLE DESDE:**
- `src/config/site.config.ts` - Configuración general
- `.env` - Credenciales de backend
- `public/` - Archivos estáticos

**NO NECESITAS TOCAR OTROS ARCHIVOS PARA CUSTOMIZAR** ✅

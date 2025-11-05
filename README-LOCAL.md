# ViaSafe - Plataforma Educativa de Seguridad Vial (LOCAL)

## 🚀 INSTALACIÓN Y EJECUCIÓN LOCAL

### Requisitos Previos
- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **Docker Desktop** ([Descargar](https://www.docker.com/products/docker-desktop))
- **Git** ([Descargar](https://git-scm.com/))

---

## 📦 PASO 1: Instalar Supabase CLI

```bash
npm install -g supabase
```

---

## 🐳 PASO 2: Iniciar Docker

1. Abre **Docker Desktop**
2. Asegúrate de que Docker esté corriendo (icono verde)

---

## 💾 PASO 3: Clonar e Instalar Dependencias

```bash
# Clonar el repositorio (o descomprimir el ZIP)
cd viasafe-project

# Instalar dependencias
npm install
```

---

## 🗄️ PASO 4: Iniciar Base de Datos Local

```bash
# Iniciar Supabase local (primera vez toma unos minutos)
supabase start
```

**IMPORTANTE**: Guarda las credenciales que aparecen, especialmente:
- `API URL`: http://localhost:54321
- `anon key`: (copia esta clave)
- `service_role key`: (copia esta clave)

---

## 🔧 PASO 5: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

---

## 🎮 PASO 6: Iniciar la Aplicación

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 👥 CUENTAS DE PRUEBA

### Estudiante
- **Email**: estudiante@test.com
- **Password**: password123
- **Nivel**: Primaria

### Profesor
- **Email**: profesor@test.com
- **Password**: password123

O crea nuevas cuentas desde:
- **Estudiantes**: `/auth`
- **Profesores**: `/teacher/register`

---

## 🎯 FUNCIONALIDADES DISPONIBLES

### Para Estudiantes:
- ✅ Sistema de autenticación completo
- ✅ Selección de cursos por nivel educativo
- ✅ Juegos interactivos:
  - 🧠 Memory (memorama)
  - 📝 Quiz (preguntas y respuestas)
  - 🎥 Videos educativos
  - 🏗️ Modelos 3D interactivos
- ✅ Sistema de progreso y puntuaciones
- ✅ Biblioteca de recursos multimedia
- ✅ Sistema de niveles bloqueados/desbloqueados
- ✅ Responsive (funciona en móvil, tablet y PC)

### Para Profesores:
- ✅ Registro independiente
- ✅ Dashboard con estadísticas
- ✅ Visualización de progreso de estudiantes
- ✅ Métricas por alumno

---

## 🎨 PERSONALIZAR CONTENIDO

### Videos de YouTube
Edita: `src/pages/games/VideoPlayer.tsx`
```typescript
// Línea 27: Cambia la URL del video
src="https://www.youtube.com/embed/TU_VIDEO_ID"
```

### Modelos 3D
Edita: `src/pages/games/Model3DViewer.tsx`
```typescript
// Línea 30: Cambia la URL del modelo
src="https://sketchfab.com/models/TU_MODELO_ID/embed"
```

Sube modelos 3D gratis en:
- [Sketchfab](https://sketchfab.com/)
- [CGTrader](https://www.cgtrader.com/)

---

## 🗄️ GESTIONAR BASE DE DATOS

### Ver Base de Datos
```bash
# Abrir Supabase Studio (interfaz web)
http://localhost:54323
```

### Resetear Base de Datos
```bash
supabase db reset
```

### Detener Base de Datos
```bash
supabase stop
```

---

## 🏗️ COMPILAR PARA PRODUCCIÓN

```bash
# Crear build de producción
npm run build

# La carpeta 'dist' contendrá los archivos finales
```

### Desplegar en Servidor Local

1. **Opción 1: Servidor Simple**
```bash
npm install -g serve
serve -s dist -p 3000
```

2. **Opción 2: Nginx**
```nginx
server {
    listen 80;
    server_name localhost;
    root /ruta/a/tu/proyecto/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. **Opción 3: Apache**
```apache
<VirtualHost *:80>
    DocumentRoot "/ruta/a/tu/proyecto/dist"
    
    <Directory "/ruta/a/tu/proyecto/dist">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

---

## 📊 ESTRUCTURA DEL PROYECTO

```
viasafe-project/
├── src/
│   ├── pages/
│   │   ├── Auth.tsx                    # Login estudiantes
│   │   ├── TeacherRegistration.tsx     # Registro profesores
│   │   ├── CourseSelector.tsx          # Selección de cursos
│   │   ├── StudentCourse.tsx           # Rutas del curso
│   │   ├── TeacherDashboard.tsx        # Dashboard profesores
│   │   ├── ResourceLibrary.tsx         # Biblioteca recursos
│   │   └── games/
│   │       ├── MemoryGame.tsx          # Juego de memoria
│   │       ├── QuizGame.tsx            # Juego de quiz
│   │       ├── VideoPlayer.tsx         # Reproductor videos
│   │       └── Model3DViewer.tsx       # Visor 3D
│   ├── components/ui/                  # Componentes UI
│   ├── integrations/supabase/          # Cliente Supabase
│   └── index.css                       # Estilos globales
├── supabase/
│   └── init.sql                        # Schema base de datos
└── public/                             # Archivos estáticos
```

---

## ❓ SOLUCIÓN DE PROBLEMAS

### Error: "Docker no está corriendo"
- Abre Docker Desktop y espera a que inicie

### Error: "Puerto 54321 ya está en uso"
```bash
supabase stop
supabase start
```

### Error: "Cannot find module @supabase/supabase-js"
```bash
npm install
```

### Los juegos no guardan progreso
- Verifica que Supabase esté corriendo: `supabase status`
- Revisa la consola del navegador (F12)

### Resetear todo
```bash
supabase stop
supabase db reset
supabase start
npm run dev
```

---

## 🔒 SEGURIDAD

- ✅ Row Level Security (RLS) habilitado
- ✅ Roles separados (admin/teacher/student)
- ✅ Autenticación con JWT
- ✅ Políticas de acceso por usuario

---

## 📝 NOTAS IMPORTANTES

1. **Supabase local** usa Docker y consume ~2GB de RAM
2. Los datos se persisten entre reinicios (a menos que uses `db reset`)
3. La primera vez que ejecutes `supabase start` tardará más (descarga imágenes Docker)
4. Puedes tener múltiples proyectos Supabase locales en diferentes puertos

---

## 📞 SOPORTE

Si encuentras algún problema:
1. Revisa la consola del navegador (F12)
2. Ejecuta `supabase status` para verificar servicios
3. Revisa los logs: `supabase logs`

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [x] Docker Desktop instalado y corriendo
- [x] Node.js 18+ instalado
- [x] Supabase CLI instalado (`npm install -g supabase`)
- [x] `npm install` ejecutado
- [ ] `supabase start` ejecutado (guarda las credenciales)
- [ ] Archivo `.env.local` creado con las credenciales
- [ ] `npm run dev` ejecutado
- [ ] Aplicación abierta en http://localhost:5173
- [ ] Puedes crear cuenta de estudiante
- [ ] Puedes crear cuenta de profesor
- [ ] Los juegos funcionan correctamente
- [ ] El progreso se guarda

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

Tu plataforma ViaSafe está 100% funcional y lista para usar localmente.

Para desplegar en un servidor:
1. Ejecuta `npm run build`
2. Copia la carpeta `dist` a tu servidor
3. Configura Nginx/Apache para servir archivos estáticos
4. Asegúrate de que Supabase esté accesible desde el servidor

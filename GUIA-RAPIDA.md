# 🚀 GUÍA RÁPIDA - ViaSafe LOCAL

## Instalación en 5 Pasos

### 1️⃣ Instalar Docker Desktop
Descarga e instala: https://www.docker.com/products/docker-desktop
**IMPORTANTE**: Abre Docker Desktop y espera a que arranque

### 2️⃣ Instalar Supabase CLI
```bash
npm install -g supabase
```

### 3️⃣ Instalar Dependencias del Proyecto
```bash
cd viasafe-project
npm install
```

### 4️⃣ Iniciar Base de Datos Local
```bash
supabase start
```
**⏱️ La primera vez tarda 3-5 minutos**

### 5️⃣ Crear Archivo de Configuración
Crea un archivo `.env.local` con:
```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

---

## ▶️ Ejecutar la Aplicación

```bash
npm run dev
```

Abre en tu navegador: **http://localhost:5173**

---

## 👥 Cuentas de Prueba

### Estudiante
- Email: `estudiante@test.com`
- Password: `password123`

### Profesor
- Email: `profesor@test.com`
- Password: `password123`

---

## 🎮 Juegos Disponibles

✅ **Memory Game** - Memorama clásico con emojis
✅ **Memoria 4x4** - Memorama con señales de tránsito
✅ **Quiz Game** - Preguntas de seguridad vial
✅ **Video Player** - Videos educativos (YouTube)
✅ **3D Model Viewer** - Modelos 3D interactivos

---

## 🛠️ Comandos Útiles

### Ver estado de Supabase
```bash
supabase status
```

### Abrir base de datos (interfaz web)
```bash
# Abre en el navegador:
http://localhost:54323
```

### Detener Supabase
```bash
supabase stop
```

### Resetear base de datos
```bash
supabase db reset
```

### Compilar para producción
```bash
npm run build
```

---

## ⚡ Scripts Automáticos (Opcional)

### Linux/Mac
```bash
chmod +x scripts/setup-local.sh
./scripts/setup-local.sh
```

### Windows
```bash
scripts\setup-local.bat
```

---

## ❌ Solución de Problemas Comunes

### "Docker no está corriendo"
➡️ Abre Docker Desktop y espera a que inicie

### "Puerto 54321 ya está en uso"
```bash
supabase stop
supabase start
```

### "Cannot connect to database"
```bash
supabase db reset
```

### Los cambios no se reflejan
```bash
# Ctrl+C para detener
npm run dev
```

---

## 📁 Estructura del Proyecto

```
viasafe-project/
├── src/
│   ├── pages/
│   │   ├── Auth.tsx                    # Login estudiantes
│   │   ├── TeacherRegistration.tsx     # Registro profesores
│   │   ├── CourseSelector.tsx          # Cursos
│   │   ├── StudentCourse.tsx           # Niveles
│   │   ├── TeacherDashboard.tsx        # Dashboard profesor
│   │   ├── ResourceLibrary.tsx         # Videos y modelos
│   │   └── games/
│   │       ├── MemoryGame.tsx          # Memorama simple
│   │       ├── memoria4x4/
│   │       │   └── Memoria4x4.tsx      # Memorama 4x4
│   │       ├── QuizGame.tsx            # Quiz
│   │       ├── VideoPlayer.tsx         # Videos
│   │       └── Model3DViewer.tsx       # Modelos 3D
│   └── integrations/supabase/          # Base de datos
├── supabase/
│   ├── config.toml                     # Config Supabase
│   ├── init.sql                        # Schema DB
│   └── seed.sql                        # Datos prueba
└── scripts/                            # Scripts instalación
```

---

## 🏗️ Compilar para Producción

```bash
# 1. Compilar
npm run build

# 2. Los archivos estarán en /dist

# 3. Servir localmente (testing)
npm install -g serve
serve -s dist -p 3000

# 4. Abrir en navegador
http://localhost:3000
```

---

## 📞 ¿Necesitas Ayuda?

1. Revisa la consola del navegador (F12)
2. Ejecuta `supabase status`
3. Revisa `supabase logs`
4. Lee el archivo completo: `README-LOCAL.md`

---

## ✅ Checklist

- [ ] Docker Desktop instalado y corriendo
- [ ] Node.js 18+ instalado
- [ ] `npm install -g supabase` ejecutado
- [ ] `npm install` ejecutado
- [ ] `supabase start` ejecutado
- [ ] `.env.local` creado
- [ ] `npm run dev` ejecutado
- [ ] Aplicación abierta en http://localhost:5173

---

🎉 **¡LISTO! Tu aplicación está funcionando 100% LOCAL**

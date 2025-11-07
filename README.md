# 🎓 Plataforma Educativa ITAL - Educación Vial

> Sistema integral de educación en seguridad vial para el **Instituto Técnico Alfonso López (ITAL)** de Ocaña, Norte de Santander, Colombia.

![ITAL Logo](https://ital.edu.co/wp-content/uploads/2021/10/logo-ital-500-365x365.webp)

---

## 📋 Índice

1. [Descripción General](#-descripción-general)
2. [Características Principales](#-características-principales)
3. [Tecnologías](#️-tecnologías)
4. [Instalación Local](#-instalación-local)
5. [Personalización](#-personalización)
6. [Deployment GRATUITO](#-deployment-gratuito-frontend--backend)
7. [Estructura del Proyecto](#-estructura-del-proyecto)
8. [Roles y Permisos](#-roles-y-permisos)
9. [Soporte](#-soporte)

---

## 🎯 Descripción General

Plataforma educativa diseñada específicamente para el **ITAL** que proporciona educación en seguridad vial a través de juegos interactivos, videos y evaluaciones adaptadas a diferentes niveles educativos:

- 🧒 **Preescolar**: Señales básicas y colores del semáforo
- 📚 **Primaria**: Normas para peatones y ciclistas
- 🎓 **Secundaria**: Conducción responsable y primeros auxilios
- 🚗 **Bachillerato**: Preparación completa para futuros conductores

### Identidad Institucional ITAL

**Misión**: Formación integral del ser humano mediante investigación, TIC y educación en valores éticos, morales y ambientales.

**Visión**: Ser líder en formación integral, técnica, humana y social, con enfoque empresarial e investigativo.

---

## ✨ Características Principales

### Para Estudiantes
- ✅ **Cursos interactivos** por nivel educativo
- 🎮 **Juegos educativos**: memoria, quiz, modelos 3D
- 📹 **Videos educativos** integrados
- 📊 **Seguimiento de progreso** en tiempo real
- 🏆 **Certificados** al completar cursos

### Para Profesores
- 📈 **Monitoreo de progreso** individual y grupal
- 📊 **Estadísticas detalladas** de desempeño
- 👥 **Gestión de estudiantes**
- 📋 **Reportes exportables**

### Para Administradores
- 🎛️ **Panel de control completo**
- 📚 **Gestión de cursos y niveles**
- 👥 **Administración de usuarios**
- 📊 **Reportes y estadísticas avanzadas**
- ⚙️ **Configuración del sistema**

---

## 🛠️ Tecnologías

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Shadcn/UI** - Componentes UI
- **React Router** - Navegación

### Backend (Supabase)
- **PostgreSQL** - Base de datos
- **Row Level Security (RLS)** - Seguridad
- **Auth** - Autenticación
- **Realtime** - Actualizaciones en tiempo real

---

## 💻 Instalación Local

### Requisitos Previos

- **Node.js** v18+ ([Descargar](https://nodejs.org/))
- **Git** ([Descargar](https://git-scm.com/))
- **Supabase CLI** (opcional para desarrollo local)

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ital-educacion-vial.git
cd ital-educacion-vial
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración LOCAL de Supabase
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_PUBLISHABLE_KEY=tu-clave-local-aqui
```

Para desarrollo local con Supabase local:

```bash
# Instalar Supabase CLI
npm install -g supabase

# Iniciar Supabase local
supabase start

# El CLI te dará las credenciales locales
```

#### 4. Ejecutar el proyecto

```bash
# Modo desarrollo
npm run dev

# El proyecto estará disponible en http://localhost:5173
```

#### 5. Crear usuario administrador inicial

Una vez iniciada la aplicación:

1. Regístrate normalmente en la plataforma
2. Anota tu UUID de usuario
3. Ejecuta en la consola SQL de Supabase:

```sql
-- Asignar rol de administrador
INSERT INTO public.user_roles (user_id, role)
VALUES ('tu-uuid-aqui', 'admin');
```

---

## 🎨 Personalización

### 1. Identidad Institucional

Edita el archivo `src/config/site.config.ts`:

```typescript
export const siteConfig = {
  // Información básica
  name: "ITAL",
  fullName: "Instituto Técnico Alfonso López",
  location: "Ocaña, Norte de Santander, Colombia",
  description: "Plataforma educativa de seguridad vial",
  
  // Logos e imágenes
  logo: {
    url: "https://ital.edu.co/wp-content/uploads/2021/10/logo-ital-500-365x365.webp",
    alt: "Logo ITAL"
  },
  banner: {
    url: "https://ital.edu.co/wp-content/uploads/2021/10/bandera-ital.webp",
    alt: "Bandera ITAL"
  },
  
  // Colores institucionales (HSL)
  colors: {
    primary: "142 76% 36%",  // Verde ITAL
    hover: "142 76% 30%",
    accent: "142 50% 50%",
    secondary: "0 0% 96%"
  },
  
  // Misión y visión
  mission: "Tu misión institucional aquí",
  vision: "Tu visión institucional aquí",
  
  // Contacto
  contact: {
    email: "contacto@ital.edu.co",
    phone: "+57 (5) 123 4567",
    address: "Dirección completa",
    website: "https://ital.edu.co"
  }
}
```

### 2. Colores del Tema

Edita `src/index.css` para cambiar la paleta de colores:

```css
:root {
  /* Color principal (Verde ITAL) */
  --primary: 142 76% 36%;
  --primary-foreground: 0 0% 100%;
  
  /* Colores de fondo */
  --background: 0 0% 100%;
  --foreground: 0 0% 15%;
  
  /* Puedes personalizar todos los colores aquí */
}
```

### 3. Agregar Videos Educativos

En `src/config/site.config.ts`:

```typescript
videos: [
  {
    title: "Seguridad Vial Básica",
    duration: "5:30",
    level: "Primaria",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
    description: "Descripción del video"
  }
]
```

### 4. Recursos Descargables

En `src/config/site.config.ts`:

```typescript
resources: [
  {
    title: "Manual de Seguridad Vial",
    type: "PDF",
    size: "2.5 MB",
    downloadUrl: "/recursos/manual-seguridad-vial.pdf"
  }
]
```

**Nota**: Coloca los archivos en la carpeta `public/recursos/`

### 5. Modificar Niveles Educativos

En `src/config/site.config.ts`:

```typescript
educationLevels: [
  {
    name: "Preescolar",
    ageRange: "3-5 años",
    icon: "🧒",
    color: "#FF6B6B"
  },
  // Agrega más niveles según necesites
]
```

---

## 🚀 Deployment GRATUITO (Frontend + Backend)

### Opción Recomendada: Netlify + Supabase.com

#### Parte 1: Backend (Supabase.com - 100% GRATIS)

##### 1. Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Click en "New Project"

##### 2. Configurar proyecto

```
Nombre del proyecto: ital-educacion-vial
Database Password: [elige un password seguro]
Region: South America (Brasil - más cercano a Colombia)
Plan: Free (0$/mes)
```

##### 3. Migrar base de datos local a la nube

```bash
# Instalar Supabase CLI (si no lo tienes)
npm install -g supabase

# Login en Supabase
supabase login

# Conectar con tu proyecto (obtén el ID en Supabase dashboard)
supabase link --project-ref tu-project-id

# Subir tu base de datos a la nube
supabase db push
```

##### 4. Obtener credenciales

En el dashboard de Supabase → **Settings → API**:

- Copia `Project URL` → será tu `VITE_SUPABASE_URL`
- Copia `anon/public key` → será tu `VITE_SUPABASE_PUBLISHABLE_KEY`

##### 5. Configurar autenticación

En Supabase → **Authentication → Settings**:

```
Site URL: https://tu-sitio.netlify.app
Redirect URLs: https://tu-sitio.netlify.app/**
Enable Email Confirmations: OFF (para pruebas)
```

---

#### Parte 2: Frontend (Netlify - 100% GRATIS)

##### Opción A: Deploy desde GitHub (Recomendado)

###### 1. Subir código a GitHub

```bash
# Inicializar repositorio (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Plataforma ITAL - Primera versión"

# Crear repositorio en GitHub y conectar
git branch -M main
git remote add origin https://github.com/tu-usuario/ital-educacion-vial.git
git push -u origin main
```

###### 2. Conectar con Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita
3. Click en **"Add new site"** → **"Import from Git"**
4. Selecciona tu repositorio de GitHub
5. Configura el build:

```
Build command: npm run build
Publish directory: dist
```

###### 3. Agregar variables de entorno

En Netlify → **Site settings → Environment variables**:

```
VITE_SUPABASE_URL = https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = tu-anon-key-de-supabase
```

###### 4. Deploy

Click en **"Deploy site"** → ¡Listo! 🎉

Tu sitio estará disponible en: `https://tu-sitio.netlify.app`

---

##### Opción B: Deploy manual (sin GitHub)

```bash
# 1. Configurar variables de entorno
echo "VITE_SUPABASE_URL=https://tu-proyecto.supabase.co" > .env
echo "VITE_SUPABASE_PUBLISHABLE_KEY=tu-anon-key" >> .env

# 2. Compilar proyecto
npm run build

# 3. Instalar Netlify CLI
npm install -g netlify-cli

# 4. Login en Netlify
netlify login

# 5. Deploy a producción
netlify deploy --prod --dir=dist
```

---

### Alternativa: Vercel (También 100% GRATIS)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (te pedirá las variables de entorno)
vercel --prod

# Durante el proceso, agrega:
# VITE_SUPABASE_URL = tu-url-de-supabase
# VITE_SUPABASE_PUBLISHABLE_KEY = tu-key-de-supabase
```

---

### Crear Usuario Administrador en Producción

Una vez deployado:

1. Regístrate en tu plataforma en producción
2. Ve al **SQL Editor** en Supabase dashboard
3. Ejecuta:

```sql
-- Primero obtén tu user_id desde Authentication → Users
-- Luego ejecuta:
INSERT INTO public.user_roles (user_id, role)
VALUES ('uuid-del-usuario-admin', 'admin');
```

---

### ✅ Checklist de Deployment

#### Antes de deployar:
- [ ] Proyecto compila sin errores (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Base de datos migrada a Supabase.com
- [ ] Credenciales de Supabase obtenidas

#### Durante el deployment:
- [ ] Variables de entorno agregadas en Netlify/Vercel
- [ ] Build exitoso
- [ ] Sitio desplegado y accesible

#### Después del deployment:
- [ ] Crear usuario administrador inicial
- [ ] Configurar URLs de autenticación en Supabase
- [ ] Probar login/registro
- [ ] Probar funcionalidad de cada rol
- [ ] Verificar que los cursos se muestran correctamente

---

## 📂 Estructura del Proyecto

```
ital-educacion-vial/
├── public/                    # Archivos estáticos
│   ├── recursos/             # PDFs y recursos descargables
│   └── robots.txt
├── src/
│   ├── assets/               # Imágenes y recursos
│   │   └── JUEGO1/          # Imágenes de juegos
│   ├── components/           # Componentes reutilizables
│   │   ├── ui/              # Componentes de UI (shadcn)
│   │   ├── Certificate.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── PageHeader.tsx
│   ├── config/
│   │   └── site.config.ts   # ⭐ Configuración principal
│   ├── hooks/               # Custom React hooks
│   ├── integrations/
│   │   └── supabase/        # Cliente y tipos de Supabase
│   ├── lib/                 # Utilidades
│   ├── pages/               # Páginas de la aplicación
│   │   ├── games/          # Juegos interactivos
│   │   ├── AdminDashboard.tsx
│   │   ├── TeacherDashboard.tsx
│   │   ├── CourseSelector.tsx
│   │   └── ...
│   ├── App.tsx              # Componente principal
│   ├── index.css            # ⭐ Estilos globales y variables
│   └── main.tsx             # Punto de entrada
├── supabase/                # Configuración de Supabase
│   ├── config.toml
│   ├── init.sql            # Schema inicial
│   └── seed.sql            # Datos de prueba
├── .env.local              # Variables de entorno locales
├── CUSTOMIZACION.md        # Guía de personalización
├── DEPLOY-GRATIS.md        # Guía de deployment
├── README.md               # Este archivo
├── package.json
├── tailwind.config.ts      # Configuración de Tailwind
└── vite.config.ts          # Configuración de Vite
```

### Archivos Clave para Personalizar

| Archivo | Propósito |
|---------|-----------|
| `src/config/site.config.ts` | ⭐ **Configuración principal**: logos, colores, textos, videos, recursos |
| `src/index.css` | Paleta de colores del tema (CSS variables) |
| `public/recursos/` | Archivos descargables (PDFs, ZIPs, etc.) |
| `.env.local` | Variables de entorno para desarrollo local |

---

## 👥 Roles y Permisos

### 🔴 Administrador
- Gestión completa de usuarios (crear, editar, eliminar)
- Gestión de cursos y niveles
- Configuración del sistema
- Acceso a reportes avanzados

### 🟢 Profesor
- Ver progreso de estudiantes
- Acceso a estadísticas detalladas
- Exportar reportes
- Ver cursos disponibles

### 🔵 Estudiante
- Acceso a cursos de su nivel educativo
- Completar juegos y actividades
- Ver su propio progreso
- Descargar certificados

---

## 📊 Base de Datos

### Tablas Principales

#### `profiles`
Información de usuarios

```sql
- id (UUID)
- email (text)
- first_name (text)
- last_name (text)
- education_level (enum)
- birth_date (date)
```

#### `user_roles`
Roles de usuarios (admin, teacher, student)

```sql
- id (UUID)
- user_id (UUID)
- role (enum: admin | teacher | student)
```

#### `courses`
Cursos disponibles

```sql
- id (UUID)
- name (text)
- description (text)
- education_level (enum)
- icon (text)
- color (text)
```

#### `routes`
Niveles/rutas dentro de cada curso

```sql
- id (UUID)
- course_id (UUID)
- name (text)
- level_order (integer)
- game_type (text)
- is_certification_level (boolean)
```

#### `student_progress`
Progreso de estudiantes

```sql
- id (UUID)
- student_id (UUID)
- route_id (UUID)
- completed (boolean)
- score (integer)
- attempts (integer)
- best_accuracy_percentage (integer)
```

---

## 🔒 Seguridad

### Row Level Security (RLS)

Todas las tablas tienen políticas RLS configuradas:

- **Estudiantes**: Solo pueden ver y modificar sus propios datos
- **Profesores**: Pueden ver el progreso de todos los estudiantes
- **Administradores**: Acceso completo a todos los datos

### Autenticación

- Email/Password con confirmación de email
- Sesiones seguras con tokens JWT
- Refresh automático de tokens

---

## 🐛 Troubleshooting

### Error: "Invalid API Key"

Verifica que las variables de entorno estén correctamente configuradas:

```bash
# En Netlify: Site settings → Environment variables
# Deben empezar con VITE_
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

### Error: "CORS policy"

En Supabase dashboard → **Settings → API**:
- Agrega tu dominio de Netlify/Vercel a "CORS allowed origins"

### No puedo hacer login

En Supabase → **Authentication → URL Configuration**:
- Verifica que "Site URL" sea tu dominio de producción
- Agrega tu dominio a "Redirect URLs"

### Los estudiantes no ven sus cursos

Verifica las políticas RLS en Supabase:

```sql
-- Verificar que esta política existe en la tabla courses:
CREATE POLICY "Anyone can view courses"
ON public.courses FOR SELECT
USING (true);
```

---

## 💰 Costos (TODO GRATIS)

### Límites del Plan Gratuito

#### Netlify Free
- ✅ 100GB bandwidth/mes
- ✅ 300 build minutes/mes
- ✅ Deploys ilimitados
- ✅ HTTPS automático
- ✅ Dominio personalizado

#### Vercel Free
- ✅ 100GB bandwidth/mes
- ✅ Deploys ilimitados
- ✅ HTTPS automático
- ✅ Preview deployments

#### Supabase Free
- ✅ 500MB base de datos
- ✅ 1GB archivos
- ✅ 2GB bandwidth/mes
- ✅ 50,000 usuarios activos/mes
- ✅ Autenticación incluida
- ✅ Realtime incluido

### ⚠️ Para escuelas pequeñas (< 1000 usuarios activos/mes), TODO ES GRATIS

---

## 📈 Escalabilidad

Si necesitas más recursos en el futuro:

| Métrica | Free | Supabase Pro ($25/mes) |
|---------|------|------------------------|
| Storage | 500MB | 8GB |
| Bandwidth | 2GB | 50GB |
| Usuarios | 50K MAU | Ilimitado |
| Base de datos | Pausada tras 7 días inactividad | Siempre activa |
| Soporte | Comunidad | Email |

---

## 🆘 Soporte

### Documentación Oficial
- [React](https://react.dev/)
- [Supabase](https://supabase.com/docs)
- [Netlify](https://docs.netlify.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Contacto ITAL
- **Email**: contacto@ital.edu.co
- **Teléfono**: +57 (5) 123 4567
- **Sitio Web**: [ital.edu.co](https://ital.edu.co)

### Comunidad
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- GitHub Issues: [Reportar un problema]

---

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev                 # Iniciar servidor de desarrollo

# Build
npm run build              # Compilar para producción
npm run preview            # Previsualizar build de producción

# Linting
npm run lint               # Verificar código

# Supabase (desarrollo local)
supabase start             # Iniciar Supabase localmente
supabase stop              # Detener Supabase local
supabase db reset          # Resetear base de datos local
supabase db push           # Subir migraciones a producción

# Git
git status                 # Ver cambios
git add .                  # Agregar todos los cambios
git commit -m "mensaje"    # Hacer commit
git push                   # Subir a GitHub
```

---

## 🎯 Roadmap Futuro

- [ ] Sistema de notificaciones en tiempo real
- [ ] Chat en vivo profesor-estudiante
- [ ] Gamificación con badges y rankings
- [ ] App móvil nativa (React Native)
- [ ] Integración con Google Classroom
- [ ] Modo offline
- [ ] Exportación de certificados en PDF

---

## 📄 Licencia

Este proyecto es propiedad del **Instituto Técnico Alfonso López (ITAL)** de Ocaña, Norte de Santander, Colombia.

Todos los derechos reservados © 2024 ITAL

---

## 🙏 Créditos

Desarrollado para el **Instituto Técnico Alfonso López (ITAL)**

- **Diseño UI/UX**: Basado en la identidad institucional de ITAL
- **Contenido educativo**: Programa de educación vial ITAL
- **Desarrollo**: [Tu nombre/empresa]

---

## 🚀 ¡Comienza Ahora!

```bash
# 1. Clonar el proyecto
git clone https://github.com/tu-usuario/ital-educacion-vial.git

# 2. Instalar dependencias
cd ital-educacion-vial
npm install

# 3. Configurar .env.local
cp .env.example .env.local
# Edita .env.local con tus credenciales

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:5173
```

---

<div align="center">

**¡Educación vial de calidad para todos! 🚗🎓**

[Sitio Web](https://ital.edu.co) • [Soporte](mailto:contacto@ital.edu.co) • [Documentación](./CUSTOMIZACION.md)

</div>

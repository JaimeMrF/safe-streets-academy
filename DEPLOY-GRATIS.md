# 🚀 DESPLIEGUE GRATUITO - SIN LOVABLE CLOUD

## 📋 RESUMEN
Esta guía te muestra cómo desplegar tu aplicación **100% GRATIS** sin usar Lovable Cloud.

---

## 🎯 ARQUITECTURA DE DEPLOYMENT GRATUITO

```
Frontend (React) → Netlify/Vercel (GRATIS)
Backend (Database) → Supabase.com (GRATIS)
```

---

## 1️⃣ BACKEND: SUPABASE.COM (GRATIS)

### Paso 1: Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Click en "New Project"

### Paso 2: Configurar tu proyecto
```
Nombre: viasafe-production
Database Password: [tu-password-seguro]
Region: South America (más cercano)
Plan: Free (0$/mes)
```

### Paso 3: Migrar tu base de datos local
```bash
# 1. Instala Supabase CLI si no lo tienes
npm install -g supabase

# 2. Login en Supabase
supabase login

# 3. Link tu proyecto (usa el Project ID de Supabase.com)
supabase link --project-ref tu-project-id

# 4. Push tu base de datos local a la nube
supabase db push
```

### Paso 4: Obtener credenciales
En el dashboard de Supabase → Settings → API:
- Copia `Project URL`
- Copia `anon/public key`

---

## 2️⃣ FRONTEND: NETLIFY (GRATIS)

### Opción A: Deploy desde GitHub

#### Paso 1: Subir código a GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

#### Paso 2: Conectar con Netlify
1. Ve a [netlify.com](https://netlify.com)
2. "Add new site" → "Import from Git"
3. Selecciona tu repositorio
4. Configuración de build:

```
Build command: npm run build
Publish directory: dist
```

#### Paso 3: Variables de entorno en Netlify
En Netlify → Site settings → Environment variables:

```
VITE_SUPABASE_URL = [tu-url-de-supabase]
VITE_SUPABASE_PUBLISHABLE_KEY = [tu-anon-key-de-supabase]
```

#### Paso 4: Deploy
Click "Deploy site" - ¡Listo! 🎉

---

### Opción B: Deploy manual (sin GitHub)

```bash
# 1. Actualiza .env con las credenciales de Supabase.com
echo "VITE_SUPABASE_URL=https://tu-proyecto.supabase.co" > .env
echo "VITE_SUPABASE_PUBLISHABLE_KEY=tu-key-publica" >> .env

# 2. Compila el proyecto
npm run build

# 3. Instala Netlify CLI
npm install -g netlify-cli

# 4. Login en Netlify
netlify login

# 5. Deploy
netlify deploy --prod --dir=dist
```

---

## 3️⃣ ALTERNATIVA: VERCEL (GRATIS)

### Deploy con Vercel CLI
```bash
# 1. Instala Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (te preguntará por las env vars)
vercel --prod

# Durante el proceso, agrega:
# VITE_SUPABASE_URL = tu-url
# VITE_SUPABASE_PUBLISHABLE_KEY = tu-key
```

---

## 📊 COMPARACIÓN DE OPCIONES

| Servicio | Frontend | Backend | Costo | Límites |
|----------|----------|---------|-------|---------|
| **Netlify** | ✅ Incluido | - | $0 | 100GB/mes bandwidth |
| **Vercel** | ✅ Incluido | - | $0 | 100GB/mes bandwidth |
| **Supabase Free** | - | ✅ Incluido | $0 | 500MB storage, 2GB transfer |

---

## 🔧 CONFIGURACIÓN DE PRODUCCIÓN

### 1. Crear usuario admin inicial

```sql
-- Ejecuta esto en SQL Editor de Supabase.com

-- 1. Primero crea el usuario desde Auth → Users en Supabase dashboard
-- Anota el UUID del usuario

-- 2. Luego asigna el rol admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('uuid-del-usuario-admin', 'admin');
```

### 2. Configurar autenticación
En Supabase dashboard → Authentication → Settings:

```
Site URL: https://tu-sitio.netlify.app
Redirect URLs: https://tu-sitio.netlify.app/**
Enable Email Confirmations: OFF (para testing rápido)
```

---

## ✅ CHECKLIST DE DEPLOYMENT

### Antes de deployar:
- [ ] Crear proyecto en Supabase.com
- [ ] Migrar base de datos con `supabase db push`
- [ ] Obtener credenciales de Supabase
- [ ] Compilar localmente con `npm run build` (prueba)
- [ ] Crear cuenta en Netlify o Vercel

### Durante el deployment:
- [ ] Configurar variables de entorno
- [ ] Subir código/conectar repositorio
- [ ] Verificar que la build funciona

### Después del deployment:
- [ ] Crear usuario admin inicial
- [ ] Configurar URLs de autenticación
- [ ] Probar login/registro
- [ ] Probar funcionalidad de cada rol

---

## 🆘 TROUBLESHOOTING

### Error: "Invalid API Key"
```bash
# Verifica que las variables de entorno estén correctas
# En Netlify: Site settings → Environment variables
# Deben empezar con VITE_
```

### Error: "CORS policy"
```bash
# En Supabase dashboard → Settings → API
# Agrega tu dominio de Netlify a "CORS allowed origins"
```

### Error: No puedo hacer login
```bash
# Verifica en Supabase → Authentication → URL Configuration
# Site URL debe ser tu dominio de producción
```

---

## 💰 COSTOS (TODO GRATIS)

### Plan Gratuito - Límites:

**Netlify Free:**
- 100GB bandwidth/mes
- 300 build minutes/mes
- Deploys ilimitados

**Vercel Free:**
- 100GB bandwidth/mes
- Deploys ilimitados

**Supabase Free:**
- 500MB base de datos
- 1GB archivos
- 2GB bandwidth
- 50,000 usuarios MAU

### ⚠️ Para aplicaciones pequeñas (< 1000 usuarios), TODO ES GRATIS

---

## 📈 ESCALABILIDAD

Cuando necesites más recursos:

| Métrica | Free | Paid (Supabase Pro) |
|---------|------|---------------------|
| Storage | 500MB | 8GB |
| Bandwidth | 2GB | 50GB |
| Usuarios | 50K | Ilimitado |
| Costo | $0 | $25/mes |

---

## 🔗 RECURSOS ÚTILES

- [Documentación Supabase](https://supabase.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)

---

## ✨ RESUMEN RÁPIDO

```bash
# 1. Backend (Supabase.com)
supabase login
supabase link --project-ref tu-id
supabase db push

# 2. Frontend (Netlify)
npm run build
netlify deploy --prod --dir=dist

# 3. Configurar variables de entorno en Netlify
# 4. ¡Listo! 🎉
```

---

## 🎯 RESULTADO FINAL

Tu aplicación estará online en:
- `https://tu-app.netlify.app` (o dominio custom)
- 100% funcional
- 100% gratuito
- Sin usar Lovable Cloud

**¡Felicidades! 🚀**

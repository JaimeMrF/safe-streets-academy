#!/bin/bash

# Script de instalación LOCAL para ViaSafe
# Este script configura todo el entorno local automáticamente

echo "🚀 ViaSafe - Instalación Local"
echo "================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Descárgalo desde: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js $(node -v) detectado"

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    echo "Descárgalo desde: https://www.docker.com/products/docker-desktop"
    exit 1
fi
echo "✅ Docker detectado"

# Verificar si Docker está corriendo
if ! docker info &> /dev/null; then
    echo "❌ Docker no está corriendo"
    echo "Inicia Docker Desktop y vuelve a ejecutar este script"
    exit 1
fi
echo "✅ Docker está corriendo"

# Instalar Supabase CLI
echo ""
echo "📦 Instalando Supabase CLI..."
npm install -g supabase

if ! command -v supabase &> /dev/null; then
    echo "❌ Error instalando Supabase CLI"
    exit 1
fi
echo "✅ Supabase CLI instalado"

# Instalar dependencias del proyecto
echo ""
echo "📦 Instalando dependencias del proyecto..."
npm install
echo "✅ Dependencias instaladas"

# Iniciar Supabase local
echo ""
echo "🗄️ Iniciando base de datos local (esto puede tardar unos minutos la primera vez)..."
supabase start

if [ $? -ne 0 ]; then
    echo "❌ Error iniciando Supabase"
    exit 1
fi

echo ""
echo "✅ Base de datos iniciada correctamente"
echo ""

# Obtener credenciales
echo "📋 Obteniendo credenciales locales..."
API_URL=$(supabase status | grep "API URL" | awk '{print $3}')
ANON_KEY=$(supabase status | grep "anon key" | awk '{print $3}')

# Crear archivo .env.local
echo ""
echo "📝 Creando archivo de configuración .env.local..."
cat > .env.local << EOF
VITE_SUPABASE_URL=$API_URL
VITE_SUPABASE_PUBLISHABLE_KEY=$ANON_KEY
EOF

echo "✅ Archivo .env.local creado"

echo ""
echo "================================"
echo "🎉 ¡Instalación completada!"
echo "================================"
echo ""
echo "Para iniciar la aplicación ejecuta:"
echo "  npm run dev"
echo ""
echo "La aplicación estará disponible en:"
echo "  http://localhost:5173"
echo ""
echo "Cuentas de prueba:"
echo "  Estudiante: estudiante@test.com / password123"
echo "  Profesor: profesor@test.com / password123"
echo ""
echo "Para gestionar la base de datos:"
echo "  http://localhost:54323"
echo ""

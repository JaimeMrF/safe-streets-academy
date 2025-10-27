@echo off
REM Script de instalación LOCAL para ViaSafe (Windows)

echo ================================
echo    ViaSafe - Instalacion Local
echo ================================
echo.

REM Verificar Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado
    echo Descargalo desde: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js detectado

REM Verificar Docker
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no esta instalado
    echo Descargalo desde: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo [OK] Docker detectado

REM Verificar si Docker está corriendo
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no esta corriendo
    echo Inicia Docker Desktop y vuelve a ejecutar este script
    pause
    exit /b 1
)
echo [OK] Docker esta corriendo

REM Instalar Supabase CLI
echo.
echo Instalando Supabase CLI...
call npm install -g supabase

supabase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Error instalando Supabase CLI
    pause
    exit /b 1
)
echo [OK] Supabase CLI instalado

REM Instalar dependencias
echo.
echo Instalando dependencias del proyecto...
call npm install
echo [OK] Dependencias instaladas

REM Iniciar Supabase
echo.
echo Iniciando base de datos local (esto puede tardar unos minutos)...
call supabase start

if %errorlevel% neq 0 (
    echo [ERROR] Error iniciando Supabase
    pause
    exit /b 1
)

echo.
echo [OK] Base de datos iniciada correctamente
echo.

REM Crear .env.local
echo Creando archivo de configuracion...
echo VITE_SUPABASE_URL=http://localhost:54321 > .env.local
echo VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0 >> .env.local
echo [OK] Archivo .env.local creado

echo.
echo ================================
echo    Instalacion completada!
echo ================================
echo.
echo Para iniciar la aplicacion ejecuta:
echo   npm run dev
echo.
echo La aplicacion estara disponible en:
echo   http://localhost:5173
echo.
echo Cuentas de prueba:
echo   Estudiante: estudiante@test.com / password123
echo   Profesor: profesor@test.com / password123
echo.
echo Para gestionar la base de datos:
echo   http://localhost:54323
echo.
pause

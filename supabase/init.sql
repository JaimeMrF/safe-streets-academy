-- Crear enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'student');

-- Crear enum para niveles educativos
CREATE TYPE public.education_level AS ENUM ('preescolar', 'primaria', 'secundaria', 'bachillerato');

-- Tabla de perfiles de usuario
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  education_level public.education_level NOT NULL,
  birth_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla de roles de usuario
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Tabla de cursos
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  education_level public.education_level NOT NULL,
  icon TEXT,
  color TEXT DEFAULT '#4F46E5',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla de rutas/niveles dentro de cada curso
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  level_order INTEGER NOT NULL,
  game_type TEXT NOT NULL, -- 'memory', 'quiz', 'drag-drop', 'video', '3d-model'
  game_config JSONB, -- Configuración específica del juego
  video_url TEXT, -- URL del video (si aplica)
  model_3d_url TEXT, -- URL del modelo 3D (si aplica)
  is_certification_level BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, level_order)
);

-- Tabla de progreso de estudiantes
CREATE TABLE public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  avg_response_time DECIMAL(10,2) DEFAULT 0,
  completion_status TEXT DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  best_accuracy_percentage INTEGER DEFAULT 0,
  last_accuracy_percentage INTEGER DEFAULT 0,
  current_level_number INTEGER DEFAULT 1,
  attempts INTEGER DEFAULT 0,
  last_attempt_date TIMESTAMPTZ,
  completion_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, route_id)
);

-- Habilitar Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Función para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Políticas RLS para user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para courses
CREATE POLICY "Anyone can view courses"
  ON public.courses FOR SELECT
  USING (TRUE);

CREATE POLICY "Teachers and admins can manage courses"
  ON public.courses FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'teacher')
  );

-- Políticas RLS para routes
CREATE POLICY "Anyone can view routes"
  ON public.routes FOR SELECT
  USING (TRUE);

CREATE POLICY "Teachers and admins can manage routes"
  ON public.routes FOR ALL
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'teacher')
  );

-- Políticas RLS para student_progress
CREATE POLICY "Students can view their own progress"
  ON public.student_progress FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can create/update their own progress"
  ON public.student_progress FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own progress"
  ON public.student_progress FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers and admins can view all progress"
  ON public.student_progress FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'teacher')
  );

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON public.routes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at
  BEFORE UPDATE ON public.student_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insertar datos iniciales de cursos
INSERT INTO public.courses (name, description, education_level, icon, color) VALUES
('Colores y Señales', 'Aprende los colores del semáforo y señales básicas de tránsito de forma divertida', 'preescolar', '🚦', '#FF6B6B'),
('Peatón Seguro', 'Descubre cómo cruzar la calle de manera segura y reconocer señales importantes', 'primaria', '🚸', '#4ECDC4'),
('Ciclista Responsable', 'Domina las reglas del ciclismo urbano y la seguridad vial', 'secundaria', '🚴', '#95E1D3'),
('Conductor Consciente', 'Preparación completa para futuros conductores responsables', 'bachillerato', '🚗', '#F38181');

-- Insertar rutas para Preescolar
INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Memoriza el Semáforo', 'Juego de memoria con los colores del semáforo', 1, 'memory', 
'{"pairs": 6, "theme": "traffic-lights", "difficulty": "easy"}'::jsonb
FROM public.courses WHERE education_level = 'preescolar' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Señales de Tránsito', 'Aprende las señales básicas jugando', 2, 'quiz', 
'{"questions": 5, "theme": "basic-signs", "difficulty": "easy"}'::jsonb
FROM public.courses WHERE education_level = 'preescolar' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type) 
SELECT id, 'Video: Cruzando la Calle', 'Aprende a cruzar la calle de forma segura', 3, 'video'
FROM public.courses WHERE education_level = 'preescolar' LIMIT 1;

-- Insertar rutas para Primaria
INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Crucigrama de Señales', 'Encuentra las señales correctas', 1, 'memory', 
'{"pairs": 8, "theme": "road-signs", "difficulty": "medium"}'::jsonb
FROM public.courses WHERE education_level = 'primaria' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Quiz: Reglas de Tránsito', 'Demuestra tu conocimiento', 2, 'quiz', 
'{"questions": 10, "theme": "traffic-rules", "difficulty": "medium"}'::jsonb
FROM public.courses WHERE education_level = 'primaria' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type) 
SELECT id, 'Modelo 3D: Intersección', 'Explora una intersección en 3D', 3, '3d-model'
FROM public.courses WHERE education_level = 'primaria' LIMIT 1;

-- Insertar rutas para Secundaria
INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Señales de Ciclismo', 'Memoriza las señales para ciclistas', 1, 'memory', 
'{"pairs": 10, "theme": "cycling-signs", "difficulty": "hard"}'::jsonb
FROM public.courses WHERE education_level = 'secundaria' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Simulador de Rutas', 'Elige la ruta más segura', 2, 'drag-drop', 
'{"scenarios": 5, "theme": "safe-routes", "difficulty": "hard"}'::jsonb
FROM public.courses WHERE education_level = 'secundaria' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type) 
SELECT id, 'Video: Equipamiento Seguro', 'Aprende sobre el equipo de protección', 3, 'video'
FROM public.courses WHERE education_level = 'secundaria' LIMIT 1;

-- Insertar rutas para Bachillerato
INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Leyes de Tránsito', 'Domina las leyes fundamentales', 1, 'quiz', 
'{"questions": 15, "theme": "traffic-laws", "difficulty": "expert"}'::jsonb
FROM public.courses WHERE education_level = 'bachillerato' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type, game_config) 
SELECT id, 'Situaciones de Emergencia', 'Aprende a reaccionar correctamente', 2, 'quiz', 
'{"questions": 10, "theme": "emergency", "difficulty": "expert"}'::jsonb
FROM public.courses WHERE education_level = 'bachillerato' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type) 
SELECT id, 'Modelo 3D: Vehículo', 'Explora las partes de un vehículo', 3, '3d-model'
FROM public.courses WHERE education_level = 'bachillerato' LIMIT 1;

INSERT INTO public.routes (course_id, name, description, level_order, game_type, is_certification_level) 
SELECT id, 'Examen de Certificación', 'Demuestra todo lo aprendido', 4, 'quiz', TRUE
FROM public.courses WHERE education_level = 'bachillerato' LIMIT 1;
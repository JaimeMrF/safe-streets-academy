-- ============================================
-- SEED DATA PARA BASE DE DATOS LOCAL - ITAL
-- ============================================
-- Este archivo reconstruye toda la estructura de datos

-- ============================================
-- USUARIOS DE PRUEBA
-- ============================================

-- Usuario Estudiante: estudiante@test.com / password123
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'estudiante@test.com',
  '$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, email, first_name, last_name, education_level)
VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'estudiante@test.com',
  'Juan',
  'Pérez',
  'primaria'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
VALUES ('11111111-1111-1111-1111-111111111111'::uuid, 'student')
ON CONFLICT (user_id, role) DO NOTHING;

-- Usuario Profesor: profesor@test.com / password123
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '22222222-2222-2222-2222-222222222222'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'profesor@test.com',
  '$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, email, first_name, last_name, education_level)
VALUES (
  '22222222-2222-2222-2222-222222222222'::uuid,
  'profesor@test.com',
  'María',
  'García',
  'primaria'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
VALUES ('22222222-2222-2222-2222-222222222222'::uuid, 'teacher')
ON CONFLICT (user_id, role) DO NOTHING;

-- Usuario Admin: admin@test.com / password123
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '33333333-3333-3333-3333-333333333333'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@test.com',
  '$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, email, first_name, last_name, education_level)
VALUES (
  '33333333-3333-3333-3333-333333333333'::uuid,
  'admin@test.com',
  'Admin',
  'ITAL',
  'bachillerato'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
VALUES ('33333333-3333-3333-3333-333333333333'::uuid, 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- ============================================
-- CURSOS POR NIVEL EDUCATIVO
-- ============================================

-- PREESCOLAR (3-5 años)
INSERT INTO public.courses (id, name, description, education_level, icon, color) VALUES
('10000000-0000-0000-0000-000000000001', 'Señales Básicas', 'Aprende a reconocer las señales de tránsito más importantes', 'preescolar', '🚦', '#22C55E'),
('10000000-0000-0000-0000-000000000002', 'Cruzar la Calle Seguro', 'Aprende a cruzar la calle de forma segura', 'preescolar', '🚸', '#16A34A')
ON CONFLICT (id) DO NOTHING;

-- PRIMARIA (6-11 años)
INSERT INTO public.courses (id, name, description, education_level, icon, color) VALUES
('20000000-0000-0000-0000-000000000001', 'Señales de Tránsito', 'Conoce todas las señales de tránsito', 'primaria', '🚦', '#16A34A'),
('20000000-0000-0000-0000-000000000002', 'Seguridad Peatonal', 'Aprende las reglas para peatones', 'primaria', '🚶', '#15803D'),
('20000000-0000-0000-0000-000000000003', 'Zonas Escolares', 'Seguridad en zonas escolares', 'primaria', '🏫', '#166534')
ON CONFLICT (id) DO NOTHING;

-- SECUNDARIA (12-14 años)
INSERT INTO public.courses (id, name, description, education_level, icon, color) VALUES
('30000000-0000-0000-0000-000000000001', 'Educación Vial Integral', 'Conocimientos completos de educación vial', 'secundaria', '🚴', '#15803D'),
('30000000-0000-0000-0000-000000000002', 'Seguridad en Bicicleta', 'Aprende a circular seguro en bicicleta', 'secundaria', '🚲', '#166534'),
('30000000-0000-0000-0000-000000000003', 'Primeros Auxilios Viales', 'Conocimientos básicos de primeros auxilios', 'secundaria', '🚑', '#14532D')
ON CONFLICT (id) DO NOTHING;

-- BACHILLERATO (15-18 años)
INSERT INTO public.courses (id, name, description, education_level, icon, color) VALUES
('40000000-0000-0000-0000-000000000001', 'Preparación Licencia de Conducir', 'Prepárate para obtener tu licencia', 'bachillerato', '🚗', '#166534'),
('40000000-0000-0000-0000-000000000002', 'Conducción Defensiva', 'Técnicas de conducción segura', 'bachillerato', '🛡️', '#14532D'),
('40000000-0000-0000-0000-000000000003', 'Normas de Tránsito Avanzadas', 'Legislación y normativa vial', 'bachillerato', '📋', '#052E16')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RUTAS/NIVELES - PREESCOLAR
-- ============================================

-- Curso: Señales Básicas (Preescolar)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('11111111-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Introducción a Señales', 'Conoce las señales más importantes', 1, 'video1', 'https://www.youtube.com/embed/rnb0fkpeOao', NULL, false),
('11111111-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Juego de Memoria', 'Encuentra las parejas de señales', 2, 'memoria4x4', NULL, '{"pairs": 8, "theme": "traffic-lights", "difficulty": "easy"}', false),
('11111111-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Quiz de Señales', 'Demuestra lo que aprendiste', 3, 'quizPreescolar', NULL, '{"questions": 5, "timePerQuestion": 20}', false)
ON CONFLICT (id) DO NOTHING;

-- Curso: Cruzar la Calle Seguro (Preescolar)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('11111111-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000002', 'Cómo Cruzar Seguro', 'Aprende los pasos para cruzar', 1, 'video2', 'https://www.youtube.com/embed/7_UJryJ6UjI', NULL, false),
('11111111-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000002', 'Práctica de Cruce', 'Practica cruzando la calle', 2, 'memory', NULL, '{"pairs": 6, "theme": "road-signs", "difficulty": "easy"}', false),
('11111111-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000002', 'Evaluación Final', 'Demuestra que sabes cruzar', 3, 'quiz', NULL, '{"questions": 5, "timePerQuestion": 20}', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RUTAS/NIVELES - PRIMARIA
-- ============================================

-- Curso: Señales de Tránsito (Primaria)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('22222222-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Introducción', 'Conoce las señales de tránsito', 1, 'traffic-signs-intro', NULL, '{"signTypes": ["preventivas", "reglamentarias", "informativas"]}', false),
('22222222-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Desarrollo', 'Profundiza en las señales', 2, 'traffic-signs-desarrollo', NULL, '{"questions": 10, "timePerQuestion": 25}', false),
('22222222-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Aplicación', 'Aplica lo aprendido', 3, 'traffic-signs-aplicacion', NULL, '{"scenarios": 8, "timePerScenario": 30}', false),
('22222222-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 'Certificación', 'Obtén tu certificado', 4, 'traffic-signs-certificacion', NULL, '{"questions": 15, "passingScore": 80}', true)
ON CONFLICT (id) DO NOTHING;

-- Curso: Seguridad Peatonal (Primaria)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('22222222-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000002', 'Video Introductorio', 'Reglas para peatones', 1, 'video2', 'https://www.youtube.com/embed/7_UJryJ6UjI', NULL, false),
('22222222-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000002', 'Reglas Peatonales', 'Aprende las reglas', 2, 'pedestrian-rules-desarrollo', NULL, '{"rules": 10, "interactive": true}', false),
('22222222-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000002', 'Quiz Final', 'Evaluación de conocimientos', 3, 'quiz', NULL, '{"questions": 10, "timePerQuestion": 20}', false)
ON CONFLICT (id) DO NOTHING;

-- Curso: Zonas Escolares (Primaria)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('22222222-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000003', 'Seguridad Escolar', 'Conoce las zonas escolares', 1, 'video1', 'https://www.youtube.com/embed/rnb0fkpeOao', NULL, false),
('22222222-0000-0000-0000-000000000022', '20000000-0000-0000-0000-000000000003', 'Memoria de Señales', 'Encuentra las parejas', 2, 'memoria4x4', NULL, '{"pairs": 8, "theme": "road-signs", "difficulty": "medium"}', false),
('22222222-0000-0000-0000-000000000023', '20000000-0000-0000-0000-000000000003', 'Evaluación', 'Demuestra tu conocimiento', 3, 'quiz', NULL, '{"questions": 8, "timePerQuestion": 25}', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RUTAS/NIVELES - SECUNDARIA
-- ============================================

-- Curso: Educación Vial Integral (Secundaria)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('33333333-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Introducción Vial', 'Conceptos fundamentales', 1, 'introduccionsecundaria', NULL, '{"topics": ["señales", "normas", "seguridad"]}', false),
('33333333-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'Reglas Peatonales', 'Normas para peatones', 2, 'pedestrian-rules-desarrollo', NULL, '{"questions": 12, "scenarios": 6}', false),
('33333333-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001', 'Aplicación Práctica', 'Casos de estudio', 3, 'pedestrian-rules-aplicacion', NULL, '{"scenarios": 10, "timePerScenario": 30}', false),
('33333333-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000001', 'Certificación', 'Examen final', 4, 'pedestrian-rules-certificacion', NULL, '{"questions": 20, "passingScore": 80}', true)
ON CONFLICT (id) DO NOTHING;

-- Curso: Seguridad en Bicicleta (Secundaria)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('33333333-0000-0000-0000-000000000011', '30000000-0000-0000-0000-000000000002', 'Ciclismo Seguro', 'Introducción al ciclismo urbano', 1, 'video3', 'https://www.youtube.com/embed/xZCzsf5X_Wo', NULL, false),
('33333333-0000-0000-0000-000000000012', '30000000-0000-0000-0000-000000000002', 'Señales para Ciclistas', 'Aprende las señales', 2, 'memory', NULL, '{"pairs": 8, "theme": "cycling-signs", "difficulty": "medium"}', false),
('33333333-0000-0000-0000-000000000013', '30000000-0000-0000-0000-000000000002', 'Evaluación Ciclismo', 'Demuestra tu conocimiento', 3, 'quiz', NULL, '{"questions": 12, "timePerQuestion": 25}', false)
ON CONFLICT (id) DO NOTHING;

-- Curso: Primeros Auxilios Viales (Secundaria)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('33333333-0000-0000-0000-000000000021', '30000000-0000-0000-0000-000000000003', 'Primeros Auxilios Básicos', 'Conceptos fundamentales', 1, 'video2', 'https://www.youtube.com/embed/7_UJryJ6UjI', NULL, false),
('33333333-0000-0000-0000-000000000022', '30000000-0000-0000-0000-000000000003', 'Procedimientos de Emergencia', 'Qué hacer en emergencias', 2, 'quiz', NULL, '{"questions': 10, "interactive": true}', false),
('33333333-0000-0000-0000-000000000023', '30000000-0000-0000-0000-000000000003', 'Simulador 3D', 'Practica en situaciones reales', 3, '3d-model', 'https://sketchfab.com/models/ejemplo', '{"interactive": true}', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RUTAS/NIVELES - BACHILLERATO
-- ============================================

-- Curso: Preparación Licencia de Conducir (Bachillerato)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('44444444-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'Introducción a la Conducción', 'Conceptos básicos de conducir', 1, 'introduccionbachillerato', NULL, '{"topics": ["controles", "señales", "maniobras"]}', false),
('44444444-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', 'Desarrollo Teórico', 'Teoría de la conducción', 2, 'desarrollobachillerato', NULL, '{"lessons": 15, "quizzes": 10}', false),
('44444444-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', 'Aplicación Práctica', 'Simulación de manejo', 3, 'aplicacionbachillerato', NULL, '{"scenarios": 12, "difficulty": "medium"}', false),
('44444444-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000001', 'Examen Teórico', 'Certificación para licencia', 4, 'quiz', NULL, '{"questions": 30, "passingScore": 85}', true)
ON CONFLICT (id) DO NOTHING;

-- Curso: Conducción Defensiva (Bachillerato)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('44444444-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000002', 'Video Conducción Defensiva', 'Técnicas de conducción segura', 1, 'video3', 'https://www.youtube.com/embed/YBftXKmJQMQ', NULL, false),
('44444444-0000-0000-0000-000000000012', '40000000-0000-0000-0000-000000000002', 'Simulador Avanzado', 'Practica situaciones de riesgo', 2, 'desarrollobachillerato', NULL, '{"scenarios": 10, "difficulty": "hard"}', false),
('44444444-0000-0000-0000-000000000013', '40000000-0000-0000-0000-000000000002', 'Evaluación Final', 'Certifica tus habilidades', 3, 'quiz', NULL, '{"questions": 20, "passingScore": 80}', true)
ON CONFLICT (id) DO NOTHING;

-- Curso: Normas de Tránsito Avanzadas (Bachillerato)
INSERT INTO public.routes (id, course_id, name, description, level_order, game_type, video_url, game_config, is_certification_level) VALUES
('44444444-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000003', 'Legislación Vial', 'Conoce las normas de tránsito', 1, 'video1', 'https://www.youtube.com/embed/rnb0fkpeOao', NULL, false),
('44444444-0000-0000-0000-000000000022', '40000000-0000-0000-0000-000000000003', 'Casos Prácticos', 'Aplica la legislación', 2, 'aplicacionbachillerato', NULL, '{"cases": 15, "complexity": "high"}', false),
('44444444-0000-0000-0000-000000000023', '40000000-0000-0000-0000-000000000003', 'Examen de Certificación', 'Certifica tu conocimiento', 3, 'quiz', NULL, '{"questions": 25, "passingScore": 85}', true)
ON CONFLICT (id) DO NOTHING;

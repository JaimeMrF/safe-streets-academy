-- Seed data para testing local
-- Este archivo se ejecuta automáticamente después de init.sql

-- Crear usuarios de prueba (passwords hasheadas con bcrypt)
-- NOTA: Supabase local creará automáticamente estos usuarios en auth.users

-- Insertar perfiles de prueba
-- Usuario: estudiante@test.com / password123
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
  '$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK', -- password123
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  'authenticated'
);

INSERT INTO public.profiles (id, email, first_name, last_name, education_level)
VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'estudiante@test.com',
  'Juan',
  'Pérez',
  'primaria'
);

INSERT INTO public.user_roles (user_id, role)
VALUES ('11111111-1111-1111-1111-111111111111'::uuid, 'student');

-- Usuario: profesor@test.com / password123
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
  '$2a$10$RcH.pGZdUGJPnE3FWzYJKOOmP7qJ0Vqg3i3YHq9tXSQ7tLKJGTJTK', -- password123
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  'authenticated'
);

INSERT INTO public.profiles (id, email, first_name, last_name, education_level)
VALUES (
  '22222222-2222-2222-2222-222222222222'::uuid,
  'profesor@test.com',
  'María',
  'García',
  'primaria'
);

INSERT INTO public.user_roles (user_id, role)
VALUES ('22222222-2222-2222-2222-222222222222'::uuid, 'teacher');

-- Progreso de ejemplo para el estudiante
INSERT INTO public.student_progress (student_id, route_id, completed, score, best_accuracy_percentage, completion_status)
SELECT 
  '11111111-1111-1111-1111-111111111111'::uuid,
  id,
  true,
  85,
  85,
  'completed'
FROM public.routes
WHERE level_order = 1
LIMIT 1;

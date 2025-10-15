export interface ProgressRecord {
  id: number;
  student_id: number;
  route_id: number;
  completed: boolean;
  score: number;
  avg_response_time: number;
  completion_status?: 'completed' | 'in_progress' | 'not_started';
  best_accuracy_percentage?: number;
  last_accuracy_percentage?: number;
  current_level_number?: number;
  last_completion_date?: string;
}

// Simular base de datos en localStorage
const PROGRESS_KEY = "student_progress";

export const getProgress = (): ProgressRecord[] => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Cargar datos iniciales
  const initialData = [
    {
      id: 1,
      student_id: 1,
      route_id: 1,
      completed: true,
      score: 95,
      avg_response_time: 3.2
    },
    {
      id: 2,
      student_id: 1,
      route_id: 2,
      completed: true,
      score: 88,
      avg_response_time: 3.5
    },
    {
      id: 3,
      student_id: 2,
      route_id: 5,
      completed: true,
      score: 92,
      avg_response_time: 2.8
    }
  ];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(initialData));
  return initialData;
};

export const getStudentCourseProgress = (studentId: number, courseId: number): ProgressRecord[] => {
  const allProgress = getProgress();
  // Necesitamos filtrar por rutas del curso específico
  // Aquí importamos las rutas para filtrar correctamente
  return allProgress.filter(p => p.student_id === studentId);
};

export const upsertProgress = (
  studentId: number,
  routeId: number,
  completed: boolean,
  score: number,
  avgResponseTime?: number
) => {
  const avgTime = avgResponseTime || 0;
  const allProgress = getProgress();
  const existingIndex = allProgress.findIndex(
    p => p.student_id === studentId && p.route_id === routeId
  );

  if (existingIndex >= 0) {
    // Actualizar
    allProgress[existingIndex] = {
      ...allProgress[existingIndex],
      completed,
      score,
      avg_response_time: avgTime,
      completion_status: completed ? 'completed' : 'in_progress',
      best_accuracy_percentage: score,
      last_accuracy_percentage: score,
      last_completion_date: new Date().toISOString()
    };
  } else {
    // Crear nuevo
    const newId = Math.max(...allProgress.map(p => p.id), 0) + 1;
    allProgress.push({
      id: newId,
      student_id: studentId,
      route_id: routeId,
      completed,
      score,
      avg_response_time: avgTime,
      completion_status: completed ? 'completed' : 'in_progress',
      best_accuracy_percentage: score,
      last_accuracy_percentage: score,
      current_level_number: 1,
      last_completion_date: new Date().toISOString()
    });
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
};

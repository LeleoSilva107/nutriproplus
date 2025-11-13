import { QuizData, NutritionPlan, UserProgress, Achievement } from './types';

const QUIZ_KEY = 'nutripro_quiz';
const PROGRESS_KEY = 'nutripro_progress';

export const calculateIMC = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const getIMCCategory = (imc: number): string => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  return 'Obesidade';
};

export const calculateTDEE = (quizData: QuizData): number => {
  const { weight, height, age, gender, activityLevel } = quizData;
  
  // Fórmula de Harris-Benedict
  let bmr: number;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  // Multiplicadores de atividade
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  
  return Math.round(bmr * activityMultipliers[activityLevel]);
};

export const calculateNutritionPlan = (quizData: QuizData): NutritionPlan => {
  const tdee = calculateTDEE(quizData);
  const imc = calculateIMC(quizData.weight, quizData.height);
  
  let calories = tdee;
  
  // Ajusta calorias baseado no objetivo
  if (quizData.goal === 'lose') {
    calories = Math.round(tdee * 0.85); // Déficit de 15%
  } else if (quizData.goal === 'gain') {
    calories = Math.round(tdee * 1.2); // Superávit de 20%
  }
  
  // Calcula macronutrientes
  const protein = Math.round((calories * 0.3) / 4); // 30% proteína
  const fats = Math.round((calories * 0.25) / 9); // 25% gordura
  const carbs = Math.round((calories * 0.45) / 4); // 45% carboidratos
  
  return {
    calories,
    protein,
    carbs,
    fats,
    imc,
    imcCategory: getIMCCategory(imc),
  };
};

export const saveQuizData = (data: QuizData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
};

export const getQuizData = (): QuizData | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(QUIZ_KEY);
  return data ? JSON.parse(data) : null;
};

export const initializeProgress = (userId: string): UserProgress => {
  const defaultAchievements: Achievement[] = [
    {
      id: 'first_login',
      title: 'Bem-vindo!',
      description: 'Primeiro login realizado',
      icon: '🎉',
      unlocked: true,
      unlockedAt: new Date().toISOString(),
      xp: 10,
    },
    {
      id: 'quiz_complete',
      title: 'Perfil Completo',
      description: 'Finalizou o quiz de personalização',
      icon: '✅',
      unlocked: false,
      xp: 20,
    },
    {
      id: 'streak_3',
      title: 'Consistência',
      description: 'Completou 3 dias seguidos',
      icon: '🔥',
      unlocked: false,
      xp: 30,
    },
    {
      id: 'streak_7',
      title: 'Semana Completa',
      description: 'Completou 7 dias seguidos',
      icon: '⭐',
      unlocked: false,
      xp: 50,
    },
    {
      id: 'water_7',
      title: 'Hidratação Master',
      description: 'Bebeu água por 7 dias seguidos',
      icon: '💧',
      unlocked: false,
      xp: 40,
    },
  ];

  return {
    userId,
    level: 1,
    xp: 10,
    currentStreak: 0,
    longestStreak: 0,
    waterIntake: [],
    workoutDays: [],
    mealLogs: [],
    achievements: defaultAchievements,
    lastLogin: new Date().toISOString(),
  };
};

export const saveProgress = (progress: UserProgress) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${PROGRESS_KEY}_${progress.userId}`, JSON.stringify(progress));
};

export const getProgress = (userId: string): UserProgress | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(`${PROGRESS_KEY}_${userId}`);
  return data ? JSON.parse(data) : null;
};

export const addXP = (progress: UserProgress, amount: number): UserProgress => {
  const newXP = progress.xp + amount;
  const newLevel = Math.floor(newXP / 100) + 1;
  
  return {
    ...progress,
    xp: newXP,
    level: newLevel,
  };
};

export const unlockAchievement = (
  progress: UserProgress,
  achievementId: string
): UserProgress => {
  const achievements = progress.achievements.map((a) =>
    a.id === achievementId && !a.unlocked
      ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() }
      : a
  );

  const unlockedAchievement = achievements.find((a) => a.id === achievementId);
  const xpGain = unlockedAchievement?.xp || 0;

  return addXP({ ...progress, achievements }, xpGain);
};
